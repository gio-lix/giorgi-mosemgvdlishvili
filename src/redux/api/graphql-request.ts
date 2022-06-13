import {GraphQLClient} from "graphql-request";
import {PUBLIC_API} from "../../consfig";
import {GET_CATEGORIES, GET_CURRENCIES, GET_PRODUCT_BY_ID, GET_PRODUCTS_BY_NAME} from "./query";

export const client: any = new GraphQLClient(PUBLIC_API)

export const fetchCategories = async () => {
    const {categories} = await client.request(GET_CATEGORIES)
    return categories
}

export const fetchCurrencies = async () => {
    const {currencies} = await client.request(GET_CURRENCIES)
    return currencies
}
export const fetchProducts = async (item: string) => {
    const {category} = await client.request(GET_PRODUCTS_BY_NAME, {"input": {title: `${item}`}})
    return category
}
export const fetchProductsById = async (id: string) => {
    const {product} = await client.request(GET_PRODUCT_BY_ID, {productId:  `${id}`})
    return product
}