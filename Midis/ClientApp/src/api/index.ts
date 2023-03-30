import * as user from "./user";
import * as settings from "./settings";

const api = {
    user: { ...user.default },
    settings: { ...settings.default },
};

export default api;
