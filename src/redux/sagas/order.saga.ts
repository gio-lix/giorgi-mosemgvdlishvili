import {put, takeLatest, takeEvery, all} from "redux-saga/effects";
import {ORDER_PRODUCTS, OrderType, Payload} from "../types";
import {actionOrder} from "../action-creators";


function* getDeleteRequest ({payload}: Payload<string>) {
    yield put(actionOrder.orderDeleteProduct(payload))
}

function* getOrderMinusQtyUpdate({payload}: Payload<string>) {
    yield put(actionOrder.orderUpdateMinusSuccessQty(payload))
}

function* getOrderQtyUpdate({payload}: Payload<string>) {
    yield put(actionOrder.orderUpdateSuccessQty(payload))
}

function* getOrderUpdate({payload}: Payload<any>) {
    yield put(actionOrder.fetchOrderUpdateSuccess(payload))
}

function* getOrders({payload}: Payload<OrderType>) {
    yield put(actionOrder.fetchOrderSuccess(payload))
}

export function* watchOrderSaga() {
    yield takeLatest(ORDER_PRODUCTS.ORDER_DELETE_REQUEST, getDeleteRequest)
    yield takeLatest(ORDER_PRODUCTS.ORDER_UPDATE_MINUS_QTY_REQUEST, getOrderMinusQtyUpdate)
    yield takeLatest(ORDER_PRODUCTS.ORDER_UPDATE_QTY_REQUEST, getOrderQtyUpdate)
    yield takeLatest(ORDER_PRODUCTS.ORDER_PRODUCT_REQUEST, getOrders)
    yield takeLatest(ORDER_PRODUCTS.ORDER_PRODUCT_UPDATE_REQUEST, getOrderUpdate)
}