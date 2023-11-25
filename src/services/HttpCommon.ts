import axios from "axios";

export class api {
    static baseUrl = process.env.REACT_APP_API_BASE_URL;

    static post(url: string, data: any): Promise<any> {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
        const urlWithBase = `${this.baseUrl}${url}`;
        return axios.post(urlWithBase, data, config)
            .then((response) => response.data).catch((error) => Promise.reject(error));
    }

    static put(url: string, data: any): Promise<any> {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
        const urlWithBase = `${this.baseUrl}${url}`;
        return axios.put(urlWithBase, data, config)
            .then((response) => response.data).catch((error) => Promise.reject(error));
    }

    static putFile(url: string, file: any): Promise<any> {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
        
        const formData = new FormData();
        formData.append('file', file);
        
        const urlWithBase = `${this.baseUrl}${url}`;

        return axios.put(urlWithBase, formData, config)
            .then((response) => response.data).catch((error) => Promise.reject(error));
    }

    static delete(url: string): Promise<any> {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
        
        const urlWithBase = `${this.baseUrl}${url}`;

        return axios.delete(urlWithBase, config)
            .then((response) => response.data).catch((error) => Promise.reject(error));
    }

    static get(url: string): Promise<any> {
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : undefined;
        
        const urlWithBase = `${this.baseUrl}${url}`;

        return axios.get(urlWithBase, config)
            .then((response) => response.data).catch((error) => Promise.reject(error));
    }
}