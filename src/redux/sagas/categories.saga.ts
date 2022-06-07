import {all, call, put, takeLatest} from "redux-saga/effects";
import {CATEGORIES_TYPES, CategoriesType, ErrorType,} from "../types";
import {fetchCategories} from "../api/graphql-request";
import {actionsCategories} from "../action-creators";


function* getCategories() {
    try {
        const data: CategoriesType = yield call(fetchCategories)
        yield put(actionsCategories.fetchCategoriesSuccess(data))
    } catch (err ) {
        yield put(actionsCategories.fetchCategoriesError((err as ErrorType).response?.errors[0].message))
    }
}

export function* watchCategoriesSaga() {
    yield takeLatest(CATEGORIES_TYPES.CATEGORIES_FETCH_REQUEST, getCategories)
}