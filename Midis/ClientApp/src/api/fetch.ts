import { PromiseExt } from "pateo";
import w from "../wrappers";

const processResponse = async (response: Response) => {
    const result = await response.text();
    if (response.ok) {
        try {
            return JSON.parse(result);
        } catch {
            throw result || response.statusText;
        }
    } else {
        let errorResult;
        try {
            errorResult = JSON.parse(result);
        } catch {
            errorResult = result || response.statusText;
        }
        throw errorResult;
    }
}

const extendHeaders = (headers) => {
    if (w.user.bearerToken.emit())
        headers["Authorization"] = `Bearer ${w.user.bearerToken.emit()}`;
    return headers;
}

export const get = (url: string) => new PromiseExt(fetch(url, {
    method: "GET",
    headers: extendHeaders({
        "Accept": "application/json",
        "Content-Type": "application/json",
    }),
})).then(processResponse);

export const post = (url: string, data?: Object) => new PromiseExt(fetch(url, {
    method: "POST",
    headers: extendHeaders({
        "Accept": "application/json",
        "Content-Type": "application/json",
    }),
    body: JSON.stringify(data ?? {}),
})).then(processResponse);
