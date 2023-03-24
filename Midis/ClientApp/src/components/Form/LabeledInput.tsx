import React from "react";
import { Field } from "pateo";
import { FormGroup, Label, Input } from "reactstrap";

interface IProps extends React.ComponentProps<typeof Input> {
    name: string;
    field: Field;
}

export class LabeledInput extends React.PureComponent<IProps> {

    onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.props.field.change(event.target.value);
    }

    render = () => {
        const { field, name, placeholder, ...props } = this.props;
        const id = field.form.name + "_" + field.name;
        const label = placeholder ?? name;
        return (
            <FormGroup floating>
                <Input {...props} id={id} name={name} placeholder={label} onChange={this.onInputChange} />
                <Label for={id}>
                    {label}
                </Label>
            </FormGroup>
        );
    }

}