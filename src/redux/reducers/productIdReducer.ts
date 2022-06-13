import {ActionType, PRODUCT_ID_TYPES, ProductType} from "../types";
import {actionProductsById} from "../action-creators";


const initialState = {
    loading: false,
    product:  null as ProductType | null,
    error: ''
}

export type ProductIdState = typeof initialState
export type Action = ActionType<typeof actionProductsById>


export const ProductIdReducer = (state: ProductIdState = initialState, action: Action) => {
    switch (action.type) {
        case PRODUCT_ID_TYPES.PRODUCT_ID_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_ID_TYPES.PRODUCT_ID_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        case PRODUCT_ID_TYPES.PRODUCT_ID_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}