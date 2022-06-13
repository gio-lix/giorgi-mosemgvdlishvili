import {Component, ReactNode} from "react";
import s from "./Layout.module.scss"
import {connect} from "react-redux";
import {RootState} from "../redux/store";
import RightMenu from "./header/rightMenu";
import {CategoryType} from "../redux/reducers";
import Navigation from "./header/navigation";
import {actionsCategories} from "../redux/action-creators";
import {IMAGES} from "../assets";

interface LayoutType {
    children: ReactNode
    categories: CategoryType,
    dispatchCategory: () => void

}

class Layout extends Component<LayoutType> {
    componentDidMount() {
        this.props.dispatchCategory()
    }

    render() {
        return (
            <>
                <header className={s.header}>
                    <nav>
                        <ul>
                            {this.props.categories?.categories?.map((element, index) =>
                                <Navigation  {...element} key={index} />
                            )}
                        </ul>
                    </nav>
                    <span>
                        <img src={IMAGES.logo} alt="logo"/>
                    </span>
                    <RightMenu />
                </header>
                {this.props.children}
            </>
        )
    }
}
const mapState = (state: RootState) => ({
    categories: state.categories
})
export default connect(mapState, {
    dispatchCategory: () => actionsCategories.fetchCategoriesRequest()
})(Layout);

