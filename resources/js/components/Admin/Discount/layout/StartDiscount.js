import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import {Request} from "../../../../services/AdminService/Api";
import {MultiOption} from "./MultiOption";
import {MultiSelected} from "./MultiSelected";
import $ from "jquery";

export const StartDiscount = ({timeShows , timers, limit, out: setOut}) => {

    const [status, setStatus] = useState(true);
    const [data, setData] = useState({limit: limit ? limit : null})
    const [productData, setProductData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [typeSel, setTypeSel] = useState({types: ''});
    const [catSel, setCatSel] = useState([]);
    const [time, setTime] = useState([]);
    const [timeShow, setTimeShow] = useState([]);

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

    const handleSearchProducts = e => {
        let searchdata = {search: '', pageSize: 10}
        console.log(e);

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

        timers.map(item => {
            let strings = item.h + " : " + item.m;
            timeShow.push({
                id: strings,
                name: strings
            })
            setTimeShow(timeShow)
        })

        // handleTime();
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


    // const handleChoise = (e, id) => {
    //     e.preventDefault();
    //
    //     if (id == 0) {
    //         let typp = {...typeSel};
    //         typp.types = "all";
    //         setTypeSel(typp);
    //     } else if (id == 1) {
    //         let typpp = {...typeSel};
    //         typpp.types = "miniPrice";
    //         setTypeSel(typpp);
    //
    //     } else if (id == 2) {
    //         let typpps = {...typeSel};
    //         typpps.types = "miniCount";
    //         setTypeSel(typpps);
    //
    //     } else if (id == 3) {
    //         let typppb = {...typeSel};
    //         typppb.types = "maxPrice";
    //         setTypeSel(typppb);
    //     } else {
    //
    //     }
    //
    // }

    $(".main-selected").click(function () {
        $(".input-searchsss").addClass("active");
        $(".input-searchsss input").focus();
    })


    const handleSelecete = e => {

        setCatSel(e);

    }




    return (
        <div className={"col-lg-4 col-sm-12 col-md-8 customPrice"} id={"prices"} style={{overflow: 'inherit'}}>

            <div className={"col-12"}>
                <div className={"row"} style={{marginTop: '15px'}}>


                    <div className={"col-md-6 col-sm-12"}>

                        <div className={"content-select firstes"}>

                            <p>تاریخ شروع</p>

                            <MultiOption name={"time-roles"}

                                // handleChoise={handleChoise}
                                         data={timeShows}
                                // selected={item => handleCloseFirst(item)}

                            />

                        </div>

                    </div>


                    <div className={"col-md-6 col-sm-12"}>

                        <div className={"content-select firstes"}>

                            <p>ساعت</p>

                            <MultiOption name={"time-roles"}

                                // handleChoise={handleChoise}
                                         data={timeShows}
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
