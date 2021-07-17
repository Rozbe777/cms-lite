import React, {useEffect, useState, useContext} from 'react';
import './../../_Shared/Style.scss'
import {ErroHandle, error as ErrorToast, error, successSwal, swalAccept} from './../../../../helper'
import './../../_Micro/TreeShow/_Shared/style.scss';
import "swiper/swiper-bundle.css";
import {FilesShopContext} from "../Helper/Context";
import HelperFunction from "../Helper/HelperFunction";
import $ from "jquery";
import {
    CheckTextFetures,
    NoralizeFetures,
    NormalAttrOnePro,
    NormalAttrHead,
} from "../../Helper/HelperClassFetures";
import {Footer} from "./Footer";
import ProductParentForm from "./ProductParentForm";
import ProductApi from "../Api/ProductApi";
import {TOKEN} from "../../../../services/Type";

const ProductEdit = ({defaultValuePro, types, dataUpdate, result}) => {

    const [allFiles, setAllFiles] = useState([]);
    const [checkChange, setCheckChange] = useState(false)
    const [metaData, setMetaData] = useState(defaultValuePro.metadata? JSON.parse(defaultValuePro.metadata) : {
        robots: false,
    });

    let productApi = new ProductApi();
    let helperFunction = new HelperFunction();
    let mins = 10000000000;
    let maxs = 99999999999;
    let firstRand = Math.round(mins + Math.random() * (maxs - mins));
    let defCounters = {num: firstRand};
    const [counter, setCounter] = useState(defCounters);
    let normalDefalutAttr = NormalAttrOnePro(defaultValuePro, types, counter.num);

    let normalHeadTitle = defaultValuePro ? NormalAttrHead(defaultValuePro) : {
        color: [],
        text: []
    };


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
    const [clear, setClear] = useState(false);

    const dataGet = dataUpdate ? JSON.parse(dataUpdate) : '';

    let titleWrite = $("input[name=title]#pro-title").val();
    const [slugManage, setSlugManage] = useState(true);
    const [formData, setFormData] = useState(defaultValuePro);


    useEffect(() => {
        setMetaData(metaData)
        let chipTag = defaultValuePro ? metaData.tags ? metaData.tags : [] : [];
        let chipTagProduct = defaultValuePro ? defaultValuePro.tag_list : [];
        setChipset(chipTag)
        setChipsetTags(chipTagProduct)
        // setPriceData(stateData);
    }, [])


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


    const HandlerBigSwitcher = (states) => {
        setEdit(true)
        localStorage.setItem("robots", states)
    }

    const handleAddress = (status) => {
        setEdit(true)
        setSlugManage(status)
    }


    const onClose = (e) => {
        e.preventDefault();
        helperFunction.handleClose();
    }

    console.log("_______", allFiles)

    const onSubmit = (e) => {
        e.preventDefault();
        let formDataClone = {...formData};
        let productFormData = new FormData();
        let title = $("input[name=title]").val();
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        productFormData.append("title", title)
        productFormData.append("slug", slug)
        allFiles.map((items, index) => {

            productFormData.append("image_" + index, items);

        })

        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formDataClone.status;
        productFormData.append("status", status);

        if (slugManage == false) {
            productFormData.append("slug", formDataClone.title);

        } else {
        }

        if (formData.slug == "") {
            productFormData.append("slug", formDataClone.title);
        }
        productFormData.append("content", contentNew);

        let normal = NoralizeFetures(priceData);
        let checkValueFetures = CheckTextFetures(normal)


        if (checkValueFetures) {
            productFormData.append("attributes", JSON.stringify(normal.attributes));
            productFormData.append("features", JSON.stringify(normal.fetures));
            productFormData.append("category_list", JSON.stringify(idSelCat));
            productFormData.append("tag_list", JSON.stringify(formData.tag_list));
            productFormData.append("_token", TOKEN);
            productFormData.append("id", formDataClone.id);
            metaData.robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : "false";
            console.log("metassss " , metaData)
            productFormData.append("metadata", metaData);
            if (formDataClone.title && formDataClone.title !== '') {

                $("input[name=title]#pro-title").removeClass("is-invalid");

                swalAccept("ویرایش محصول").then(resSwal => {
                    if (resSwal.value) {
                        productApi._updateData = productFormData;
                        productApi.update(productFormData).then(res => {
                            successSwal("با موفقیت ویرایش شد !");
                            result(res);
                        })
                    }
                })
            } else {
                $("input[name=title]#pro-title").addClass("is-invalid");
                error("لطفا فیلد عنوان محصول را پر کنید !")
            }
        } else {
            ErrorToast("مقدار ویژگی الزامی است زمانی که ردیف ویژگی موجود است.")
        }
    }

    const editorData = () => {
    }

    const handleInputs = (e) => {
        let formDataClone = {...formData};
        formDataClone[e.target.name] = e.target.value;
        setFormData(formDataClone);
    }

    const descriptionTagChange = (tagList) => {
        let productFormClone = {...formData};
        productFormClone.tag_list = tagList;
        setFormData(productFormClone);
    }

    const seoTagChange = (tagList) => {
        let metaDataClone = {...metaData};
        metaDataClone.tag_list = tagList;
        setMetaData(metaDataClone);
    }

    const fileChange = () => {
    }

    const handleMetaData = (e) => {
        setEdit(true)
        setMetaData({
            ...metaData,
            [e.target.name]: e.target.value
        })
    }


    const categoryOnChange = (categories) => {
        setEdit(true)
        let formDataClone = {...formData};
        let categorySelected = [];
        categories.map((idMap) => {
            categorySelected.push(parseInt(idMap.id));
        })
        formDataClone.category_list = categorySelected;
        setFormData(formDataClone);
    }


    const editorDataFunc = (data) => {

    }


    return (
        <>
            <div id={"category_add_pop_base"}>

                <FilesShopContext.Provider value={{allFiles, setAllFiles}}>
                    <ProductParentForm
                        actionType={"edit"}
                        edit={edit}
                        categoryOnChange={categoryOnChange}
                        checkChange={setChangeCheck}
                        defaultValuePro={defaultValuePro} // this data required for edit
                        tagChange={seoTagChange}
                        onChangeInput={handleInputs}
                        editorData={editorData}
                        handleTagDescription={descriptionTagChange}
                        fileChange={fileChange}
                        handleAddChip={handleAddChip}
                        editorDataFunc={editorDataFunc}
                        handleMetaData={handleMetaData}
                    />
                </FilesShopContext.Provider>
                <div className={"col-12 bottom-footer"}>
                    <Footer actionType={"edit"} editStatus={edit}  onCancel={onClose} onClicked={onSubmit}/>
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
