import {Component} from "react";
import Layout from "../components/Layout";
import {RootState} from "../redux/store";
import {connect} from "react-redux";
import {actionProductsById} from "../redux/action-creators";
import {ProductIdState} from "../redux/reducers/productIdReducer";
import {ProductIdPage} from "../components/productIdPage";




interface ProductIdProps {
    id: string
    product: ProductIdState
    dispatchProductId: (id: string) => void
}

class ProductsById extends Component<ProductIdProps> {
    componentDidMount() {
        this.props.dispatchProductId(this.props.id)
    }

    render() {
        const {product, loading, error} = this.props?.product

        return (
            <Layout>
                {!loading ? (
                    <div>
                        {product && (
                            <ProductIdPage product={product} />
                        )}
                    </div>
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
    product: state.product
})
export default connect(mapState,
    {
        dispatchProductId: (id: string) => actionProductsById.fetchProductsRequest(id),
    })(ProductsById);