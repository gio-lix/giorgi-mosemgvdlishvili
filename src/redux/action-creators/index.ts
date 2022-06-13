import {
    CATEGORIES_TYPES,
    CategoriesType, CategoryDataType,
    CURRENCY_TYPES, CurrencyType,
    ErrorType, ORDER_PRODUCTS, OrderType,  PRODUCT_ID_TYPES,
    PRODUCT_TYPES, ProductType,
} from "../types";

export const actionsCategories = {
    fetchCategoriesRequest: () => ({type: CATEGORIES_TYPES.CATEGORIES_FETCH_REQUEST} as const),
    fetchCategoriesSuccess: (categories: CategoriesType[]) => ({type: CATEGORIES_TYPES.CATEGORIES_FETCH_SUCCESS, payload: categories} as const),
    fetchCategoriesError: (error: ErrorType) => ({type: CATEGORIES_TYPES.CATEGORIES_FETCH_ERROR, payload: error}  as const)
}

export const actionCurrencies = {
    fetchCurrencyRequest: () => ({type: CURRENCY_TYPES.CURRENCY_FETCH_REQUEST} as const),
    fetchCurrencySuccess: (currencies: CurrencyType[]) => ({type: CURRENCY_TYPES.CURRENCY_FETCH_SUCCESS, payload: currencies} as const),
    fetchCurrencyError: (error: ErrorType) => ({type: CURRENCY_TYPES.CURRENCY_FETCH_ERROR, payload: error}  as const),

    fetchActiveCurrencyRequest: (idx: number) => ({type: CURRENCY_TYPES.ACTIVE_CURRENCY_FETCH_REQUEST, payload: idx} as const),
    fetchActiveCurrencySuccess: (active: any) => ({type: CURRENCY_TYPES.ACTIVE_CURRENCY_FETCH_SUCCESS, payload: active} as const)

}
export const actionProducts = {
    fetchProductsRequest: (item: string) => ({type: PRODUCT_TYPES.PRODUCT_FETCH_REQUEST, payload: item} as const),
    fetchProductsSuccess: (category: CategoryDataType) => ({type: PRODUCT_TYPES.PRODUCT_FETCH_SUCCESS, payload: category} as const),
    fetchProductsError: (error: ErrorType) => ({type: PRODUCT_TYPES.PRODUCT_FETCH_ERROR, payload: error}  as const),

}
export const actionProductsById = {
    fetchProductsRequest: (item: string) => ({type: PRODUCT_ID_TYPES.PRODUCT_ID_FETCH_REQUEST, payload: item} as const),
    fetchProductsSuccess: (product: ProductType) => ({type: PRODUCT_ID_TYPES.PRODUCT_ID_FETCH_SUCCESS, payload: product} as const),
    fetchProductsError: (error: ErrorType) => ({type: PRODUCT_ID_TYPES.PRODUCT_ID_FETCH_ERROR, payload: error}  as const)
}

export const actionOrder = {
    fetchOrderRequest: (orders: OrderType) => ({type: ORDER_PRODUCTS.ORDER_PRODUCT_REQUEST, payload: orders} as const),
    fetchOrderSuccess: (orders: OrderType) => ({type: ORDER_PRODUCTS.ORDER_PRODUCT_SUCCESS, payload: orders} as const),
    fetchOrderError: (error: ErrorType) => ({type: ORDER_PRODUCTS.ORDER_PRODUCT_ERROR, payload: error} as const),

    fetchOrderUpdateRequest: (item: any) => ({type: ORDER_PRODUCTS.ORDER_PRODUCT_UPDATE_REQUEST, payload: item}),
    fetchOrderUpdateSuccess: (item: any) => ({type: ORDER_PRODUCTS.ORDER_PRODUCT_UPDATE_SUCCESS, payload: item}),

    orderUpdateQtyRequest: (id: string) => ({type: ORDER_PRODUCTS.ORDER_UPDATE_QTY_REQUEST, payload: id} as const),
    orderUpdateSuccessQty: (id: string) => ({type: ORDER_PRODUCTS.ORDER_UPDATE_QTY_SUCCESS, payload: id} as const),

    orderUpdateMinusQtyRequest: (id: string) => ({type: ORDER_PRODUCTS.ORDER_UPDATE_MINUS_QTY_REQUEST, payload: id} as const),
    orderUpdateMinusSuccessQty: (id: string) => ({type: ORDER_PRODUCTS.ORDER_UPDATE_MINUS_QTY_SUCCESS, payload: id} as const),

    orderDeleteRequest: (id: string) => ({type: ORDER_PRODUCTS.ORDER_DELETE_REQUEST, payload: id} as const),
    orderDeleteProduct: (id: string) => ({type: ORDER_PRODUCTS.ORDER_DELETE_SUCCESS, payload: id} as const)

}





