import React, {useState} from "react";
import ReactDOM from 'react-dom';
import {ErroHandle, error as ErrorToast, error} from './../../../../helper'
import './_Shared/style.scss'

export const NewFeture = ({resulteFeature}) => {

    const [status, setStatus] = useState(true);
    const [data, setData] = useState({
        type: 'text'
    });
    const handleClose = e => {
        e.preventDefault();
        $("#back-loaderedss").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loaderedss"));
    }

    const HandleChangeSelectOption = (e) => {
        e.preventDefault()
        if (e.target.value === "text") {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }

    }

    const HandleSelected = e => {
        e.preventDefault();
        setData({
            ...data,
            type: e.target.value
        })


    }
    const HandleForm = e => {
        e.preventDefault()

        if (data.name) {
            resulteFeature(data)
            handleClose(e);
        } else {
            ErrorToast("نام ویژگی را اضافه کنید")
        }
    }

    return (
        <div className={"col-lg-4 col-sm-12 col-md-8"} id={"fetures"} style={{height: '260px !important'}}>

            <div className={"col-12"}>
                <div className={"row"} style={{marginTop: '15px'}}>
                    <div className={"col-12"}>
                        <p style={{textAlign: 'center', fontSize: 12}}>نوع ورودی</p>
                        <fieldset className={"form-group"} style={{textAlign: 'center', width: '100%'}}>
                            <select name={"type"} className={"form-control"} id={"basicSelect"}
                                    onChange={e => HandleSelected(e)}>
                                <option value={"text"}>متن ( پیشفرض )</option>
                                <option value={"color"}>رنگ</option>
                            </select>
                        </fieldset>

                    </div>
                    <div className={"col-12"}>
                        <fieldset className={"form-group"} style={{textAlign: 'center'}}>
                            <label htmlFor={"discount"}>نام ویژگی محصول</label>

                            <input style={{height: '45px', textAlign: 'center'}}
                                   onChange={HandleChangeSelectOption}
                                   type={"text"} className={"form-control"} id={"discount"} name={"name"}
                                   placeholder={"رنگ ، سایز ، ابعاد و ..."}/>
                        </fieldset>

                    </div>
                </div>
            </div>
            <div className={"bottom-btns"}>
                <div className={"row"}>
                    <div onClick={e => handleClose(e)} className={"col-6"} style={{borderLeft: '1px solid #ccc'}}
                         id={"btn-action"}>
                        انصراف
                    </div>
                    <div onClick={e => HandleForm(e)} className={"col-6"} id={"btn-action"}>
                        ذخیره
                    </div>
                </div>
            </div>
        </div>
    )
}
