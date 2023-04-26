import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class Api {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
  }

  private addBearerToken(config?: AxiosRequestConfig): AxiosRequestConfig | undefined {
    const token = localStorage.getItem('token');
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

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<any> {
    try {
      const response = await this.axiosInstance.get<T>(url, this.addBearerToken(config));
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<any> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, this.addBearerToken(config));
      return response;
    } catch (error) {
      throw error;
    }
  }


}

export const api = new Api();
