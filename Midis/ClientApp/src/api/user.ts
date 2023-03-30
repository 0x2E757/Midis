import { post } from "./fetch";

const baseUrl = "api/users/";

const api = {

    register: (data) => {
        return post(baseUrl + "register/", data);
    },

    login: (data) => {
        return post(baseUrl + "authenticate/", data);
    },

};

export default api;