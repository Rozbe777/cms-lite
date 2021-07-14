import React, {useState, useEffect} from 'react';
import './../_shared/style.scss'
import {DEFAULT_ICON} from "../../../services/Type";

export const ItemCheckOut = ({
                                 price,
                                 name,
                                 id,
                                 image,
                                 onDelete,
                                 firstCount,
                                 onChangeTotalCount,
                                 index,
                                 discountStatus,
                                 discount
                             }) => {
    useEffect(() => {
    }, [])

    const [totalItemPrice, setTotalItemPrice] = useState();


    const [count, setCount] = useState(firstCount ? firstCount : 1)

    const handleInc = e => {
        e.preventDefault();
        let oldCount = count;
        oldCount = parseInt(oldCount + 1);
        setCount(oldCount)
        onChangeTotalCount(e, id, oldCount, price, index)
    }


    const handleTotalItemPrice = () => {

    }

    const handleDec = e => {
        e.preventDefault();
        let oldCount = count;
        if (oldCount > 1) {
            oldCount = parseInt(oldCount - 1);
            setCount(oldCount)
            onChangeTotalCount(e, id, oldCount, price, index)
        }
    }

    const handleChangeCount = e => {
        if (e.target.value > 0) {
            setCount(e.target.value);
            onChangeTotalCount(e, id, e.target.value, price, index)
        }
    }
    return (
        <div id={"iteming"}>

            {_renderImg()}
            <span id={"product-name"}>{name}</span>
            <div className={"detail"}>
                <span>{price} تومان</span>
                <div id={"count-control"}>

                    <div id={"reducer"}>
                        <i className={"bx bx-plus"} onClick={e => handleInc(e)}></i>
                        <input type={"number"} value={count} onChange={e => handleChangeCount(e)} name={"counters"}/>
                        <i className={"bx bx-minus"} onClick={e => handleDec(e)}></i>
                    </div>

                </div>
                <span>
                    {price * count} تومان
                </span>
            </div>
            <i className={"bx bx-trash"} onClick={e => onDelete(e, id)}></i>
        </div>
    )

    function _renderImg() {
        if (image) {
            return (
                <div className={"img-item"}>
                    <img src={image} style={{opacity: 1}}/>
                </div>
            )
        } else {
            return (
                <div className={"img-item"}>
                    <img src={DEFAULT_ICON}/>
                </div>
            )
        }
    }

    function _renderPrice(){

    }
}

