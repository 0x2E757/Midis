import React from "react";
import { Field } from "pateo";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

type Props = React.ComponentProps<typeof Input> & {
    name: string,
    field: Field,
};

export default function LabeledInput({ field, placeholder, ...props }: Props) {

    const id = field.form.name + ":" + field.name;
    const label = placeholder ?? field.name;
    const showError = (field.touched || field.submitFailed) && field.errors.length > 0;

    return (
        <FormGroup floating>
            <Input id={id} placeholder={label} invalid={showError} {...props} {...field.inputProps} />
            <Label for={id}>{label}</Label>
            {showError && field.errors.map((error, index) => (
                <FormFeedback key={index}>{error}</FormFeedback>
            ))}
        </FormGroup>
    );

}
