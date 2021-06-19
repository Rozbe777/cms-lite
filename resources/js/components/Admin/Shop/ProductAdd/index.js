import React, {useEffect, useRef, useState, useReducer} from 'react';
import ReactDOM from 'react-dom';
import ReactDOMs from 'react-dom';
import {Switcher} from './../../../HOC/Switch'
import {BigSwitcher} from './../../../HOC/BigSwitcher';
import './../../_Shared/Style.scss'
import {Request} from './../../../../services/AdminService/Api'
import MyEditor from "../../_Micro/MyEditor/MyEditor";
import {ErroHandle, error as ErrorToast, error} from './../../../../helper'
import Doka from "../../../HOC/DropZone";
import {MultiSelected} from './../../Shop/ProductManager/HOC/MultiSelected';
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
import {
    CheckTextFetures,
    NoralizeFetures,
    NormalAttrOnePro,
    NormalAttrHead,
    NormalProductOneItem
} from "../../Helper/HelperClassFetures";
import Loading from "../../_Micro/Loading";
// import HelperClassFetures from  '../../Helper/HelperClassFetures';


const AddProduct = ({defaultValuePro, types, display, dataAll, dataUpdate, result: pushResult}) => {

        console.log("proooooo  " , types)
    let mins = 10000000000;
    let maxs = 99999999999;
    let firstRand = Math.round(mins + Math.random() * (maxs - mins));

    let defCounters = {num : firstRand};

    if (defaultValuePro && types !== "duplicate"){
        defCounters = defaultValuePro.attributes[defaultValuePro.attributes.length - 1].product_code
    }else {

    }
    const [counter, setCounter] = useState(defCounters);
    let defaultCol = {
        [counter.num]:
            {
                attributes: {
                    product_code: counter.num,
                    price: 0,
                    discount: 0,
                    count: null,
                    isInfinite: true,
                    limit: null,
                },
                fetures: {
                    text: [],
                    color: []
                }
            }
    };

    let normalDefalutAttr = defaultValuePro ? NormalAttrOnePro(defaultValuePro , types , counter.num) : defaultCol;

    const [attributes, setAttributes] = useState([
        {
            product_code: counter,
            price: 0,
            discount: 0,
            count: null,
            isInfinite: true,
            limit: null,
        }
    ]);

    let normalHeadTitle = defaultValuePro ? NormalAttrHead(defaultValuePro) : {
        color: [],
        text: []
    };

    const [defaultTableHead, setDefaultTableHead] = useState(normalHeadTitle)

    let metaDataNew = {...metaData};
    metaDataNew = defaultValuePro ? JSON.parse(defaultValuePro.metadata) : {robots: false};
    const MetaDataUpdate = defaultValuePro ? JSON.parse(defaultValuePro.metadata) : {robots: false};

    const [changeCheck, setChangeCheck] = useState(false)
    const [comments, setComments] = useState();
    const [idSelCat, setIdSelCat] = useState([])
    const [color, setColor] = useState("#aabbcc");
    const [categoryData, setCategoryData] = useState({});
    const [loading, setLoading] = useState(false);
    const [contentNew, setContentNew] = useState({});
    const [statusNew, setStatusNew] = useState();
    const [menuShow, setMenuShow] = useState();
    const [chipset, setChipset] = useState([]);
    const [chipsetChange, setChipsetChange] = useState(false);
    const [chipsetTagsChange, setChipsetTagsChange] = useState(false);
    const [chipsetTags, setChipsetTags] = useState([]);


    const [priceData, setPriceData] = useState(normalDefalutAttr);

    console.log(")))))))))" , priceData)

    let tags = [];
    const [edit, setEdit] = useState(false);
    const [file, setFile] = useState();
    const [clear, setClear] = useState(false);
    const StatusSwitch = useRef(null);
    const [metaData, setMetaData] = useState({
        robots: false,
    });

    const dataGet = dataUpdate ? JSON.parse(dataUpdate) : '';
    const dataUpdateParse = dataGet ? JSON.parse(dataGet.allData) : '';

    let titleWrite = $("input[name=title]#pro-title").val();
    const [slugManage, setSlugManage] = useState(true);
    const [formData, setFormData] = useState(defaultValuePro ? defaultValuePro : {});
    let default_value = {
        status: "active",
        content: '',
        slug: ''
    };

    console.log("/////@@@", formData)


    let randomData = () => {
        const min = 1;
        const max = 100000000;
        const rand = min + Math.random() * (max - min);
        return rand;
    }


    const reducerAttr = (state, action) => {
        switch (action.type) {
            case "price" :
                let newState = {
                    ...action.data,
                    [action.code]: {
                        ...action.data[action.code],
                        attributes: {
                            ...action.data[action.code].attributes,
                            price: action.price.price,
                            discount: action.price.discount
                        }
                    }
                }
                setPriceData(newState)
                return newState;
            case "count" :
                let newStates = {
                    ...action.data,
                    [action.code]: {
                        ...action.data[action.code],
                        attributes: {
                            ...action.data[action.code].attributes,
                            count: action.count
                        }
                    }
                }
                setPriceData(newStates)
                return newStates;
            case "limit" :
                let newStateLimit = {
                    ...action.data,
                    [action.code]: {
                        ...action.data[action.code],
                        attributes: {
                            ...action.data[action.code].attributes,
                            limit: action.count
                        }
                    }
                }
                setPriceData(newStateLimit)
                return newStateLimit;

            case "text" :
                let oldest = [...action.data[action.code].fetures.text];
                oldest[action.index] = {
                    ...oldest[action.index],
                    title: action.title
                }
                let newStateText = {
                    ...action.data,
                    [action.code]: {
                        ...action.data[action.code],
                        fetures: {
                            ...action.data[action.code].fetures,
                            text: oldest
                        }
                    }
                }
                setPriceData(newStateText)
                return newStateText;

            case "colorTit" :
                let oldestColor = [...action.data[action.code].fetures.color];
                oldestColor[action.index] = {
                    ...oldestColor[action.index],
                    title: action.title,
                }
                let newStateColor = {
                    ...action.data,
                    [action.code]: {
                        ...action.data[action.code],
                        fetures: {
                            ...action.data[action.code].fetures,
                            color: oldestColor
                        }
                    }
                }
                setPriceData(newStateColor)
                return newStateColor;

            case "colorVal" :
                let oldestColorVal = [...action.data[action.code].fetures.color];
                oldestColorVal[action.index] = {
                    ...oldestColorVal[action.index],
                    value: action.value
                }
                let newStateColorVal = {
                    ...action.data,
                    [action.code]: {
                        ...action.data[action.code],
                        fetures: {
                            ...action.data[action.code].fetures,
                            color: oldestColorVal
                        }
                    }
                }
                setPriceData(newStateColorVal)
                return newStateColorVal;

            case "addNew" :
                let now_num = Object.keys(action.data)[Object.keys(action.data).length - 1]
                let dataNew = priceData[Object.keys(action.data)[Object.keys(action.data).length - 1]]

                let counterCode = parseInt(now_num) + 1;

                console.log(">>>?" , counterCode);

                // counter.num = counterCode;


                let dataaa = {
                    ...action.data,
                    [counterCode]: dataNew
                };
                setPriceData(dataaa)
                setCounter(counter)
                return dataaa;

            default:
                throw new Error();
        }


        // switch (action.type){
        //     case "price" :
        //         return {
        //             ...state ,
        //             [action.code] : {
        //                 attributes : {
        //                     ...attributes,
        //                     price : action.price
        //                 }
        //             }
        //         }
        // }
    }


    const [stateData, dispatchAttr] = useReducer(reducerAttr, priceData);

    const CreateNewProduct = (dataed) => {
        console.log("dataaaaa_____" , dataed)
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
                Request.AddNewProduct(dataed)
                    .then(res => {
                        setClear(true)
                        pushResult(res);
                        localStorage.removeItem("status");
                        localStorage.removeItem("selected");
                        Swal.fire({
                            type: "success",
                            title: 'با موفقیت اضافه شد !',
                            confirmButtonClass: 'btn btn-success',
                            confirmButtonText: 'باشه',
                        })
                    }).catch(err => {
                    if (err.response.data.errors) {
                        ErroHandle(err.response.data.errors);
                    } else {
                        //<button onclick='`${reloadpage()}`'  id='reloads' style='margin : 0 !important' class='btn btn-secondary  round mr-1 mb-1'>پردازش مجدد</button>
                        ErrorToast("خطای غیر منتظره ای رخ داده است")
                    }

                })
            }
        });
    }
    useEffect(() => {
        setMetaData(metaDataNew)
        let chipTag = defaultValuePro ? MetaDataUpdate.tags ? MetaDataUpdate.tags : [] : [];
        let chipTagProduct = defaultValuePro ? defaultValuePro.tag_list : [];
        setChipset(chipTag)
        setChipsetTags(chipTagProduct)
        setPriceData(stateData);
        GetAllCategory();
    }, [])


    const handleClose = () => {
        setClear(true)
        ReactDOM.render('', document.getElementById("add-product"));
        setFormData({
            status: "active",
            content: '',
            slug: ''
        });
        localStorage.removeItem("status");
        localStorage.removeItem("selected");
        localStorage.removeItem("robots");
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


    const RemoveChipset = (name) => {
        setEdit(true)
        let metaDatas = {...metaData};
        setChipsetChange(true)
        var chipsetArr = [...chipset];
        var index = chipsetArr.indexOf(name);
        if (index !== -1) {
            chipsetArr.splice(index, 1);
        }
        setChipset(chipsetArr);
        metaDatas.tags = chipsetArr;
        setMetaData(metaDatas)
    }
    const RemoveChipsetTags = (name) => {
        setEdit(true)
        setChipsetTagsChange(true)
        var chipsetArr = [...chipsetTags];
        var index = chipsetArr.indexOf(name);
        if (index !== -1) {
            chipsetArr.splice(index, 1);
        }
        setChipsetTags(chipsetArr);
    }

    const handleAddChip = (item) => {
        setEdit(true)
        setChipsetChange(true)
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

    const handleAddChipTags = (item) => {
        setEdit(true)
        setChipsetTagsChange(true)
        let chipsets = [...chipsetTags];
        if (item === "") {

        } else {
            chipsets.push(item);
            setChipsetTags(chipsets);
        }
    }

    const GetAllCategory = async () => {
        setLoading(true)
        await Request.GetAllCategory()
            .then(res => {
                setClear(true)
                setLoading(false)
                setCategoryData(res.data.data)
            })
            .catch(err => {
                if (err.response.data.errors) {
                    ErroHandle(err.response.data.errors);
                } else {
                    //<button onclick='`${reloadpage()}`'  id='reloads' style='margin : 0 !important' class='btn btn-secondary  round mr-1 mb-1'>پردازش مجدد</button>
                    $(".tab-content .tab-pane").html("<div class='fail-load'><i class='bx bxs-smiley-sad'></i><p style='text-align: center ;margin : 10px 0 0 '>خطا در ارتباط با دیتابیس</p><p>مجددا تلاش کنید</p><div>");
                    ErrorToast("خطای غیر منتظره ای رخ داده است")
                }

            })
    }

    const HandleForm = (e) => {
        let formNew = {...formData};
        let formFile = new FormData();
        formFile.append("file", file);
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formNew.status;
        formNew.status = status;
        formNew.image = file;
        if (slugManage == false) {
            formNew.slug = formNew.name;
        } else {
        }

        if (formData.slug == "") {
            formNew.slug = formNew.title
        }
        formNew.content = JSON.stringify(contentNew);

        let normal = NoralizeFetures(priceData);
        let checkValueFetures = CheckTextFetures(normal)

        if (checkValueFetures) {
            formNew.attributes = normal.attributes;
            formNew.features = normal.fetures;
            formNew.category_list = idSelCat;
            formNew.tag_list = chipsetTagsChange ? chipsetTags : [];
            metaData.robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : "false";
            formNew.metadata = JSON.stringify(metaData);
            if (formData.title && formData.title !== '') {
                $("input[name=title]#pro-title").removeClass("is-invalid");
                // console.log("form dataaaaaaaa : ", formNew)
                CreateNewProduct(formNew);
            } else {
                $("input[name=title]#pro-title").addClass("is-invalid");
                error("لطفا فیلد عنوان محصول را پر کنید !")
            }
        } else {
            ErrorToast("مقدار ویژگی الزامی است زمانی که ردیف ویژگی موجود است.")
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

    const handleAddress = (status) => {
        setEdit(true)
        setSlugManage(status)
    }

    const HandleUpdateForm = (data, id) => {
        console.log("data update : ", data)
        swal({
            title: 'ویرایش محصول',
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
                Request.UpdateDataProduct(data, id)
                    .then(res => {
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
                    }).catch(err => {
                    if (err.response.data.errors) {
                        ErroHandle(err.response.data.errors);
                    } else {
                        //<button onclick='`${reloadpage()}`'  id='reloads' style='margin : 0 !important' class='btn btn-secondary  round mr-1 mb-1'>پردازش مجدد</button>
                        ErrorToast("خطای غیر منتظره ای رخ داده است")
                    }

                })
            }
        });
    }

    const HandleEdit = () => {
        let formOldData = {...formData};
        formOldData.content = JSON.stringify(contentNew);
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formData.status;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        let metaDatas = {...metaData};
        let name = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        formOldData.title = name;
        formOldData.slug = slug;
        formOldData.category_list = idSelCat;
        formOldData.tag_list = chipsetTagsChange ? chipsetTags : [];

        let normal = NoralizeFetures(priceData);
        let checkValueFetures = CheckTextFetures(normal)
        console.log("featuressss : " ,normal )

        formOldData.metadata = JSON.stringify(metaDatas);

        metaDatas.robots = robots;
        formOldData.status = status;
        if (checkValueFetures) {

            formOldData.attributes = normal.attributes;
            formOldData.features = normal.fetures;

            if (formOldData.title && formOldData.title !== '') {
                $("input[name=title]#pro-title").removeClass("is-invalid");
                // console.log("form dataaaaaaaa : ", formNew)
                HandleUpdateForm(formOldData, formOldData.id);
            } else {
                $("input[name=title]#pro-title").addClass("is-invalid");
                error("لطفا فیلد عنوان محصول را پر کنید !")
            }
        } else {
            ErrorToast("مقدار ویژگی الزامی است زمانی که ردیف ویژگی موجود است.")
        }
    }

    const HandleDuplicate = () => {
        let formOldData = {...formData};
        formOldData.content = JSON.stringify(contentNew);
        // console.log("data category in : ", names);
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formData.status;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        let metaDatas = {...metaData};
        metaDatas.robots = robots;
        formOldData.status = status;
        let name = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        formOldData.title = name;
        formOldData.slug = slug;
        delete formOldData.id;
        formOldData.category_list = idSelCat;
        formOldData.tag_list = chipsetTagsChange ? chipsetTags : [];
        formOldData.metadata = JSON.stringify(metaDatas);

        let normal = NoralizeFetures(priceData);
        let checkValueFetures = CheckTextFetures(normal)
        if (checkValueFetures) {
            formOldData.attributes = normal.attributes;
            formOldData.features = normal.fetures;
            if (formOldData.title && formOldData.title !== '') {
                $("input[name=title]#pro-title").removeClass("is-invalid");
                // console.log("form dataaaaaaaa : ", formNew)
                CreateNewProduct(formOldData);
            } else {
                $("input[name=title]#pro-title").addClass("is-invalid");
                error("لطفا فیلد عنوان محصول را پر کنید !")
            }
        } else {
            ErrorToast("مقدار ویژگی الزامی است زمانی که ردیف ویژگی موجود است.")
        }
    }


    let MakeNewName = (name) => {
        const min = 1;
        const max = 1000;
        const rand = Number(min + Math.random() * (max - min)).toFixed(0);
        let names = name + rand + "_کپی";
        let slugs = name + rand + "_کپی";
        return name + rand + "_کپی";
    }

    const handleSwitchStatus = (status) => {
        setEdit(true)
        localStorage.setItem("status", status ? "active" : "deactivate");
    }


    let HandleMakeName = () => {
        if (formData) {
            if (types == "duplicate") {
                return MakeNewName(formData.title);
            } else {
                return formData.title;
            }
        } else {
            formData.slug = formData.title;
            return formData.title;
        }
    }


    const HandleAddNew = (e) => {
        e.preventDefault();
        let checkedFeatures = NoralizeFetures(priceData).fetures.length;
        if (checkedFeatures > 0) {
            dispatchAttr({type: 'addNew', data: priceData})
        } else {
            ErrorToast("حداقل باید یک ویژگی اضافه کنید")

        }

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
        let newItemHead = {...defaultTableHead};
        let ressss = newItemHead.text.includes(item.name) || newItemHead.color.includes(item.name);
        if (!ressss) {
            if (item.type == "text") {
                newItemHead.text.push(item.name);
                setDefaultTableHead(newItemHead);
                Object.keys(priceData).map((items, index) => {
                    if (priceData[items].fetures.text.length > 0) {
                        priceData[items].fetures.text.map(news => {
                            let indexFind = priceData[items].fetures.text.find(elem => elem.name === item.name);
                            if (!indexFind) {
                                priceData[items].fetures.text.push({
                                    name: item.name,
                                    title: ''
                                });
                                setPriceData(priceData);
                            }
                        })
                    } else {
                        priceData[items].fetures.text.push({
                            name: item.name,
                            title: ''
                        });
                        setPriceData(priceData);
                    }
                })
            } else {
                newItemHead.color.push(item.name);
                setDefaultTableHead(newItemHead)

                Object.keys(priceData).map((items, index) => {
                    if (priceData[items].fetures.color.length > 0) {
                        priceData[items].fetures.color.map(news => {
                            let indexFind = priceData[items].fetures.color.find(elem => elem.name === item.name);
                            if (!indexFind) {
                                priceData[items].fetures.color.push({
                                    name: item.name,
                                    title: 'مشکی',
                                    value: '#000000'
                                });
                                setPriceData(priceData);
                            }
                        })
                    } else {
                        priceData[items].fetures.color.push({
                            name: item.name,
                            title: 'مشکی',
                            value: '#000000'
                        });
                        setPriceData(priceData);
                    }
                })
            }
            $("#back-loaderedss").removeClass("active");
            ReactDOM.render('', document.getElementById("back-loaderedss"));
        } else {
            ErrorToast("ویژگی قبلا ثبت شده است")
        }


    }

    // const handleShowColorPicker = (e , index , id , title) => {
    //     e.preventDefault();
    //     $("#back-loaderedss").addClass("active");
    //     ReactDOM.render(<ColorPicker dataOut={eOut => HandleFetureColorPicker(eOut , index , id , title) }/>, document.getElementById("back-loaderedss"));
    // }
    const handleShowColorPicker = (e, index, id) => {
        e.preventDefault();
        let data = [...priceData];
        data[id].fetures.color[index].value = e.target.value;
        setPriceData(data)
    }

    const HandleFetureText = (e, index, item) => {
        e.preventDefault();
        dispatchAttr({type: "text", index, title: e.target.value, data: priceData, code: item})
    }

    const HandleFetureColorTit = (e, index, id) => {
        e.preventDefault();
        dispatchAttr({type: "colorTit", index, title: e.target.value, data: priceData, code: id})
    }
    const HandleFetureColorVal = (e, index, id) => {
        e.preventDefault();
        dispatchAttr({type: "colorVal", index, value: e.target.value, data: priceData, code: id})
    }
    const HandleFetureColorPicker = (hex, index, id, title) => {
        let data = [...priceData];
        data[id].fetures.color[index].value = hex;
        setPriceData(data)
        // console.log("////,,,,", "span#color-selected." + id + index)
        $("span#color-selected." + title + "." + id).css({"color": "#000 !important"})
    }
    const renderFitureText = (dataIns, id) => {
        console.log("text ", dataIns)
        return dataIns.map((item, index) => (
            <td id={"color-col"}>
                <input type={"text"} id={"input-code-kala"}
                       placeholder={"مقدار"} className={"form-control productsss"}
                       name={item.name}
                       id={id + " " + index}
                       onChange={e => HandleFetureText(e, index, id, dataIns)}
                       style={{maxWidth: '130px'}}
                       value={item.title ? item.title : ''}/>
            </td>
        ))
    }
    const renderFitureColor = (dataInss, id) => {
        return dataInss.map((item, index) => (
            <td id={"color-col"}>
                <input type={"text"} id={"input-code-kala"}
                       placeholder={"مقدار"} className={"form-control productsss"}
                       name={item.name}
                       style={{maxWidth: '120px', float: 'right'}}
                       onChange={e => HandleFetureColorTit(e, index, id)}
                       value={item.title ? item.title : ''}/>
                {/*<span id={"color-selected"} className={item.title} style={{background : "#f00"}} onClick={e => handleShowColorPicker(e , index , id , item.title)}></span>*/}
                <input type={"color"} className={"feture-color"}
                       defaultValue={priceData[id] ? priceData[id].fetures.color[index].value : '#000000'}
                       onChange={e => HandleFetureColorVal(e, index, id)}/>
            </td>
        ))
    }

    // const HandlePickerColor = () => {
    //     <ColorPicker/>
    // }

    const ChangeHeadTitleText = (e, index) => {
        e.preventDefault();
        let dataHead = {...defaultTableHead};
        let priceNew = [...priceData];
        dataHead.text[index] = e.target.value;
        priceData.map((items, indexes) => {
            items.fetures.text[index].name = e.target.value;
            priceNew[indexes] = items;
            setPriceData(priceNew);
        })
        setDefaultTableHead(dataHead);
    }
    const ChangeHeadTitleColor = (e, index) => {
        e.preventDefault();
        let dataHead = {...defaultTableHead};
        let priceNew = [...priceData];
        dataHead.color[index] = e.target.value;
        priceData.map((items, indexes) => {
            items.fetures.color[index].name = e.target.value;
            priceNew[indexes] = items;
            setPriceData(priceNew);
        })
        setDefaultTableHead(dataHead);
    }

    const handleDispatchAttr = (e, item, type, price, discount) => {
        e.preventDefault();
        console.log("pricessss : ", priceData)
        $("#back-loaderedss").addClass("active");
        ReactDOMs.render(<Price priceDataOld
                                discount={discount}
                                price={price}
                                newPrice={prices => dispatchAttr({
                                    type: type,
                                    code: item,
                                    data: priceData,
                                    price: prices
                                })}
        />, document.getElementById("back-loaderedss"));

    }

    const HandleInventory = (e, item, type, count) => {
        e.preventDefault();
        $("#back-loaderedss").addClass("active");
        ReactDOM.render(<Inventory count={count}
                                   out={items => dispatchAttr({
                                       type: "count",
                                       code: item,
                                       data: priceData,
                                       count: items.count
                                   })}/>, document.getElementById("back-loaderedss"))

    }
    const HandleLimited = (e, item, type, count) => {
        e.preventDefault();
        $("#back-loaderedss").addClass("active");
        ReactDOM.render(<Limited count={count}
                                 out={items => dispatchAttr({
                                     type: "limit",
                                     code: item,
                                     data: priceData,
                                     count: items.limit
                                 })}/>, document.getElementById("back-loaderedss"))

    }


    const deleteColAttr = (e, items) => {
        e.preventDefault();
        let priceChange = {...priceData};
        console.log("data....3333", items, priceChange, stateData);
        if (Object.keys(priceData).length > 1) {
            // Object.keys(priceData).filter(itemId => parseInt(itemId) !== parseInt(items));
            priceChange[items] ? delete priceChange[items] : '';
            setPriceData(priceChange)
            // stateData[items] ? delete stateData[items] : '';
        } else {
            ErrorToast("محصول حداقل باید یک تنوع محصولی داشته باشد")
        }
    }

    console.log("metadata : ", metaData)

    return (
        <>
            <div id={"category_add_pop_base"}>
                <ul className="nav nav-tabs tab-layout" role="tablist">
                    <li className="nav-item col-3 nav-custom ">
                        <a className="nav-link active" id="descript-tab" data-toggle="tab" href="#descript"
                           aria-controls="descript"
                           role="tab" aria-selected="false">
                            <span className="align-middle">عنوان و عکس</span>
                            <i id={"visible-custom"} className={"bx bx-image"}></i>
                        </a>
                    </li>
                    <li className="nav-item col-3 nav-custom">
                        <a className="nav-link" id="catdetail-tab" data-toggle="tab" href="#catdetail"
                           aria-controls="catdetail"
                           role="tab" aria-selected="false">
                            <span className="align-middle">توضیحات  و دسته بندی</span>
                            <i id={"visible-custom"} className={"bx bx-list-ul"}></i>
                        </a>
                    </li>
                    <li className="nav-item col-3 nav-custom ">
                        <a className="nav-link" id="price-tab" data-toggle="tab" href="#price" aria-controls="price"
                           role="tab" aria-selected="false">
                            <span className="align-middle">قیمت و مشخصات</span>
                            <i id={"visible-custom"} className={"bx bx-dollar-circle"}></i>
                        </a>
                    </li>
                    <li className="nav-item col-3 nav-custom ">
                        <a className="nav-link" id="seo-tab" data-toggle="tab" href="#seo" aria-controls="seo"
                           role="tab" aria-selected="false">
                            <span className="align-middle">سئو و آدرس</span>
                            <i id={"visible-custom"} className={"bx bxl-internet-explorer"}></i>
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
                                               id={"pro-title"}
                                               className={"form-control titleCat"}/>
                                    </fieldset>
                                </div>
                                <div className={"col-lg-4 col-md-4 col-sm-12"}>
                                    <fieldset className="form-group">
                                        <label id={"selectParent"}>وضعیت نمایش</label>
                                        <Switcher
                                            defaultState={defaultValuePro ? formData.status == "active" ? true : false : true}
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
                                <MultiSelected name={"categories"} data={categoryData ? categoryData : []}
                                               clear={clear}
                                               defSelected={defaultValuePro ? defaultValuePro.category_list : []}
                                               clearNew={cl => setClear(cl)}
                                               selected={item => {
                                                   setEdit(true)
                                                   item.map(ii => {
                                                       let idsel = idSelCat.indexOf(parseInt(ii.id))
                                                       if (idsel !== -1) {

                                                       } else {
                                                           idSelCat.push(parseInt(ii.id));
                                                           setIdSelCat(idSelCat);
                                                       }

                                                   })
                                               }}

                                               defaultsel={defaultValuePro ? defaultValuePro.category_list : []}
                                />
                            </div>
                            <div className={"col-md-6"}>
                                <label>برچسپ ها</label>
                                <div className={"row"} id={"chipset-container"}>
                                    <div className={"col-sm-12 col-md-4 col-lg-4"}>
                                        <ChipsetHandler callback={item => handleAddChipTags(item)}/>
                                    </div>
                                    <div className={"col-sm-12 col-md-8 col-lg-8"}>
                                        <Swiper
                                            slidesPerView={3}
                                            pagination={{clickable: true}}
                                            scrollbar={{draggable: true}}
                                        >
                                            {chipsetTags ? chipsetTags.map(item => (
                                                <SwiperSlide key={item.id} virtualIndex={item.id}>
                                                    <div className="chip mr-1">
                                                        <div className="chip-body">
                                                            <span className="chip-text">{item}</span>
                                                            <div className="chip-closeable"
                                                                 onClick={e => RemoveChipsetTags(item)}>
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


                                    <p>اطلاعات تکمیلی محصول شامل رنگ، سایز، موجودی انبار، قیمت و... را در بخش زیر
                                        وارد
                                        کنید.</p>

                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                            <tr className={"product-table-head"}>
                                                <th id={"color-col"}>کدکالا</th>
                                                <th id={"color-col"}>قیمت</th>
                                                <th id={"color-col"}>موجودی</th>
                                                <th id={"color-col"}>محدودیت</th>


                                                {defaultTableHead.text.map((items, index) => (
                                                    <th id={"color-col"}>
                                                        <input className={"top-table-input"} type={"text"}
                                                               onChange={e => ChangeHeadTitleText(e, index)}
                                                               value={items}/>
                                                    </th>
                                                ))}

                                                {defaultTableHead.color.map((items, index) => (
                                                    <th id={"color-col"}>
                                                        <input className={"top-table-input"} type={"text"}
                                                               onChange={e => ChangeHeadTitleColor(e, index)}
                                                               value={items}/>
                                                    </th>
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
                                            {console.log("......", stateData, priceData, Object.keys(priceData).length == Object.keys(stateData).length)}

                                            {
                                                Object.keys(priceData).length == Object.keys(stateData).length ?
                                                    Object.keys(stateData).map((item, index) => {
                                                        console.log("________________stateDat");

                                                        return (
                                                            <tr>
                                                                <td style={{maxWidth: '120px', padding: '0 10px'}}>
                                                                     <span style={{textAlign: 'center'}}
                                                                           className={"not-alloeds"}>{"RI_" + item}</span>
                                                                </td>
                                                                <td><span
                                                                    onClick={e => handleDispatchAttr(e, item, "price", stateData[item].attributes.price, stateData[item].attributes.discount)}>{stateData[item].attributes.discount && stateData[item].attributes.discount !== 0 ? stateData[item].attributes.discount + " تومان " : stateData[item].attributes.price == 0 ? "رایگان" : stateData[item].attributes.price + "تومان"} </span>
                                                                </td>
                                                                <td><span
                                                                    onClick={e => HandleInventory(e, item, "count", stateData[item].attributes.count)}>{stateData[item].attributes.count === null ? 'نامحدود' : stateData[item].attributes.count}</span>
                                                                </td>
                                                                <td><span
                                                                    onClick={e => HandleLimited(e, item, "limit", stateData[item].attributes.limit)}>{stateData[item].attributes.limit === null ? stateData[item].attributes.count ? stateData[item].attributes.count : 'نامحدود' : stateData[item].attributes.limit}</span>
                                                                </td>
                                                                {renderFitureText(stateData[item].fetures.text, item)}
                                                                {renderFitureColor(stateData[item].fetures.color, item)}

                                                                <td id={"actions-item"}>
                                                                        <span>
                                                                            <i className={"bx bx-link"}></i>
                                                                            لینک خرید
                                                                        </span>
                                                                    <a onClick={e => deleteColAttr(e, item)}>
                                                                        <i id={"del-fet"} className="bx bx-trash"></i>
                                                                    </a>
                                                                </td>
                                                            </tr>

                                                        )
                                                    }) : Object.keys(priceData).map((item, index) => {
                                                        console.log("________________priceDaa");
                                                        return (
                                                            <tr>
                                                                <td style={{maxWidth: '120px', padding: '0 10px'}}>
                                                                    <a style={{textAlign: 'center'}}
                                                                       className={"not-alloeds"}>{"RI_" + item}</a>
                                                                </td>
                                                                <td><span
                                                                    onClick={e => handleDispatchAttr(e, item, "price", priceData[item].attributes.price, priceData[item].attributes.discount)}>{priceData[item].attributes.discount && priceData[item].attributes.discount !== 0 ? priceData[item].attributes.discount + " تومان " : priceData[item].attributes.price == 0 ? "رایگان" : priceData[item].attributes.price + "تومان"}</span>
                                                                </td>
                                                                <td><span
                                                                    onClick={e => HandleInventory(e, item, "count", priceData[item].attributes.count)}>{priceData[item].attributes.count === null ? 'نامحدود' : priceData[item].attributes.count}</span>
                                                                </td>
                                                                <td><span
                                                                    onClick={e => HandleLimited(e, item, "limit", priceData[item].attributes.limit)}>{priceData[item].attributes.limit === null ? priceData[item].attributes.count ? priceData[item].attributes.count : 'نامحدود' : priceData[item].attributes.limit}</span>
                                                                </td>
                                                                {renderFitureText(priceData[item].fetures.text, item)}
                                                                {renderFitureColor(priceData[item].fetures.color, item)}
                                                                <td id={"actions-item"}>
                                                                        <span>
                                                                            <i className={"bx bx-link"}></i>
                                                                            لینک خرید
                                                                        </span>
                                                                    <a onClick={e => deleteColAttr(e, item)}>
                                                                        <i id={"del-fet"} className="bx bx-trash"></i>
                                                                    </a>
                                                                </td>
                                                            </tr>

                                                        )
                                                    })
                                            }


                                            {/*{*/}
                                            {/*    Object.keys(priceData).map((item, index) => (*/}
                                            {/*        <tr>*/}
                                            {/*            <td style={{maxWidth: '120px', padding: '0 10px'}}>*/}
                                            {/*                <input type={"text"} style={{textAlign: 'center'}}*/}
                                            {/*                       className={"form-control productsss"}*/}
                                            {/*                       defaultValue={item.attributes.product_code}*/}
                                            {/*                       name={"productCode"}*/}
                                            {/*                       id={"input-code-kala"}/>*/}
                                            {/*            </td>*/}
                                            {/*            <td><span*/}
                                            {/*                onClick={e => HandlePrice(e, item.attributes.price, item.attributes.discount, index ,  item.attributes.product_code)}>{item.attributes.price} تومان</span>*/}
                                            {/*            </td>*/}
                                            {/*            <td><span*/}
                                            {/*                onClick={e => HandleInventory(e, item.attributes.count, index)}>{item.attributes.count === null ? 'نامحدود' : item.attributes.count}</span>*/}
                                            {/*            </td>*/}
                                            {/*            <td><span*/}
                                            {/*                onClick={e => HandleLimited(e, item.attributes.limit, index)}>{item.attributes.limit !== null ? item.attributes.limit : item.attributes.count === null ? 'نامحدود' : item.attributes.count}</span>*/}
                                            {/*            </td>*/}
                                            {/*            {renderFitureText(item.fetures.text, index)}*/}
                                            {/*            {renderFitureColor(item.fetures.color, index)}*/}

                                            {/*            <td id={"actions-item"}>*/}
                                            {/*        <span>*/}
                                            {/*            <i className={"bx bx-link"}></i>*/}
                                            {/*            لینک خرید*/}
                                            {/*        </span>*/}
                                            {/*                <a href="#">*/}
                                            {/*                    <i className="bx bx-trash"></i>*/}
                                            {/*                </a>*/}
                                            {/*            </td>*/}
                                            {/*        </tr>*/}
                                            {/*    ))*/}
                                            {/*}*/}


                                            </tbody>
                                        </table>

                                    </div>
                                    <div className={"col-md-3"} style={{padding: 0}}>
                                        <a className={"btn btn-primary"}
                                           onClick={e => HandleAddNew(e)}
                                           style={{
                                               width: '100%',
                                               color: '#fff',
                                               cursor: 'pointer',
                                               marginTop: '20px'
                                           }}>
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
                                    <label htmlFor={"title"}>کلمات کلیدی صفحه ( تایپ کنید و Enter بزنید تا اضافه
                                        شود.
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
