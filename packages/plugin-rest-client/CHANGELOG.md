# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.2.0](https://github.com/seznam/IMA.js-plugins/compare/@ima/plugin-rest-client@3.0.2...@ima/plugin-rest-client@3.2.0) (2021-08-24)


### Features

* 🎸 add node16 and npm7 support ([#49](https://github.com/seznam/IMA.js-plugins/issues/49)) ([16fcc0e](https://github.com/seznam/IMA.js-plugins/commit/16fcc0eab73da5651171d110100e5a5ec9cbdcf1))
* 🎸 distribute to cjs, mjs, es5, es11 ([8106ddb](https://github.com/seznam/IMA.js-plugins/commit/8106ddb11b8cf7490eeb447156dc840bac3b0f28))
* local ([4b2ab94](https://github.com/seznam/IMA.js-plugins/commit/4b2ab942d27cb7d2d7e865c838610a7e9ba2f7f3))





# [3.1.0](https://github.com/seznam/IMA.js-plugins/compare/@ima/plugin-rest-client@3.0.2...@ima/plugin-rest-client@3.1.0) (2021-08-24)


### Features

* 🎸 add node16 and npm7 support ([#49](https://github.com/seznam/IMA.js-plugins/issues/49)) ([16fcc0e](https://github.com/seznam/IMA.js-plugins/commit/16fcc0eab73da5651171d110100e5a5ec9cbdcf1))
* 🎸 distribute to cjs, mjs, es5, es11 ([ce7af85](https://github.com/seznam/IMA.js-plugins/commit/ce7af856287f874952cccdc45b17ebfda07d8189))
* local ([b8e74a3](https://github.com/seznam/IMA.js-plugins/commit/b8e74a3aa45fa88c93f57df0740998f625e61575))





## [3.0.2](https://github.com/seznam/IMA.js-plugins/compare/@ima/plugin-rest-client@3.0.1...@ima/plugin-rest-client@3.0.2) (2021-03-22)

**Note:** Version bump only for package @ima/plugin-rest-client





## [3.0.1](https://github.com/seznam/IMA.js-plugins/compare/@ima/plugin-rest-client@3.0.0...@ima/plugin-rest-client@3.0.1) (2020-06-22)

**Note:** Version bump only for package @ima/plugin-rest-client





# [3.0.0](https://github.com/seznam/IMA.js-plugins/compare/@ima/plugin-rest-client@2.0.0...@ima/plugin-rest-client@3.0.0) (2020-06-08)


### Features

* 🎸  Unified build and release process via rollup and lerna ([df277ce](https://github.com/seznam/IMA.js-plugins/commit/df277ce5bae0cacc9c5b4d6957bdc786ac9cf571))





# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 2.0.0 - 2020-02-07
### Changed
- **BREAKING CHANGE!** - `AbstractEntity` has not dependency on REST API client. All REST API method calls from the `AbstractEntity` was removed.
### Added
- Added `AbstractResource` which now contains all rest API call methods that has been extracted from the `AbstractEntity`

## 1.0.5 - 2019-12-10
### Fixed
- Fixed package build

## 1.0.4 - 2019-12-09
### Added
- Added `deepFreeze` to exports

## 1.0.3 - 2019-12-06
### Fixed
- Fix package build

## 1.0.2 - 2019-12-06
### Changed
- Switched to name exports instead of accessing specific files directly (i.e. `import RestClient from '@ima/plugin-rest-client/RestClient'` -> `import { RestClient } from '@ima/plugin-rest-client'`)

## 1.0.1 - 2019-12-06
### Fixed
- Fix package build

## 1.0.0 - 2019-10-23
### Removed
- **BREAKING CHANGE!** IMA.js v16 and lower is no longer supported, you need to upgrade to IMA.js v17+
