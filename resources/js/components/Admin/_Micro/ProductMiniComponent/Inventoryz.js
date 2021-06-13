import React, {useState , useEffect} from "react";
import ReactDOM from 'react-dom';
import './_Shared/style.scss'

export const Inventory = ({count, out: setOut}) => {

    const [status, setStatus] = useState(count === null ? true : false);
    const [data, setData] = useState({count: count ? count : null})
    const handleClose = e => {
        e.preventDefault();
        $("#back-loaderedss").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loaderedss"));
    }

    const handleAdd = e => {
        e.preventDefault();
        setOut(data);
        handleClose(e);
    }

    useEffect(() => {
        if (status) {
            $("span.checkboxed.invev").addClass("active");
        } else {
            $("span.checkboxed.invev").removeClass("active");
        }
    }, [])

    const HandleChange = (e, id) => {
        let checkBoxCustom = $("span.checkboxed.invev");
        if (e.target.checked) {
            checkBoxCustom.addClass("active")
            setStatus(true)
            setData({count: null})

        } else {
            setData({count: 0})
            checkBoxCustom.removeClass("active")
            setStatus(false)
        }
    }




    const HandleInventory = e => {
        e.preventDefault();
        let datain = {...data};
        datain[e.target.name] = e.target.value;
        setData(datain);
    }

    return (
        <div className={"col-lg-4 col-sm-12 col-md-8"} id={"prices"}>

            <div className={"col-12"}>
                <div className={"row"} style={{marginTop: '15px'}}>
                    <div className={"col-8"}>
                        <fieldset className={"form-group"} style={{textAlign: 'center'}}>
                            <label htmlFor={"discount"}>موجودی</label>
                            {!status ? (
                                <input style={{height: '45px', textAlign: 'center'}} value={data.count ? data.count : null}
                                       onChange={e => HandleInventory(e)}
                                       type={"number"} className={"form-control"} id={"discount"} name={"count"}
                                       min={0}
                                       placeholder={"0"}/>
                            ) : (
                                <input style={{height: '45px', textAlign: 'center',}}
                                       disabled className={"form-control deactive"} id={"discount input-dis"}
                                       name={"count"}
                                       value={"نامحدود"}
                                       placeholder={"نامحدود"}/>
                            )}
                        </fieldset>
                    </div>
                    <div className={"col-4"}>
                        <p style={{textAlign: 'center', fontSize: 12}}>نامحدود</p>
                        <fieldset>
                                <span className={"checkboxed priceee invev"} style={{color: '#fff'}}>
                                    <i className={"bx bx-check"}></i>
                                </span>
                            <input type="checkbox"
                                   onChange={e => HandleChange(e)}
                                   name={"discount"}
                                   defaultChecked={status}
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
