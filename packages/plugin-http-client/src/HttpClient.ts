import type {
  Dependencies,
  HttpAgent,
  HttpAgentRequestOptions,
  UnknownParameters,
} from '@ima/core';

declare module '@ima/core' {
  interface OCAliasMap {
    HttpClientDefaultProcessors: Processor[];
  }
}

import {
  AbstractProcessor,
  Processor,
  Operation,
  ProcessorParams,
} from './AbstractProcessor';

export const OPTION_TRANSFORM_PROCESSORS = 'transformProcessors';

export type HttpClientRequestOptions = {
  [OPTION_TRANSFORM_PROCESSORS]?: (processor: Processor[]) => Processor[];
} & HttpAgentRequestOptions;

export type HttpClientRequestMethod =
  | 'get'
  | 'put'
  | 'post'
  | 'patch'
  | 'delete';

export type HttpClientRequest = {
  method: HttpClientRequestMethod;
  url: string;
  data?: UnknownParameters;
  options?: HttpClientRequestOptions;
};

export class HttpClient {
  #http: HttpAgent;
  #defaultProcessors: Processor[];

  static get $dependencies(): Dependencies {
    return ['$Http', '...?HttpClientDefaultProcessors'];
  }

  constructor(http: HttpAgent, ...defaultProcessors: Processor[]) {
    this.#http = http;

    this.#defaultProcessors = defaultProcessors.filter(
      item => item instanceof AbstractProcessor
    );
  }

  registerProcessor(processor: Processor) {
    this.#defaultProcessors.push(processor);
  }

  async request<B = any>(
    request: HttpClientRequest,
    additionalParams?: object
  ) {
    const processors = this.#getProcessors(request);

    const processorResult = await this.#runProcessors<B>(
      processors,
      Operation.PRE_REQUEST,
      {
        additionalParams,
        request,
        response: null,
      }
    );
    const { request: processedRequest } = processorResult;
    let { response: processedResponse } = processorResult;

    if (!processedResponse) {
      processedResponse = await this.#http[processedRequest.method](
        processedRequest.url,
        processedRequest.data,
        processedRequest.options
      );
    }

    return await this.#runProcessors<B>(processors, Operation.POST_REQUEST, {
      additionalParams,
      request: processedRequest,
      response: processedResponse,
    });
  }

  async #runProcessors<B>(
    processors: Processor[],
    operation: Operation,
    processorParams: ProcessorParams<B>
  ) {
    for (const processor of processors) {
      const processorResult = await processor[operation](processorParams);
      processorParams = { ...processorParams, ...processorResult };
    }

    return processorParams;
  }

  defaultTransformProcessors(processors: Processor[]): Processor[] {
    return processors;
  }

  #getProcessors(request: HttpClientRequest): Processor[] {
    const defaultProcessors = this.#defaultProcessors;

    let transformProcessors = this.defaultTransformProcessors;
    if (
      request?.options?.[OPTION_TRANSFORM_PROCESSORS] &&
      typeof request.options[OPTION_TRANSFORM_PROCESSORS] === 'function'
    ) {
      transformProcessors = request.options[OPTION_TRANSFORM_PROCESSORS];
    }

    return transformProcessors(defaultProcessors);
  }
}
