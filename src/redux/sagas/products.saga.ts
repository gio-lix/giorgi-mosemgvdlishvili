import {all, call, put, takeLatest} from "redux-saga/effects";
import {CategoryDataType,  ErrorType, Payload, PRODUCT_TYPES} from "../types";
import { actionProducts} from "../action-creators";
import {fetchProducts} from "../api/graphql-request";


type CategoryType = {
    category: CategoryDataType
}

function* getProducts({payload} : Payload) {
    try {
        const data:CategoryType  = yield call(fetchProducts, payload)
        yield put(actionProducts.fetchProductsSuccess(data.category))
    } catch (err) {
        yield put(actionProducts.fetchProductsError((err as ErrorType).response?.errors[0].message))
    }
}

export function* watchProductsSaga() {
    yield takeLatest(PRODUCT_TYPES.PRODUCT_FETCH_REQUEST, getProducts)
}