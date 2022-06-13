import { all, spawn} from "redux-saga/effects";
import {watchCategoriesSaga} from "./categories.saga";
import {watchCurrenciesSaga} from "./currencies.saga";
import {watchProductsSaga} from "./products.saga";
import { watchProductByIdSaga} from "./productById.saga";
import {watchOrderSaga} from "./order.saga";


export default function* rootSaga() {
    const sagas = [
        watchCategoriesSaga,
        watchCurrenciesSaga,
        watchProductsSaga,
        watchProductByIdSaga,
        watchOrderSaga
    ]

    yield all(sagas.map((s) => spawn(s)));
}