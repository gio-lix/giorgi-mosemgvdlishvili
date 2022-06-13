import {ActionType, PRODUCT_TYPES, ProductType} from "../types";
import {actionProducts} from "../action-creators";



const initialState = {
    loading: false,
    products: [] as ProductType[] ,
    name: "",
    error: ''
}

export type ProductState = typeof initialState
export type Action = ActionType<typeof actionProducts>

export const productsReducers = (state: ProductState = initialState, action: Action) => {
    switch (action.type) {
        case PRODUCT_TYPES.PRODUCT_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_TYPES.PRODUCT_FETCH_SUCCESS:
            return {
                ...state,
                products: action.payload.products,
                name: action.payload.name,
                loading: false
            }
        case PRODUCT_TYPES.PRODUCT_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}