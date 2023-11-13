import { api } from "./HttpCommon";

export class ProfilesApiService {
    static baseUrl = '/profiles';

    static createProfile(data: any) {
        return api.post(this.baseUrl, data);
    }

    // static updateProfile(data: any) {
    //     return api.put(this.baseUrl, data);
    // }

    // static deleteProfile() {
    //     return api.delete(this.baseUrl);
    // }

    static getProfile() {
        return api.get(this.baseUrl);
    }
}