import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000/';

class HttpRequestService {
  async get(path: string, bodyParams = {}, queryParams = {}): Promise<any> {
    const axiosConfig = {
      params: queryParams,
      data: bodyParams,
    };

    const url = `${baseUrl}${path}`;

    try {
      const objects = await axios.get(url, axiosConfig);
      return objects.data;
    } catch (err) {
      throw new Error(`API Error (GET): ${err}`);
    }
  }

  async post(path: string, bodyParams = {}): Promise<any> {
    const axiosConfig = {
      data: bodyParams,
    };

    const url = `${baseUrl}${path}`;

    try {
      const objects = await axios.post(url, axiosConfig);
      return objects.data;
    } catch (err) {
      throw new Error(`API Error (POST): ${err}`);
    }
  }

  async put(path: string, bodyParams = {}, queryParams = {}): Promise<any> {
    const axiosConfig = {
      params: queryParams,
      data: bodyParams,
    };

    const url = `${baseUrl}${path}`;

    try {
      const objects = await axios.put(url, axiosConfig);
      return objects.data;
    } catch (err) {
      throw new Error(`API Error (PUT): ${err}`);
    }
  }

  async delete(path: string, bodyParams = {}, queryParams = {}): Promise<any> {
    const axiosConfig = {
      params: queryParams,
      data: bodyParams,
    };

    const url = `${baseUrl}${path}`;

    try {
      const objects = await axios.delete(url, axiosConfig);
      return objects.data;
    } catch (err) {
      throw new Error(`API Error (DELETE): ${err}`);
    }
  }
}

export default new HttpRequestService();
