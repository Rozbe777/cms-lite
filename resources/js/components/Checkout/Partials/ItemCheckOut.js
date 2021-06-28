import React, {useState, useEffect} from 'react';
import './../_shared/style.scss'
export const ItemCheckOut = (props , {countFi : pushCountFi}) => {
    useEffect(() => {
    }, [])
    // const {mini} = props;
    const [state, setState] = useState();


    const [count , setCount] = useState(1)

    const handleInc = e =>{
        e.preventDefault();
        let oldCount = count;
        oldCount = parseInt(oldCount +1);
        setCount(oldCount)
    }


    const handleDec = e => {
        e.preventDefault();
        let oldCount = count;
        if (oldCount > 1){
            oldCount = parseInt(oldCount -1);
            setCount(oldCount)
        }
    }
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
                        <i className={"bx bx-plus"} onClick={e => handleInc(e)}></i>
                        <input type={"number"} value={count} name={"counters"} />
                        <i className={"bx bx-minus"} onClick={e => handleDec(e)}></i>
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

