import {Component} from "react";
import clsx from "clsx";
import s from "./Checkbox.module.scss"

interface CheckBoxProps {
    onChange: (item: string) => void
    className: string
    setSizeValues?: any
    item?: any
    value?: string

}

export class CheckBox extends Component<CheckBoxProps> {

    render() {

        return (
            <div className={clsx(this.props.className, s.checkbox)} >
                <input
                    type="checkbox"
                    onChange={() => this.props.onChange(this.props.item)}
                    name="size"
                />
                <label htmlFor="size">
                   {this.props.value ? this.props.value : this.props.setSizeValues(this.props.item.name)}
                </label>
            </div>
        );
    }
}

