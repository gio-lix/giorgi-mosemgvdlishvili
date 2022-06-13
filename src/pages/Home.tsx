import {Component} from "react";
import {connect} from "react-redux";
import {actionProducts} from "../redux/action-creators";
import {RootState} from "../redux/store";
import Layout from "../components/Layout";
import {ProductState} from "../redux/reducers";
import HomePage from "../components/homePage";


interface HomeProps {
    term: string
    products: ProductState
    dispatchRequest: (item: string) => void
}


class Home extends Component<HomeProps> {
    componentDidMount() {
        this.props.dispatchRequest(this.props.term)
    }

    componentDidUpdate(prevProps: HomeProps, prevState: any ): void {
        if (prevProps.term !== this.props.term) {
            this.props.dispatchRequest(this.props.term)
        }
    }
    render() {
        const {name,products,error,loading} = this.props.products
        return (
            <Layout>
                {!loading ? (
                        <HomePage
                            name={name}
                            products={products}
                        />
                ) : null}
                {error ? (
                    <div>
                        error
                    </div>
                ) : null}
            </Layout>
        )
    }
}

const mapState = (state: RootState) => ({
    products: state.products,
    categories: state.categories
})

export default connect(mapState,
    {
        dispatchRequest: (item: string) => actionProducts.fetchProductsRequest(item),
    })(Home);
