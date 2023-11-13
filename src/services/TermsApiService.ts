import { api } from "./HttpCommon";

export class TermsApiService {
    static baseUrl = (contractId: number) => `/contracts/${contractId}/terms`;

    static registerTerm(contractId: number, data: any) {
        return api.post(this.baseUrl(contractId), data);
    }

    static generateTermInterpretation(contractId: number, termId: number) {
        return api.put(`${this.baseUrl(contractId)}/${termId}`, null);
    }

    static getAllTermsByContractId(contractId: number) {
        return api.get(this.baseUrl(contractId));
    }
}