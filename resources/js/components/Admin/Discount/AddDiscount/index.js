import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom'
import {Request} from "../../../../services/AdminService/Api";
import './../_shared/style.scss';
import {MultiOption} from "./../layout/MultiOption";
import $ from "jquery";
import {success} from "../../../../helper";
import {useQuery} from "react-query";
import {MultiSelected} from "../layout/MultiSelected";
import {Searchs} from "../layout/Context";
import {Switcher} from "../../../HOC/Switch";
import {NewFeture} from "../../_Micro/ProductMiniComponent/NewFeture";
import {TopPrice} from "../layout/TopPrice";

export const AddDiscount = ({type}) => {


    const [edit, setEdit] = useState(false);

    const [searchs, setSearchs] = useState([]);
    const [formData, setFormData] = useState({});
    const [productData, setProductData] = useState({});
    const [disTypesDis, setDisTypesDis] = useState('')
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(false);
    const [catData, setCatData] = useState({});
    const [catSel, setCatSel] = useState([]);
    const [userSelectList, setUserSelectList] = useState([]);
    const [proSel, setProSel] = useState([]);
    const [typeAct, setTypeAct] = useState('')
    const [typeUser, setTypeUser] = useState('')
    const [userGroups, setUserGroups] = useState('');
    const [dis, setDis] = useState(true);
    const [disUser, setDisUser] = useState(true);
    const [productTotal, setProductTotal] = useState(0);
    const [userTotal, setUserTotal] = useState(0);

    useEffect(() => {
        GetAllCategory();
        GetAllProducts();
        GetAllUser();
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

    console.log("cat sel => ", catSel)
    console.log("pro sel => ", proSel)

    const GetAllCategory = () => {
        setLoading(true);
        Request.GetAllCategory().then(res => {
            setLoading(false);
            setCatData(res.data.data);
        })
    }
    const GetAllProducts = () => {
        Request.GetAllProducts().then(res => {
            setLoading(false);
            setProductTotal(res.data.data.total);
        })
    }
    const GetAllUser = () => {
        Request.GetAllUserApi().then(res => {
            setLoading(false);
            console.log("vvvvvv", res.data.data.total, res.data.data)
            // setUserData(res.data.data.data);
            setUserTotal(res.data.data.total);
        })
    }

    const GetSearchProducts = (search) => {
        setLoading(true);
        if (search.search == '') {
            search.pageSize = 10;
            Request.GetAllProducts(search).then(res => {
                setLoading(false);
                setProductData(res.data.data.data)
            })
        } else {
            Request.GetAllProducts(search).then(res => {
                setLoading(false);
                setProductData(res.data.data.data)
            })
        }

    }

    const GetSearchUsers = (search) => {
        setLoading(true);
        if (search.search == '') {
            search.pageSize = 10;
            Request.GetAllUserApi({params: search}).then(res => {
                setLoading(false);
                setUserData(res.data.data.data)
            })
        } else {
            Request.GetAllUserApi({params: search}).then(res => {
                setLoading(false);
                setUserData(res.data.data.data)
            })
        }

    }

    // console.log(data)


    $(function () {
        $("ul#select-item li").click(function () {
            let indexsm = $(this).index();
            $("ul#select-item li").removeClass("active");
            $(this).addClass("active");
            $("ul.contentsssc li").removeClass("active")
            $("ul.contentsssc li#boxess").eq(indexsm).addClass("active")
        })


        $("ul#main-child-sels.status li").click(function () {
            let indexes = $(this).index();
            if (indexes === 2) {
                setTypeAct("pro")
                $(".seconds.category").removeClass("active");
                setDis(true)

                $(".seconds.product").addClass("active");
            } else if (indexes === 3) {
                setTypeAct("cat")

                $(".seconds.product").removeClass("active");
                setDis(true)

                $(".seconds.category").addClass("active");
            } else if (indexes === 0) {
                setTypeAct("allPriceCart")

                setDis(false)
                $(".seconds.product").removeClass("active");
                $(".seconds.category").removeClass("active");
            } else {
                setTypeAct("allPriceCartWSendPrice");
                $(".seconds.product").removeClass("active");
                $(".seconds.category").removeClass("active");
            }
        })


        $("ul#main-child-sels.userDis li").click(function () {
            let indexes = $(this).index();
            if (indexes === 2) {
                setTypeUser("speUser")
                $(".seconds.category").removeClass("active");
                setDisUser(true)
                setUserGroups('');


                $(".seconds.product").addClass("active");
            } else if (indexes === 1) {
                setTypeUser("groupUser")

                $(".seconds.product").removeClass("active");
                setDisUser(true)

                $(".seconds.category").addClass("active");
            } else if (indexes === 0) {
                setTypeUser("allUser")
                setUserGroups("allUser");
                setDisUser(true)
                $(".seconds.product").removeClass("active");
                $(".seconds.category").removeClass("active");
            } else {

            }
        })



        $("ul#main-child-sels.groupUserSO li").click(function () {
            let indexes = $(this).index();
            if (indexes === 0) {
                setUserGroups("userOldSel");
                setDisUser(true)
            } else if (indexes === 1) {
                setUserGroups("userOldNotSel")
                setDisUser(true)
            } else {

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

    const HandleTopPrice = e => {
        e.preventDefault();
        setEdit(true)
        $("#back-loaderedss").addClass("active");
        ReactDOM.render(<TopPrice close={e => closeFeture(e)}
            // dataOut={}
        />, document.getElementById("back-loaderedss"));
    }

    const closeFeture = (e) => {
        e.preventDefault();
        $("#back-loaderedss").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loaderedss"));
    }

    const handleCloseFirst = item => {
        if (item === '') {
            $(".seconds").removeClass("active");
        }
    }

    const handleSetUser = item => {
        if (item === '') {
            $(".seconds").removeClass("active");
        }
    }
    const handleSetUserAct = item => {
        if (item === '') {
            setUserGroups("")
        }
    }


    const handleSearchCategory = e => {
        let searchdata = {search: ''}
        searchdata.search = e;
        setLoading(true);
        Request.GetAllProducts(searchdata).then(res => {
            setLoading(false);
            // setCatData(res.data.data);
        })
    }
    const handleSearchProducts = e => {
        let searchdata = {search: '', pageSize: 0}
        searchdata.search = e;
        searchdata.pageSize = parseInt(productTotal);
        GetSearchProducts(searchdata);
        // Request.GetAllProducts(searchdata).then(res => {
        //     setLoading(false);
        //     console.log("all pro", res.data.data)
        //     // setCatData(res.data.data);
        // })
    }
    const handleSearchUser = e => {
        let searchdata = {search: '', pageSize: 0}
        searchdata.search = e;
        searchdata.pageSize = parseInt(userTotal);

        GetSearchUsers(searchdata);
        // Request.GetAllProducts(searchdata).then(res => {
        //     setLoading(false);
        //     console.log("all pro", res.data.data)
        //     // setCatData(res.data.data);
        // })
    }

    const handleCopy = (e, typeId) => {
        e.preventDefault();
        // console.log("////" ,typeId);
        var textCopy = document.getElementById("discount-code");
        textCopy.select();
        textCopy.setSelectionRange(0, 99999)
        document.execCommand("copy");

        success("کد تخفیف کپی شد")
        // let data="vsdvsdvsdvsdvsdvsdvsdv";
        // document.execCommand('copy');
    }


    const handleDis = e => {
        e.preventDefault();
    }
    const handleSwitchStatus = state => {
        setEdit(true)
        localStorage.setItem("status", status ? "active" : "deactivate");
    }

    const handleTypeDiscount = e => {

        if (e == 'مبلغ ثابت') {

            setDisTypesDis('تومان');
        } else if (e == 'درصد') {

            setDisTypesDis('درصد')
        } else {
            setDisTypesDis('')
        }
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
            <div className="tab-content" style={{padding: 0, position: 'relative', marginTop: '-15px'}}>
                <div className="tab-pane show-det-discount active" id="cat" aria-labelledby="cat-tab" role="tabpanel">
                    <div className={"row discount-rows"} style={{marginTop: '30px', padding: '30px 140px'}}>


                        <div className={"col-12"}>
                            <div className={"discount-detail"}>
                                <div className={"row"}>
                                    <div className={"col-md-6 col-sm-12 discount-det"}>
                                        <p>
                                            <i className={"bx bx-calendar"}></i>
                                            <span>شروع : </span>
                                            <p>8 تیر 1400 ساعت 10:00</p>
                                        </p>
                                        <p>
                                            <i className={"bx bx-basket"}></i>
                                            <span>استفاده : </span>
                                            <p>0 بار</p>
                                        </p>
                                        <p>
                                            <a id={"dis-badge"}>0 درصد</a>
                                        </p>
                                    </div>
                                    <div className={"col-md-6 col-sm-12 discount-code"}>
                                        <p>
                                            <i className={"bx bx-copy-alt"}
                                               onClick={e => handleCopy(e, "discount-code")}></i>
                                            <input id={"discount-code"} value={"vsdvsdvsdvsdvsdv"}/>
                                        </p>
                                        <p>
                                            <i className={"bx bx-copy-alt"}></i>
                                            <span id={"discount-link"}>لینک های تخفیف (برای اشتراک گذاری)</span>
                                        </p>
                                        <p style={{textAlign: 'left'}}>قابل استفاده روی کل خرید ، بدون محدودیت ، برای
                                            همه
                                            کاربران</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className={"col-lg-9 col-md-8 col-sm-12"} style={{paddingTop: '14px'}}>
                            <p>کد تخفیف</p>
                            <div className={"discounts active"}>

                                <input type={"text"} id={"make-discounts"} onChange={e => handleDis(e)}
                                       style={{float: 'left', textAlign: 'left'}}/>
                                <div className={"btn btn-primary"}
                                     style={{float: 'right', height: '100%', cursor: 'pointer'}}><i
                                    className={"bx bx-rotate-right"}></i> تولید کد تصادفی
                                </div>

                            </div>
                        </div>

                        <div className={"col-lg-3 col-md-4 col-sm-12"}>

                            <fieldset className="form-group " style={{marginTop: '13px', padding: '15px'}}>
                                <label id={"selectParent"}>وضعیت کد تخفیف</label>
                                <Switcher
                                    defaultState={true}
                                    // defaultState={dataUpdateParse ? dataUpdateParse.status == "active" ? true : false : true}
                                    status={(state) => handleSwitchStatus(state)} name={"showState"}
                                    valueActive={"فعال"}
                                    valueDeActive={"غیرفعال"}/>
                            </fieldset>
                        </div>

                        <div className={"col-md-4 col-sm-12"}>

                            <label>نوع تخفیف</label>
                            <MultiOption name={"type-disc"} data={[
                                {
                                    id: 'درصد',
                                    name: 'درصد'
                                }, {
                                    id: 'مبلغ ثابت',
                                    name: 'مبلغ ثابت'
                                }, {
                                    id: 'ارسال رایگان',
                                    name: 'ارسال رایگان'
                                },
                            ]} selected={e => handleTypeDiscount(e)}/>

                        </div>


                        <div className={"col-md-4 col-sm-12"} style={{paddingTop : '2px'}}>
                            <fieldset className="form-group"><label htmlFor="title"> مقدار
                                تخفیف {disTypesDis ? " ( " + disTypesDis + " ) " : ''} </label><input
                                type="text" name="titleContent" id="title" className="form-control" />
                            </fieldset>
                        </div>
                        <div className={"col-md-4 col-sm-12"}>

                            <fieldset className="form-group">
                                <label htmlFor="title">سقف مبلغ تخفیف</label>
                                <div className={"custom-in-show"} onClick={e => HandleTopPrice(e)}>

                                    <i className={"bx bx-pencil"}></i>

                                </div>
                            </fieldset>

                        </div>

                        <div style={{width: '100%', height: '70px'}}></div>
                    </div>
                </div>
                <div className="tab-pane " id="seo" aria-labelledby="seo-tab" role="tabpanel">
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


                                        {/*   action types  */}
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


                                                            <MultiSelected name={"cat-show"} data={catData}
                                                                           loadings={loading}
                                                                           selected={e => setCatSel(e)}
                                                                           me={e => handleSearchCategory(e)}/>


                                                        </div>
                                                    </div>

                                                    <div className={"col-md-6 col-sm-12 seconds product"}>
                                                        <div className={"content-select"}>


                                                            <p>لیست محصولات</p>


                                                            <MultiSelected name={"product-show"}
                                                                           loadings={loading}
                                                                           me={e => handleSearchProducts(e)}
                                                                           data={productData}/>


                                                        </div>
                                                    </div>
                                                </Searchs.Provider>


                                                <div className={"col-12"}>
                                                    <div className={"row"}>

                                                        {typeAct === "pro" && dis && searchs.length > 0 ? (
                                                            <div className={"col-md-6 col-sm-12 list-discount"}>
                                                                <p id={"tits"}>لیست محصولات شامل تخفیف</p>
                                                                <ul>
                                                                    {searchs.map((item, index) => (
                                                                        <li key={index}>{(index + 1) + " - " + item.name}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ) : ''}

                                                        {typeAct === "cat" && dis && catSel.length > 0 ? (
                                                            <div className={"col-md-6 col-sm-12 list-discount"}>
                                                                <p id={"tits"}>لیست دسته بندی های شامل تخفیف</p>
                                                                <ul>
                                                                    {catSel.map((item, index) => (
                                                                        <li key={index}>{(index + 1) + " - " + item.name}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ) : ''}

                                                        {typeAct === "allPriceCart" ? (
                                                            <p style={{textAlign: 'center', width: '100%'}}>تخفیف روی کل
                                                                مبلغ سبد خرید اعمال خواهد شد!</p>
                                                        ) : ''}

                                                        {typeAct === "allPriceCartWSendPrice" ? (
                                                            <p style={{textAlign: 'center', width: '100%'}}>تخفیف روی کل
                                                                مبلغ سبد خرید اعمال خواهد شد ولی شامل هزینه ارسال نمی
                                                                شود!</p>
                                                        ) : ''}


                                                    </div>
                                                </div>

                                            </div>
                                        </li>

                                        {/*  user types  */}
                                        <li id={"boxess"}>
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

                                                        <MultiOption name={"userDis"} data={[{
                                                            id: 'همه کاربران',
                                                            name: 'همه کاربران'
                                                        }, {
                                                            id: 'گروهی از کاربران',
                                                            name: 'گروهی از کاربران'
                                                        }, {
                                                            id: 'کاربران خاص',
                                                            name: 'کاربران خاص'
                                                        }]}
                                                                     selected={item => handleSetUser(item)}

                                                        />

                                                    </div>
                                                </div>
                                                <Searchs.Provider value={{searchs, setSearchs}}>


                                                    <div className={"col-md-6 col-sm-12 seconds category"}>
                                                        <div className={"content-select"}>


                                                            <p>کاربرانی که</p>


                                                            <MultiOption name={"groupUserSO"} data={[{
                                                                id: 'کاربرانی که قبلا خرید کرده اند',
                                                                name: 'کاربرانی که قبلا خرید کرده اند'
                                                            }, {
                                                                id: 'کاربرانی که خرید نکرده اند',
                                                                name: 'کاربرانی که خرید نکرده اند'
                                                            }]}
                                                                         selected={item => handleSetUserAct(item)}

                                                            />


                                                        </div>
                                                    </div>

                                                    <div className={"col-md-6 col-sm-12 seconds product"}>
                                                        <div className={"content-select"}>


                                                            <p>لیست کاربران</p>


                                                            <MultiSelected name={"product-show"}
                                                                           loadings={loading}
                                                                           selected={e => setUserSelectList(e)}
                                                                           me={e => handleSearchUser(e)}
                                                                           data={userData}/>


                                                        </div>
                                                    </div>
                                                </Searchs.Provider>


                                                <div className={"col-12"}>
                                                    <div className={"row"}>

                                                        {typeUser === "speUser" && disUser && userSelectList.length > 0 ? (
                                                            <div className={"col-md-6 col-sm-12 list-discount"}>
                                                                <p id={"tits"}>لیست کاربران خاص شامل تخفیف</p>
                                                                <ul>
                                                                    {userSelectList.map((item, index) => (
                                                                        <li key={index}>{(index + 1) + " - " + item.name}</li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ) : ''}


                                                        {userGroups == "userOldSel" ? (
                                                            <p style={{textAlign: 'center', width: '100%'}}>تخفیف روی
                                                                کاربرانی که قبلا خرید کرده اند اعمال میشد !</p>
                                                        ) : ''}

                                                        {userGroups == "userOldNotSel" ? (
                                                            <p style={{textAlign: 'center', width: '100%'}}>
                                                                تخفیف روی کاربرانی که قبلا خرید نکرده اند اعمال میشد !
                                                            </p>
                                                        ) : ''}

                                                        {userGroups == "allUser" ? (
                                                            <p style={{textAlign: 'center', width: '100%'}}>تخفیف روی
                                                                همه کاربران اعمال شود !</p>
                                                        ) : ''}


                                                    </div>
                                                </div>

                                            </div>
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

            <div id={"back-loaderedss"}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    background: 'rgba(0,0,0,0.3)',
                    top: 0,
                    right: 0
                }}>
                </div>
            </div>

        </div>
    )
}
