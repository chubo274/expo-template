import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ResponseModel } from "src/model/common";
import Interceptor, { ResourceType } from "./Interceptor";

export default class DefaultInterceptor extends Interceptor {
  constructor(resource: string, resourceType: ResourceType) {
    super(resource, resourceType);
  }

  /**
   * @param {InternalAxiosRequestConfig} config
   * @param {IResource} resourceType
   * @return {InternalAxiosRequestConfig}
   */
  requestFulfilled = (config: InternalAxiosRequestConfig) => {
    return config;
  };

  requestReject = async (error: any) => {
    return await Promise.reject(error);
  };

  responseFulfilled = (response: AxiosResponse) => {
    console.info("responseRaw: ", response);
    return ResponseModel.createSuccess(response);
  };

  responseReject = async (error: AxiosError<any, any>) => {
    let status = 0;
    let statusText = "";
    let message = "";
    let rawError;
    if (error?.code == "ECONNABORTED") {
      return await Promise.reject(
        ResponseModel.createError(
          408,
          "408",
          "request timeout",
          "timeout of time exceeded",
          error?.request,
          error?.config,
          error?.response,
        ),
      );
    }
    if (error?.code == "ERR_NETWORK") {
      return await Promise.reject(
        ResponseModel.createError(
          12163,
          "12163",
          "lost connect to internet",
          "lost connect to internet",
          error?.request,
          error?.config,
          error?.response,
        ),
      );
    }

    try {
      if (error.response != null) {
        status = error.response.status;
        console.info(
          "DefaultInterceptorReject",
          error.response.status,
          error.response,
        );

        const errorData = error.response.data?.error;
        const errors: any[] | undefined = error.response.data?.errors;
        // if ((errors != null) && errors.length > 0) {
        //     message = errors[0].message
        //     rawError = errors
        // } else {
        const { statusCode, message: _message, code: _code } = errorData || {};
        // server was received message, but response smt
        status = !(status >= 200 && status < 300) ? status : statusCode;
        statusText = _code;
        message = _message || error?.response?.data?.message;
        rawError = errorData ?? errors;
        // }
      } else {
        console.warn("smt went wrong: ", error);
        console.info("DefaultInterceptorReject error", error);

        // smt went wrong
        status = 500;
        message = error?.message;
      }
    } catch (error) {
      console.warn("smt went wrong: ", error);
      // smt went wrong
      status = 500;
      message = "Something went wrong";
    }

    return await Promise.reject(
      ResponseModel.createError(
        status,
        statusText,
        message,
        rawError,
        error?.request,
        error?.config,
        error?.response,
      ),
    );
  };
}
