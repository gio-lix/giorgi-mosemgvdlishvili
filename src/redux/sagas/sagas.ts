import {call, put, all, spawn} from "redux-saga/effects";
import {watchCategoriesSaga} from "./categories.saga";
import {watchCurrenciesSaga} from "./currencies.saga";
import {watchProductsSaga} from "./products.saga";


export default function* rootSaga() {
    const sagas = [
        watchCategoriesSaga,
        watchCurrenciesSaga,
        watchProductsSaga
    ]

    yield all(sagas.map((s) => spawn(s)));
}