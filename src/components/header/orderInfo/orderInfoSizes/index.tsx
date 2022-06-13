import {Component} from "react";
import {RootState} from "../../../../redux/store";
import s from "./OrderInfoSizes.module.scss"
import {connect} from "react-redux";
import {OrderState} from "../../../../redux/reducers";
import {AttributesType, OrderType} from "../../../../redux/types";
import {Color} from "../../../inputs/colorbox";
import {actionOrder} from "../../../../redux/action-creators";
import {SelectBox} from "../../../inputs/selectBox";
import {CheckBox} from "../../../inputs/checkbox";
import OrderInfoGallery from "../orderinfoGallery";
import {CheckValue, TakeOrderSelectValue, TotalPrice} from "../../../../utils";


interface OrderInfo {
    orders: OrderState,
    dispatchUpdateOrder: (item: any) => void
}

class OrderInfoSizes extends Component<OrderInfo> {

    onUpdateValue = (name: string, value: any, i: number) => {
        this.props.dispatchUpdateOrder({name, value, i})
    }


    render() {
        const {orders} = this.props.orders
        return (
            <div className={s.frame} >
                <div className={s.boxInfo}>
                    <h3>My Bag,</h3>
                    {orders.length > 0 && (
                        <p>{orders.length} items</p>
                    )}
                </div>
                <div className={s.box}>
                    {orders?.map((order: OrderType, index: number) => {
                        return (
                            <div className={s.order} key={index}>
                                <div className={s.order_box}>
                                    <h3 className={s.order_box_title}>{order.name}</h3>
                                    <h4 className={s.order_box_price}>${order.price} </h4>
                                    {order?.attributes?.map((attribute:AttributesType, i: number) => {
                                        if (CheckValue(attribute.items)) {
                                            const values = order.sizes?.find((e: any) => e?.name === attribute?.name)?.value.toLowerCase()
                                            return (
                                                <div key={attribute.id}>
                                                    <h3 className={s.inputTitle}>{attribute.name}:</h3>
                                                    <CheckBox
                                                        item={attribute}
                                                        value={values}
                                                        onChange={(value: string) => this.onUpdateValue(attribute.name, values, index)}
                                                        className={s.setCheckBoxSizes}
                                                    />
                                                </div>
                                            )
                                        }
                                        if (attribute.id.toLowerCase() === "color") {
                                            return (
                                                <div className={s.order_box_color_box} key={attribute.id}>
                                                    <h4 className={s.title}>{attribute.name}:</h4>
                                                    <Color
                                                        items={attribute.items}
                                                        classNameBoxSizes={s.setColorSize}
                                                        classNameMarginColor={s.marginColor}
                                                        onClick={(value: string) => this.onUpdateValue(attribute.name, value, index)}
                                                        activeColor={order.sizes}
                                                    />
                                                </div>
                                            )
                                        }
                                        return (
                                            <div  key={attribute.id}>
                                                <h3 className={s.selectTitle}>{attribute.name}:</h3>
                                                <SelectBox
                                                    key={index}
                                                    orderValue={TakeOrderSelectValue(order).value}
                                                    item={attribute.items}
                                                    className={s.setSelectValues}
                                                    onSelectBoxValue={(value: string) => this.onUpdateValue(attribute.name, value, index)}
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                                <div>
                                    <OrderInfoGallery
                                        id={order.id}
                                        qty={order.qty}
                                        gallery={order.gallery}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={s.frame_totalPriceBox}>
                    <h3>Total</h3>
                    {orders?.length > 0 && <p>${TotalPrice(orders)}</p> }

                </div>
            </div>
        );
    }
}
const mapState = (state: RootState) => ({
    orders: state.orders
})
export default connect(mapState,
    {
        dispatchUpdateOrder: (item: any) => actionOrder.fetchOrderUpdateRequest(item)
    })(OrderInfoSizes);

