import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import {Request} from "../../../../services/AdminService/Api";
import {MultiOption} from "./MultiOption";
import {MultiSelected} from "./MultiSelected";
import $ from "jquery";

export const LimitedUse = ({defDataTU , defDataUU ,dataOut}) => {


    const [checkCode, setCheckCode] = useState(defDataTU ? true : false)
    const [checkUser, setCkeckUser] = useState(defDataUU ? true : false)

    const [dataDis , setDis] = useState( defDataTU ? defDataTU : '');
    const [dataUser , setUser] = useState(defDataUU ? defDataUU : '');


    const handleClose = e => {
        e.preventDefault();
        $("#back-loaderedss").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loaderedss"));
    }

    const handleAdd = e => {
        e.preventDefault();
        let codeVal = checkCode ? dataDis : null;
        let userVal = checkUser ? dataUser : null;
        let striShow = '';

        if (checkCode && checkUser){
            striShow = `محدودیت ${codeVal} استفاده  و محدودیت ${userVal} استفاده برای هر کاربر`;
            dataOut({
                codeVal,
                userVal,
                striShow
            })
        }else if (checkCode && !checkUser){
            striShow = `محدودیت ${codeVal} استفاده`
            dataOut({
                codeVal,
                userVal,
                striShow
            })
        }else if (!checkCode && checkUser){
            striShow = `محدودیت ${userVal} استفاده برای هر کاربر`
            dataOut({
                codeVal,
                userVal,
                striShow
            })
        }else{
            striShow = "بدون محدودیت";
            dataOut({
                codeVal,
                userVal,
                striShow
            })
        }

        handleClose(e);
    }


    useEffect(() => {
        if (status) {
            $("span.checkboxed.limi").addClass("active");
        } else {
            $("span.checkboxed.limi").removeClass("active");
        }
    }, [])






    $(".main-selected").click(function () {
        $(".input-searchsss").addClass("active");
        $(".input-searchsss input").focus();
    })


    const handleChangeCheckCode = (e, type) => {
        if (e.target.checked) {
            setCheckCode(true)
        } else {
            setCheckCode(false)
        }
    }

    const handleChangeCheckUser = (e, type) => {
        if (e.target.checked) {
            setCkeckUser(true)
        } else {
            setCkeckUser(false)
        }
    }

    const handleUser = e => {
        e.preventDefault();
        setUser(e.target.value)
    }
 const handleCode = e => {
        e.preventDefault();
        setDis(e.target.value)
    }

    return (
        <div className={"col-lg-4 col-sm-12 col-md-8 customPrice"} id={"prices"} style={{overflow: 'inherit'}}>

            <div className={"col-12"}>
                <div className={"row"} style={{marginTop: '15px'}}>
                    <div className={"col-12"}>

                        <div className={"content-select firstes"} style={{marginBottom : 20}}>

                            <fieldset>
                                <div className="checkbox">
                                    <input type="checkbox" defaultChecked={checkCode ? checkCode : false} onChange={e => handleChangeCheckCode(e)}

                                           className="checkbox-input" id="checkbox2"/>
                                    <label style={{fontSize : '16px' , fontWeight : 100}} htmlFor="checkbox2">محدود کردن تعداد استفاده از این کد تخفیف</label>
                                </div>
                            </fieldset>

                        </div>


                    </div>

                    {checkCode ? (
                        <div className={"col-12"} style={{marginBottom : 20}}>
                            <input type="number" style={{textAlign :'center'}} value={dataDis ? dataDis : ''} onChange={e => handleCode(e)} id="title" className="form-control" placeholder={"تعداد قابل استفاده"}/>
                        </div>
                    ) : ''}

                    <div className={"col-12"}>

                        <div className={"content-select firstes"} style={{marginBottom : 20}}>

                            <fieldset>
                                <div className="checkbox">
                                    <input type="checkbox" defaultChecked={checkUser ? checkUser : false} onChange={e => handleChangeCheckUser(e)}
                                           className="checkbox-input" id="checkboxUser"/>
                                    <label style={{fontSize : '16px' , fontWeight : 100}} htmlFor="checkboxUser">محدود کردن تعداد استفاده برای هر کاربر</label>
                                </div>
                            </fieldset>

                        </div>


                    </div>

                    {checkUser ? (
                        <div className={"col-12"} style={{marginBottom : 20}}>
                            <input type="number" style={{textAlign :'center'}} value={dataUser ? dataUser : ''} onChange={e => handleUser(e)} id="title" className="form-control" placeholder={"تعداد قابل استفاده برای هر کاربر"}/>
                        </div>
                    ) : ''}




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
