export enum CATEGORIES_TYPES {
    "CATEGORIES_FETCH_REQUEST" = "CATEGORIES_FETCH_REQUEST",
    "CATEGORIES_FETCH_SUCCESS" = "CATEGORIES_FETCH_SUCCESS",
    "CATEGORIES_FETCH_ERROR" = "CATEGORIES_FETCH_ERROR",
}

export enum CURRENCY_TYPES {
    "CURRENCY_FETCH_REQUEST" = "CURRENCY_FETCH_REQUEST",
    "CURRENCY_FETCH_SUCCESS" = "CURRENCY_FETCH_SUCCESS",
    "CURRENCY_FETCH_ERROR" = "CURRENCY_FETCH_ERROR",
    "ACTIVE_CURRENCY_FETCH_REQUEST" = "ACTIVE_CURRENCY_FETCH_REQUEST",
    "ACTIVE_CURRENCY_FETCH_SUCCESS" = "ACTIVE_CURRENCY_FETCH_SUCCESS",
}

export enum PRODUCT_TYPES {
    "PRODUCT_FETCH_REQUEST" = "PRODUCT_FETCH_REQUEST",
    "PRODUCT_FETCH_SUCCESS" = "PRODUCT_FETCH_SUCCESS",
    "PRODUCT_FETCH_ERROR" = "PRODUCT_FETCH_ERROR",
}
export enum PRODUCT_ID_TYPES {
    "PRODUCT_ID_FETCH_REQUEST" = "PRODUCT_ID_FETCH_REQUEST",
    "PRODUCT_ID_FETCH_SUCCESS" = "PRODUCT_ID_FETCH_SUCCESS",
    "PRODUCT_ID_FETCH_ERROR" = "PRODUCT_ID_FETCH_ERROR",
}

export enum ORDER_PRODUCTS {
    "ORDER_PRODUCT_REQUEST" = "ORDER_PRODUCT_REQUEST",
    "ORDER_PRODUCT_SUCCESS" = "ORDER_PRODUCT_SUCCESS",
    "ORDER_PRODUCT_ERROR" = "ORDER_PRODUCT_ERROR",

    "ORDER_PRODUCT_UPDATE_REQUEST" = "ORDER_PRODUCT_UPDATE_REQUEST",
    "ORDER_PRODUCT_UPDATE_SUCCESS" = "ORDER_PRODUCT_UPDATE_SUCCESS",

    "ORDER_UPDATE_QTY_REQUEST" = "ORDER_UPDATE_QTY_REQUEST",
    "ORDER_UPDATE_QTY_SUCCESS" = "ORDER_UPDATE_QTY_SUCCESS",

    "ORDER_UPDATE_MINUS_QTY_REQUEST" = "ORDER_UPDATE_MINUS_QTY_REQUEST",
    "ORDER_UPDATE_MINUS_QTY_SUCCESS" = "ORDER_UPDATE_MINUS_QTY_SUCCESS",

    "ORDER_DELETE_REQUEST" = "ORDER_DELETE_REQUEST",
    "ORDER_DELETE_SUCCESS" = "ORDER_DELETE_SUCCESS"
}

export type BaseType = {
    id: string
    name: string
    inStock: boolean
    gallery: string[]
}

export type CategoriesType = {
        name: string
}
export type CurrencyType = {
    symbol: string
    label: string
}

export type CurrenciesType = {
    currency: CurrencyType
    amount: number
}
export type ItemType = {
    displayValue: string
    value: string
    id: string
}

export type AttributesType = {
    id: string
    name: string
    type: string
    items: ItemType[]
}


export type ProductType = {
    id: string
    name: string
    inStock: boolean
    gallery: string[]
    description: string
    category: string
    brand: string
    attributes: AttributesType[]
    prices: CurrenciesType[]
}

export type CategoryType = {
    prices: CurrenciesType[]
} & BaseType

export type CategoryDataType = {
    name: string,
    products: CategoryType[],
}

export type OrderType = {
    id: string,
    attributes: AttributesType[],
    gallery: string[]
    name: string,
    brand: string,
    price: number,
    sizes: SizesProps[]
    qty: number
}



export type Payload<T> = {
    type: string,
    payload: T
}


export type SizesProps = {
    name: string
    value: string
}

export type ErrorType = {
    response: {
        errors: [
            message: any
        ]
    }
}


