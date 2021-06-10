import React, {useState} from "react";
import ReactDOM from 'react-dom';
import './_Shared/style.scss'

export const Price = ({priceDataOld,newPrice :setPrice }) => {

    const [status, setStatus] = useState(true);
    const [priceData , setPriceData] = useState({})
    const handleClose = e => {
        e.preventDefault();
        $("#back-loaderedss").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loaderedss"));
    }

    const handleAdd = e => {
        e.preventDefault();
        setPrice(priceData);
        handleClose(e);
    }

    const HandleChange = (e, id) => {
        let checkBoxCustom = $("span.checkboxed.priceee");
        if (e.target.checked) {
            checkBoxCustom.addClass("active")
            setStatus(false)
        } else {
            checkBoxCustom.removeClass("active")
            setStatus(true)
            delete priceData.discount;
            setPriceData(priceData)
        }
    }

    const HandlePrice = e => {
        e.preventDefault();
        let datain = {...priceData};
        datain[e.target.name] = e.target.value;
        setPriceData(datain);
    }

    return (
        <div className={"col-lg-4 col-sm-12 col-md-8"} id={"prices"}>

            <div className={"col-12"}>
                <div className={"row"} style={{marginTop: '15px'}}>
                    <div className={"col-4"}>
                        <fieldset className={"form-group"} style={{textAlign: 'center'}}>
                            <label htmlFor={"price"}>قیمت</label>
                            {status ? (
                                <input style={{height: '45px', textAlign: 'center'}} value={priceData.price}
                                       onChange={e => HandlePrice(e)}
                                       type={"number"} className={"form-control"} id={"price"} name={"price"} min={0}
                                       placeholder={"0"}/>
                            ) : (
                                <input style={{height: '45px', textAlign: 'center' ,textDecoration : 'line-through'}} value={priceData.price}
                                       type={"number"} className={"form-control"} id={"price"} name={"price"} min={0}
                                       placeholder={"0"}/>
                            )}

                        </fieldset>

                    </div>
                    <div className={"col-4"}>
                        <fieldset className={"form-group"} style={{textAlign: 'center'}}>
                            <label htmlFor={"discount"}>قیمت با تخفیف</label>
                            {status ? (
                                <input style={{height: '45px', textAlign: 'center',cursor : 'not-allowed !important'}} value={0}
                                       disabled className={"form-control deactive"} id={"discount input-dis"}
                                       name={"discount"} min={0}
                                       placeholder={"0"}/>
                            ) : (
                                <input style={{height: '45px', textAlign: 'center'}} value={priceData.discount}
                                       type={"number"} className={"form-control"} id={"discount"} name={"discount"}
                                       min={0}
                                       onChange={e => HandlePrice(e)}
                                       placeholder={"0"}/>
                            )}
                        </fieldset>

                    </div>
                    <div className={"col-4"}>
                        <p style={{textAlign: 'center', fontSize: 12}}>با تخفیف</p>
                        <fieldset>
                                <span className={"checkboxed priceee"} style={{color: '#fff'}}>
                                    <i className={"bx bx-check"}></i>
                                </span>
                            <input type="checkbox"
                                   onChange={e => HandleChange(e)}
                                   name={"discount"}
                                   className={"checked-do"}
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
