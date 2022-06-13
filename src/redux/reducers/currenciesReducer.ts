import {ActionType, CURRENCY_TYPES, CurrencyType} from "../types";
import {actionCurrencies} from "../action-creators";

const initialState = {
    loading: false,
    activeCurrency: 0,
    currencies: null as CurrencyType[] | null,
    error: ''

}


export type currenciesType = typeof initialState
type Action = ActionType<typeof actionCurrencies>


export const CurrenciesReducer = (state: currenciesType = initialState, action: Action) => {
    switch (action.type) {
        case CURRENCY_TYPES.ACTIVE_CURRENCY_FETCH_SUCCESS:
            return {
                ...state,
                activeCurrency: action.payload
            }
        case CURRENCY_TYPES.CURRENCY_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CURRENCY_TYPES.CURRENCY_FETCH_SUCCESS:
            return {
                ...state,
                currencies: action.payload,
                loading: false
            }
        case CURRENCY_TYPES.CURRENCY_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}