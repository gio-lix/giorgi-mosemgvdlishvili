import {Component} from "react";
import s from "./Gallery.module.scss"
import clsx from "clsx";

interface GalleryProps {
    gallery: string[]
    inStock: boolean
}

export class Gallery extends Component<GalleryProps> {
    state = {
        activeImage: 0,
    }
    onClickChangeImage = (idx: number) => {
        this.setState({activeImage: idx})
    }
    render() {
        return (
            <>
                <div >
                    {this.props.gallery?.map((img: string, index: number) => {
                        return (
                            <div onClick={() => this.onClickChangeImage(index)} key={index}>
                                <img  src={img} alt="img" className={s.imagesBox}/>
                            </div>
                        )
                    })}
                </div>
                <div className={s.image}>
                    <div className={s.imageBox}>
                        <img src={this.props.gallery[this.state.activeImage]} alt="img" className={clsx(s.mainImg, !this.props.inStock ? s.opacity : null)}/>
                        {!this.props.inStock ? (
                            <p className={s.outOfStock} >
                                OUT OF STOCK
                            </p>
                        ) : null}
                    </div>
                </div>
            </>
        )
    }
}