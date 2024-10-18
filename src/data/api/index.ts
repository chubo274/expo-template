import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { parseFormData } from "src/helper/functions";
import { LANGUAGES } from "src/localization";
import AuthenticationInterceptor from "./interceptor/AuthenticationInterceptor";
import DefaultInterceptor from "./interceptor/DefaultAppInterceptor";
import { ResourceType } from "./interceptor/Interceptor";
import { RetryInterceptor } from "./interceptor/RetryInterceptor";
import { RetryTimeOutInterceptor } from "./interceptor/RetryTimeOutInterceptor";
import { baseUrl } from "./resourse";

export type HTTPMethod =
  | "POST"
  | "GET"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "POSTFORM";

interface IConstructor {
  method: HTTPMethod;
  resource: string;
  resourceType: ResourceType;
  isFormDataType?: boolean;
  body?: any;
  params?: any;
  onSendProgress?: (progress: number, total: number) => void;
  onReceivedProgress?: (progress: number, total: number) => void;
  acceptLanguage?: LANGUAGES;
  childId?: number;
  queryParams?: any;
}
class ApiGateway {
  resource: string;
  method: HTTPMethod;
  isFormDataType?: boolean;
  resourceType: ResourceType;
  body?: any;
  params?: any;
  queryParams?: any;
  _instanceAxios = axios.create();
  configTimeout = 60 * 1000;
  requestConfig!: AxiosRequestConfig;
  acceptLanguage?: LANGUAGES;
  childId?: number;

  onSendProgress?: (progress: number, total: number) => void;
  onReceivedProgress?: (progress: number, total: number) => void;

  constructor(data: IConstructor) {
    const {
      isFormDataType,
      resource,
      resourceType,
      method,
      body,
      params,
      queryParams,
      onReceivedProgress,
      onSendProgress,
      acceptLanguage,
      childId,
    } = data;
    this.resourceType = resourceType;
    this.resource = resource;
    this.method = method;
    this.body = body;
    this.params = params;
    this.onSendProgress = onSendProgress;
    this.onReceivedProgress = onReceivedProgress;
    this.isFormDataType = isFormDataType;
    this.acceptLanguage = acceptLanguage;
    this.childId = childId;
    const queryString = qs.stringify(queryParams, { skipNulls: true });
    this.queryParams = queryString ? `?${queryString}` : "";

    this._config();
  }

  private readonly _config = () => {
    const configHeader = {
      Accept: "application/json",
      "Content-Type": this.isFormDataType
        ? "multipart/form-data"
        : "application/json", // Content-Type = 'application/json' == null
    };
    // @ts-ignore
    if (this.acceptLanguage)
      configHeader["Accept-Language"] = this.acceptLanguage;
    // @ts-ignore
    if (this.childId) configHeader["Child-Id"] = this.childId;
    this.requestConfig = {
      baseURL: baseUrl.value,
      timeout: this.configTimeout,
      headers: configHeader,
      url: this.resource + this.queryParams,
      method: this.method,
      params: this.params,
      paramsSerializer: {
        encode: (params: any) =>
          qs.stringify(params, {
            skipNulls: true,
            arrayFormat: "brackets",
          }),
      },
      data: this.isFormDataType ? parseFormData(this.body) : this.body,
    };
    if (this.onSendProgress != null) {
      this.requestConfig.onUploadProgress = ({ loaded, total }) =>
        this.onSendProgress!(loaded, total ?? 0);
    }
    if (this.onReceivedProgress != null) {
      this.requestConfig.onDownloadProgress = ({ loaded, total }) =>
        this.onReceivedProgress!(loaded, total ?? 0);
    }
    this._addDefaultInterceptors();
    this._addInterceptors();
  };

  private readonly _addDefaultInterceptors = () => {
    const authenticationInterceptor = new AuthenticationInterceptor(
      this.resource,
      this.resourceType,
    );
    this._instanceAxios.interceptors.request.use(
      authenticationInterceptor.requestFulfilled,
    );

    const defaultInterceptor = new DefaultInterceptor(
      this.resource,
      this.resourceType,
    );
    this._instanceAxios.interceptors.request.use(
      defaultInterceptor.requestFulfilled,
      defaultInterceptor.requestReject,
    );
    this._instanceAxios.interceptors.response.use(
      defaultInterceptor.responseFulfilled,
      defaultInterceptor.responseReject,
    );

    const retryInterceptor = new RetryInterceptor(
      this._instanceAxios,
      this.resource,
      this.resourceType,
    );
    this._instanceAxios.interceptors.response.use(
      retryInterceptor.responseFulfilled,
      retryInterceptor.responseReject,
    );

    const retryTimeOutInterceptor = new RetryTimeOutInterceptor(
      this._instanceAxios,
      this.resource,
      this.resourceType,
    );
    this._instanceAxios.interceptors.response.use(
      retryTimeOutInterceptor.responseFulfilled,
      retryTimeOutInterceptor.responseReject,
    );
  };

  private readonly _addInterceptors = () => {
    // some expand interceptors default can be add here!
  };

  execute = async (): Promise<any> =>
    await this._instanceAxios.request(this.requestConfig);
}

export default ApiGateway;
