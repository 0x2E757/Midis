import { get, post } from "./fetch";

const baseUrl = "api/settings/";

const api = {

    get: () => {
        return get(baseUrl);
    },

    post: (data) => {
        return post(baseUrl, data);
    },

};

export default api;