import {Component} from "react";
import s from "./Select.module.scss"
import clsx from "clsx";

interface SelectProps {
    item: any
    onSelectBoxValue: (item: string) => void
    className: string
    orderValue?: any
}

export class SelectBox extends Component<SelectProps> {
    render() {
        return (
                <select
                    value={this.props.orderValue}
                    onChange={(e: any) => this.props.onSelectBoxValue(e.target.value) }
                    className={clsx(s.select, this.props.className)}
                >
                    {this.props.item.map((el: any, idx: number) => (
                        <option  className={s.select} key={idx}>
                            {el.value}
                        </option>
                    ))}
                </select>
        );
    }
}

