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
                currency {
                  symbol
                  label
                }
                amount
              }
              inStock
            }
          }
        }
    `

export const GET_PRODUCTS_BY_ID = gql`
        query Query($productId: String!) {
           product(id: $productId) {
             name
             inStock
             gallery
             id
             description
             prices {
                amount
                currency {
                  symbol
                  label
                }
             }
             brand
             attributes {
               name
               type
               id
               items {
                 displayValue
                 value
                 id
               }
             }
           }
        }
    `