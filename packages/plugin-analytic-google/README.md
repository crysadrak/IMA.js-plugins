# @ima/plugin-analytic-google

This is the Google analytic plugin for the IMA.js application. You can visit our site <https://imajs.io>.

The plugin currently implements both UA and GA4 analytics.
It is planned to remove UA later in year 2023 as its support ends in this year.

## Installation

```console
npm install @ima/plugin-analytic-google @ima/plugin-script-loader --save
```

```javascript
// /app/build.js

var vendors = {
	common: [
		'@ima/plugin-analytic-google',
		'@ima/plugin-analytic',
		'@ima/plugin-script-loader'
	]
};

/*
Now is google analytic plugin available from:

ns.ima.plugin.analytic.google.GoogleAnalytic;
ns.ima.plugin.analytic.google.defaultDependencies;

import { GoogleAnalytic, defaultDependencies } from '@ima/plugin-analytic-google';
*/
```

```javascript
// /app/config/settings.js

prod: {
	$Http: { ... },
	$Cache: { ... },
	$Page:{ ... },
	plugin : {
		analytic: {
            google: { //for UA
                service: 'UA-XXXXXXX-X'
            },
            google4: { //for GA4
                service: 'G-XXXXXXXXXX'
            }
		}
	}
}
```

```javascript
// /app/config/services.js
import { GoogleAnalytic } from '@ima/plugin-analytic-google';
import { RouterEvents } from '@ima/core';

var $window = oc.get('$Window');
var $dispatcher = oc.get('$Dispatcher');
var googleAnalytic = oc.get(GoogleAnalytic);
var googleAnalytics4 = oc.get(GoogleAnalytics4);


if ($window.isClient()) {

	// insert analytic script to page and initialization analytic
	googleAnalytic.init();
	googleAnalytics4.init();

	//set hit page view to analytic
	$dispatcher.listen(RouterEvents.AFTER_HANDLE_ROUTE, (pageData) => {

		if (pageData &&
				pageData.response &&
				(pageData.response.status >= 200 &&
				pageData.response.status < 300)) {

			googleAnalytic.hitPageView(pageData);
            googleAnalytics4.hitPageView(pageData);

		} else {

			// hit error to google analytic
			var label = pageData.params.error ? pageData.params.error.toString() : undefined;
			var value = pageData.response.status ? pageData.response.status : undefined;

			googleAnalytic.hit({
				category: 'error',
				action: 'render',
				label,
				value
			});
		}
	});
}
```

## Version 1.0 notice

Since version 1.0 you need to additionally call a `load()` method. The later you call this method the better.
If you don't have a specific point in your app where you know that the page has finished loading you can call the `load()` method immediatelly after `init()` method

```javascript
if ($window.isClient()) {

	// insert analytic script to page and initialization analytic
	googleAnalytic.init();
	googleAnalytic.load();
	googleAnalytics4.load();

	// ...
```

## Dependencies
If you are looking more details, you should
follow this links:
[https://github.com/seznam/IMA.js-plugins/tree/master/packages/plugin-analytic](https://github.com/seznam/IMA.js-plugins/tree/master/packages/plugin-analytic),
[https://github.com/seznam/IMA.js-plugins/tree/master/packages/plugin-script-loader](https://github.com/seznam/IMA.js-plugins/tree/master/packages/plugin-script-loader)
