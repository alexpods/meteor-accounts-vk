meteor-accounts-vk
==================

Login service for VKontakte (https://vk.com) accounts

Usage
-----

1. Add this package to you project using meteorite:
```sh
$ mrt add accounts-vk
```

2. Configure vkontakte. You can do this using GUI or manually. 
**Manually**: Just add next code to you config file.
```js
    if (Meteor.isServer) {
        Accounts.loginServiceConfiguration.remove({
            service: 'vk'
        });
    
        Accounts.loginServiceConfiguration.insert({
            service: 'vk',
            appId:   '1234567',      // Your app id
            secret:  'someappsecret' // You app secret
        });
    }
```
**GUI**: Add `accounts-ui` package to your project:
```sh
$ mrt add accounts-ui
```
Set `{{loginButtons}}` into your template. Then go to your browser, open page with `{{loginButtons}}`, click on "configure Vk login" button and fill "App Id" and "App Secret" fields following by instructions.

3. Use `Meteor.loginWithVk(options, callback)` for user authentication (you can omit `options` argument).

4. For custom user creation you must set 'createUser' event handler:
```js
    Accounts.onCreateUser(function(options, user) {
        user.custom_field = "custom value";
        // ...
        return user;
    })
```

***Enjoy!***

Dependencies
------------

1. accounts-base
2. accounts-oauth
3. accounts-ui (if you want to use GUI)

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/63ce76383fc2d7e3e960ca8e44371f44 "githalytics.com")](http://githalytics.com/alexpods/meteor-accounts-vs)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/alexpods/meteor-accounts-vk/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

