import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { DeviceEventEmitter } from "react-native";
import { ResponseModel } from "src/model/common";
import Interceptor, { ResourceType } from "./Interceptor";

type RetryCallback = () => void;
let retrySubscribers: RetryCallback[] = [];

export class RetryTimeOutInterceptor extends Interceptor {
  axiosInstance: AxiosInstance;
  // _userRepository: typeof UserRepository

  constructor(
    axiosInstance: AxiosInstance,
    resource: string,
    resourceType: ResourceType,
  ) {
    super(resource, resourceType);
    this.axiosInstance = axiosInstance;
    // this._userRepository = UserRepository
  }

  requestFulfilled = (config: AxiosRequestConfig) => {
    return config;
  };

  requestReject = async (error: any) => {
    return await Promise.reject(error);
  };

  responseFulfilled = (response: AxiosResponse) => {
    return response;
  };

  responseReject = async (error: ResponseModel<any>) => {
    if (error?.status == 408 || error?.status == 12163) {
      const originalRequest = error?.config ?? {};
      // emitShowAppPopUpMain(true)
      DeviceEventEmitter.addListener("TryAgain", () => {
        new Promise((resolve) => resolve(onRetry())).finally(() => {
          // emitShowAppPopUpMain(false)
        });
      });

      const retryOrigReq = new Promise((resolve, reject) => {
        const handler = async () => {
          resolve(this.axiosInstance.request(originalRequest));
        };
        subscribeRetry(handler);
      });
      return await retryOrigReq;
    }
    return await Promise.reject(error);
  };
}

const subscribeRetry = (cb: RetryCallback) => {
  retrySubscribers.push(cb);
};

const onRetry = () => {
  retrySubscribers.map((cb) => cb());
  retrySubscribers = [];
};
