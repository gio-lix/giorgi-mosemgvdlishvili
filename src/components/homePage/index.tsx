import {Component} from "react";
import {AttributesType, CategoryType, CurrenciesType, OrderType, ProductType} from "../../redux/types";
import s from "./HomePage.module.scss"
import clsx from "clsx";
import {connect} from "react-redux";
import {actionOrder} from "../../redux/action-creators";
import {RootState} from "../../redux/store";
import {IMAGES} from "../../assets";
import { withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {currenciesType} from "../../redux/reducers";
import {fetchProductsById} from "../../redux/api/graphql-request";

interface ProductProps extends RouteComponentProps {
    match: any
    name: string,
    products: CategoryType[],
    currencies: currenciesType
    dispatchOrder: (order: OrderType) => void
}

class HomePage extends Component<ProductProps> {
    takeDefaultPrice = (data: CurrenciesType[]) => {
        const price: any = data?.filter((e: CurrenciesType) => e.currency.label.toUpperCase().includes("USD")).map((el: CurrenciesType) => el.amount)
        return price
    }
    takeDefaultSize = (data: AttributesType[]) => {
        return data?.map((e: AttributesType) => ({name: e?.name, value: e?.items[0].value}))
    }


    getProduct = async (id: string) => {
        const product = await fetchProductsById(id)
        const orders = {
            id: product?.id,
            gallery: product.gallery,
            attributes: product?.attributes,
            brand: product?.brand,
            name: product?.name,
            price: Number(this.takeDefaultPrice(product?.prices)),
            sizes:  this.takeDefaultSize(product?.attributes),
            qty: 1
        }
        this.props.dispatchOrder(orders)
    }
    handleClick = (id: string) => {
        this.props.history.push(`/product/${id}`)
    }

    render() {
        const {activeCurrency} = this.props.currencies
        return (
            <div className="container" >
                <h1 className={s.title}>{this.props?.name}</h1>
                <div className={s.cartBox}>
                    {this.props?.products?.map(item => {
                        return (
                            <div className={s.cart} key={item.id}>
                                <div className={clsx(s.cart_img_box, !item.inStock ? s.outStock : null)}>
                                    <img src={item.gallery[0]} className={s.imgProperty} alt="img"/>
                                        {!item.inStock ? (
                                            <p className={clsx(!item.inStock ? s.outOfStockTitle : null)}>
                                                OUT OF STOCK
                                            </p>
                                        ) : null}
                                </div>
                                <div className={s.cart_title_box}>
                                        <h4 onClick={() => {
                                            this.handleClick(item.id)
                                        }} className={s.brand} >
                                            {item.name}
                                        </h4>

                                    <h5 className={s.price}>
                                        {item.prices[activeCurrency].currency.symbol}
                                        {item.prices[activeCurrency].amount}
                                    </h5>
                                    <span onClick={() => {
                                        this.getProduct(item.id)
                                    }} className={s.shop}>
                                        <img src={IMAGES.common} alt="shop"/>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
const mapState = (state: RootState) => ({
    currencies: state.currencies,
})
export default connect(mapState,
    {
        dispatchOrder: (item: OrderType) => actionOrder.fetchOrderRequest(item),
    })(withRouter(HomePage));