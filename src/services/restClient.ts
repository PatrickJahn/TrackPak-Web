import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";

export type ApiResponse<T> = Promise<AxiosResponse<T>>;

export type RestClient = {
  get: <T>(path: string, params?: Record<string, unknown>) => ApiResponse<T>;
  post: <T>(path: string, data?: Record<string, unknown>) => ApiResponse<T>;
  put: <T>(path: string, data?: Record<string, unknown>) => ApiResponse<T>;
  delete: <T>(path: string) => ApiResponse<T>;
};

const createRestClient = (baseURL: string): RestClient => {
  const apiClient: AxiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  //  Request interceptor to attach authentication tokens
  apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token"); // Adjust if using Cookies
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for error handling
  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    }
  );

  return {
    get: <T>(path: string, params?: Record<string, unknown>): ApiResponse<T> =>
      apiClient.get<T>(path, { params }),

    post: <T>(path: string, data?: Record<string, unknown>): ApiResponse<T> =>
      apiClient.post<T>(path, data),

    put: <T>(path: string, data?: Record<string, unknown>): ApiResponse<T> =>
      apiClient.put<T>(path, data),

    delete: <T>(path: string): ApiResponse<T> => apiClient.delete<T>(path),
  };
};

export default createRestClient;
