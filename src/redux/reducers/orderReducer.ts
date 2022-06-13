import {ActionType, AttributesType, ItemType, ORDER_PRODUCTS, OrderType, SizesProps} from "../types";
import {actionOrder} from "../action-creators";
import order from "../../pages/Order";


const initialState = {
    loading: false,
    orders: [] as OrderType[] | [],
}

export type OrderState = typeof initialState
type Action = ActionType<typeof actionOrder>

export const OrderReducer = (state: OrderState = initialState, action: Action) => {
    switch (action.type) {
        case ORDER_PRODUCTS.ORDER_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_PRODUCTS.ORDER_PRODUCT_SUCCESS:
            const found = state.orders.filter(e => e.id === action.payload.id)
            if (found.length > 0) {
                const AddOrderQty = state.orders?.map(order => {
                    if (order.id === action.payload.id) {
                        order.qty++
                    }
                    return order
                })
                return {orders: AddOrderQty}
            }
            return {
                ...state,
                orders: [ action.payload, ...state.orders],
                loading: false
            }
        case ORDER_PRODUCTS.ORDER_PRODUCT_UPDATE_SUCCESS:
            const {name, value, i} = action.payload
            console.log("--payload--",name,value,i)
            const update = state.orders?.map((el, index) => {
                if (index === i) {
                    el.sizes?.map(e => {
                        if (e?.value.toLowerCase() === "yes" || e?.value.toLowerCase() === "no") {
                            if (e.name === name) {
                                return  e.value.toLowerCase() === "yes" ? e.value = "no" : e.value = "yes"
                            }
                        } else if  (e.name.toLowerCase() === name.toLowerCase()) {
                            return  e.value = value
                        }
                        return e
                    })
                }
                return el
            })
            console.log("update" ,update[0].sizes)
            return {...state, orders: update}
        case ORDER_PRODUCTS.ORDER_UPDATE_QTY_SUCCESS:
            const addOrderQty = state.orders?.map(order => {
                if (order.id === action.payload) {
                    order.qty++
                }
                return order
            })
            return {orders: addOrderQty}

        case ORDER_PRODUCTS.ORDER_UPDATE_MINUS_QTY_SUCCESS:
            const minusOrderQty = state.orders?.map(order => {
                if (order.id === action.payload) {
                    order.qty--
                }
                return order
            })
            return {orders: minusOrderQty}
        case ORDER_PRODUCTS.ORDER_DELETE_SUCCESS:
            const filterOrders = state.orders.filter(e => e.id !== action.payload)
            return {
                orders: filterOrders
            }
        case ORDER_PRODUCTS.ORDER_PRODUCT_ERROR:

        default:
            return state
    }
}