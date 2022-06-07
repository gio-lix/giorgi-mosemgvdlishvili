import {ActionType, DataType, PRODUCT_TYPES} from "../types";
import {actionProducts} from "../action-creators";

const initialState = {
    loading: false,
    category: null as DataType | null,
    error: ''
}

type StateType = typeof initialState
export type Action = ActionType<typeof actionProducts>

export const ProductsReducers = (state: StateType = initialState, action: Action) => {
    switch (action.type) {
        case PRODUCT_TYPES.PRODUCT_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_TYPES.PRODUCT_FETCH_SUCCESS:
            return {
                ...state,
                category: action.payload.category,
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