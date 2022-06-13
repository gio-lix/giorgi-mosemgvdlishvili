import {Component} from "react";
import {ProductType} from "../../redux/types";
import {Gallery} from "./gallery";
import Sizes from "./sizes";


interface ProductState {
    product:  ProductType
}

export class ProductIdPage extends Component<ProductState> {
    state = {
        colorBox: false,
        takeSize: [],
        orderSize: []
    }

    render() {
        const {gallery,inStock, id, name,attributes,brand,description,prices} = this.props.product
        return (
            <div className="ProductIdGrid container">
                <Gallery
                    gallery={gallery}
                    inStock={inStock}
                />
                <Sizes
                    id={id}
                    name={name}
                    brand={brand}
                    inStock={inStock}
                    gallery={gallery}
                    attributes={attributes}
                    description={description}
                    prices={prices}
                />
            </div>
        )
    }
}