import {Component, ReactNode} from "react";
import {Header} from "./head/header";


interface LayoutType {
    children: ReactNode
}

export class Layout extends Component<LayoutType> {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        )
    }
}