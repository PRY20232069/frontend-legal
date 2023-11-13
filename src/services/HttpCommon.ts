import axios from "axios";

export class api {
    static baseUrl = 'http://localhost:8000/api/v1';

    static post(url: string, data: any): Promise<any> {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
        return axios.post(`${this.baseUrl}${url}`, data, config)
            .then((response) => response.data).catch((error) => Promise.reject(error));
    }

    static put(url: string, data: any): Promise<any> {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
        return axios.put(`${this.baseUrl}${url}`, data, config)
            .then((response) => response.data).catch((error) => Promise.reject(error));
    }

    static delete(url: string): Promise<any> {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
        return axios.delete(`${this.baseUrl}${url}`, config)
            .then((response) => response.data).catch((error) => Promise.reject(error));
    }

    static get(url: string): Promise<any> {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
        return axios.get(`${this.baseUrl}${url}`, config)
            .then((response) => response.data).catch((error) => Promise.reject(error));
    }
}