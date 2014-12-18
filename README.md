meteor-accounts-vk
==================

Login service for VKontakte accounts (https://vk.com).

Usage
-----

1. Add the package to your project using meteorite:
```sh
$ meteor add mrt:accounts-vk
```

2. Configure vkontakte login service. You can do mannually or using GUI.

    **Manually**: Just add next code to your config file.
    ```js
        if (Meteor.isServer) {
            ServiceConfiguration.configurations.remove({
                service: 'vk'
            });

            ServiceConfiguration.configurations.insert({
                service: 'vk',
                appId:   '1234567',      // Your app id
                secret:  'someappsecret' // Your app secret
            });
        }
    ```

    **GUI**: 
    * Add `accounts-ui` package to your project:

        ```sh
        $ meteor add accounts-ui
        ```
    * Set `{{> loginButtons}}` into your template
    * Go to your browser, open page with `{{> loginButtons}}`
    * Click on "configure Vk login" button
    * Fill "App Id", "App Secret" "Scope" fields in popup window following by instructions

3. Use `Meteor.loginWithVk(options, callback)` for user authentication (you can omit `options` argument).

4. For customization of new user creation you must set 'createUser' event handler:
```js
    if (Meteor.isServer) {
        Accounts.onCreateUser(function(options, user) {
            user.custom_field = "custom value";
            // ...
            return user;
        });
    }
```

***Enjoy!***

```
If this package helped you - STAR it on github. This is not difficult for you, but important for me.
```

Contributors
------------

Thanks to these people for their contributions! I appriciate it a lot!
* @mike1pol (Mikhail Poluboyarinov)
* @Neftedollar
* @illfantasy

Dependencies
------------

1. **accounts-base**
2. **accounts-oauth**
3. **accounts-ui** (if you want to use GUI)

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/63ce76383fc2d7e3e960ca8e44371f44 "githalytics.com")](http://githalytics.com/alexpods/meteor-accounts-vs)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/alexpods/meteor-accounts-vk/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

