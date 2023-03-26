import Pateo from "pateo";

type Data = {
    id: number,
    username: string,
    roles: string[],
    token: string,
}

export const data = new Pateo.StaticWrapper<Data | null>(JSON.parse(localStorage.getItem("userData")));
data.subscribe(data => localStorage.setItem("userData", JSON.stringify(data)));

export const username = new Pateo.DynamicWrapper(data, data => data?.username);

export const bearerToken = new Pateo.DynamicWrapper(data, data => data?.token);
