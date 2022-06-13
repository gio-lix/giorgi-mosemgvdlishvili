import {call, put, takeLatest} from "redux-saga/effects";
import {CurrenciesType, CURRENCY_TYPES, CurrencyType, ErrorType, Payload} from "../types";
import {fetchCurrencies} from "../api/graphql-request";
import {actionCurrencies} from "../action-creators";

function* getActiveCurrency({payload}: Payload<string>) {
    yield put(actionCurrencies.fetchActiveCurrencySuccess(payload))
}

function* getCurrencies(){
    try {
        const data: CurrencyType[] = yield call(fetchCurrencies)
        yield put(actionCurrencies.fetchCurrencySuccess(data))
    } catch (err) {
        yield put(actionCurrencies.fetchCurrencyError((err as ErrorType).response?.errors[0].message))
    }
}

export function* watchCurrenciesSaga(){
    yield takeLatest(CURRENCY_TYPES.ACTIVE_CURRENCY_FETCH_REQUEST,getActiveCurrency )
    yield takeLatest(CURRENCY_TYPES.CURRENCY_FETCH_REQUEST,getCurrencies)
}