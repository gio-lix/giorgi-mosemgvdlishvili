import {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import s from "./LeftMenu.module.scss"
import clsx from "clsx";

interface NavigationType {
    name: string
}
interface Props extends RouteComponentProps<NavigationType> {
    match: any
    name: string
}

class Navigation extends Component<Props> {
    render() {
        return (
            <li className={clsx(s.nav, this.props.match.params?.id ===  this.props.name ? s.active : null )} >
                <Link className="linkTag" to={`/${this.props.name}`}>
                        {this.props.name}
                </Link>
            </li>
        )
    }
}
export default (withRouter(Navigation))
