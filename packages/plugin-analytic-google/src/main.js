import uid from 'easy-uid';

import GoogleAnalytic from './GoogleAnalytic.js';
import GoogleAnalytics4 from './GoogleAnalytics4';

const defaultDependencies = GoogleAnalytic.$dependencies;
const googleAnalytics4DefaultDependencies = GoogleAnalytics4.$dependencies;

const $registerImaPlugin = () => {};

let initSettings = () => {
  return {
    prod: {
      plugin: {
        analytic: {
          google: {
            service: 'UA-XXXXXXX-X',
            settings: {
              clientId: uid(),
              storage: 'none'
            },
            settingsSetter: {
              allowAdFeatures: false,
              anonymizeIp: true,
              allowAdPersonalizationSignals: false
            }
          },
          google4: {
            service: 'G-XXXXXXXXXX'
          }
        }
      }
    },

    test: {},

    dev: {}
  };
};

export {
  GoogleAnalytic,
  GoogleAnalytics4,
  defaultDependencies,
  googleAnalytics4DefaultDependencies,
  $registerImaPlugin,
  initSettings
};
