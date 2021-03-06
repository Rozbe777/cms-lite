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

    console.log("___-----_" , defaultValuePro)
    const [allFiles, setAllFiles] = useState([]);
    const [delImageIds , setDelImaeIds] = useState([]);
    const [metaData, setMetaData] = useState(defaultValuePro.metadata ? JSON.parse(defaultValuePro.metadata) : {
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

    const [category_id , setCategory_id] = useState([]);

    useEffect(() => {
        defaultValuePro.category_list ? defaultValuePro.category_list.map(item => {
            category_id.push(parseInt(item.id));
            setCategory_id(category_id);
        }) : setCategory_id([]);
    },[])


    const [idSelCat, setIdSelCat] = useState([])
    const [contentNew, setContentNew] = useState(defaultValuePro.content ? defaultValuePro.content : '');
    const [chipset, setChipset] = useState([]);
    const [chipsetTags, setChipsetTags] = useState([]);


    const [priceData, setPriceData] = useState(normalDefalutAttr);


    const [edit, setEdit] = useState(false);

    let titleWrite = $("input[name=title]#pro-title").val();
    const [slugManage, setSlugManage] = useState(true);
    const [formData, setFormData] = useState(defaultValuePro);


    useEffect(() => {
        setMetaData(metaData)
        let chipTag = defaultValuePro ? metaData.tags ? metaData.tags : [] : [];
        let chipTagProduct = defaultValuePro ? defaultValuePro.tag_list : [];
        setChipset(chipTag)
        setChipsetTags(chipTagProduct)
    }, [])


    const setChangeCheck = status => {
        setEdit(true);
    }
    const handleInputs = (e) => {
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

    const onClose = (e) => {
        e.preventDefault();
        helperFunction.handleClose();
    }

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
            productFormData.append("category_list", JSON.stringify(category_id));
            productFormData.append("tag_list", JSON.stringify(formData.tag_list));
            productFormData.append("delete_images", JSON.stringify(delImageIds));
            productFormData.append("_token", TOKEN);
            productFormData.append("id", formDataClone.id);
            metaData.robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : false;
            productFormData.append("metadata", JSON.stringify(metaData));
            if (formDataClone.title && formDataClone.title !== '') {
                $("input[name=title]#pro-title").removeClass("is-invalid");
                swalAccept("???????????? ??????????").then(resSwal => {
                    if (resSwal.value) {
                        productApi._updateData = productFormData;
                        productApi.update(productFormData).then(res => {
                            successSwal("???? ???????????? ???????????? ???? !");
                            result(e);
                        })
                    }
                })
            } else {
                $("input[name=title]#pro-title").addClass("is-invalid");
                error("???????? ???????? ?????????? ?????????? ???? ???? ???????? !")
            }
        } else {
            ErrorToast("?????????? ?????????? ???????????? ?????? ?????????? ???? ???????? ?????????? ?????????? ??????.")
        }
    }

    const editorData = (data) => {
        setEdit(true)
        setContentNew(data)
    }


    const descriptionTagChange = (tagList) => {
        setEdit(true)
        let productFormClone = {...formData};
        productFormClone.tag_list = tagList;
        setFormData(productFormClone);
    }

    const handleTagMetaData = (tagList) => {
        setEdit(true)
        let metaDataClone = {...metaData};
        metaDataClone.tags = tagList;
        setMetaData(metaDataClone);
    }

    const handleMetaData = (e) => {
        setEdit(true)
        setMetaData({
            ...metaData,
            [e.target.name]: e.target.value
        })
    }


    const categoryOnChange = (categoriesChange) => {
        setEdit(true)
        categoriesChange.map((idMap) => {
            let response_search = category_id.indexOf(parseInt(idMap.id));
            if (response_search === -1){
                category_id.push(parseInt(idMap.id))
            }
        })

        setCategory_id(category_id);
    }


    const handleEditAttributes = data => {
        setPriceData(data)
    }

    const handleGalleryDeletedId = id => {
        delImageIds.push(id);
        setDelImaeIds(delImageIds);
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
                        onChangeInput={handleInputs}
                        editorData={editorData}
                        handleTagDescription={descriptionTagChange}
                        handleMetaData={handleMetaData}
                        handleGalleryDeletedId={handleGalleryDeletedId}
                        handleTagMetaData={handleTagMetaData}
                        handleEditAttributes={handleEditAttributes}
                    />
                </FilesShopContext.Provider>
                <div className={"col-12 bottom-footer"}>
                    <Footer actionType={"edit"} editStatus={edit} onCancel={onClose} onClicked={onSubmit}/>
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
