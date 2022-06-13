import {gql} from "graphql-request";

export const GET_CATEGORIES = gql`
        query Query {
          categories {
            name
          }
        }
    `

export const GET_CURRENCIES = gql`
        query Query {
          currencies {
            symbol
            label
          }
        }
    `
export const GET_PRODUCTS_BY_NAME = gql`
        query Query($input: CategoryInput) {
          category(input: $input) {
            name
            products {
              id
              name
              gallery
              brand
              inStock
              prices {
                amount
                currency {
                  symbol
                  label
                }
              }
            }
          }
        }
    `

export const GET_PRODUCT_BY_ID = gql`
        query Query($productId: String!) {
           product(id: $productId) {
             id
             name
             inStock
             gallery
             description
             category
             brand
             attributes {
               id
               name
               type
               items {
                 displayValue
                 value
                 id
               }
             }
             prices {
                amount
                currency {
                  symbol
                  label
                }
             }
           }
        }
    `