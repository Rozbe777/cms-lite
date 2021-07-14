import React, {useState, useEffect} from 'react';
import './../_shared/style.scss'
import {DEFAULT_ICON} from "../../../services/Type";
import {separate} from "../../../helper";

export const ItemCheckOut = ({
                                 final_price,
                                 name,
                                 id,
                                 image,
                                 onDelete,
                                 firstCount,
                                 onChangeTotalCount,
                                 index,

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
        onChangeTotalCount(e, id, oldCount, final_price, index)
    }


    const handleTotalItemPrice = () => {

    }

    const handleDec = e => {
        e.preventDefault();
        let oldCount = count;
        if (oldCount > 1) {
            oldCount = parseInt(oldCount - 1);
            setCount(oldCount)
            onChangeTotalCount(e, id, oldCount, final_price, index)
        }
    }

    const handleChangeCount = e => {
        if (e.target.value > 0) {
            setCount(e.target.value);
            onChangeTotalCount(e, id, e.target.value, final_price, index)
        }
    }
    return (
        <>
            <div id={"iteming"} className={"big-screen"}>
                {_renderImg()}
                <span id={"product-name"}>{name}</span>
                <div className={"detail"}>
                    <span>{_renderPrice(1)}</span>
                    <div id={"count-control"}>

                        <div id={"reducer"}>
                            <i className={"bx bx-plus"} onClick={e => handleInc(e)}></i>
                            <input type={"number"} value={count} onChange={e => handleChangeCount(e)}
                                   name={"counters"}/>
                            <i className={"bx bx-minus"} onClick={e => handleDec(e)}></i>
                        </div>

                    </div>
                    <span>{_renderPrice(count)}</span>
                </div>
                <i className={"bx bx-trash"} onClick={e => onDelete(e, id)}></i>
            </div>

            <div id={"iteming"} className={"small-screen"}>
                {_renderImg()}
                <span id={"product-name"}>{name}</span>

                <ul className={"total-mini-screen-data"}>
                    <li>
                        <ul className={"unser"}>
                            <li>قیمت :</li>
                            <li>{_renderPrice(1)}</li>
                        </ul>
                        <ul className={"unser"}>
                            <li>تعداد :</li>
                            <li>
                                <div id={"count-control"}>

                                    <div id={"reducer"}>
                                        <i className={"bx bx-plus"} onClick={e => handleInc(e)}></i>
                                        <input type={"number"} value={count} onChange={e => handleChangeCount(e)}
                                               name={"counters"}/>
                                        <i className={"bx bx-minus"} onClick={e => handleDec(e)}></i>
                                    </div>

                                </div>
                            </li>
                        </ul>
                        <ul className={"unser"}>
                            <li>جمع قیمت :</li>
                            <li>{_renderPrice(count)}</li>
                        </ul>
                    </li>
                </ul>

                <i className={"bx bx-trash"} onClick={e => onDelete(e, id)}></i>
            </div>
        </>

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

    function _renderPrice(counts = 1) {
        let typePrice = " تومان ";
        return separate(
            final_price * counts
        ) + typePrice;
    }
}

