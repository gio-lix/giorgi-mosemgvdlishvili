import {Component} from "react";
import {connect} from "react-redux";
import {actionProducts} from "../redux/action-creators";
import {RootState} from "../redux/store";
import {DataType} from "../redux/types";
import {Layout} from "../components/Layout";

interface HomeType {
    term: string
    products: DataType,
    dispatchRequest: (item: string) => void
}


class Home extends Component<HomeType> {
    render() {
        return (
            <Layout>
                <button onClick={() => {
                    console.log(this.props.dispatchRequest("all"))
                }}>
                    fetch data
                </button>
                <h1>Hello there</h1>
            </Layout>
        )
    }
}

const mapState = (state: RootState) => ({products: state.products})

export default connect(mapState,
    {
        dispatchRequest: (item: string) => actionProducts.fetchProductsRequest(item)
    })(Home);
