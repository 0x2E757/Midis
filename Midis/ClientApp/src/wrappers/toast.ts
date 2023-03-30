import { StaticWrapper } from "pateo";

type BootstrapColor = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";

type ToastData = {
    id?: number,
    jsx: JSX.Element,
    bg?: BootstrapColor,
};

export const list = new StaticWrapper<ToastData[]>([]);

let lastId = 0;

export const add = (jsx: JSX.Element, bg?: BootstrapColor): void => {
    const id = lastId += 1;
    list.push({ id, jsx, bg: bg || "primary" });
    setTimeout(list.shift, 10_000);
}