import React from "react";
import { Field } from "pateo";
import { FormGroup, Input, FormFeedback } from "reactstrap";

type Props = React.ComponentProps<typeof Input> & {
    name: string,
    field: Field,
};

export default function ListInput({ field, placeholder, onCrossClick, ...props }: Props) {

    const id = field.form.name + ":" + field.name;
    const label = placeholder ?? field.name;
    const showError = (field.touched || field.submitFailed) && field.errors.length > 0;

    return (
        <FormGroup className="position-relative">
            <Input id={id} placeholder={label} invalid={showError} className="py-3" {...props} {...field.inputProps} />
            {onCrossClick && (
                <div className="pe-none position-absolute w-100 h-100 top-0 p-3 text-end">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="pe-auto input-cross-button" onClick={onCrossClick} viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
            )}
            {showError && field.errors.map((error, index) => (
                <FormFeedback key={index}>{error}</FormFeedback>
            ))}
        </FormGroup>
    );

}
