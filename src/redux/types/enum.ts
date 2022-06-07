
export enum CATEGORIES_TYPES {
    "CATEGORIES_FETCH_REQUEST" = "CATEGORIES_FETCH_REQUEST",
    "CATEGORIES_FETCH_SUCCESS" = "CATEGORIES_FETCH_SUCCESS",
    "CATEGORIES_FETCH_ERROR" = "CATEGORIES_FETCH_ERROR",
}

export enum CURRENCY_TYPES {
    "CURRENCY_FETCH_REQUEST" = "CURRENCY_FETCH_REQUEST",
    "CURRENCY_FETCH_SUCCESS" = "CURRENCY_FETCH_SUCCESS",
    "CURRENCY_FETCH_ERROR" = "CURRENCY_FETCH_ERROR",
}

export enum PRODUCT_TYPES {
    "PRODUCT_FETCH_REQUEST" = "PRODUCT_FETCH_REQUEST",
    "PRODUCT_FETCH_SUCCESS" = "PRODUCT_FETCH_SUCCESS",
    "PRODUCT_FETCH_ERROR" = "PRODUCT_FETCH_ERROR",
}



export type CategoriesType = {
    categories: {
        name: string
    }[]
}

export type CurrenciesType = {
    currencies: {
        symbol: string
        label: string
    }[]
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
    items: ItemType
}

export type ProductType = {
    id: number
    name: string
    inStock: boolean
    gallery: string[]
    description: string
    brand: string
    category: string
    attributes: AttributesType
    prices: CurrenciesType
}

export type DataType = {
    category: {
        name: string,
        products: ProductType[],
    }
}

export type ErrorType = {
    response: {
        errors: [
            message: any
        ]
    }
}
export type Payload = {
    type: string
    payload: string
}