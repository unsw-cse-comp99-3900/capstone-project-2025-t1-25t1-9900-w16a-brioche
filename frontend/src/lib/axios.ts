/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { BACKEND_PORT, PRODUCT_BACKEND_URL } from "@/constants";

// 环境配置
const ENV =
  (import.meta.env.MODE as "development" | "test" | "production") || "development";

const API_URLS = {
  development: `http://localhost:${BACKEND_PORT}`,
  test: `http://localhost:${BACKEND_PORT}`,
  production: PRODUCT_BACKEND_URL,
};

const api = axios.create({
  baseURL: API_URLS[ENV],
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30秒超时
});

// **Mock API 拦截器**
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    console.log("[Mock API] Intercepted request:", config.url);
    
    // 直接返回 `config`，而不是 `mockResponse`
    return config;
  },
  (error: AxiosError) => {
    console.error("[Mock API] Simulated Error:", error);
    return Promise.reject(error);
  }
);

// **拦截响应，直接返回 mock 数据**
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("[Mock API] Returning mock data:", response);
    return response;
  },
  (error: AxiosError) => {
    console.error("[Mock API] Simulated Error:", error);
    return Promise.reject({
      message: "Mock API Error - Backend Not Available",
      status: 500,
    });
  }
);

export default api;
