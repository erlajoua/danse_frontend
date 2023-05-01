import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class Api {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
  }

  private addBearerToken(token: string | null, config?: AxiosRequestConfig): AxiosRequestConfig | undefined {
    if (token) {
      return {
        ...config,
        headers: {
          ...config?.headers,
          'Authorization': `Bearer ${token}`,
        },
      };
    }
    return config;
  }

  public async get<T>(url: string, token: string | null, config?: AxiosRequestConfig): Promise<any> {
    try {
      const response = await this.axiosInstance.get<T>(url, this.addBearerToken(token, config));
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async post<T>(url: string, token: string | null, data?: any, config?: AxiosRequestConfig): Promise<any> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, this.addBearerToken(token, config));
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async put<T>(url: string, token: string | null, data?: any, config?: AxiosRequestConfig): Promise<any> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, this.addBearerToken(token, config));
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export const api = new Api();
