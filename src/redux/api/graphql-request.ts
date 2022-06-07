import {GraphQLClient} from "graphql-request";
import {PUBLIC_API} from "../../consfig";
import {CategoriesType, CurrenciesType, DataType, ProductType} from "../types";
import {GET_CATEGORIES, GET_CURRENCIES,  GET_PRODUCTS_BY_NAME} from "./query";

export const client: any = new GraphQLClient(PUBLIC_API)

export const fetchCategories = async () => {
    const data: Promise<CategoriesType> = await client.request(GET_CATEGORIES)
    return data
}

export const fetchCurrencies = async () => {
    const data: Promise<CurrenciesType> = await client.request(GET_CURRENCIES)
    return data
}
export const fetchProducts = async (item: string) => {
    const data: Promise<DataType> = await client.request(GET_PRODUCTS_BY_NAME, {"input": {title: `${item}`}})
    return data
}