import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import ReactDOMs from 'react-dom';
import {Switcher} from './../../../HOC/Switch'
import {BigSwitcher} from './../../../HOC/BigSwitcher';
import './../../_Shared/Style.scss'
import {Request} from './../../../../services/AdminService/Api'
import MyEditor from "../../_Micro/MyEditor/MyEditor";
import {error} from './../../../../helper'
import Doka from "../../../HOC/DropZone";
import {MultiSelected} from './../../../HOC/MultiSelected';
import {ChipsetHandler} from './../../../HOC/ChipsetHandler';
import './../../_Micro/TreeShow/_Shared/style.scss';
import {Swiper, SwiperSlide} from 'swiper/react';
import "swiper/swiper-bundle.css";
import {Price} from "../../_Micro/ProductMiniComponent/Price";
import {Limited} from "../../_Micro/ProductMiniComponent/Limited";
import {Inventory} from "../../_Micro/ProductMiniComponent/Inventoryz";
import ColorPicker from './../../../HOC/ColorPicker';
import {NewFeture} from "../../_Micro/ProductMiniComponent/NewFeture";
import $ from "jquery";
import Loading from "../../_Micro/Loading";

const AddProduct = ({display, dataAll, dataUpdate, idParent, result: pushResult}) => {
    let defaultCol = {
        code: 12341216513156,
        price: 0,
        discount: 0,
        hasDiscount: true,
        countInventory: 'نامحدود',
        infiniteInventory: true,
        limited: "نامحدود",
        isInfinite: true,
        fetures: {
            text: [],
            color: []
        }
    };

    const onChangepicker = color => {
        console.log(color);
    };

    const [defaultTableHead, setDefaultTableHead] = useState([
        'کد کالا',
        'قیمت',
        'موجودی',
        'محدودیت'
    ])

    const [changeCheck, setChangeCheck] = useState(false)
    const [comments, setComments] = useState();
    const [color, setColor] = useState("#aabbcc");
    const [categoryData, setCategoryData] = useState({});
    const [loading, setLoading] = useState(false);
    const [contentNew, setContentNew] = useState({});
    const [statusNew, setStatusNew] = useState();
    const [menuShow, setMenuShow] = useState();
    const [chipset, setChipset] = useState([]);
    const [priceData, setPriceData] = useState([
        defaultCol
    ]);
    let tags = [];
    const [edit, setEdit] = useState(false);
    const [file, setFile] = useState();
    const StatusSwitch = useRef(null);
    const [metaData, setMetaData] = useState({
        robots: false,
    });

    const dataGet = dataUpdate ? JSON.parse(dataUpdate) : '';
    const dataUpdateParse = dataGet ? JSON.parse(dataGet.allData) : '';
    const MetaDataUpdate = dataUpdateParse ? JSON.parse(dataUpdateParse.metadata) : '';
    const types = dataGet ? dataGet.type : '';

    let titleWrite = $("input[name=title]").val();
    const [slugManage, setSlugManage] = useState(true);
    const [formData, setFormData] = useState({});
    let default_value = {
        status: "active",
        content: '',
        parent_id: idParent,
        slug: ''
    };


    let randomData = () => {
        const min = 1;
        const max = 100000000;
        const rand = min + Math.random() * (max - min);
        return rand;
    }


    const CreateNewProduct = (data) => {
        console.log("adding dataaaaaa : ", data)
        swal({
            title: 'افزودن دسته بندی جدید',
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
                Request.AddNewProduct(data)
                    .then(res => {
                        let resError = res.data.message ? res.data.message : '';
                        console.log("status error : ", res.data.size)
                        if (res.status == 200 && resError == '') {
                            pushResult(res);
                            localStorage.removeItem("status");
                            localStorage.removeItem("selected");
                            Swal.fire({
                                type: "success",
                                title: 'با موفقیت اضافه شد !',
                                confirmButtonClass: 'btn btn-success',
                                confirmButtonText: 'باشه',
                            })
                        } else if (res.status == 200 && resError !== '') {
                            error(resError)
                        } else {
                            Swal.fire({
                                type: "error",
                                title: 'خطایی غیر منتظره ای رخ داده است !',
                                cancelButtonClass: 'btn btn-primary',
                                cancelButtonText: 'تلاش مجدد',
                            })
                        }

                    }).catch(error => console.log("error", error))
            }
        });
    }
    useEffect(() => {
        let formNews = {...formData};
        formNews = dataUpdateParse ? dataUpdateParse : default_value;
        setFormData(formNews);
        console.log("data.................", formNews);
        let metaDataNew = {...metaData};
        metaDataNew = dataUpdateParse ? JSON.parse(dataUpdateParse.metadata) : {robots: false};
        setMetaData(metaDataNew)
        MetaDataUpdate.tags ? setChipset(MetaDataUpdate.tags) : '';
    }, [])
    const handleClose = () => {
        ReactDOM.render('', document.getElementById("add-product"));
        setFormData({
            status: "active",
            content: '',
            parent_id: 0,
            slug: ''
        });
        setMetaData({
            robots: false,
        })
        $("#my-editor").attr("defaultValue", "");
    }

    const HandleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const handleInput = (e) => {
        setChangeCheck(true)
        setEdit(true);
        if (e.target.name == "title") {
            if (slugManage) {
                let formDataOld = {...formData};
                formDataOld.title = e.target.value;
                formDataOld.slug = e.target.value;
                setFormData(formDataOld);
            } else {
                let formDataOld = {...formData};
                formDataOld.title = e.target.value;
                setFormData(formDataOld);
            }
        } else {
            let formDataOld = {...formData};
            formDataOld.slug = e.target.value;
            setFormData(formDataOld);
        }
    }


    // {console.log("cat .......... : " , dataUpdate ? JSON.parse(JSON.parse(dataUpdate).allData) : '')}


    const RemoveChipset = (name) => {
        setEdit(true)
        let metaDatas = {...metaData};
        var chipsetArr = [...chipset];
        var index = chipsetArr.indexOf(name);
        if (index !== -1) {
            chipsetArr.splice(index, 1);
        }
        setChipset(chipsetArr);
        metaDatas.tags = chipsetArr;
        setMetaData(metaDatas)
    }

    const handleAddChip = (item) => {
        setEdit(true)
        let metaDatas = {...metaData};
        let chipsets = [...chipset];
        if (item === "") {

        } else {
            chipsets.push(item);
            setChipset(chipsets);
            metaDatas.tags = chipsets;
            setMetaData(metaDatas);
        }

    }
    const HandleForm = (e) => {
        let formNew = {...formData};
        let formFile = new FormData();
        formFile.append("file", file);
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formNew.status;
        let parent_id = localStorage.getItem("selected") ? localStorage.getItem("selected") : formNew.parent_id;
        formNew.status = status;
        formNew.parent_id = parseInt(parent_id);
        formNew.image = file;
        if (slugManage == false) {
            formNew.slug = formNew.name;
        } else {
        }

        if (formData.slug == "") {
            formNew.slug = formNew.title
        }
        formNew.content = contentNew;

        metaData.robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : "false";
        formNew.metadata = JSON.stringify(metaData);
        if (formData.title && formData.title !== '') {
            $("input[name=title]").removeClass("is-invalid");
            console.log("form dataaaaaaaa : ", formNew)
            formNew.parent_id = formNew.parent_id ? formNew.parent_id : 0;
            CreateNewProduct(formNew);
        } else {
            $("input[name=title]").addClass("is-invalid");
            error("لطفا فیلد عنوان محصول را پر کنید !")
        }
    }

    const HandleMetaData = (e) => {
        setEdit(true)
        setMetaData({
            ...metaData,
            [e.target.name]: e.target.value
        })
    }
    const HandlerBigSwitcher = (states) => {
        setEdit(true)
        localStorage.setItem("robots", states)
    }

    const HandleSlug = (e) => {
        e.preventDefault();
        setEdit(true)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleAddress = (status) => {
        setEdit(true)
        setSlugManage(status)
    }

    const HandleUpdateForm = (data, id) => {
        console.log("data update : ", data)
        swal({
            title: 'ویرایش دسته بندی',
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
                Request.UpdateDataCategory(data, id)
                    .then(res => {
                        let resError = res.data.message ? res.data.message : '';
                        console.log("status error : ", res.data.size)
                        if (res.status == 200 && resError == '') {
                            pushResult(res);
                            localStorage.removeItem("status");
                            localStorage.removeItem("selected");
                            localStorage.removeItem("robots");

                            Swal.fire({
                                type: "success",
                                title: 'با موفقیت ویرایش شد !',
                                confirmButtonClass: 'btn btn-success',
                                confirmButtonText: 'باشه',
                            })
                        } else if (res.status == 200 && resError !== '') {
                            error(resError)
                        } else {
                            Swal.fire({
                                type: "error",
                                title: 'خطایی غیر منتظره ای رخ داده است !',
                                cancelButtonClass: 'btn btn-primary',
                                cancelButtonText: 'تلاش مجدد',
                            })
                        }
                    }).catch(error => console.log("error", error))
            }
        });
    }

    const HandleEdit = () => {
        let formOldData = {...formData};
        formOldData.content = contentNew;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formData.status;
        let parent_ids = localStorage.getItem("selected") ? localStorage.getItem("selected") : formData.parent_id;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        let metaDatas = {...metaData};
        let name = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        formOldData.title = name;
        formOldData.slug = slug;
        metaDatas.robots = robots;
        formOldData.status = status;
        formOldData.metadata = JSON.stringify(metaDatas);
        formOldData.parent_id = parseInt(parent_ids);
        HandleUpdateForm(formOldData, formOldData.id);
    }

    const HandleDuplicate = () => {
        let formOldData = {...formData};
        formOldData.content = contentNew;
        console.log("data category in : ", names);
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formData.status;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        let parent_id = localStorage.getItem("selected") ? localStorage.getItem("selected") : formData.parent_id;
        let metaDatas = {...metaData};
        metaDatas.robots = robots;
        formOldData.status = status;
        let name = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        formOldData.title = name;
        formOldData.slug = slug;
        formOldData.metadata = JSON.stringify(metaDatas);
        formOldData.parent_id = parseInt(parent_id);
        CreateNewProduct(formOldData);
    }


    const handleEditorData = (data) => {
        setEdit(true);
        setFormData({
            ...formData,
            content: data
        })
    }

    let MakeNewName = (name) => {
        const min = 1;
        const max = 1000;
        const rand = Number(min + Math.random() * (max - min)).toFixed(0);
        let names = name + rand + "_کپی";
        let slugs = name + rand + "_کپی";
        return name + rand + "_کپی";
    }
    let MakeNewSlug = (name) => {
        const min = 1;
        const max = 1000;
        const rand = Number(min + Math.random() * (max - min)).toFixed(0);
        let slugs = name + rand + "_کپی";

        return name + rand + "_کپی";
    }
    const handleSwitchStatus = (status) => {
        setEdit(true)
        localStorage.setItem("status", status ? "active" : "deactivate");
    }

    const HandleSelectOption = (check) => {
        setEdit(true)
        console.log("data checked : ", check)
        localStorage.setItem("selected", check)
    }

    let HandleDefaultValuSlug = () => {
        if (dataUpdateParse) {
            if (types == "dup") {
                return MakeNewName(dataUpdateParse.slug);
            } else {
                return dataUpdateParse.slug;
            }
        } else {
            formData.slug = formData.title;
            return formData.title;
        }
    }

    let HandleMakeName = () => {
        if (dataUpdateParse) {
            if (types == "dup") {
                return MakeNewName(dataUpdateParse.name);
            } else {
                return dataUpdateParse.name;
            }
        } else {
            formData.slug = formData.title;
            return formData.title;
        }
    }
    const HandlePrice = (e, price, discount, hasDiscount) => {
        e.preventDefault();
        $("#back-loaderedss").addClass("active");
        ReactDOMs.render(<Price priceDataOld
                               newPrice={prices => console.log("priceeee : ", prices)}
                               hasDiscount={hasDiscount}/>, document.getElementById("back-loaderedss"));
    }
    const HandleInventory = (e, count, hasDis) => {
        e.preventDefault();
        $("#back-loaderedss").addClass("active");
        ReactDOM.render(<Inventory count={count} hasDiscount={hasDis} out={item => console.log("inventory , " , item)}/>, document.getElementById("back-loaderedss"));
    }
    const HandleLimited = (e, count, infinte) => {
        e.preventDefault();
        $("#back-loadered").addClass("active");
        ReactDOM.render(<Limited count={count} isInfinite={infinte}/>, document.getElementById("back-loadered"));
    }

    const HandleAddNew = (e) => {
        e.preventDefault();
        console.log("price data", priceData)
        let dataaa = [...priceData];
        dataaa.push(priceData[priceData.length - 1]);
        setPriceData(dataaa);
    }

    const HandleFeture = (e) => {
        e.preventDefault();
        $("#back-loaderedss").addClass("active");
        ReactDOM.render(<NewFeture close={e => closeFeture(e)}
                                   dataOut={item => AddFeture(item)}/>, document.getElementById("back-loaderedss"));

    }

    const closeFeture = (e) => {
        e.preventDefault();
        $("#back-loaderedss").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loaderedss"));

    }

    const AddFeture = (item) => {
        let newItemHead = [...defaultTableHead];
        newItemHead.push(item.name)

        setDefaultTableHead(newItemHead);

        if (item.type === "text") {
            let itemCounts = priceData[0].fetures.text.length;
            priceData.map((items, index) => {
                items.fetures.text[itemCounts] = {
                    name: item.name,
                    value: ''
                };
                priceData[index] = items;
            })
            setPriceData(priceData);
        } else {

            let itemCounts = priceData[0].fetures.color.length;
            priceData.map((items, index) => {
                items.fetures.color[itemCounts] = {
                    name: item.name,
                    value: ''
                };
                priceData[index] = items;
            })
            setPriceData(priceData);
        }

        $("#back-loadered").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loadered"));
    }

    const handleShowColorPicker = (e) => {
        e.preventDefault();
        $("#back-loadered").addClass("active");
        ReactDOM.render(<ColorPicker/>, document.getElementById("back-loadered"));
    }
    let renderFiture = (feture, type) => {
        if (type == "text") {
            return feture.map(item => (
                <td id={"color-col"}>
                    <input type={"text"} id={"input-code-kala"}
                           placeholder={"مقدار"} className={"form-control"}
                           name={item.name}
                           style={{maxWidth: '130px'}}
                           value={item.value ? item.value : ''}/>
                </td>
            ))
        } else if (type == "color") {
            return feture.map(item => (
                <td id={"color-col"}>
                    <input type={"text"} id={"input-code-kala"}
                           placeholder={"مقدار"} className={"form-control"}
                           name={item.name}
                           style={{maxWidth: '120px', float: 'right'}}
                           value={item.value ? item.value : ''}/>

                    <span id={"color-selected"} onClick={e => handleShowColorPicker(e)}></span>
                </td>
            ))
        } else {

        }
    }

    const HandlePickerColor = () => {
        <ColorPicker/>
    }

    return (
        <>

            <div id={"category_add_pop_base"}>
                <ul className="nav nav-tabs tab-layout" role="tablist">
                    <li className="nav-item col-3 nav-custom ">
                        <a className="nav-link active" id="descript-tab" data-toggle="tab" href="#descript"
                           aria-controls="descript"
                           role="tab" aria-selected="false">
                            <span className="align-middle">عنوان و عکس</span>
                            <i className={"bx bx-image"}></i>
                        </a>
                    </li>
                    <li className="nav-item col-3 nav-custom">
                        <a className="nav-link" id="catdetail-tab" data-toggle="tab" href="#catdetail"
                           aria-controls="catdetail"
                           role="tab" aria-selected="false">
                            <span className="align-middle">توضیحات  و دسته بندی</span>
                            <i className={"bx bx-list-ul"}></i>
                        </a>
                    </li>
                    <li className="nav-item col-3 nav-custom ">
                        <a className="nav-link" id="price-tab" data-toggle="tab" href="#price" aria-controls="price"
                           role="tab" aria-selected="false">
                            <span className="align-middle">قیمت و مشخصات</span>
                            <i className={"bx bx-dollar-circle"}></i>
                        </a>
                    </li>
                    <li className="nav-item col-3 nav-custom ">
                        <a className="nav-link" id="seo-tab" data-toggle="tab" href="#seo" aria-controls="seo"
                           role="tab" aria-selected="false">
                            <span className="align-middle">سئو و آدرس</span>
                            <i className={"bx bxl-internet-explorer"}></i>
                        </a>
                    </li>
                </ul>
                <div className="tab-content" style={{padding: 0, position: 'relative'}}>

                    <div className="tab-pane active" id="descript" aria-labelledby="descript-tab" role="tabpanel">
                        <div className={"content-pages"}>
                            <div className={"row"} style={{padding: '20px'}}>
                                <div className={"col-lg-8 col-md-8 col-sm-12"}>
                                    <fieldset className="form-group">
                                        <label htmlFor={"title"}>عنوان محصول</label>
                                        <input type={"text"} defaultValue={HandleMakeName()}
                                               onChange={e => handleInput(e)}
                                               name={"title"} id={"title"}
                                               className={"form-control titleCat"}/>
                                    </fieldset>
                                </div>
                                <div className={"col-lg-4 col-md-4 col-sm-12"}>
                                    <fieldset className="form-group">
                                        <label id={"selectParent"}>وضعیت نمایش</label>
                                        <Switcher
                                            defaultState={dataUpdateParse ? dataUpdateParse.status == "active" ? true : false : true}
                                            status={(state) => handleSwitchStatus(state)} name={"showState"}
                                            valueActive={"فعال"}
                                            valueDeActive={"غیرفعال"}/>
                                    </fieldset>
                                </div>
                                <div className={"col-12"}>
                                    <Doka/>

                                </div>
                            </div>


                        </div>
                    </div>


                    <div className="tab-pane" id="catdetail" aria-labelledby="catdetail-tab" role="tabpanel">
                        <div className={"row"} style={{padding: '20px'}}>
                            <div className="col-md-6">
                                <label>دسته بندی</label>
                                <MultiSelected/>
                            </div>
                            <div className={"col-md-6"}>
                                <label>برچسپ ها</label>
                                <div className={"row"} id={"chipset-container"}>
                                    <div className={"col-sm-12 col-md-4 col-lg-4"}>
                                        <ChipsetHandler callback={item => handleAddChip(item)}/>
                                    </div>
                                    <div className={"col-sm-12 col-md-8 col-lg-8"}>
                                        <Swiper
                                            slidesPerView={3}
                                            pagination={{clickable: true}}
                                            scrollbar={{draggable: true}}
                                        >
                                            {chipset ? chipset.map(item => (
                                                <SwiperSlide key={item.id} virtualIndex={item.id}>
                                                    <div className="chip mr-1">
                                                        <div className="chip-body">
                                                            <span className="chip-text">{item}</span>
                                                            <div className="chip-closeable"
                                                                 onClick={e => RemoveChipset(item)}>
                                                                <i className="bx bx-x"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            )) : ''}
                                        </Swiper>
                                    </div>

                                </div>
                            </div>
                            <div className={"col-12"}>
                                <MyEditor editorData={data => {
                                    setEdit(true)
                                    setContentNew(data)
                                }}
                                          id={"my-editor"}
                                          type={"small"}
                                          defaultVal={dataUpdateParse ? dataUpdateParse.content : ''}
                                />
                            </div>
                        </div>
                    </div>


                    <div className="tab-pane" id="price" aria-labelledby="price-tab" role="tabpanel">
                        <div className={"content-pages"} style={{padding: '20px'}}>
                            <div className={"row"}>

                                <div className={"col-12"}>


                                    <p>اطلاعات تکمیلی محصول شامل رنگ، سایز، موجودی انبار، قیمت و... را در بخش زیر وارد
                                        کنید.</p>

                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                            <tr className={"product-table-head"}>
                                                {defaultTableHead.map(items => (
                                                    <th id={"color-col"}>{items}</th>
                                                ))}
                                                <th>
                                                    عملیات ها
                                                </th>
                                            </tr>

                                            <a id={"add-future"} style={{zIndex: 9999}} className={"mr-1 mb-1"}
                                               onClick={e => HandleFeture(e)}>
                                                <i className={"bx bx-plus"}></i>&nbsp;&nbsp;ویژگی
                                                جدید &nbsp;&nbsp;
                                            </a>

                                            </thead>
                                            <tbody>

                                            {
                                                priceData.map(item => (
                                                    <tr>
                                                        <td style={{maxWidth: '120px', padding: '0 10px'}}>
                                                            <input type={"text"} style={{textAlign: 'center'}}
                                                                   className={"form-control"}
                                                                   defaultValue={item.code}
                                                                   name={"productCode"}
                                                                   id={"input-code-kala"}/>
                                                        </td>
                                                        <td><span
                                                            onClick={e => HandlePrice(e, item.price, item.discount, item.hasDiscount)}>{item.price} تومان</span>
                                                        </td>
                                                        <td><span
                                                            onClick={e => HandleInventory(e, item.countInventory, item.infiniteInventory)}>{item.infiniteInventory ? 'نامحدود' : item.countInventory}</span>
                                                        </td>
                                                        <td><span
                                                            onClick={e => HandleLimited(e, item.limited, item.isInfinite)}>{item.limited !== 'infinite' ? item.limited : 'نامحدود'}</span>
                                                        </td>
                                                        {item.fetures.text.length > 0 ? renderFiture(item.fetures.text, "text") : ''}
                                                        {item.fetures.color.length > 0 ? renderFiture(item.fetures.color, "color") : ''}
                                                        <td id={"actions-item"}>
                                                    <span>
                                                        <i className={"bx bx-link"}></i>
                                                        لینک خرید
                                                    </span>
                                                            <a href="#">
                                                                <i className="bx bx-trash"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))
                                            }


                                            </tbody>
                                        </table>

                                    </div>
                                    <div className={"col-md-3"} style={{padding: 0}}>
                                        <a className={"btn btn-primary"}
                                           onClick={e => HandleAddNew(e)}
                                           style={{width: '100%', color: '#fff', cursor: 'pointer', marginTop: '20px'}}>
                                            <i className={"bx bx-plus"}></i> &nbsp;
                                            اضافه کردن تنوع محصول
                                            &nbsp;
                                        </a>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="tab-pane" id="seo" aria-labelledby="seo-tab" role="tabpanel">
                        <div className={"content-pages"} style={{padding: '20px'}}>
                            <div className={"row"}>
                                <div className={"col-lg-3 col-md-4 col-sm-12"}>
                                    <fieldset className="form-group">
                                        <label id={"selectParent"}>نوع آدرس</label>

                                        <Switcher defaultState={true} status={state => handleAddress(state)}
                                                  name={"AddressType"}
                                                  valueActive={"خودکار"} valueDeActive={"دستی"}/>
                                    </fieldset>
                                </div>

                                <div className={"col-lg-9 col-md-8 col-sm-12"}>
                                    <fieldset className="form-group">
                                        <label htmlFor={"title"}>آدرس صفحه دسته بندی</label>
                                        {slugManage ? changeCheck ? (
                                            <div className={"fucks"}>
                                                {titleWrite}
                                            </div>
                                        ) : (
                                            <div className={"fucks"}>
                                                {formData.slug}
                                            </div>
                                        ) : (
                                            <input type={"text"}
                                                   defaultValue={formData.slug}
                                                   onChange={e => handleInput(e)} name={"slug"} id={"title"}
                                                   className={"form-control slugest"}/>
                                        )}
                                    </fieldset>
                                </div>

                                <div className={"col s12"}>
                                    <div className={"alert alert-primary mb-2 col-12"} role={"alert"}>
                                        اطلاعات تیتر و توضیحات صفحه به صورت خودکار توسط zerone برای سئوی بهتر ایجاد
                                        می‌شوند.
                                        در صورتی که تمایل به شخصی‌سازی آن دارید، می‌توانید از بخش زیر استفاده کنید.
                                    </div>
                                </div>

                                <div className={"col-12"}>
                                    <fieldset className="form-group">
                                        <label htmlFor={"title"}>عنوان صفحه ( حداکثر 60 حرف )</label>
                                        <input type={"text"}
                                               defaultValue={MetaDataUpdate ? MetaDataUpdate.title : ''}
                                               onChange={e => HandleMetaData(e)} name={"title"} id={"title"}
                                               className={"form-control"}/>


                                    </fieldset>
                                </div>

                                <div className={"col-12"}>
                                    <fieldset className="form-group">
                                        <label htmlFor={"title"}>توضیح صفحه ( حداکثر 155 حرف )</label>
                                        <textarea
                                            defaultValue={MetaDataUpdate ? MetaDataUpdate.content : ''}
                                            type={"text"}
                                            onChange={e => HandleMetaData(e)} name={"content"}
                                            id={"title"}
                                            className={"form-control"}/>
                                    </fieldset>
                                </div>

                                <div className={"col-12"}>
                                    <label htmlFor={"title"}>کلمات کلیدی صفحه ( تایپ کنید و Enter بزنید تا اضافه شود.
                                        )</label>
                                    <div className={"row"} style={{padding: '15px'}}>
                                        <div className={"col-12"} id={"chip-box"}>
                                            <div className={"row"} style={{overflow: 'hidden'}}>
                                                <div className={"col-sm-12 col-md-4 col-lg-3"}>
                                                    <ChipsetHandler callback={item => handleAddChip(item)}/>
                                                </div>
                                                {chipset.map(item => (
                                                    <div className="chip mr-1">
                                                        <div className="chip-body">
                                                            <span className="chip-text">{item}</span>
                                                            <div className="chip-closeable"
                                                                 onClick={e => RemoveChipset(item)}>
                                                                <i className="bx bx-x"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}


                                            </div>

                                        </div>
                                    </div>


                                </div>

                                <div className={"col-12"}>
                                    <fieldset className="form-group">
                                        <label htmlFor={"title"}>آدرس داخلی برای انتقال (301 Redirect)</label>
                                        <input type={"text"}
                                               defaultValue={MetaDataUpdate ? MetaDataUpdate.redirect : ''}
                                               onChange={e => HandleMetaData(e)} name={"redirect"}
                                               id={"title"} className={"form-control"}/>

                                    </fieldset>
                                </div>

                                <div className={"col-12"}>
                                    <fieldset className="form-group">
                                        <label htmlFor={"title"}>آدرس Canonical</label>
                                        <input
                                            defaultValue={MetaDataUpdate ? MetaDataUpdate.canonical : ''}
                                            onChange={e => HandleMetaData(e)}
                                            name={"canonical"} type={"text"}
                                            id={"title"} className={"form-control"}/>
                                    </fieldset>
                                </div>

                                <div className={"col-12"}>
                                    <label>تنظیمات Robots</label>

                                    {/*{console.log("robots : " , MetaDataUpdate)}*/}
                                    <BigSwitcher status={states => HandlerBigSwitcher(states)} name={"Robots"}
                                                 defaultStatus={MetaDataUpdate ? MetaDataUpdate.robots : false}
                                                 valueOne={"غیرفعال"} valueTow={"noindex,follow"}
                                                 valueThree={"noindex,unfolow"}/>
                                </div>

                            </div>

                        </div>
                    </div>


                    <div className={"col-12 bottom-footer"}>
                        <div className={"row"}>


                            <div className={"col-6"} onClick={handleClose}
                                 style={{cursor: 'pointer', textAlign: 'center', borderLeft: '1px solid #a9a9a9'}}>
                                <button type={"reset"} id={"clear"}>
                                    انصراف
                                </button>
                            </div>


                            {types ? types == 'edit' ? edit ? (
                                    <div onClick={(e) => HandleEdit(e)}
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

            <div id={"back-loaderedss"}>
                <div style={{
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    zIndex: 9999,
                    background: 'rgba(0,0,0,0.3)',
                    top: 0,
                    right: 0
                }}>
                </div>
            </div>
        </>


    )


}
export default AddProduct;
