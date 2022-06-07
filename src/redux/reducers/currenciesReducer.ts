import { ActionType, CurrenciesType, CURRENCY_TYPES} from "../types";
import {actionCurrencies} from "../action-creators";

const initialState = {
    loading: false,
    currencies: null as CurrenciesType | null,
    error: ''
}

type StateType = typeof initialState
type Action = ActionType<typeof actionCurrencies>


export const CurrenciesReducer = (state: StateType = initialState, action: Action) => {
    switch (action.type) {
        case CURRENCY_TYPES.CURRENCY_FETCH_REQUEST:
            return {...state, loading: true}
        case CURRENCY_TYPES.CURRENCY_FETCH_SUCCESS:
            return {
                ...state,
                currencies: action.payload.currencies,
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