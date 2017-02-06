VK = {};

Oauth.registerService('vk', 2, null, function(query) {

    var response    = getTokenResponse(query);
    var accessToken = response.accessToken;
    var identity    = getIdentity(accessToken);

    var serviceData = {
        accessToken: accessToken,
        expiresAt: (+new Date) + (1000 * response.expiresIn)
    };

    var whitelisted = ['uid', 'nickname', 'first_name', 'last_name', 'sex', 'bdate', 'timezone', 'photo', 'photo_big', 'city', 'country'];

    var fields = _.pick(identity, whitelisted);
    _.extend(serviceData, fields);
    if (response.email)
        serviceData.email = response.email;

    serviceData.id = serviceData.uid;
    delete serviceData.uid;

    return {
        serviceData: serviceData,
        options: {
            profile: {
                name: identity.nickname || (identity.first_name + ' ' + identity.last_name)
            }
        }
    };
});

// returns an object containing:
// - accessToken
// - expiresIn: lifetime of token in seconds
var getTokenResponse = function (query) {
    var config = ServiceConfiguration.configurations.findOne({service: 'vk'});
    if (!config) {
        throw new ServiceConfiguration.ConfigError("Service not configured");
    }

    var responseContent;

    try {
        // Request an access token
        responseContent = HTTP.post(
            "https://api.vk.com/oauth/access_token", {
                params: {
                    client_id:     config.appId,
                    client_secret: config.secret,
                    code:          query.code,
                    redirect_uri: config.redirectUri || Meteor.absoluteUrl("_oauth/vk?close=close")
                }
            }).content;

    } catch (err) {
        throw _.extend(new Error("Failed to complete OAuth handshake with vkontakte. " + err.message),
            {response: err.response});
    }
    // Success!  Extract the vkontakte access token and expiration
    // time from the response
    var parsedResponse = JSON.parse(responseContent);

    var vkAccessToken = parsedResponse.access_token;
    var vkExpires = parsedResponse.expires_in;

    if (!vkAccessToken) {
        throw new Error("Failed to complete OAuth handshake with vkontakte " +
            "-- can't find access token in HTTP response. " + responseContent);
    }
    return {
        accessToken: vkAccessToken,
        expiresIn: vkExpires,
        email: parsedResponse.email || false
    };
};

var getIdentity = function (accessToken) {

    var result = HTTP.get(
        "https://api.vk.com/method/users.get", {params: {
            access_token: accessToken,
            fields: 'uid, nickname, first_name, last_name, sex, bdate, timezone, photo, photo_big, city, country'
        }});

    if (result.error) // if the http response was an error
        throw result.error;

    return result.data.response[0];
};

VK.retrieveCredential = function(credentialToken) {
    return Oauth.retrieveCredential(credentialToken);
};
