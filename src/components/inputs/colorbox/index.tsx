import {Component} from "react";
import s from "./Color.module.scss"
import clsx from "clsx";
import {ItemType, SizesProps} from "../../../redux/types";

interface DemoColorProps {
    items: ItemType[]
    classNameBoxSizes: string
    classNameMarginColor: string
    onClick: (item: string) => void
    activeColor: SizesProps[]
}

export class Color extends Component<DemoColorProps> {
    activeColor = (value: string) => {
      return  this.props.activeColor.find((el: SizesProps) => el.value === value)
    }
    render() {
        const {classNameMarginColor,classNameBoxSizes,items,onClick} = this.props
        return (
            <div>
                {items?.map((e: ItemType, i: number) => {
                    return (
                        <div key={i} className={clsx(s.colorBox, classNameMarginColor)}>
                            <div className={clsx(this.activeColor(e.value) ? s.activeColor : null)}>
                                <div
                                    onClick={() => {onClick( e.value)}}
                                    style={{backgroundColor: `${e.value}`}}
                                    className={clsx(e.displayValue.toLowerCase() === 'white'&& s.whiteColor, s.setColorBox ,classNameBoxSizes)}
                                > </div>
                            </div>
                        </div>
                    )
                } )}

            </div>
        );
    }
}