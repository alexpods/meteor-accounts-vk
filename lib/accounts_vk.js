Accounts.oauth.registerService('vk');

if (Meteor.isClient) {
    Meteor.loginWithVk = function(options, callback) {
        // support a callback without options
        if (! callback && typeof options === "function") {
            callback = options;
            options = null;
        }

        var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        VK.requestCredential(options, credentialRequestCompleteCallback);
    };
} else {
    Accounts.addAutopublishFields({
        forLoggedInUser: ['services.vk'],
        forOtherUsers: [
            'services.vk.id',
            'services.vk.nickname',
            'services.vk.gender'
        ]
    });
}
