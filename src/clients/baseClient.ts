// TODO: Cambiar axios por fetch
import axios from "https://deno.land/x/axiod/mod.ts";
import { IRequest, IConfig } from "https://deno.land/x/axiod/interfaces.ts";
import type { Client } from './client.ts';
import type { Callback } from '../callback.ts';
import type { Config } from '../config.ts';
import { AuthenticationService } from '../services/authenticationService/index.ts';
import type { RequestConfig } from '../requestConfig.ts';
import { buildURL } from './buildURL.ts';

const STRICT_GDPR_FLAG = 'x-atlassian-force-account-id';
const ATLASSIAN_TOKEN_CHECK_FLAG = 'X-Atlassian-Token';
const ATLASSIAN_TOKEN_CHECK_NOCHECK_VALUE = 'no-check';

export class BaseClient implements Client {
  private instance: typeof axios;

  constructor(protected readonly config: Config) {
    this.instance = axios.create({
      paramsSerializer: this.paramSerializer.bind(this),
      ...config.baseRequestConfig,
      baseURL: config.host,
      headers: this.removeUndefinedProperties({
        [STRICT_GDPR_FLAG]: config.strictGDPR,
        [ATLASSIAN_TOKEN_CHECK_FLAG]: config.noCheckAtlassianToken ? ATLASSIAN_TOKEN_CHECK_NOCHECK_VALUE : undefined,
        ...config.baseRequestConfig?.headers,
      } as IConfig),
    });
  }

  protected paramSerializer(parameters: Record<string, any>): string {
    const parts: string[] = [];

    Object.entries(parameters).forEach(([key, value]) => {
      if (value === null || typeof value === 'undefined') {
        return undefined;
      }

      if (Array.isArray(value)) {
        // eslint-disable-next-line no-param-reassign
        value = value.join(',');
      }

      if (value instanceof Date) {
        // eslint-disable-next-line no-param-reassign
        value = value.toISOString();
      } else if (value !== null && typeof value === 'object') {
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      }

      parts.push(`${this.encode(key)}=${this.encode(value)}`);

      return undefined;
    });

    return parts.join('&');
  }

  protected encode(value: string) {
    return encodeURIComponent(value)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
  }

  protected removeUndefinedProperties(obj: Record<string, any>): Record<string, any> {
    return Object.entries(obj)
      .filter(([, value]) => typeof value !== 'undefined')
      .reduce((accumulator, [key, value]) => ({ ...accumulator, [key]: value }), {});
  }

  async sendRequest<T>(requestConfig: RequestConfig, callback: never, telemetryData?: any): Promise<T>;
  async sendRequest<T>(requestConfig: RequestConfig, callback: Callback<T>, telemetryData?: any): Promise<void>;
  async sendRequest<T>(requestConfig: RequestConfig, callback: Callback<T> | never): Promise<void | T> {
    try {
      const modifiedRequestConfig = {
        ...requestConfig,
        headers: this.removeUndefinedProperties({
          Authorization: await AuthenticationService.getAuthenticationToken(this.config.authentication, {
            baseURL: this.config.host,
            url: (buildURL(requestConfig.url || "", requestConfig.params, requestConfig.paramsSerializer || (() => "")) || "").replace(/^\?/, ''),
            method: requestConfig.method!,
          }),
          ...requestConfig.headers,
        }),
      };

      const response = await this.instance.request<T>(modifiedRequestConfig as IRequest);

      const callbackResponseHandler = callback && ((data: T): void => callback(null, data));
      const defaultResponseHandler = (data: T): T => data;

      const responseHandler = callbackResponseHandler ?? defaultResponseHandler;

      this.config.middlewares?.onResponse?.(response.data);

      return responseHandler(response.data);
    } catch (e: any) {
      const callbackErrorHandler = callback && ((error: Error) => callback(error));
      const defaultErrorHandler = (error: Error) => {
        throw error;
      };

      const errorHandler = callbackErrorHandler ?? defaultErrorHandler;

      this.config.middlewares?.onError?.(e);

      return errorHandler(e);
    }
  }
}
