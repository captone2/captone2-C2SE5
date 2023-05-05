import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import StorageUtils from "../utils/storage";
import HttpStatusCode from "./HttpStatusCode";
import { ApiHandler } from "../utils/api";
import { trackPromise } from "react-promise-tracker";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axiosClient.interceptors.request.use((config: any) => {
  const token = StorageUtils.get("crf_tk");
  if (token) {
    config.headers = {
      authorization: `Bearer ${token}`,
    };
  }
  return config;
});

axiosClient.interceptors.response.use(
  async (response) => {
    const accessToken = response.data?.data?.accessToken;
    if (accessToken) {
      StorageUtils.set("crf_tk", accessToken);
    }

    return response.data;
  },
  async (error: AxiosError) => {
    if (process.env.NODE_ENV === "development") {
      await sleep(1000);
    }
    if (error.response) {
      const { status } = error.response;
      if (status === HttpStatusCode.UNAUTHORIZED) {
        StorageUtils.remove("crf_tk");
        return;
      }
      if (status === HttpStatusCode.NOT_FOUND) {
        return;
      }
      if (status === HttpStatusCode.FORBIDDEN) {
        return;
      }
      if (status === HttpStatusCode.SERVICE_UNAVAILABLE) {
        return;
      }
      if (status === HttpStatusCode.INTERNAL_SERVER_ERROR) {
        return;
      }
      return Promise.reject(error);
    } else {
      return;
    }
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

class RequestService {
  get<T>(url: string, config?: AxiosRequestConfig) {
    if (ApiHandler.isApiWithoutLoading(url)) {
      return axiosClient.get<T>(url, config).then(responseBody);
    }
    return trackPromise(axiosClient.get<T>(url, config).then(responseBody));
  }
  post<T>(url: string, body: {}, config?: AxiosRequestConfig) {
    if (ApiHandler.isApiWithoutLoading(url)) {
      return axiosClient.post<T>(url, body, config).then(responseBody);
    }

    return trackPromise(
      axiosClient.post<T>(url, body, config).then(responseBody)
    );
  }

  put<T>(url: string, body: {}, config?: AxiosRequestConfig) {
    if (ApiHandler.isApiWithoutLoading(url)) {
      return axiosClient.put<T>(url, body, config).then(responseBody);
    }
    return trackPromise(
      axiosClient.put<T>(url, body, config).then(responseBody)
    );
  }

  del<T>(url: string, config?: AxiosRequestConfig) {
    if (ApiHandler.isApiWithoutLoading(url)) {
      return axiosClient.delete<T>(url, config).then(responseBody);
    }
    return trackPromise(axiosClient.delete<T>(url, config).then(responseBody));
  }
}

export default new RequestService();
