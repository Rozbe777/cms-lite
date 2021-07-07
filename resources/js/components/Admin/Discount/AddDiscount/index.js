import React, {useState, useEffect, useContext} from "react";
import ReactDOM from 'react-dom'
import moment from "jalali-moment";
import {Request} from "../../../../services/AdminService/Api";
import './../_shared/style.scss';
import {MultiOption} from "./../layout/MultiOption";
import $ from "jquery";
import {ErroHandle, error as ErrorToast, success} from "../../../../helper";
import {DiscoutAction} from "../layout/DiscoutAction";
import {Switcher} from "../../../HOC/Switch";
import {TopPrice} from "../layout/TopPrice";
import {CartAction} from "../layout/CartAction";
import {UserSetting} from "../layout/UserSetting";
import {LimitedUse} from "../layout/LimitedUse";
import {StartDiscount} from "../layout/StartDiscount";
import {EndDiscount} from "../layout/EndDiscount";
import {Tab} from "../../_Micro/Tab";
import {HandleTimeCheck} from "../Helper/Action";
import AddDiscountHelper from "../Helper/AddDiscount";

export const AddDiscount = ({type, results,backcheck, token, dataDefaul}) => {

    let Helper = new AddDiscountHelper();
    let start_dd = dataDefaul ? dataDefaul.coupon_settings.start_date ? moment(parseInt(dataDefaul.coupon_settings.start_date.toString() + "000")).locale('fa') : null : null;
    let end_dd = dataDefaul ? dataDefaul.coupon_settings.end_date ? moment(parseInt(dataDefaul.coupon_settings.end_date.toString() + "000")).locale('fa') : null : null;


    let def = {
        code: '',
        status: "active",
        type: 'percentage',
        max_limit: null,
        functionality: 'total_cart_price',
        user_status: 'all',
        functionality_amount: null,
    }


    const [allData, setAllData] = useState(dataDefaul ? dataDefaul : def)


    const [userGroupNew, setUserGroupNew] = useState([-1]);

    const [edit, setEdit] = useState(false);
    const [dateStart, setDateStart] = useState({
        date: {
            date: {
                year: start_dd ? start_dd ? start_dd.format('YYYY') : moment(new Date()).locale('fa').format('YYYY') : moment(new Date()).locale('fa').format('YYYY'),
                day: start_dd ? start_dd ? start_dd.format('D') : moment(new Date()).locale('fa').format('D') : moment(new Date()).locale('fa').format('D'),
                month: start_dd ? start_dd ? start_dd.format('MMMM') : moment(new Date()).locale('fa').format('MMMM') : moment(new Date()).locale('fa').format('MMMM'),
                monthNum: start_dd ? start_dd ? start_dd.format('M') : moment(new Date()).locale('fa').format('M') : moment(new Date()).locale('fa').format('M')
            },
            timestamp: dataDefaul ? dataDefaul.coupon_settings.start_date ? parseInt(dataDefaul.coupon_settings.start_date.toString() + "000") : '' : ''
        },
        time: dataDefaul ? {
            h: dataDefaul.coupon_settings.start_time ? dataDefaul.coupon_settings.start_time.split(":")[0] : '00',
            m: dataDefaul.coupon_settings.start_time ? dataDefaul.coupon_settings.start_time.split(":")[1] : '00',
            s: dataDefaul.coupon_settings.start_time ? dataDefaul.coupon_settings.start_time.split(":")[2] : '00'
        } : {
            h: "00",
            m: "00",
            s: '00'
        }
    })

    const [dateEnd, setDateEnd] = useState({
        date: {
            date: {
                year: end_dd ? end_dd.format('YYYY') : moment(new Date()).locale('fa').format('YYYY'),
                day: end_dd ? end_dd.format('D') : moment(new Date()).locale('fa').format('D'),
                month: end_dd ? end_dd.format('MMMM') : moment(new Date()).locale('fa').format('MMMM'),
                monthNum: end_dd ? end_dd.format('MMMM') : moment(new Date()).locale('fa').format('M')
            },
            timestamp: dataDefaul ? dataDefaul.coupon_settings.end_date ? parseInt(dataDefaul.coupon_settings.end_date.toString() + "000") : '' : ''
        },
        time: dataDefaul ? {
            h: dataDefaul.coupon_settings.end_time.split(":")[0],
            m: dataDefaul.coupon_settings.end_time.split(":")[1],
            s: dataDefaul.coupon_settings.end_time.split(":")[2]
        } : {
            h: "00",
            m: "00",
            s: '00'
        }
    })
    const [status, setStatus] = useState(dataDefaul ? allData.status ? allData.status : "active" : "active");
    const [timeShow, setTimeShow] = useState([]);
    const [limitUse, setLimitUse] = useState({
        codeVal: dataDefaul ? dataDefaul.coupon_settings.number_of_times_allowed_to_use : null,
        userVal: dataDefaul ? dataDefaul.coupon_settings.number_of_use_allowed_per_user : null,
        striShow: 'بدون محدودیت'
    });
    const [functionality, setFunctionality] = useState(dataDefaul ? dataDefaul.coupon_settings.functionality : 'total_cart_price');
    const [functionality_amount, setFunctionality_amount] = useState(dataDefaul ? dataDefaul.coupon_settings.functionality_amount : []);
    const [timeCheck, setTimeCheck] = useState([]);
    const [discountCode, setDiscountCode] = useState(dataDefaul ? allData.code ? allData.code : '' : '');
    const [value, setValue] = useState(dataDefaul ? dataDefaul.value : '');
    const [maxLimit, setMaxLimit] = useState(dataDefaul ? dataDefaul.max_limit : null);
    const [userTypeName, setUserTypeName] = useState(dataDefaul ? Helper.handleNameUser(dataDefaul.coupon_settings.user_status) : "برای همه کاربران")
    const [userStatus, setUserStatus] = useState(dataDefaul ? dataDefaul.coupon_settings.user_status : 'all');
    const [userGroup, setUserGroup] = useState(dataDefaul ? dataDefaul.coupon_settings.user_group : [-1]);
    const [disTypesDis, setDisTypesDis] = useState(dataDefaul ? dataDefaul.type : 'fixed_price');
    const [cartStatus, setCartStatus] = useState({
        cart_conditions_amount: dataDefaul ? dataDefaul.coupon_settings.cart_conditions_amount : null,
        typeSel: {
            types: dataDefaul ? dataDefaul.coupon_settings.cart_conditions : "unlimited"
        },
        typesNn: dataDefaul ? Helper.handleCondName(dataDefaul.coupon_settings.cart_conditions, dataDefaul.coupon_settings.cart_conditions_amount) : Helper.handleCondName("unlimited")
    })
    const [catSel, setCatSel] = useState([]);
    const [userTotal, setUserTotal] = useState(0);
    useEffect((e) => {
        GetAllUser();

        if (dataDefaul) {
            handleTitrLimited();
        }
        if (!discountCode) {
            let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let str2 = Math.random().toString(16).substr(2, 8);
            let str = '';
            for (let i = 0; i < 8; i++) {
                str += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            setDiscountCode(str + str2)
        }
    }, [])

    const handleClose = (e) => {
        e.preventDefault()
        $("span.checkboxeds").removeClass("active");
        ReactDOM.render('', document.getElementById("add-datas"));
        localStorage.removeItem("status");
    }


    const GetAllUser = () => {
        Request.GetAllUserApi().then(res => {
            setUserTotal(res.data.data.total);
        })
    }





    const HandleForm = e => {
        e.preventDefault();
        let data = {...allData};
        data.code = discountCode;
        data.status = status;
        data._token = token;
        data.type = disTypesDis;
        data.value = value;
        data.max_limit = maxLimit ? parseInt(maxLimit) : null;
        data.user_status = userStatus;
        data.functionality = functionality;
        let userg = [];
        if (userStatus == "special_users") {
            userGroup.map(itemss => {
                userg.push(itemss.id);
            })
            data.user_group = userg;
        } else {
            data.user_group = userGroup;
        }
        data.cart_conditions = cartStatus.typeSel.types;
        let funAmou = [];
        functionality_amount.map(it => {
            funAmou.push(it.id);
        })

        data.functionality_amount = funAmou;

        data.cart_conditions_amount = cartStatus.cart_conditions_amount;
        if (dateEnd.date) {
            let timeEdns = dateEnd.date.timestamp.toString();
            let newDateEnd = timeEdns.split("");
            delete newDateEnd[newDateEnd.length - 1];
            delete newDateEnd[newDateEnd.length - 2];
            delete newDateEnd[newDateEnd.length - 3];
            dateEnd.date.timestamp = newDateEnd.join("");
            data.end_date = dateEnd;
        } else {
            data.end_date = null;

        }


        if (dateStart.date) {
            let timeStart = dateStart.date.timestamp.toString();
            let newDateStart = timeStart.split("");
            delete newDateStart[newDateStart.length - 1];
            delete newDateStart[newDateStart.length - 2];
            delete newDateStart[newDateStart.length - 3];
            dateStart.date.timestamp = newDateStart.join("");
            data.start_date = dateStart;
        } else {
            data.start_date = null;
        }

        data.number_of_times_allowed_to_use = limitUse.codeVal ? parseInt(limitUse.codeVal) : null;
        data.number_of_use_allowed_per_user = limitUse.userVal ? parseInt(limitUse.userVal) : null;

        AddNewDiscount(data)


    }

    const HandleEditForm = e => {
        e.preventDefault();
        let data = {...allData};
        data.code = discountCode;
        data.status = status;
        data._token = token;

        delete data.coupon_settings;
        delete data.created_at;
        delete data.deleted_at;
        delete data.updated_at;
        delete data.use_number;
        data.type = disTypesDis;
        data.value = value;
        data.max_limit = maxLimit ? parseInt(maxLimit) : null;
        data.user_status = userStatus;
        data.functionality = functionality;
        let funAmou = [];
        functionality_amount.map(it => {
            funAmou.push(it.id);
        })
        data.functionality_amount = funAmou;
        let userg = [];
        if (userStatus == "special_users") {
            userGroup.map(itemss => {
                userg.push(itemss.id);
            })
            data.user_group = userg;
        } else {
            data.user_group = userGroup;
        }
        data.cart_conditions = cartStatus.typeSel.types;

        data.cart_conditions_amount = cartStatus.cart_conditions_amount;
        if (dateEnd.date) {
            let timeEdns = dateEnd.date.timestamp.toString();
            let newDateEnd = timeEdns.split("");
            delete newDateEnd[newDateEnd.length - 1];
            delete newDateEnd[newDateEnd.length - 2];
            delete newDateEnd[newDateEnd.length - 3];
            dateEnd.date.timestamp = newDateEnd.join("");
            data.end_date = dateEnd;
        } else {
            data.end_date = null;

        }


        if (dateStart.date) {
            let timeStart = dateStart.date.timestamp.toString();
            let newDateStart = timeStart.split("");
            delete newDateStart[newDateStart.length - 1];
            delete newDateStart[newDateStart.length - 2];
            delete newDateStart[newDateStart.length - 3];
            dateStart.date.timestamp = newDateStart.join("");
            data.start_date = dateStart;
        } else {
            data.start_date = null;
        }

        data.id = dataDefaul.id;
        data.number_of_times_allowed_to_use = limitUse.codeVal ? parseInt(limitUse.codeVal) : null;
        data.number_of_use_allowed_per_user = limitUse.userVal ? parseInt(limitUse.userVal) : null;


        console.log("___________", data)
        UpdateDiscount(data)


    }


    const AddNewDiscount = data => {
        console.log("++++++", data)
        swal({
            title: 'افزودن کد تخفیف جدید',
            text: "آیا مطمئنید؟",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'تایید',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn btn-danger ml-1',
            cancelButtonText: 'انصراف',
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {

                Request.AddNewCoupen(data)
                    .then(res => {
                        results(res);
                        Swal.fire({
                            type: "success",
                            title: 'با موفقیت اضافه شد !',
                            confirmButtonClass: 'btn btn-success',
                            confirmButtonText: 'باشه',
                        })

                    }).catch(err => {
                    // console.log(err.response.data.data);
                    if (err.response.data.data) {
                        ErroHandle(err.response.data.data);
                    } else {
                        //<button onclick='`${reloadpage()}`'  id='reloads' style='margin : 0 !important' class='btn btn-secondary  round mr-1 mb-1'>پردازش مجدد</button>
                        ErrorToast("خطای غیر منتظره ای رخ داده است")
                    }

                })
            }
        });
    }
    const UpdateDiscount = data => {
        swal({
            title: 'ویرایش کد تخفیف',
            text: "آیا مطمئنید؟",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'تایید',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn btn-danger ml-1',
            cancelButtonText: 'انصراف',
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                Request.UpdateDiscounts(data)
                    .then(reses => {
                        backcheck(true)

                        Swal.fire({
                            type: "success",
                            title: 'با موفقیت ویرایش شد !',
                            confirmButtonClass: 'btn btn-success',
                            confirmButtonText: 'باشه',
                        })
                    }).catch(err => {
                    if (err.response.data) {
                        if (err.response.data.errors) {
                            ErroHandle(err.response.data.errors);
                        } else {
                            ErrorToast("خطای غیر منتظره ای رخ داده است")
                        }
                    }
                })
            }
        });
    }


    const handleMaxPrice = (data, e) => {
        e.preventDefault();
        setMaxLimit(data.limit)
    }

    const HandleTopPrice = e => {
        e.preventDefault();
        setEdit(true)
        $("#back-loaderedss").addClass("active");
        ReactDOM.render(<TopPrice close={e => closeFeture(e)}
                                  handleOut={handleMaxPrice}
                                  limit={maxLimit}
        />, document.getElementById("back-loaderedss"));
    }

    const closeFeture = (e) => {
        e.preventDefault();
        $("#back-loaderedss").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loaderedss"));
    }


    const handleCopy = (e) => {
        e.preventDefault();
        var textCopy = document.getElementById("discount-code");
        textCopy.select();
        textCopy.setSelectionRange(0, 99999)
        document.execCommand("copy");
        success("کد تخفیف کپی شد")
    }


    const handleDis = e => {
        e.preventDefault();
        setDiscountCode(e.target.value)
    }
    const handleSwitchStatus = state => {
        setEdit(true)
        setStatus(state ? "active" : "deactivate");
    }

    const handleTypeDiscount = (e, index) => {

        e.preventDefault();

        if (index == 1) {

            setMaxLimit(null)
            setDisTypesDis('fixed_price');
        } else if (index == 0) {

            setDisTypesDis('percentage')
        } else {
            setMaxLimit(null)

            setDisTypesDis('free_delivery')
        }
    }


    const handleFunctionality = data => {

        if (data.data) {
            setFunctionality(data.data)
        }
        setFunctionality_amount(data.catSel)

    }
    const handleShowTypeDiscount = e => {
        e.preventDefault();
        $("#back-loaderedss").addClass("active");
        ReactDOM.render(<DiscoutAction defaultValue={{catSel, functionality, functionality_amount}}
                                       dataOut={handleFunctionality}/>, document.getElementById("back-loaderedss"));
    }


    const handleCartStatus = e => {
        setCartStatus(e)
    }

    const handleShowCartRoles = e => {
        e.preventDefault();
        $("#back-loaderedss").addClass("active");
        ReactDOM.render(<CartAction defData={cartStatus}
                                    dataOut={handleCartStatus}/>, document.getElementById("back-loaderedss"));
    }


    const handleUserSetting = e => {
        setUserStatus(e.user_status.type);
        handleTitrLimited()
        if (e.user_status.type == "all") {
            setUserTypeName("همه کاربران")
        } else if (e.user_status.type == "group_of_users") {
            setUserTypeName("گروهی از کاربران")
        } else if (e.user_status.type == "special_users") {
            setUserTypeName("کاربران خاص")

        } else {
            setUserTypeName("همه کاربران")

        }
        setUserGroup(e.userGroup);

    }
    const handleShowUserSetting = e => {
        e.preventDefault();
        $("#back-loaderedss").addClass("active");
        ReactDOM.render(<UserSetting dataOut={handleUserSetting} oldData={{
            userStatus,
            userGroup,
        }}/>, document.getElementById("back-loaderedss"));
    }


    const handleLimitUse = data => {
        setLimitUse(data);
    }
    const handleShowLimitedUse = e => {
        e.preventDefault();
        $("#back-loaderedss").addClass("active");
        ReactDOM.render(<LimitedUse
            defDataTU={limitUse.codeVal}
            defDataUU={limitUse.userVal}
            dataOut={handleLimitUse}/>, document.getElementById("back-loaderedss"));
    }

    const handleTitrLimited = () => {
        let striShow = '';
        if (limitUse.userVal && limitUse.codeVal) {
            striShow = `محدودیت ${limitUse.codeVal} استفاده  و محدودیت ${limitUse.userVal} استفاده برای هر کاربر`;
            setLimitUse({
                ...limitUse,
                striShow
            })
        } else if (limitUse.codeVal && !limitUse.userVal) {
            striShow = `محدودیت ${limitUse.codeVal} استفاده`
            setLimitUse({
                ...limitUse,
                striShow
            })
        } else if (!limitUse.codeVal && limitUse.userVal) {
            striShow = `محدودیت ${limitUse.userVal} استفاده برای هر کاربر`
            setLimitUse({
                ...limitUse,
                striShow
            })
        } else {
            striShow = "بدون محدودیت";
            setLimitUse({
                ...limitUse,
                striShow
            })
        }
    }


    const handleStartDis = e => {
        setDateStart(e)
    }
    const handleEndDis = e => {
        setDateEnd(e)
    }
    const handleShowStartDate = e => {
        e.preventDefault();
        $("#back-loaderedss").addClass("active");
        ReactDOM.render(<StartDiscount timers={timeCheck}
                                       dataOut={handleStartDis}
                                       timeShows={timeShow}/>, document.getElementById("back-loaderedss"));
    }
    const handleShowEndDate = e => {
        e.preventDefault();
        $("#back-loaderedss").addClass("active");
        ReactDOM.render(<EndDiscount timers={timeCheck}
                                     dataOut={handleEndDis}
                                     timeShows={timeShow}/>, document.getElementById("back-loaderedss"));
    }

    const handleTimeCheck = () => {
        let i = 0;
        for (i; i < 24; i++) {
            if (i < 10) {

                timeCheck.push({
                    h: "0" + i,
                    m: '00'
                })
                let strs = "0" + i + " : 00"
                timeShow.push(({
                    id: strs,
                    name: strs
                }))

                timeCheck.push({
                    h: "0" + i,
                    m: '30'
                })

                let strs2 = "0" + i + " : 30"
                timeShow.push(({
                    id: strs2,
                    name: strs2
                }))

                setTimeShow(timeShow);
                setTimeCheck(timeCheck)
            } else {

                if (i !== 24) {


                    timeCheck.push({
                        h: i,
                        m: '00'
                    })

                    let strs = i + " : 00"
                    timeShow.push(({
                        id: strs,
                        name: strs
                    }))

                    timeCheck.push({
                        h: i,
                        m: '30'
                    })

                    let strs2 = i + " : 30"
                    timeShow.push(({
                        id: strs2,
                        name: strs2
                    }))

                    setTimeShow(timeShow)
                    setTimeCheck(timeCheck)
                } else {

                    timeCheck.push({
                        h: "00",
                        m: '30'
                    })

                    let strs = "00 : 30"
                    timeShow.push(({
                        id: strs,
                        name: strs
                    }))


                    timeCheck.push({
                        h: "00",
                        m: '00'
                    })

                    let strs2 = "00 : 30"
                    timeShow.push(({
                        id: strs2,
                        name: strs2
                    }))

                    setTimeShow(timeShow)
                    setTimeCheck(timeCheck)
                }


            }
        }


    }


    const randoms = (e, length = 8) => {
        e.preventDefault();
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let str2 = Math.random().toString(16).substr(2, length);
        let str = '';
        for (let i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setDiscountCode(str + str2)
    };


    const handleValue = e => {
        e.preventDefault();
        setValue(e.target.value)
    }

    const handleFuncName = id => {
        switch (id) {
            case  'total_cart_price' :
                return 'کل مبلغ سبد خرید';
            case 'total_items_price' :
                return 'مبلغ سبد خرید بدون هزینه ارسال';
            case 'special_products' :
                return 'محصولات خاص بدون هزینه ارسال';
            case 'special_categories' :
                return 'دسته بندی خاص بدون هزینه ارسال';
            default :
                return 'کل مبلغ سبد خرید';
        }
    }



    return (
        <div id={"category_add_pop_base"}>
            <ul className="nav nav-tabs tab-layout" role="tablist">
                <Tab active={true} id={"cat-tab"} title={"ایجاد کد تخفیف"} href={"#cat"} />

                <Tab id={"seo-tab"} title={"تنظیمات پیشرفته"} href={"#seo"} />
            </ul>

            <div className="tab-content" style={{padding: 0, position: 'relative', marginTop: '-15px'}}>
                <div className="tab-pane show-det-discount active" id="cat" aria-labelledby="cat-tab"
                     role="tabpanel">
                    <div className={"row discount-rows"} style={{marginTop: '30px', padding: '30px 200px'}}>


                        <div className={"col-12"}>
                            <div className={"discount-detail"}>
                                <div className={"row"}>
                                    <div className={"col-md-6 col-sm-12 discount-det"}>
                                        <p>
                                            <i className={"bx bx-calendar"}></i>
                                            <span>شروع : </span>
                                            <p>{dateStart.date ? dateStart.date.date.day + " " + dateStart.date.date.month + " " + dateStart.date.date.year + " ساعت : " + dateStart.time.m + " : " + dateStart.time.h : 'تاریخی ثبت نشده است'}</p>
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
                                            <input id={"discount-code"} value={discountCode}/>
                                        </p>
                                        <p>
                                            <i className={"bx bx-copy-alt"}></i>
                                            <span id={"discount-link"}>لینک های تخفیف (برای اشتراک گذاری)</span>
                                        </p>
                                        <p style={{textAlign: 'left'}}>قابل استفاده روی کل خرید ، بدون محدودیت ،
                                            برای
                                            همه
                                            کاربران</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className={"col-lg-9 col-md-8 col-sm-12"} style={{paddingTop: '14px'}}>
                            <p>کد تخفیف</p>
                            <div className={"discounts active"}>

                                <input type={"text"} value={discountCode} id={"make-discounts"}
                                       onChange={e => handleDis(e)}
                                       style={{float: 'left', textAlign: 'left'}}/>
                                <div className={"btn btn-primary"} onClick={e => randoms(e, 8)}
                                     style={{float: 'right', height: '100%', cursor: 'pointer'}}><i
                                    className={"bx bx-rotate-right"}></i> تولید کد تصادفی
                                </div>

                            </div>
                        </div>

                        <div className={"col-lg-3 col-md-4 col-sm-12"}>

                            <fieldset className="form-group " style={{marginTop: '13px', padding: '15px'}}>
                                <label id={"selectParent"}>وضعیت کد تخفیف</label>
                                <Switcher
                                    defaultState={status == "active" ? true : false}
                                    // defaultState={dataUpdateParse ? dataUpdateParse.status == "active" ? true : false : true}
                                    // status={(state) => handleSwitchStatus(state)}
                                    name={"showState"}
                                    handleSwitchStatus={handleSwitchStatus}
                                    valueActive={"فعال"}
                                    valueDeActive={"غیرفعال"}/>
                            </fieldset>
                        </div>

                        <div className={"col-md-4 col-sm-12"}>


                            {console.log("=======", disTypesDis)}
                            <label>نوع تخفیف</label>
                            <MultiOption name={"type-disc"} data={[
                                {
                                    id: 'percentage',
                                    name: 'درصد'
                                }, {
                                    id: 'fixed_price',
                                    name: 'مبلغ ثابت'
                                }, {
                                    id: 'free_delivery',
                                    name: 'ارسال رایگان'
                                },
                            ]}
                                         defData={disTypesDis}

                                         handleChoise={handleTypeDiscount}

                            />

                        </div>


                        <div className={"col-md-4 col-sm-12"} style={{paddingTop: '2px'}}>
                            <fieldset className="form-group" style={{marginTop: '-2px'}}><label
                                htmlFor="title"> مقدار
                                تخفیف {disTypesDis ? " ( " + (disTypesDis == "percentage" ? 'درصد' : 'تومان') + " ) " : ''} </label>

                                <div className={disTypesDis ? "custom-in-show" : "custom-in-show active"}>
                                    <input disabled={disTypesDis ? false : true}
                                           onChange={e => handleValue(e)}
                                           value={value}
                                           type="number" id="moutDis"/>

                                </div>
                            </fieldset>
                        </div>
                        <div className={"col-md-4 col-sm-12"}>

                            <fieldset className="form-group">
                                <label htmlFor="title">سقف مبلغ تخفیف</label>
                                {disTypesDis !== "percentage" ? (
                                    <div className={"custom-in-show active"}>

                                        <i className={"bx bx-pencil"}></i>
                                        <span>بدون محدودیت</span>

                                    </div>
                                ) : (
                                    <div className={"custom-in-show"}
                                         onClick={e => HandleTopPrice(e)}>

                                        <i className={"bx bx-pencil"}></i>
                                        <span>{maxLimit ? maxLimit + " تومان " : 'بدون محدودیت'}</span>

                                    </div>
                                )}

                            </fieldset>

                        </div>

                        <div style={{width: '100%', height: '70px'}}></div>
                    </div>
                </div>
                <div className="tab-pane " id="seo" aria-labelledby="seo-tab" role="tabpanel">
                    <div className={"content-pages"}>

                        <div className={"discound-setting"}>
                            <div className={"row"} style={{padding: '60px 200px'}}>


                                <div className={"col-md-6 col-sm-12"} style={{marginBottom: 25}}>
                                    <div id={"itemss"}
                                         onClick={e => handleShowTypeDiscount(e)}>

                                        <i className={"bx bx-purchase-tag"}></i>

                                        <div id={"details-items"}>
                                            <p>
                                                نوع عملکرد
                                            </p>
                                            <p> قابل استفاده در {handleFuncName(functionality)} </p>
                                        </div>
                                        <i className={"bx bx-cog absol"}></i>

                                    </div>
                                </div>


                                <div className={"col-md-6 col-sm-12"} style={{marginBottom: 25}}>
                                    <div id={"itemss"}
                                         onClick={e => handleShowUserSetting(e)}>
                                        <i className={"bx bx-user"}></i>

                                        <div id={"details-items"}>
                                            <p>
                                                تنظیمات کاربران
                                            </p>
                                            <p>{userTypeName}</p>
                                        </div>
                                        <i className={"bx bx-cog absol"}></i>
                                    </div>
                                </div>


                                <div className={"col-md-6 col-sm-12"} style={{marginBottom: 25}}>

                                    <div id={"itemss"}
                                         onClick={e => handleShowStartDate(e)}>
                                        <i className={"bx bx-calendar-alt"}></i>

                                        <div id={"details-items"}>
                                            <p>
                                                تاریخ شروع تخفیفات
                                            </p>
                                            <p>{dateStart.date ? dateStart.date.date.day + " " + dateStart.date.date.month + " " + dateStart.date.date.year + " ساعت : " + dateStart.time.m + " : " + dateStart.time.h : 'تاریخی ثبت نشده است'}</p>
                                        </div>
                                        <i className={"bx bx-cog absol"}></i>
                                    </div>
                                </div>


                                <div className={"col-md-6 col-sm-12"} style={{marginBottom: 25}}>
                                    <div id={"itemss"}
                                         onClick={e => handleShowCartRoles(e)}>
                                        <i className={"bx bx-shopping-bag"}></i>

                                        <div id={"details-items"}>
                                            <p>
                                                شرایط سبد خرید
                                            </p>
                                            <p>{cartStatus.typesNn}</p>
                                        </div>
                                        <i className={"bx bx-cog absol"}></i>
                                    </div>
                                </div>
                                <div className={"col-md-6 col-sm-12"} style={{marginBottom: 25}}>
                                    <div id={"itemss"} onClick={e => handleShowEndDate(e)}>
                                        <i className={"bx bx-calendar-alt"}></i>

                                        <div id={"details-items"}>
                                            <p>
                                                تاریخ پایان تخفیفات
                                            </p>
                                            <p>{dateEnd.date ? dateEnd.date.date.day + " " + dateEnd.date.date.month + " " + dateEnd.date.date.year + " ساعت : " + dateEnd.time.m + " : " + dateEnd.time.h : 'تاریخی ثبت نشده است'}</p>
                                        </div>
                                        <i className={"bx bx-cog absol"}></i>
                                    </div>
                                </div>
                                <div className={"col-md-6 col-sm-12"} style={{marginBottom: 25}}>
                                    <div id={"itemss"}
                                         onClick={e => handleShowLimitedUse(e)}>
                                        <i className={"bx bx-slider"}></i>

                                        <div id={"details-items"}>
                                            <p>
                                                محدودیت استفاده
                                            </p>
                                            <p>{limitUse.striShow}</p>
                                        </div>
                                        <i className={"bx bx-cog absol"}></i>
                                    </div>
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

                        {dataDefaul ?
                            (<div onClick={(e) => HandleEditForm(e)}
                                  className={"col-6"}
                                  style={{
                                      textAlign: 'center',
                                      cursor: 'pointer',
                                      background: "#5a8dee",
                                      color: '#fff'
                                  }}>
                                    <span>ویرایش</span>
                                </div>
                            )
                            :

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
