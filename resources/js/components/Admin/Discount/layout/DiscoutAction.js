import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import {MultiOption} from "./MultiOption";

export const DiscoutAction = ({limit, out: setOut}) => {

    const [status, setStatus] = useState(true);
    const [data, setData] = useState({limit: limit ? limit : null})

    const handleClose = e => {
        e.preventDefault();
        $("#back-loaderedss").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loaderedss"));
    }

    const handleAdd = e => {
        e.preventDefault();
        console.log("dataaa :", data)
        setOut(data);
        handleClose(e);
    }

    const HandleChange = (e) => {
        let checkBoxCustom = $("span.checkboxed.limi");
        if (e.target.checked) {
            checkBoxCustom.addClass("active")
            setStatus(true)
            setData({limit: null})
        } else {
            setData({limit: ''})
            checkBoxCustom.removeClass("active")
            setStatus(false)
        }
    }

    useEffect(() => {
        if (status) {
            $("span.checkboxed.limi").addClass("active");
        } else {
            $("span.checkboxed.limi").removeClass("active");
        }
    }, [])


    const HandleChangeLimit = e => {
        e.preventDefault();
        if (e.target.value < 1) {
            setData({
                ...data,
                [e.target.name]: 1
            })
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }

    }

    return (
        <div className={"col-lg-4 col-sm-12 col-md-8"} id={"prices"} style={{overflow : 'inherit'}}>

            <div className={"col-12"}>
                <div className={"row"} style={{marginTop: '15px'}}>
                    <div className={"col-12"}>

                        <div className={"content-select firstes"}>

                            <p style={{textAlign : 'center'}}>تخفیف اعمال شود روی</p>

                            <MultiOption name={"status"} data={[{
                                id: 'کل مبلغ سبد خرید',
                                name: 'کل مبلغ سبد خرید'
                            }, {
                                id: 'مبلغ سبد خرید بدون هزینه ارسال',
                                name: 'مبلغ سبد خرید بدون هزینه ارسال'
                            }, {
                                id: 'محصولات خاص بدون هزینه ارسال',
                                name: 'محصولات خاص بدون هزینه ارسال'
                            }, {
                                id: 'دسته بندی خاص بدون هزینه ارسال',
                                name: 'دسته بندی خاص بدون هزینه ارسال'
                            }]}
                                // selected={item => handleCloseFirst(item)}

                            />

                        </div>


                    </div>
                </div>
            </div>
            <div className={"bottom-btns"}>
                <div className={"row"}>
                    <div onClick={e => handleClose(e)} className={"col-6"} style={{borderLeft: '1px solid #ccc'}}
                         id={"btn-action"}>
                        انصراف
                    </div>
                    <div onClick={e => handleAdd(e)} className={"col-6"} id={"btn-action"}>
                        ذخیره
                    </div>
                </div>
            </div>
        </div>
    )
}
