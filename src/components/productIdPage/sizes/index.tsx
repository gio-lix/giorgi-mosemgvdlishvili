import {Component} from "react";
import s from './Size.module.scss'
import DOMPurify from 'dompurify';
import {AttributesType, CurrenciesType, OrderType} from "../../../redux/types";
import {RootState} from "../../../redux/store";
import {connect} from "react-redux";
import {actionOrder} from "../../../redux/action-creators";
import {Color} from "../../inputs/colorbox";
import {CheckBox} from "../../inputs/checkbox";
import {SelectBox} from "../../inputs/selectBox";
import {CheckValue, TakeDefaultPrice, TakeDefaultSizes, TakeOrderValue} from "../../../utils";

interface OrderState {
    name: string
    value: string
}

interface SizesProps {
    id: string
    name: string
    brand: string
    inStock: boolean
    gallery: string[]
    attributes: AttributesType[]
    description: string
    prices: CurrenciesType[]
    dispatchOrder: (orders: OrderType) => void
}




class Sizes extends Component<SizesProps> {
    state = {
        takeSize: [],
        orderSize: [],
    }


    sizeValues = (name: string): string => {
        const data: any = this.state.orderSize?.find((size: OrderState) => size.name.toLowerCase() === name.toLowerCase())
        return data?.value
    }

    sectionValue = (data: OrderState[]): string => {
        let val: string = ""
        data.forEach((f: any) => {
            if (f.name.toLowerCase() !== "color" && f.value.toLowerCase() !== "yes" && f.value.toLowerCase() !== "no") {
                val = f.value
            }
        })
        return val
    }

    componentDidMount() {
        this.setState({orderSize: TakeDefaultSizes(this.props.attributes)})
    }

    onColorValue = (name: string, color: string) => {
        const data = TakeOrderValue(this.state.orderSize, name, color)
        this.setState({orderSize: data})
    }
    onSelectBoxValue = (name: string, value: string) => {
        this.setState({send: false})
        const data = TakeOrderValue(this.state.orderSize, name, value)
        this.setState({orderSize: data})
    }

    onCheckBoxValue = (name: string, size: AttributesType) => {
        const notFound = this.state.orderSize.find((el: OrderState) => el.name.toLowerCase() === name.toLowerCase())
        if (!notFound) {
            this.setState({orderSize: [...this.state.orderSize, {name, value: size.items[1].value}]})
            return
        }
        const value = this.state.orderSize.map((val: OrderState) => {
            if (val.name === size.name) {
                val.value.toLowerCase() === size.items[0].value.toLowerCase()
                    ? val.value = size.items[1].value.toLowerCase()
                    : val.value = size.items[0].value.toLowerCase()
            }
            return val
        })
        this.setState({orderSize: value})
    }
    onSendOrder = () => {
        const {prices, id,gallery,brand, attributes, name} = this.props
        const orders = {
            id,gallery,attributes,name,brand,
            price: Number(TakeDefaultPrice(prices)),
            sizes: this.state.orderSize,
            qty: 1
        }

        this.props.dispatchOrder(orders)
        this.setState({orderSize: TakeDefaultSizes(this.props.attributes)})
    }


    render() {
        const {name, inStock, description, attributes, prices, brand} = this.props
        return (
            <div className={s.info}>
                <h2 className={s.info_brand}>{brand}</h2>
                <h3 className={s.info_name}>{name}</h3>
                {attributes?.map((attribute: AttributesType, index: number) => {
                    if (CheckValue(attribute.items)) {
                        return (
                            <div key={index}>
                                <h3 className={s.info_size}>{attribute.name}:</h3>
                                <CheckBox
                                    item={attribute}
                                    onChange={(val: any) => this.onCheckBoxValue(attribute.name, val)}
                                    setSizeValues={(val: any) => this.sizeValues(val)}
                                    className={s.setCheckBoxSizes}
                                />
                            </div>
                        )
                    }
                    if (attribute.id.toLowerCase() === "color") {
                        return (
                            <span key={index}>
                                <h4 className={s.info_size}>{attribute.name}:</h4>
                                <Color
                                    items={attribute.items}
                                    classNameBoxSizes={s.setColorBoxSizes}
                                    classNameMarginColor={s.marginColor}
                                    onClick={(value: string) => this.onColorValue(attribute.name, value)}
                                    activeColor={this.state.orderSize}
                                />
                            </span>
                        )
                    }
                    return (
                        <div key={index}>
                            <h3 className={s.info_size}>{attribute.name}:</h3>
                            <SelectBox
                                key={index}
                                item={attribute.items}
                                className={s.setSelectValues}
                                onSelectBoxValue={(value: any) => this.onSelectBoxValue(attribute.name, value)}
                                orderValue={this.sectionValue(this.state.orderSize)}
                            />
                        </div>
                    )
                })}
                <div>
                    <h3 className={s.info_size}>price:</h3>
                    <p className={s.info_price}>
                        ${TakeDefaultPrice(prices)}
                    </p>
                </div>
                <button onClick={() => this.onSendOrder()} className={s.info_button}>ADD TO CART</button>
                <div className="inherit" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}}/>
            </div>
        )
    }
}

const mapState = (state: RootState) => ({
    order: state.orders
})

export default connect(mapState,
    {
        dispatchOrder: (item: OrderType) => actionOrder.fetchOrderRequest(item),
    })(Sizes);


