import React, {useState} from "react";
import ReactDOM from 'react-dom';
import './_Shared/style.scss'

export const Inventory = ({count, hasDiscount}) => {

    const [status, setStatus] = useState(true);
    const handleClose = e => {
        e.preventDefault();
        $("#back-loadered").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loadered"));
    }

    const HandleChange = (e, id) => {

        let checkBoxCustom = $("span.checkboxed.priceee");
        if (e.target.checked) {
            checkBoxCustom.addClass("active")
            setStatus(false)
            // $("input#input-dis").css("cursor" , "not-allowed");
            // checked.push({
            //     id: e.target.name,
            //     name: e.target.value
            // })
            // setCheck(checked)
            // console.log("1111111 : " , check)
        } else {
            checkBoxCustom.removeClass("active")
            setStatus(true)
            // const results = check.filter(obj => parseInt(obj.id) !== id);
            // var result = check.filter(obj => console.log("object name : " , parseInt(obj.id) , " / name : " , id));
            // setCheck(results)
        }
    }

    return (
        <div className={"col-lg-4 col-sm-12 col-md-8"} id={"prices"}>

            <div className={"col-12"}>
                <div className={"row"} style={{marginTop: '15px'}}>
                    <div className={"col-8"}>
                        <fieldset className={"form-group"} style={{textAlign: 'center'}}>
                            <label htmlFor={"discount"}>موجودی</label>
                            {status ? (
                                <input style={{height: '45px', textAlign: 'center'}} value={count ? count : 0}
                                       type={"number"} className={"form-control"} id={"discount"} name={"discount"}
                                       min={0}
                                       placeholder={"0"}/>
                            ) : (
                                <input style={{height: '45px', textAlign: 'center',}}
                                       disabled className={"form-control deactive"} id={"discount input-dis"}
                                       name={"discount"}
                                       value={"نامحدود"}
                                       placeholder={"نامحدود"}/>
                            )}
                        </fieldset>

                    </div>
                    <div className={"col-4"}>
                        <p style={{textAlign: 'center', fontSize: 12}}>نامحدود</p>
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
                    <div className={"col-6"} id={"btn-action"}>
                        ذخیره
                    </div>
                </div>
            </div>
        </div>
    )
}
