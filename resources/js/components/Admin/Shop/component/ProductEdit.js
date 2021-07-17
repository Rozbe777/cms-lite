import React, {useEffect, useRef, useState, useReducer} from 'react';
import ReactDOM from 'react-dom';
import ReactDOMs from 'react-dom';
import './../../_Shared/Style.scss'
import {Request} from './../../../../services/AdminService/Api'
import {ErroHandle, error as ErrorToast, error} from './../../../../helper'
import './../../_Micro/TreeShow/_Shared/style.scss';
import "swiper/swiper-bundle.css";
import {Price} from "../../_Micro/ProductMiniComponent/Price";
import {Limited} from "../../_Micro/ProductMiniComponent/Limited";
import {Inventory} from "../../_Micro/ProductMiniComponent/Inventoryz";
import {NewFeture} from "../../_Micro/ProductMiniComponent/NewFeture";
import $ from "jquery";
import {
    CheckTextFetures,
    NoralizeFetures,
    NormalAttrOnePro,
    NormalAttrHead,
} from "../../Helper/HelperClassFetures";
import ComponentHandler from "../Helper/ComponentHandler";
import {Footer} from "./Footer";
import ProductParentForm from "./ProductParentForm";

const ProductEdit = ({defaultValuePro, types, dataUpdate, result}) => {


    console.log("____..." , defaultValuePro)
    let componentHandler = new ComponentHandler();
    let mins = 10000000000;
    let maxs = 99999999999;
    let firstRand = Math.round(mins + Math.random() * (maxs - mins));

    let defCounters = {num: firstRand};

    const [allFiles  , setAllFiles]  = useState([]);

    const [counter, setCounter] = useState(defCounters);
    const [checkChange , setCheckChange] = useState(false)
    const [metaData , setMetaData] = useState(defaultValuePro.metadata ? JSON.parse(defaultValuePro.metadata) : {
        robots: false,
    });
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

    let normalDefalutAttr = defaultValuePro ? NormalAttrOnePro(defaultValuePro, types, counter.num) : defaultCol;

    let normalHeadTitle = defaultValuePro ? NormalAttrHead(defaultValuePro) : {
        color: [],
        text: []
    };

    const [defaultTableHead, setDefaultTableHead] = useState(normalHeadTitle)

    const [changeCheck, setChangeCheck] = useState(false)
    const [idSelCat, setIdSelCat] = useState([])
    const [categoryData, setCategoryData] = useState({});
    const [loading, setLoading] = useState(false);
    const [contentNew, setContentNew] = useState('');
    const [chipset, setChipset] = useState([]);
    const [chipsetChange, setChipsetChange] = useState(false);
    const [chipsetTagsChange, setChipsetTagsChange] = useState(false);
    const [chipsetTags, setChipsetTags] = useState([]);


    const [priceData, setPriceData] = useState(normalDefalutAttr);


    let tags = [];
    const [edit, setEdit] = useState(false);
    const [file, setFile] = useState();
    const [clear, setClear] = useState(false);

    const dataGet = dataUpdate ? JSON.parse(dataUpdate) : '';

    let titleWrite = $("input[name=title]#pro-title").val();
    const [slugManage, setSlugManage] = useState(true);
    const [formData, setFormData] = useState(defaultValuePro ? defaultValuePro : {
        status: "active",
        content: '',
        slug: ''
    });



    useEffect(() => {
        setMetaData(metaData)
        let chipTag = defaultValuePro ? metaData.tags ? metaData.tags : [] : [];
        let chipTagProduct = defaultValuePro ? defaultValuePro.tag_list : [];
        setChipset(chipTag)
        setChipsetTags(chipTagProduct)
        // setPriceData(stateData);
    }, [])



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
                    $(".tab-content .tab-pane").html("<div class='fail-load'><i class='bx bxs-smiley-sad'></i><p style='text-align: center ;margin : 10px 0 0 '>خطا در ارتباط با دیتابیس</p><p>مجددا تلاش کنید</p><div>");
                    ErrorToast("خطای غیر منتظره ای رخ داده است")
                }

            })
    }


    const HandleForm = (e) => {
        let formNew = {...formData};
        let formFile = new FormData();

        // forms = allFiles;

        let name = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();

        formFile.append("title", title)
        formFile.append("slug", slug)
        // console.log("vvvv"   , allFiles)
        allFiles.map((items , index) => {
            formFile.append("image_"+index, items);

        })

        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formNew.status;
        formFile.append("status", status);

        if (slugManage == false) {
            formFile.append("slug", formNew.title);

        } else {
        }

        if (formData.slug == "") {
            formFile.append("slug", formNew.title);
        }
        formFile.append("content", contentNew);

        let normal = NoralizeFetures(priceData);
        let checkValueFetures = CheckTextFetures(normal)


        if (checkValueFetures) {
            formFile.append("attributes", JSON.stringify(normal.attributes));
            formFile.append("features", JSON.stringify(normal.fetures));
            formFile.append("category_list", JSON.stringify(idSelCat));
            formFile.append("tag_list", JSON.stringify(chipsetTagsChange ? chipsetTags : []));
            metaData.robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : "false";
            let metadatas = JSON.stringify(metaData);
            formFile.append("metadata", metadatas);
            if (formData.title && formData.title !== '') {
                $("input[name=title]#pro-title").removeClass("is-invalid");
                CreateNewProduct(formFile);
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


    let MakeNewName = (name) => {
        const min = 1;
        const max = 1000;
        const rand = Number(min + Math.random() * (max - min)).toFixed(0);
        return name + rand + "_کپی";
    }


    const handleSwither = (e, state, name) => {
        switch (name) {
            case "showState" :
                componentHandler.handleSwitchShowState(e, state, setEdit);
                return true;
            default :
                return true;
        }
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








    const onClose = () => {

    }

    const onSubmit = () => {

    }

    const editorData = () => {}

    const handleInputs = () => {}

    const tagChange = () => {}

    const fileChange = () => {}

    const handleMetaData = () => {}


    const categoryOnChange = (categories) => {
        setEdit(true)
        let priceDataClone = {...priceData};
        let categorySelected = [];
        categories.map((idMap) => {
            categorySelected.push(parseInt(idMap.id));
        })
        priceDataClone.category_list = categorySelected;
        setPriceData(priceDataClone);
    }


    const editorDataFunc = (data) => {

    }
    return (
        <>
            <div id={"category_add_pop_base"}>

                <ProductParentForm
                    actionType={"edit"}
                    edit={edit}
                    // categoryOnChange={}
                    checkChange={setChangeCheck}
                    defaultValuePro={defaultValuePro} // this data required for edit
                    tagChange={tagChange}
                    onChangeInput={handleInputs}
                    editorData={editorData}
                    fileChange={fileChange}
                    editorDataFunc={editorDataFunc}
                    handleMetaData={handleMetaData}
                />


                <div className={"col-12 bottom-footer"}>

                    <Footer actionType={"edit"} editStatus={edit} onCancel={onClose} onClicked={onSubmit} />

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
export default ProductEdit;
