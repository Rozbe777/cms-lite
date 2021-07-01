import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import {Request} from "../../../../services/AdminService/Api";
import {MultiOption} from "./MultiOption";
import {MultiSelected} from "./MultiSelected";
import $ from "jquery";

export const LimitedUse = ({limit, out: setOut}) => {

    const [status, setStatus] = useState(true);
    const [data, setData] = useState({limit: limit ? limit : null})
    const [productData, setProductData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [checkCode, setCheckCode] = useState(false)
    const [checkUser, setCkeckUser] = useState(false)
    const [typeSel, setTypeSel] = useState({types: ''});
    const [catSel, setCatSel] = useState([]);

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

    const CategoryGet = async () => {

    }

    const handleSearchProducts = e => {
        let searchdata = {search: '', pageSize: 10}

        if (e) {
            searchdata.search = e;
            setLoading(true);
            Request.GetAllProducts(searchdata).then(res => {
                setLoading(false);
                setProductData(res.data.data.data);
            })
        } else {
            setLoading(true);
            Request.GetAllProducts(searchdata).then(res => {
                setLoading(false);
                setProductData(res.data.data.data);
            })
        }

    }

    const handleSearchCategore = e => {
        let searchdata = {search: '', pageSize: 10}
        if (e) {
            searchdata.search = e;
            setLoading(true);
            Request.GetAllCategory(searchdata).then(res => {
                setLoading(false);
                setCategoryData(res.data.data.data);
            })
        } else {
            setLoading(true);
            Request.GetAllProducts(searchdata).then(res => {
                setLoading(false);
                setCategoryData(res.data.data.data);
            })
        }

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


    const handleChoise = (e, id) => {
        e.preventDefault();

        if (id == 0) {
            let typp = {...typeSel};
            typp.types = "all";
            setTypeSel(typp);
        } else if (id == 1) {
            let typpp = {...typeSel};
            typpp.types = "miniPrice";
            setTypeSel(typpp);

        } else if (id == 2) {
            let typpps = {...typeSel};
            typpps.types = "miniCount";
            setTypeSel(typpps);

        } else if (id == 3) {
            let typppb = {...typeSel};
            typppb.types = "maxPrice";
            setTypeSel(typppb);
        } else {

        }

    }

    $(".main-selected").click(function () {
        $(".input-searchsss").addClass("active");
        $(".input-searchsss input").focus();
    })


    const handleSelecete = e => {

        setCatSel(e);

    }
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

    return (
        <div className={"col-lg-4 col-sm-12 col-md-8 customPrice"} id={"prices"} style={{overflow: 'inherit'}}>

            <div className={"col-12"}>
                <div className={"row"} style={{marginTop: '15px'}}>
                    <div className={"col-12"}>

                        <div className={"content-select firstes"} style={{marginBottom : 20}}>

                            <fieldset>
                                <div className="checkbox">
                                    <input type="checkbox" onChange={e => handleChangeCheckCode(e)}
                                           className="checkbox-input" id="checkbox2"/>
                                    <label style={{fontSize : '16px' , fontWeight : 100}} htmlFor="checkbox2">محدود کردن تعداد استفاده از این کد تخفیف</label>
                                </div>
                            </fieldset>

                        </div>


                    </div>

                    {checkCode ? (
                        <div className={"col-12"} style={{marginBottom : 20}}>
                            <input type="number" name="title" id="title" className="form-control" placeholder={"تعداد قابل استفاده"}/>
                        </div>
                    ) : ''}

                    <div className={"col-12"}>

                        <div className={"content-select firstes"} style={{marginBottom : 20}}>

                            <fieldset>
                                <div className="checkbox">
                                    <input type="checkbox" onChange={e => handleChangeCheckUser(e)}
                                           className="checkbox-input" id="checkboxUser"/>
                                    <label style={{fontSize : '16px' , fontWeight : 100}} htmlFor="checkboxUser">محدود کردن تعداد استفاده برای هر کاربر</label>
                                </div>
                            </fieldset>

                        </div>


                    </div>

                    {checkUser ? (
                        <div className={"col-12"} style={{marginBottom : 20}}>
                            <input type="number" name="title" id="title" className="form-control" placeholder={"تعداد قابل استفاده برای هر کاربر"}/>
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
