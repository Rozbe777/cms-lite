import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom'
import {Request} from "../../../../services/AdminService/Api";
import './../_shared/style.scss';
import {MultiOption} from "./../layout/MultiOption";
import $ from "jquery";
import {useQuery} from "react-query";
import {MultiSelected} from "../layout/MultiSelected";
import {Searchs} from "../layout/Context";

export const AddDiscount = ({type}) => {


    const [edit, setEdit] = useState(false);

    const [searchs, setSearchs] = useState({search: ''});
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [catData, setCatData] = useState({});

    useEffect(() => {
        GetAllCategory();
        GetAllProducts();
    }, [])

    const handleClose = (e) => {
        e.preventDefault()
        $("span.checkboxeds").removeClass("active");
        ReactDOM.render('', document.getElementById("add-datas"));

        localStorage.removeItem("is_menu");
        localStorage.removeItem("status");
        localStorage.removeItem("selected");
        localStorage.removeItem("comment_status");
        localStorage.removeItem("robots");

    }

    const GetAllCategory = () => {
        setLoading(true);
        Request.GetAllCategory().then(res => {
            setLoading(false);
            setCatData(res.data.data);
        })
    }
    const GetAllProducts = () => {

    }

    // console.log(data)


    $(function () {
        $("ul#select-item li").click(function () {
            let indexs = $(this).index();
            $("ul#select-item li").removeClass("active");
            $(this).addClass("active");
            $("ul.contentsssc li").removeClass("active")
            $("ul.contentsssc li").eq(indexs).addClass("active")
        })


        $("ul#main-child-sels li").click(function () {
            let indexes = $(this).index();
            console.log(indexes);
            if (indexes === 2) {
                $(".seconds.category").removeClass("active");

                $(".seconds.product").addClass("active");
            } else if (indexes === 3) {
                $(".seconds.product").removeClass("active");

                $(".seconds.category").addClass("active");
            } else {
                $(".seconds.product").removeClass("active");
                $(".seconds.category").removeClass("active");
            }
        })

        $(".main-selected").click(function () {
            $(".input-searchsss").addClass("active");
            $(".input-searchsss input").focus();
        })

        // $(".firstes").click(function (){
        //     $(this).addClass("active");
        //     $(".seconds").addClass("active");
        // })
    })


    const HandleForm = e => {
        e.preventDefault();
    }


    const HandleEdit = e => {
        e.preventDefault();
    }

    const HandleDuplicate = e => {
        e.preventDefault();

    }

    const handleCloseFirst = item => {
        if (item === '') {
            $(".seconds").removeClass("active");
        }
    }


    const handleSearch = e => {
        let searchdata = {search: ''}
        searchdata.search = e;
        console.log(searchdata);
        setLoading(true);
        Request.GetAllProducts(searchdata).then(res => {
            setLoading(false);
            console.log("all pro", res.data.data)
            // setCatData(res.data.data);
        })
    }

    return (
        <div id={"category_add_pop_base"}>
            <ul className="nav nav-tabs tab-layout" role="tablist">
                <li className="nEav-item col-6 nav-custom">
                    <a className="nav-link active" id="cat-tab" data-toggle="tab" href="#cat" aria-controls="cat"
                       role="tab" aria-selected="true">
                        <span className="align-middle">ایجاد کد تخفیف</span>
                        <i id={"visible-custom"} className={"bx bxs-pencil"}></i>
                    </a>
                </li>
                <li className="nav-item col-6 nav-custom ">
                    <a className="nav-link" id="seo-tab" data-toggle="tab" href="#seo" aria-controls="seos"
                       role="tab" aria-selected="false">
                        <span className="align-middle">تنظیمات پیشرفته</span>
                        <i id={"visible-custom"} className={"bx bxl-internet-explorer"}></i>
                    </a>
                </li>
            </ul>
            <div className="tab-content" style={{padding: 0, position: 'relative'}}>
                <div className="tab-pane active" id="cat" aria-labelledby="cat-tab" role="tabpanel">
                    <div className={"content-pages"}>


                    </div>
                </div>
                <div className="tab-pane" id="seo" aria-labelledby="seo-tab" role="tabpanel">
                    <div className={"content-pages"}>

                        <div className={"discound-setting"}>
                            <div className={"row"}>
                                <div className={"col-lg-3 col-md-4"}>
                                    <ul id={"select-item"}>
                                        <li id={"itemss"} className={"active"}>
                                            <span><i className={"bx bx-purchase-tag"}></i> &nbsp;&nbsp; نوع عملکرد تخفیف </span>
                                        </li>
                                        <li id={"itemss"}>
                                            <span><i className={"bx bx-user"}></i> &nbsp;&nbsp; تنظیمات کاربران </span>
                                        </li>
                                        <li id={"itemss"}>
                                    <span><i
                                        className={"bx bxs-calendar-alt"}></i> &nbsp;&nbsp; تاریخ شروع تخفیفات</span>
                                        </li>
                                        <li id={"itemss"}>
                                            <span><i className={"bx bx-shopping-bag"}></i> &nbsp;&nbsp; شرایط سبد خرید </span>
                                        </li>
                                        <li id={"itemss"}>
                                            <span><i
                                                className={"bx bx-slider"}></i> &nbsp;&nbsp; محدودیت استفاده </span>
                                        </li>
                                        <li id={"itemss"}>
                                            <span><i className={"bx bxs-calendar-alt"}></i> &nbsp;&nbsp; تاریخ پایان تخفیف </span>
                                        </li>

                                    </ul>
                                </div>

                                <div className={"col-lg-9 col-md-8"}
                                     style={{position: 'relative', paddingLeft: '30px'}}>
                                    <ul className={"contentsssc"}>
                                        <li id={"boxess"} className={"active"}>
                                            <div className={"row"} style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                display: 'flex',
                                                height: '360px',
                                                width: '100%'
                                            }}>
                                                <div className={"col-md-6 col-sm-12"}>
                                                    <div className={"content-select firstes"}>

                                                        <p>تخفیف اعمال شود روی</p>

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
                                                                     selected={item => handleCloseFirst(item)}

                                                        />

                                                    </div>
                                                </div>
                                                <Searchs.Provider value={{searchs, setSearchs}}>


                                                    <div className={"col-md-6 col-sm-12 seconds category"}>
                                                        <div className={"content-select"}>


                                                            <p>لیست دسته بندی ها</p>

                                                            {loading ? (
                                                                <div className="spinner-border text-primary"
                                                                     role="status">
                                                                    <span className="sr-only">در حال بارگذاری ...</span>
                                                                </div>
                                                            ) : (
                                                                <MultiSelected name={"cat-show"} data={catData}
                                                                               search={e => handleSearch(e)}/>
                                                            )}


                                                        </div>
                                                    </div>

                                                    <div className={"col-md-6 col-sm-12 seconds product"}>
                                                        <div className={"content-select"}>


                                                            <p>لیست محصولات</p>

                                                            {loading ? (
                                                                <div className="spinner-border text-primary"
                                                                     role="status">
                                                                    <span className="sr-only">در حال بارگذاری ...</span>
                                                                </div>
                                                            ) : (
                                                                <MultiSelected name={"cat-show"} data={catData}/>
                                                            )}


                                                        </div>
                                                    </div>
                                                </Searchs.Provider>
                                            </div>
                                        </li>
                                        <li id={"boxess"}>

                                            پیج دو

                                        </li>
                                        <li id={"boxess"}>

                                            پیج سه

                                        </li>
                                        <li id={"boxess"}>
                                            پیج چهار
                                        </li>
                                        <li id={"boxess"}>

                                            پیج پنج
                                        </li>
                                        <li id={"boxess"}>
                                            پنج شش
                                        </li>

                                    </ul>
                                </div>


                            </div>

                        </div>

                    </div>
                </div>

                <div className={"col-12 bottom-footer"}>
                    <div className={"row"}>

                        <div className={"col-6"} onClick={e => handleClose(e)}
                             style={{
                                 cursor: 'pointer',
                                 textAlign: 'center',
                                 borderLeft: '1px solid #a9a9a9'
                             }}>

                            {/*  this is a button  */}
                            <span type={"reset"} id={"clear"}>
                                انصراف
                            </span>
                        </div>

                        {type ? type == 'edit' ? edit ? (
                                <div onClick={(e) => HandleEdit(e)}
                                     className={"col-6"}
                                     style={{textAlign: 'center', cursor: 'pointer', background: "#5a8dee", color: '#fff'}}>
                                    <span>ویرایش</span>
                                </div>
                            )
                            : (
                                <div
                                    id={"disable-div"}
                                    className={"col-6"}
                                    style={{
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        background: "#5a8dee",
                                        color: '#fff'
                                    }}>
                                    <span style={{color: '#fff !important'}}>ویرایش</span>
                                </div>
                            )
                            : (
                                <div onClick={(e) => HandleDuplicate(e)}
                                     className={"col-6"}
                                     style={{
                                         textAlign: 'center',
                                         cursor: 'pointer',
                                         background: "#5a8dee",
                                         color: '#fff'
                                     }}>
                                    <span style={{color: '#fff !important'}}>ذخیره کپی</span>
                                </div>
                            ) :

                            (
                                <div onClick={(e) => HandleForm(e)} className={"col-6"}
                                     style={{
                                         textAlign: 'center',
                                         cursor: 'pointer',
                                         background: "#5a8dee",
                                         color: '#fff'
                                     }}>
                                    <span style={{color: '#fff !important'}}>ذخیره</span>
                                </div>
                            )}


                    </div>

                </div>
            </div>

        </div>
    )
}
