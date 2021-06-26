import React, {useState, useEffect} from 'react';
import './../_shared/style.scss'
export const ItemCheckOut = (props) => {
    useEffect(() => {
    }, [])
    // const {mini} = props;
    const [state, setState] = useState();
    return (
        <div id={"iteming"}>
            <div className={"img-item"}>
                <img src={"/images/avatar.jpg"} />
            </div>
            <span id={"product-name"}>این یک محصول تست استتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتتت</span>
            <div className={"detail"}>
                <span>0  تومان</span>
                <div id={"count-control"}>

                    <div id={"reducer"}>
                        <i className={"bx bx-plus"}></i>
                        <input type={"number"} name={"counters"} />
                        <i className={"bx bx-minus"}></i>
                    </div>

                </div>
                <span>
                    0 تومان
                </span>
            </div>
            <i className={"bx bx-trash"}></i>
        </div>
    )
}

