# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.2.0](https://github.com/seznam/IMA.js-plugins/compare/@ima/plugin-useragent@3.0.2...@ima/plugin-useragent@3.2.0) (2021-08-24)


### Bug Fixes

* 🐛 set containerSelector to response for widget props ([#47](https://github.com/seznam/IMA.js-plugins/issues/47)) ([228048e](https://github.com/seznam/IMA.js-plugins/commit/228048e9b44dd6ef2208b2d541033870edd17041))


### Features

* 🎸 add node16 and npm7 support ([#49](https://github.com/seznam/IMA.js-plugins/issues/49)) ([16fcc0e](https://github.com/seznam/IMA.js-plugins/commit/16fcc0eab73da5651171d110100e5a5ec9cbdcf1))
* 🎸 distribute to cjs, mjs, es5, es11 ([8106ddb](https://github.com/seznam/IMA.js-plugins/commit/8106ddb11b8cf7490eeb447156dc840bac3b0f28))
* local ([4b2ab94](https://github.com/seznam/IMA.js-plugins/commit/4b2ab942d27cb7d2d7e865c838610a7e9ba2f7f3))





# [3.1.0](https://github.com/seznam/IMA.js-plugins/compare/@ima/plugin-useragent@3.0.2...@ima/plugin-useragent@3.1.0) (2021-08-24)


### Bug Fixes

* 🐛 set containerSelector to response for widget props ([#47](https://github.com/seznam/IMA.js-plugins/issues/47)) ([228048e](https://github.com/seznam/IMA.js-plugins/commit/228048e9b44dd6ef2208b2d541033870edd17041))


### Features

* 🎸 add node16 and npm7 support ([#49](https://github.com/seznam/IMA.js-plugins/issues/49)) ([16fcc0e](https://github.com/seznam/IMA.js-plugins/commit/16fcc0eab73da5651171d110100e5a5ec9cbdcf1))
* 🎸 distribute to cjs, mjs, es5, es11 ([ce7af85](https://github.com/seznam/IMA.js-plugins/commit/ce7af856287f874952cccdc45b17ebfda07d8189))
* local ([b8e74a3](https://github.com/seznam/IMA.js-plugins/commit/b8e74a3aa45fa88c93f57df0740998f625e61575))





## [3.0.2](https://github.com/seznam/IMA.js-plugins/compare/@ima/plugin-useragent@3.0.1...@ima/plugin-useragent@3.0.2) (2021-03-22)

**Note:** Version bump only for package @ima/plugin-useragent





## [3.0.1](https://github.com/seznam/IMA.js-plugins/compare/@ima/plugin-useragent@3.0.0...@ima/plugin-useragent@3.0.1) (2020-06-22)

**Note:** Version bump only for package @ima/plugin-useragent





# [3.0.0](https://github.com/seznam/IMA.js-plugins/compare/@ima/plugin-useragent@2.0.1...@ima/plugin-useragent@3.0.0) (2020-06-08)


### Features

* 🎸  Unified build and release process via rollup and lerna ([df277ce](https://github.com/seznam/IMA.js-plugins/commit/df277ce5bae0cacc9c5b4d6957bdc786ac9cf571))





# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 2.0.1 - 2020-02-19
### Changed
- FIXING PREVIOUS VERSION (2.0.0) which was accidentally released without all desired changes because a problem during releasing it.

## 2.0.0 - 2020-02-18
### Changed
- DO NOT USE THIS VERSION - there was a problem during releasing this version which caused that this version was released without all desired changes - it is fixed in the next version (2.0.1) of this plugin. Original text of this version: SznProhlizec (Seznam prohlížeč/sBrowser) - browser from the Seznam.cz (https://www.seznam.cz/prohlizec/) - is newly recognized and parsed correctly. The `getName()` method now returns the `SznProhlizec` string and the `getVersion()` method returns the version of the SznProhlizec in a string. Previously the SznProhlizec was parsed as a different browser depending on where the SznProhlizec runs (desktop, Android app, iOS app) - e.g. the actually newest SznProhlizec version 7.3 on iPhone XR with iOS 13.3.1 was parsed as really old Safari 8 - this wrong parsing of the SznProhlizec could cause some errors and problems in this browser in functionality which depends on browser and its version.

## 2.0.0 - 2020-02-18
### Changed
- SznProhlizec (Seznam prohlížeč/sBrowser) - browser from the Seznam.cz (https://www.seznam.cz/prohlizec/) - is newly recognized and parsed correctly. The `getName()` method now returns the `SznProhlizec` string and the `getVersion()` method returns the version of the SznProhlizec in a string. Previously the SznProhlizec was parsed as a different browser depending on where the SznProhlizec runs (desktop, Android app, iOS app) - e.g. the actually newest SznProhlizec version 7.3 on iPhone XR with iOS 13.3.1 was parsed as really old Safari 8 - this wrong parsing of the SznProhlizec could cause some errors and problems in this browser in functionality which depends on browser and its version.

## 1.0.0 - 2019-11-28
### Removed
- **BREAKING CHANGE!** IMA.js v16 and lower is no longer supported, you need to upgrade to IMA.js v17+
