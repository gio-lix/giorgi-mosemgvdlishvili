import {call, put, takeLatest} from "redux-saga/effects";
import {ErrorType, Payload, PRODUCT_ID_TYPES, ProductType} from "../types";
import {fetchProductsById} from "../api/graphql-request";
import {actionProductsById} from "../action-creators";



function* getProductById({payload} : Payload<string>) {
    try {
        const data:ProductType = yield call(fetchProductsById, payload)
        yield put(actionProductsById.fetchProductsSuccess(data))
    } catch (err) {
        yield put(actionProductsById.fetchProductsError((err as ErrorType).response?.errors[0].message))
    }
}

export function* watchProductByIdSaga() {
    yield takeLatest(PRODUCT_ID_TYPES.PRODUCT_ID_FETCH_REQUEST,getProductById)
}