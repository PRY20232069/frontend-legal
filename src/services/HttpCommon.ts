import axios from "axios";

export class api {
    static baseUrl = process.env.REACT_APP_API_BASE_URL;

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

    static putFile(url: string, file: any): Promise<any> {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
        
        const formData = new FormData();
        formData.append('file', file);

        return axios.put(`${this.baseUrl}${url}`, formData, config)
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