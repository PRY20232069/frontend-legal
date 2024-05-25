import axios from "axios";

const axiosInstance = axios.create({
  timeout: 15000,
});

const handleErrors = (error: any) => {
  switch (error.response.status) {
    case 401:
    case 403:
      localStorage.removeItem("token");
      window.location.href = "/sign-in";
      alert("Sesión expirada. Por favor, inicie sesión nuevamente.");
      break;

    default:
      Promise.reject(error);
      break;
  }
};

export class api {
  static baseUrl = process.env.REACT_APP_API_BASE_URL;

  static post(url: string, data: any): Promise<any> {
    const token = localStorage.getItem("token");
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : undefined;
    const urlWithBase = `${this.baseUrl}${url}`;
    return axios
      .post(urlWithBase, data, config)
      .then((response) => response.data)
      .catch((error) => {
        handleErrors(error);
      });
  }

  static postFile(url: string, file: any): Promise<any> {
    const token = localStorage.getItem("token");
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : undefined;

    const formData = new FormData();
    formData.append("contract_file", file);

    const urlWithBase = `${this.baseUrl}${url}`;

    return axios
      .post(urlWithBase, formData, config)
      .then((response) => response.data)
      .catch((error) => Promise.reject(error));
  }

  static put(url: string, data: any): Promise<any> {
    const token = localStorage.getItem("token");
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : undefined;
    const urlWithBase = `${this.baseUrl}${url}`;
    return axios
      .put(urlWithBase, data, config)
      .then((response) => response.data)
      .catch((error) => {
        handleErrors(error);
      });
  }

  static putFile(url: string, file: any): Promise<any> {
    const token = localStorage.getItem("token");
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : undefined;

    const formData = new FormData();
    formData.append("file", file);

    const urlWithBase = `${this.baseUrl}${url}`;

    return axios
      .put(urlWithBase, formData, config)
      .then((response) => response.data)
      .catch((error) => Promise.reject(error));
  }

  static delete(url: string): Promise<any> {
    const token = localStorage.getItem("token");
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : undefined;

    const urlWithBase = `${this.baseUrl}${url}`;

    return axios
      .delete(urlWithBase, config)
      .then((response) => response.data)
      .catch((error) => {
        handleErrors(error);
      });
  }

  static get(url: string): Promise<any> {
    const token = localStorage.getItem("token");
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : undefined;

    const urlWithBase = `${this.baseUrl}${url}`;

    return axiosInstance
      .get(urlWithBase, config)
      .then((response) => response.data)
      .catch((error) => {
        handleErrors(error);
      });
  }
}
