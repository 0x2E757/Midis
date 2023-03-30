import { StaticWrapper, DynamicWrapper } from "pateo";

type Data = {
    id: number,
    username: string,
    roles: string[],
    token: string,
}

export const data = new StaticWrapper<Data | null>(JSON.parse(localStorage.getItem("userData")));
data.subscribe(data => localStorage.setItem("userData", JSON.stringify(data)));

export const username = new DynamicWrapper(data, data => data?.username ?? "");
export const roles = new DynamicWrapper(data, data => data?.roles ?? []);
export const bearerToken = new DynamicWrapper(data, data => data?.token ?? "");
