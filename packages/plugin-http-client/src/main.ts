import { pluginLoader } from '@ima/core';

export type {
  ProcessorParams,
  Operation,
  Processor,
} from './AbstractProcessor';

export type {
  HttpClientRequestOptions,
  HttpClientRequestMethod,
  HttpClientRequest,
} from './HttpClient';

export { AbstractProcessor } from './AbstractProcessor';
export { HttpClient, OPTION_TRANSFORM_PROCESSORS } from './HttpClient';
export type { PluginHttpClientSettings } from './types';
export type { RestResourceSettings } from './rest/AbstractResource';

pluginLoader.register('@ima/plugin-http-client', () => ({
  initSettings: () => ({
    prod: {
      plugin: {
        httpClient: {
          rest: {
            baseApiUrl: null,
          },
        },
      },
    },
  }),
}));
