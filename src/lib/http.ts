import axios from "axios";

export const BASE_URL = "https://api.escuelajs.co/api/v1";

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { response, config } = error || {};
    const status = response?.status;
    const statusText = response?.statusText;
    const path = config?.url || "";
    const detail = response?.data ?? response?.statusText ?? String(error);
    return Promise.reject(new Error(`API ${status} ${statusText} at ${path}: ${JSON.stringify(detail)}`));
  }
);

export type HttpResponse<T> = Promise<T>;
