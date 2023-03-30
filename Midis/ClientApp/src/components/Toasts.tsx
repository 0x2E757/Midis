import React, { useEffect, useState } from "react";
import { useWrapper } from "pateo";
import { Toast } from "bootstrap";
import w from "../wrappers";

export function Toasts() {

    const [lastId, setLastId] = useState(0);
    const [toastList] = useWrapper(w.toast.list);

    useEffect(() => {
        for (const toast of toastList)
            if (toast.id > lastId) {
                const element = document.getElementById("toast-" + toast.id);
                if (element) {
                    const toast = new Toast(element);
                    toast.show();
                }
                setLastId(toast.id);
                break;
            }
    }, [toastList, lastId]);

    return (
        <div className="toast-container position-fixed bottom-0 start-50 translate-middle-x pb-4">
            {toastList.map(toast => (
                <div
                    key={toast.id}
                    id={"toast-" + toast.id}
                    className={`toast align-items-center text-bg-${toast.bg} border-0`}
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                >
                    <div className="d-flex">
                        <div className="toast-body">
                            {toast.jsx}
                        </div>
                        <button
                            type="button"
                            className="btn-close btn-close-white me-2 m-auto"
                            data-bs-dismiss="toast"
                            aria-label="Close"
                        />
                    </div>
                </div>
            ))}
        </div>
    );

}