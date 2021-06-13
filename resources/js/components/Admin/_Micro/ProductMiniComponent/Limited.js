import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import './_Shared/style.scss'

export const Limited = ({limit, out: setOut}) => {

    const [status, setStatus] = useState(true);
    const [data, setData] = useState({limit: limit ? limit : null})

    const handleClose = e => {
        e.preventDefault();
        $("#back-loaderedss").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loaderedss"));
    }

    const handleAdd = e => {
        e.preventDefault();
        console.log("dataaa :" , data)
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
            setData({limit: 0})
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
        if (e.target.value < 1){
            setData({
                ...data,
                [e.target.name] : 1
            })
        }else{
            setData({
                ...data,
                [e.target.name] : e.target.value
            })
        }

    }

    return (
        <div className={"col-lg-4 col-sm-12 col-md-8"} id={"prices"}>

            <div className={"col-12"}>
                <div className={"row"} style={{marginTop: '15px'}}>
                    <div className={"col-8"}>
                        <fieldset className={"form-group"} style={{textAlign: 'center'}}>
                            <label htmlFor={"discount"}>حداکثر مقدار قابل خرید</label>
                            {status ? (
                                <input style={{height: '45px', textAlign: 'center'}} value={"اندازه کل موجودی"}
                                       type={"number"} className={"form-control deactive"} id={"discount"} name={"limit"}
                                       disabled
                                       placeholder={"اندازه کل موجودی"}/>
                            ) : (
                                <input style={{height: '45px', textAlign: 'center',}}
                                       className={"form-control  "} id={"discount input-dis"}
                                       name={"limit"}
                                       type={"number"}
                                       onChange={e => HandleChangeLimit(e)}
                                       value={data.limit}
                                       placeholder={"نامحدود"}/>
                            )}
                        </fieldset>

                    </div>
                    <div className={"col-4"}>
                        <p style={{textAlign: 'center', fontSize: 12}}>نامحدود</p>
                        <fieldset>
                                <span className={"checkboxed priceee limi"} style={{color: '#fff'}}>
                                    <i className={"bx bx-check"}></i>
                                </span>
                            <input type="checkbox"
                                   onChange={e => HandleChange(e)}
                                   name={"discount"}
                                   className={"checked-do"}
                                   defaultChecked={status}
                                   style={{background: 'green !important', opacity: 0}}
                                   value={0} id="checkbox1"/>
                            <label id={"labels"} htmlFor="checkbox1"></label>
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
                    <div onClick={e => handleAdd(e)} className={"col-6"} id={"btn-action"}>
                        ذخیره
                    </div>
                </div>
            </div>
        </div>
    )
}
