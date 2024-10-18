import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import qs from "qs";
import Interceptor, { ResourceType } from "./Interceptor";

export default class AuthenticationInterceptor extends Interceptor {
  // _userRepository: typeof UserRepository

  constructor(resource: string, resourceType: ResourceType) {
    super(resource, resourceType);

    // this._userRepository = UserRepository
  }

  getTokenFromType = (type: ResourceType): string => {
    // const userData = this._userRepository.getTokenUser()
    switch (type) {
      case ResourceType.Auth:
        return "";
      case ResourceType.Public:
      default:
        return "";
    }
  };

  /**
   * @param {InternalAxiosRequestConfig} config
   * @param {IResource} resourceType
   * @return {InternalAxiosRequestConfig}
   */
  requestFulfilled = (config: InternalAxiosRequestConfig) => {
    const token = this.getTokenFromType(this.resourceType);

    if (config.headers == null) {
      // @ts-ignore
      config.headers = {};
    }

    const contentType = config.headers["Content-Type"];
    if (contentType === "application/x-www-form-urlencoded") {
      config.data = qs.stringify(config.data);
    }

    if (!!token) {
      config.headers.Authorization = token;
    }

    if (this.resourceType) {
      // Add default token of axios for unit test
      // config.headers.Authorization = axios.defaults.headers['Authorization'];
    }
    return config;
  };

  requestReject = async (error: any) => {
    return await Promise.reject(error);
  };

  responseFulfilled = (response: AxiosResponse) => response;

  responseReject = async (error: AxiosError) => await Promise.reject(error);
}
