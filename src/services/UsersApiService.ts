import { SaveUserResource } from "../resources/SaveUserResource";
import { UserResource } from "../resources/UserResource";
import { api } from "./HttpCommon";

export class UsersApiService {
    static baseUrl = '/users';

    static registerUser(data: SaveUserResource): Promise<UserResource> {
        return api.post(`${this.baseUrl}/register`, data);
    }

    static loginUser(data: SaveUserResource): Promise<UserResource> {
        return api.post(`${this.baseUrl}/login`, data);
    }

    // static deleteUser(): Promise<UserResource> {
    //     return api.delete(this.baseUrl);
    // }

    static getUser(): Promise<UserResource> {
        return api.get(this.baseUrl);
    }
}