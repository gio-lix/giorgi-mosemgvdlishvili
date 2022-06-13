import {Component} from "react";
import s from "./OrderIndoGallery.module.scss"
import {connect} from "react-redux";
import {actionOrder} from "../../../../redux/action-creators";
import clsx from "clsx";
import {IMAGES} from "../../../../assets";


interface GalleryProps {
    id: string
    qty: number
    gallery: string[]
    dispatchUpdateOrderQty: (id: string) => void
    dispatchUpdateOrderQtyMinus: (id: string) => void

}

class OrderInfoGallery extends Component<GalleryProps> {

    render() {
        return (
            <div className={s.galleryBox}>
                <div>
                    <button
                        onClick={() => {this.props.dispatchUpdateOrderQty(this.props.id)}}
                    >
                        <img src={IMAGES.plus} alt="add"/>
                    </button>
                    <span>
                        {this.props.qty}
                    </span>
                    <button className={clsx(this.props.qty === 1 && s.disabled)} disabled={this.props.qty === 1}
                            onClick={() => {this.props.dispatchUpdateOrderQtyMinus(this.props.id)}}
                    >
                        <img src={IMAGES.minus} alt="minus"/>
                    </button>
                </div>
                <div>
                    <span>
                        <img className={s.img} src={this.props.gallery[0]} alt="img"/>
                    </span>
                </div>
            </div>
        );
    }
}

export default connect(null,
    {
        dispatchUpdateOrderQty: (id: string) => actionOrder.orderUpdateQtyRequest(id),
        dispatchUpdateOrderQtyMinus: (id: string) => actionOrder.orderUpdateMinusQtyRequest(id)
    })(OrderInfoGallery);