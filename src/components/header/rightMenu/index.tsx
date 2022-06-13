import React, {Component} from "react";
import s from "./RightMenu.module.scss"
import clsx from "clsx";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {actionCurrencies} from "../../../redux/action-creators";
import {RootState} from "../../../redux/store";
import {currenciesType, OrderState} from "../../../redux/reducers";
import {CurrencyType} from "../../../redux/types";
import {IMAGES} from "../../../assets";
import Button from "../../button";
import OrderInfoSizes from "../orderInfo/orderInfoSizes";
import {OrderItems} from "../../../utils";

interface Props extends RouteComponentProps {
    match: any
    orders: OrderState
    currencies: currenciesType
    dispatchCurrency: () => void
    dispatchActiveCurrency: (idx: number) => void
}

class RightMenu extends Component<Props> {
    orderAddress = this.props.location.pathname === "/order";
    state = {
        openShoppingCart: false,
        openCurrencyCart: false,
    }
    myCurrentRef = React.createRef<HTMLDivElement>();

    lockScroll() {
        document.body.style.overflow = 'hidden'
    }

    unlockScroll() {
        document.body.style.overflow = ''
    }

    onHandleOpenCart() {
        if (this.orderAddress) return
        this.setState({openShoppingCart: !this.state.openShoppingCart})
        this.lockScroll()

    }

    handleCloseCart() {
        this.setState({openShoppingCart: false})
        this.unlockScroll()
    }

    onHandleOpenCurrencyCart() {
        this.props.dispatchCurrency()
        this.state.openShoppingCart = false
        this.setState({openCurrencyCart: !this.state.openCurrencyCart})
    }

    componentDidMount() {
        window.addEventListener("click", this.handleClick)
    }

    redirectOrderPage = () => {
        this.props.history.push("/order")
        this.unlockScroll()
    }


    componentWillUnmount() {
        window.removeEventListener("click", this.handleClick)
    }

    handleClick = (e: any) => {
        if (!e.path.includes(this.myCurrentRef.current)) {
            this.setState({openCurrencyCart: false})
        }
        if (e.target.classList.contains("linkTag")) {
            this.handleCloseCart()
        }
    }

    onCurrencyActive = (idx: number) => {
        this.props.dispatchActiveCurrency(idx)
    }


    render() {
        const {currencies} = this.props.currencies
        return (
            <div className={s.rightBox}>
                <div ref={this.myCurrentRef} onClick={() => {
                    this.onHandleOpenCurrencyCart()
                }}>
                    <span>
                        <img src={IMAGES.dollar} alt="dollar"/>
                        <img src={IMAGES.arrow} className={clsx(s.arrowImg, this.state.openCurrencyCart ? s.active : null)}
                             alt="arrow"/>
                    </span>
                    {this.state.openCurrencyCart ? (
                        <div className={s.openCurrency}>
                            {currencies?.map((currency: CurrencyType, index: number) => {
                                return (
                                    <div onClick={() => this.onCurrencyActive(index)} key={index}>
                                        <span>
                                            <p>{currency.symbol}</p>
                                            <p>{currency.label}</p>
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    ) : null}
                </div>
                <div>
                    <span
                        className={clsx(s.shopIcon, this.orderAddress && s.cursorNone)}
                        onClick={() => {this.onHandleOpenCart()}}
                    >
                        <img src={IMAGES.shop} alt="shop"/>
                        {OrderItems(this.props.orders.orders) > 0 ? (
                            <span className={clsx(this.orderAddress && s.cursorNone)}>
                                <p>{OrderItems(this.props.orders.orders)}</p>
                            </span>
                        ) : null}

                    </span>
                    {this.state.openShoppingCart ? (
                        <div>
                            <div className={clsx(this.state.openShoppingCart ? s.activeHover : null)}
                                 onClick={() => {
                                     this.handleCloseCart()
                                 }}
                            ></div>
                            <div className={s.openCart}>
                                <OrderInfoSizes/>
                                <div>
                                    <Button
                                        className={s.buttonBag}
                                        onClick={() => {
                                            this.redirectOrderPage()
                                        }}>
                                        VIEW BAG
                                    </Button>
                                    <Button className={s.buttonCheckout}>
                                        CHECK OUT
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        )
    }
}

const mapState = (state: RootState) => ({
    currencies: state.currencies,
    orders: state.orders
})
export default connect(mapState,
    {
        dispatchCurrency: () => actionCurrencies.fetchCurrencyRequest(),
        dispatchActiveCurrency: (idx: number) => actionCurrencies.fetchActiveCurrencyRequest(idx)
    })(withRouter(RightMenu));
