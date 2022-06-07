import {Component} from "react";
import s from "./Demo.module.scss"
import clsx from "clsx";

interface DemoColorProps {
    items: any
    setColorBoxSizes: string
    marginColor: string
    onClick: (value: string) => void
    activeColor: any
}

export class Color extends Component<DemoColorProps> {

    activeColor = (value: string) => {
      return  this.props.activeColor.find((el: any) => el.value === value)
    }
    render() {
        const {marginColor,setColorBoxSizes,items,onClick} = this.props
        return (
            <>
                {items?.map((e: any, i: number) => {
                    return (
                        <div key={i} className={clsx(s.colorBox, marginColor, )}>
                            <div
                                className={clsx(this.activeColor(e.value) ? s.activeColor : null)}
                            >
                                <div
                                    onClick={() => {onClick(e.value)}}
                                    style={{backgroundColor: `${e.value}`}}
                                    className={clsx(e.displayValue.toLowerCase() === 'white'&& s.whiteColor, s.setColorBox ,setColorBoxSizes)}
                                > </div>
                            </div>
                        </div>
                    )
                } )}

            </>
        );
    }
}