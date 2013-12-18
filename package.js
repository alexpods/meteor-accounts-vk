Package.describe({
    summary: "Login service for VKontakte accounts (https://vk.com)"
});

Package.on_use(function(api) {
    api.use('accounts-base', ['client', 'server']);
    api.imply('accounts-base', ['client', 'server']);
    api.use('accounts-oauth', ['client', 'server']);

    api.use('oauth2', ['client', 'server']);
    api.use('oauth', ['client', 'server']);
    api.use('http', ['server']);
    api.use('underscore', 'server');
    api.use('random', 'client');
    api.use('service-configuration', ['client', 'server']);
    api.use('templating', 'client');

    api.export && api.export('VK', 'client');

    api.add_files("lib/accounts_vk.js");
    api.add_files('lib/vk_client.js', 'client');
    api.add_files('lib/vk_server.js', 'server');

    api.add_files(['lib/vk_configure.html', 'lib/vk_configure.js', 'lib/vk_styles.css'], 'client');

});
