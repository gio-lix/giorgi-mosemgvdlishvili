import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/sagas";
import {CategoriesReducer, CurrenciesReducer, OrderReducer, productsReducers} from "./reducers";
import {ProductIdReducer} from "./reducers/productIdReducer";



const rootReducer = combineReducers({
    categories: CategoriesReducer,
    currencies: CurrenciesReducer,
    products: productsReducers,
    product: ProductIdReducer,
    orders: OrderReducer
})

export type RootState = ReturnType<typeof rootReducer>


const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)

