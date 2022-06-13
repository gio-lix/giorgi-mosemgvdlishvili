import {Component} from "react";
import {AttributesType, OrderType} from "../../redux/types";
import s from "./OrderProduct.module.scss"
import {CheckValue, OrderItems, TakeOrderSelectValue, Tax, TotalPrice} from "../../utils";
import {CheckBox} from "../inputs/checkbox";
import {connect} from "react-redux";
import {actionOrder} from "../../redux/action-creators";
import {Color} from "../inputs/colorbox";
import {SelectBox} from "../inputs/selectBox";
import {IMAGES} from "../../assets";
import clsx from "clsx";
import Button from "../button";


interface OrderProps {
    orders: OrderType[]
    dispatchDeleteItem: (id: string) => void
    dispatchUpdateOrder: (item: any) => void
    dispatchUpdateOrderQty: (id: string) => void
    dispatchUpdateOrderQtyMinus: (id: string) => void

}

class OrderPage extends Component<OrderProps> {
    state = {
        activeImage: 0
    }

    moreImage = (i: number) => {
        const data: any = this.props.orders[i]
        if (data.count > 0) {
            if (data.count === data.gallery.length - 1) return
            data.count++
        } else {
            data.count = 1
        }
        this.setState({activeImage: data.count})
    }
    lessImage = (i: number) => {
        const data: any = this.props.orders[i]
        if (data.count > 0) {
            data.count--
        }
        this.setState({activeImage: data.count})
    }

    takeActiveImageId = (id: string) => {
        const data: any = this.props.orders?.find((e: OrderType) => e.id === id)
        return data
    }

    onDeleteItem = (id: string) => {
        this.props.dispatchDeleteItem(id)
    }


    onUpdateValue = (name: string, value: string, i: number) => {
        this.props.dispatchUpdateOrder({name, value, i})
    }


    render() {
        return (
            <>
                <div>
                    {this.props.orders?.map((order: any, index: number) => {
                        return (
                            <section className={s.sectionBox} key={order.id}>
                                <div className={s.sizeBox}>
                                    <h2>{order.brand}</h2>
                                    <h4>{order.name}</h4>
                                    <h5>${order.price}</h5>
                                    <span>
                                    {order.attributes?.map((attribute: AttributesType) => {
                                        if (CheckValue(attribute.items)) {
                                            let values = order.sizes?.find((e: any) => e?.name === attribute?.name)?.value.toLowerCase()
                                            return (
                                                <div key={attribute.id}>
                                                    <h3 className={s.sizeBox_title}>{attribute.name}:</h3>
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
                                                <div className={s.marginColorBox} key={attribute.id}>
                                                    <h4 className={s.sizeBox_title}>{attribute.name}:</h4>
                                                    <Color
                                                        items={attribute.items}
                                                        classNameBoxSizes={s.setColorSize}
                                                        classNameMarginColor={s.marginColor}
                                                        onClick={(value: string,) => this.onUpdateValue(attribute.name, value, index)}
                                                        activeColor={order.sizes}
                                                    />
                                                </div>
                                            )
                                        }
                                        return (
                                            <div key={attribute.id}>
                                                <h3 className={s.sizeBox_title}>{attribute.name}:</h3>
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
                                </span>
                                </div>
                                <div className={s.imageBox}>
                                    <div>
                                        <div className={s.buttonBox}>
                                            <button onClick={() => {
                                                this.props.dispatchUpdateOrderQty(order.id)
                                            }}>
                                                <img src={IMAGES.plus} alt="plus"/>
                                            </button>
                                            <span>{order.qty}</span>
                                            <button
                                                onClick={() => {
                                                    this.props.dispatchUpdateOrderQtyMinus(order.id)
                                                }}
                                                className={clsx(order.qty === 1 && s.disabled)}
                                                disabled={order.qty === 1}
                                            >
                                                <img src={IMAGES.minus} alt="minus"/>
                                            </button>
                                        </div>
                                        <div className={s.carouselImgBox}>
                                               <span>
                                               <img className={s.img}
                                                    src={
                                                        this.takeActiveImageId(order.id).id === order?.id
                                                        && order?.gallery[this.takeActiveImageId(order.id).count]
                                                        || order.gallery[0]
                                                    }
                                                    alt="img"
                                               />
                                                   {order.gallery.length > 1 && (
                                                       <span className={s.carousel}>
                                                            <button
                                                             className={clsx(this.takeActiveImageId(order.id).count === 0 && s.disabled)}
                                                             onClick={() => {
                                                                 this.lessImage(index)
                                                             }}>


                                                            <img src={IMAGES.carouselLeft} alt="left"/>
                                                            </button>
                                                            <button
                                                                className={clsx(this.takeActiveImageId(order.id).count === order.gallery.length - 1 && s.disabled)}
                                                                onClick={() => {
                                                                    this.moreImage(index)
                                                                }}>
                                                             <img src={IMAGES.carouselRight} alt="right"/>
                                                            </button>
                                                       </span>
                                                   )}
                                           </span>

                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => this.onDeleteItem(order.id)} className={s.deleteButton}>
                                    <img src={IMAGES.deleteIeItem} alt="delete"/>
                                </button>
                            </section>
                        )
                    })}
                </div>
                {this.props.orders.length > 0 ? (
                    <>
                        <div className={s.orderInfo}>
                           <span>
                               <h3>Tax 21%:   <span>${Tax(TotalPrice(this.props.orders))}</span></h3>
                               <h3>Quantity: <span>{OrderItems(this.props.orders)}</span></h3>
                           </span>
                            <span>
                            <h2>Total: <span>${TotalPrice(this.props.orders)}</span></h2>
                           </span>
                        </div>
                        <Button className={s.buttonCheckout}>
                            ORDER
                        </Button>
                    </>
                ) : null}

            </>
        )
    }
}

export default connect(null,
    {
        dispatchUpdateOrderQty: (id: string) => actionOrder.orderUpdateQtyRequest(id),
        dispatchUpdateOrderQtyMinus: (id: string) => actionOrder.orderUpdateMinusQtyRequest(id),
        dispatchUpdateOrder: (item: any) => actionOrder.fetchOrderUpdateRequest(item),
        dispatchDeleteItem: (id:string) => actionOrder.orderDeleteRequest(id)
    })(OrderPage);