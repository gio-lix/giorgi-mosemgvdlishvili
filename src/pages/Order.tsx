import {Component} from "react";
import Layout from "../components/Layout";
import {RootState} from "../redux/store";
import {connect} from "react-redux";
import {OrderState} from "../redux/reducers";
import OrderPage from "../components/orderPage";

interface OrderProps {
    orders: OrderState
}

class Order extends Component<OrderProps> {
    render() {
        const {orders} = this.props.orders
        return (
            <Layout>
                <div className="container">
                    <h1 className="orderTitle">cart</h1>
                    <OrderPage orders={orders} />
                </div>
            </Layout>
        )
    }
}
const mapState = (state: RootState) => ({
    orders: state.orders
})
export default connect(mapState, {})(Order);