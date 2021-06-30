import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import {Request} from "../../../../services/AdminService/Api";
import {MultiOption} from "./MultiOption";
import {MultiSelected} from "./MultiSelected";
import $ from "jquery";

export const UserSetting = ({limit, out: setOut}) => {

    const [status, setStatus] = useState(true);
    const [data, setData] = useState({limit: limit ? limit : null})
    const [productData, setProductData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [typeSel, setTypeSel] = useState({types: ''});
    const [catSel, setCatSel] = useState([]);

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

    const CategoryGet = async () => {

    }


 const handleSearchUser = e => {
        let searchdata = {search: '', pageSize: 10}
        if (e) {
            searchdata.search = e;
            setLoading(true);
            Request.GetAllUserApi({params : searchdata}).then(res => {
                setLoading(false);
                setUserData(res.data.data.data);
            })
        } else {
            setLoading(true);
            Request.GetAllUserApi({params : searchdata}).then(res => {
                setLoading(false);
                setUserData(res.data.data.data);
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
            typpp.types = "group";
            setTypeSel(typpp);

        } else if (id == 2) {
            let typpps = {...typeSel};
            typpps.types = "sepcial";
            setTypeSel(typpps);
            handleSearchUser();

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
    console.log("vsdvsdv", typeSel)


    return (
        <div className={"col-lg-4 col-sm-12 col-md-8 customPrice"} id={"prices"} style={{overflow: 'inherit'}}>

            <div className={"col-12"}>
                <div className={"row"} style={{marginTop: '15px'}}>
                    <div className={"col-12"}>

                        <div className={"content-select firstes"}>

                            <p style={{textAlign: 'center'}}> اعمال شود روی</p>

                            <MultiOption name={"status"} handleChoise={handleChoise} data={[{
                                id: 'همه کاربران',
                                name: 'همه کاربران'
                            }, {
                                id: 'گروهی از کاربران',
                                name: 'گروهی از کاربران'
                            }, {
                                id: 'کاربران خاص',
                                name: 'کاربران خاص'
                            }]}
                                // selected={item => handleCloseFirst(item)}

                            />

                        </div>

                    </div>


                    {typeSel.types ? typeSel.types == "group" ? (
                        <div className={"col-12"}>
                            <p style={{textAlign : 'center'}}>کاربرانی که</p>
                            <MultiOption name={"status"}  data={[{
                                id: 'کاربرانی که قبلا خرید کرده اند',
                                name: 'کاربرانی که قبلا خرید کرده اند'
                            }, {
                                id: 'کاربرانی که خرید نکرده اند',
                                name: 'کاربرانی که خرید نکرده اند'
                            }]}
                                // selected={item => handleCloseFirst(item)}

                            />
                        </div>

                    ) : typeSel.types == "sepcial" ? (
                        <div className={"col-12"}>
                            <p>کاربر</p>


                            <MultiSelected name={"cat-show"} data={userData}
                                           loadings={loading}
                                           selected={handleSelecete}
                                           searchs={handleSearchUser}

                                           // me={e => handleSearchCategory(e)}
                            />
                        </div>

                    ) : '' : ''}


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
