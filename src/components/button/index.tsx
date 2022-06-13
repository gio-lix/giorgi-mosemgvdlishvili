import {Component, ReactNode} from "react";
import s from './Button.module.scss'
import clsx from "clsx";

type Props = {
    text?: string,
    disable?: boolean,
    className?: string,
    onClick?: any,
    children?: ReactNode
}

export default class Button extends Component<Props> {
    render() {
        const { text, disable, className, onClick, children } = this.props
        const value = text || children
        return (
            <button
                disabled={disable}
                className={clsx(s.button,disable ? `disable ${s.disable}` : null, className)}
                onClick={(e) => onClick(e)}
            >
                {value}
            </button>
        )
    }
}