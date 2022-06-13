import {AttributesType, CurrenciesType, OrderType, SizesProps} from "../redux/types";



export const TakeOrderValue = (orderArr: SizesProps[], name: string, value: string) => {
    const notFound = orderArr.find((el: SizesProps) => el.name.toLowerCase() === name.toLowerCase() )
    if (!notFound) {
        return [...orderArr , {name: name, value: value}]
    }
    return  orderArr.map((col: SizesProps) => {
        if (col.name.toLowerCase() === name.toLowerCase()) {
            col.value = value
        }
        return col
    })
}
export const TakeOrderSelectValue = (items: OrderType): any => {
    return items.sizes.find((x: any) => x.name.toLowerCase() !== "color"
        && (x.value.toLowerCase() !== "yes" || x.value.toLowerCase() !== "no"))
}
export const TakeDefaultSizes = (data: AttributesType[]) => {
    return data?.map((e: AttributesType) => ({name: e?.name, value: e?.items[0].value}))
}
export const TakeDefaultPrice = (data: CurrenciesType[]) => {
    const price = data?.filter((e: CurrenciesType) => e.currency.label.toUpperCase().includes("USD")).map((el: CurrenciesType) => el.amount)
    return price
}

export const CheckValue = (items: any): boolean => {
    return items.find((e: any) => e.value.toLowerCase() === "no" || e.id.toLowerCase() === "yes")
}


export const TotalPrice = (data: OrderType[]) : number => {
    return Number(data?.reduce((acc: number, a: OrderType) => {
        return acc += a.price * a.qty
    }, 0).toFixed(2))
}

export const Tax = (num: number ) => {
    const tax = num * 21 / 100
    return tax.toFixed(2)
}

export const OrderItems = (data: OrderType[]) => {
    return data.length
}

