import {call, put, takeLatest} from "redux-saga/effects";
import {CurrenciesType, CURRENCY_TYPES, ErrorType} from "../types";
import {fetchCurrencies} from "../api/graphql-request";
import {actionCurrencies} from "../action-creators";



function* getCurrencies(){
    try {
        const data: CurrenciesType = yield call(fetchCurrencies)
        yield put(actionCurrencies.fetchCurrencySuccess(data))
    } catch (err) {
        yield put(actionCurrencies.fetchCurrencyError((err as ErrorType).response?.errors[0].message))
    }
}

export function* watchCurrenciesSaga(){
    yield takeLatest(CURRENCY_TYPES.CURRENCY_FETCH_REQUEST,getCurrencies)
}