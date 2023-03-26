import { post } from "./fetch";

const baseUrl = "api/users/";

export const register = (data) => {
    return post(baseUrl + "register/", data);
}

export const login = (data) => {
    return post(baseUrl + "authenticate/", data);
}
