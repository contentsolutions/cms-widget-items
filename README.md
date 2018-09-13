# Content Solutions CMS widget for Addresses

A widget for address management for Content Solutions API.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload (for development)
npm run dev

# build for production with minification
npm run build
```

## How to use

### Bind it to the HTML DOM

```
<div id="addresses" data-options='{}'></div>
<script src="/dist/widget.js"></script>
```

### Options

With the wrapper container you should pass a **valid JSON string** containing options with the HTML attribute data-options.

The options the widget expects are:

```
{
    "lang": "en", // Two letter lower-case language code. Defaults to "en"
    "projectId": "", // ID of the project you are accessing. For instance, 57252baa-6642-4e40-b788-69c2bc106ea3
    "apiBaseUrl": "", // The URL for the API, including the version. For instance, https://csapi.io/v1
    "apiAccessToken": "", // A valid OAuth2 access token
    "permissions": {    // A list of permissions. This hides/shows UI elements based on the permissions the user has on the resource
        "read": true,   // By default all the permissions are true
        "write": true,  // Keep in mind the permissions are enforced on API level, so this is just a handy UI setting
        "delete": true  // You can hide some buttons even if the token allows you to do the action
    } 
}
```

### Configure it

In the directory ./src/setup you will find 3 files that are responsible for the configuration of the widget.

- _config.js_ - Holds the information the widget needs to function. This includes API entity and endpoints, selector for the DOM, etc.
- _translations.js_ - Contains objects with localized strings for different languages. Change these as you would like.
- _store.js_ - Contains default state of the widget. Generally, unless you extend/change the widget, you don't need to touch this.
