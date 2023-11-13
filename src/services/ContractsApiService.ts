import { api } from "./HttpCommon";

export class ContractsApiService {
    static baseUrl = '/contracts';

    static uploadContract(data: any) {
        return api.post(this.baseUrl, data);
    }

    // static updateContract(contractId: number, data: any) {
    //     return api.put(`${this.baseUrl}/${contractId}`, data);
    // }

    // static deleteContract(contractId: number) {
    //     return api.delete(`${this.baseUrl}/${contractId}`);
    // }

    static getAllContracts() {
        return api.get(this.baseUrl);
    }

    static getAllContractsByName(name: string) {
        return api.get(`${this.baseUrl}/search/${name}`);
    }

    static getContractById(contractId: number) {
        return api.get(`${this.baseUrl}/${contractId}`);
    }
}