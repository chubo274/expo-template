import { useCallback, useState } from "react";
import { ResponseModel } from "src/model/common";
import { getDataExampleRepo } from "../repositories/example";

// =====
export const useGetEventGroupByMonth = () => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFirstTime = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await handlerFirst.takeLatest(getDataExampleRepo());

      setData(response?.data);
    } catch (error: any) {
      if (!error?.canceled) {
        setError(error?.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    fetchFirstTime,
    data,
    isLoading,
    error,
  };
};

interface IPromiseCancel<T> {
  promise: Promise<T>;
  canceled: (reason?: any) => void;
}

const promiseCancelable = <T>(promise: Promise<T>) => {
  let rejectRoot: (reason?: any) => void = () => null;

  const promiseResult: Promise<T> = new Promise((resolve, reject) => {
    rejectRoot = reject;
    promise
      .then((res) => resolve(res))
      .catch((error) => {
        reject(error);
      });
  });

  return {
    promise: promiseResult,
    canceled: rejectRoot,
  };
};

class PromiseHandler {
  excutor: null | IPromiseCancel<ResponseModel<any>>;
  constructor() {
    this.excutor = null;
  }

  takeLatest(promise: Promise<any>) {
    !!this?.excutor && this.excutor.canceled();
    this.excutor = promiseCancelable(promise);

    return this.excutor.promise;
  }
}

// =====
const handlerFirst = new PromiseHandler();
