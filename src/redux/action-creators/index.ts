import {
    CATEGORIES_TYPES,
    CategoriesType,
    CurrenciesType,
    CURRENCY_TYPES, DataType,
    ErrorType,
    PRODUCT_TYPES,
} from "../types";




export const actionsCategories = {
    fetchCategoriesRequest: () => ({type: CATEGORIES_TYPES.CATEGORIES_FETCH_REQUEST} as const),
    fetchCategoriesSuccess: (categories: CategoriesType) => ({type: CATEGORIES_TYPES.CATEGORIES_FETCH_SUCCESS, payload: categories} as const),
    fetchCategoriesError: (error: ErrorType) => ({type: CATEGORIES_TYPES.CATEGORIES_FETCH_ERROR, payload: error}  as const)
}

export const actionCurrencies = {
    fetchCurrencyRequest: () => ({type: CURRENCY_TYPES.CURRENCY_FETCH_REQUEST} as const),
    fetchCurrencySuccess: (currencies: CurrenciesType) => ({type: CURRENCY_TYPES.CURRENCY_FETCH_SUCCESS, payload: currencies} as const),
    fetchCurrencyError: (error: ErrorType) => ({type: CURRENCY_TYPES.CURRENCY_FETCH_ERROR, payload: error}  as const)
}
export const actionProducts = {
    fetchProductsRequest: (item: string) => ({type: PRODUCT_TYPES.PRODUCT_FETCH_REQUEST, payload: item} as const),
    fetchProductsSuccess: (category: DataType) => ({type: PRODUCT_TYPES.PRODUCT_FETCH_SUCCESS, payload: category} as const),
    fetchProductsError: (error: ErrorType) => ({type: PRODUCT_TYPES.PRODUCT_FETCH_ERROR, payload: error}  as const)
}





