import { api } from "./HttpCommon";

export class BanksApiService {
    static baseUrl = '/banks';

    static registerBank(data: any) {
        return api.post(this.baseUrl, data);
    }

    static getAllBanks() {
        return api.get(this.baseUrl);
    }
}