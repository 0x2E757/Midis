import React from "react";
import { Link } from "react-router-dom";

type Props = {
    items: { name: string, to?: string }[],
};

export function Breadcrumb(props: Props) {

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
                {props.items.map((item, index) => {
                    const isLast = index === props.items.length - 1;
                    return (
                        <li
                            key={item.name + item.to}
                            className={"breadcrumb-item" + (isLast ? " active" : "")}
                            aria-current={isLast ? "page" : undefined}
                        >
                            {isLast ? item.name : <Link to={item.to}>{item.name}</Link>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );

}
