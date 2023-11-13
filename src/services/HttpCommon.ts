import axios from "axios";

export class api {
    static baseUrl = 'http://localhost:8000/api/v1';

    static post(url: string, data: any): Promise<any> {
        return axios.post(`${this.baseUrl}${url}`, data)
            .then((response) => response.data).catch((error) => Promise.reject(error));
    }

    static put(url: string, data: any): Promise<any> {
        return axios.put(`${this.baseUrl}${url}`, data)
            .then((response) => response.data).catch((error) => Promise.reject(error));
    }

    static delete(url: string): Promise<any> {
        return axios.delete(`${this.baseUrl}${url}`)
            .then((response) => response.data).catch((error) => Promise.reject(error));
    }

    static get(url: string): Promise<any> {
        return axios.get(`${this.baseUrl}${url}`)
            .then((response) => response.data).catch((error) => Promise.reject(error));
    }
}