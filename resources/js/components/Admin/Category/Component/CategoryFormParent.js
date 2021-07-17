import React, {useEffect, useState} from "react";
import {Tab} from "../../_Micro/Tab";
import {Switcher} from "../../../HOC/Switch";
import {BASE_URL_IMG} from "../../../../services/Type";
import {MultiSelected} from "../../Shop/ProductManager/HOC/MultiSelected";
import {ChipsetHandler} from "../../../HOC/ChipsetHandler";
import MyEditor from "../../_Micro/MyEditor/MyEditor";
import {BigSwitcher} from "../../../HOC/BigSwitcher";
import ComponentHandler from "../Helper/ComponentHandler";
import {SelectOptions} from "../../../HOC/SelectOptions";
import './../_shared/style.scss';
import CategoryApi from "./../Api/CategoryApi";
import HelperFunction from './../Helper/HelperFunction'
import $ from "jquery";


export const CategoryFormParent = ({
                                       parentId,
                                       actionType,
                                       changeCheck,
                                       onChangeInput,
                                       tagChange,
                                       categoryData,
                                       editorData,
                                       allCategory, // this data using to display multioption parernt id
                                       fileChange,
                                       handleMetaData,
                                       categoryParentId,
                                       edit
                                   }) => {


    console.log(categoryData);
    let componentHandler = new ComponentHandler();
    let helperFunction = new HelperFunction();

    let nameCategory = $("input#title").val() + "";

    const [editInComponent, setEditInComponent] = useState(false)
    const dataUpdateParse = categoryData ? categoryData : '';
    const [preImage, setPreImage] = useState({uri: ''});
    const metaDataUpdate = dataUpdateParse ? JSON.parse(dataUpdateParse.metadata) : {robots: false};

    const [chipset, setChipset] = useState(metaDataUpdate.tags ? metaDataUpdate.tags : []);
    const [slugManage, setSlugManage] = useState(true);
    const [loading, setLoading] = useState(false)
    let default_value = {
        is_menu: 0,
        comment_status: "deactivate",
        status: "active",
        content: '',
        slug: ''
    };
    let currentContentData = dataUpdateParse ? dataUpdateParse : default_value;


    let imageOldUrl = currentContentData ? currentContentData.image : '';
    const [imageGet, setImage] = useState({state: imageOldUrl})

    useEffect(() => {

    }, [])


    const handleSwither = (e, state, name) => {
        switch (name) {
            case 'showState' :
                componentHandler.handleSwitchStatus(e, state, changeCheck);
                return true;
            case 'showMenu' :
                componentHandler.handleSwitchMenu(e, state, changeCheck);
                return true;
            default :
                return true;
        }
    }


    const handledelImg = (e) => {
        e.preventDefault();
        changeCheck(true);

        let states = {...imageGet};
        states.state = '';
        setImage(states)
        let preImages = {...preImage}
        preImages.uri = '';
        setPreImage(preImages)
    }

    const handleFile = (e) => {
        handlePreShowImage(e)
        changeCheck(true)

        let files = e.target.files[0];
        fileChange(files);
        imageGet.state = '';
        setImage(imageGet);
    }

    const handlePreShowImage = (event) => {
        event.preventDefault();
        let preImages = {...preImage}
        if (event.target.files && event.target.files[0]) {
            preImages.uri = URL.createObjectURL(event.target.files[0])
            setPreImage(preImages)
        }
    }


    const handleAddChip = (item) => {
        changeCheck(true)


        let chipsets = [...chipset];
        if (item === "") {
        } else {
            chipsets.push(item);
            setChipset(chipsets);
            tagChange(chipsets);
        }
    }


    const removeChipset = (e, name) => {
        e.preventDefault();
        changeCheck(true)


        let tagList = [...chipset];
        let index = tagList.indexOf(name);

        if (index !== -1) {
            tagList.splice(index, 1);
            setChipset(tagList);
            tagChange(tagList);
        }
    }

    const handleSwitchAddress = (event, status) => {
        event.preventDefault();
        changeCheck(true);


        setSlugManage(status);
    }


    function handleMakeName() {
        let categoryName = dataUpdateParse.name;
        const min = 1;
        const max = 1000;
        const rand = Number(min + Math.random() * (max - min)).toFixed(0);
        return categoryName + rand + "_کپی";
    }


    const titleDefaultValue = () => {
        if (actionType === "duplicate") {
            return handleMakeName();
        } else if (actionType === "edit") {
            return dataUpdateParse.name;
        } else {
            return '';
        }
    }


    function _renderSlug() {
        // check auto or handle slug change
        let tit = $("input[name=name]").val() + "";
        console.log(slugManage  , tit , actionType)
        if (slugManage) {
            let slugText;
            if (actionType === "duplicate"){
                slugText = helperFunction.contentFormData(edit ? tit : handleMakeName(categoryData.name));
            }else if (actionType === "edit"){
                slugText = helperFunction.contentFormData(edit ? tit : categoryData.name);
            }else{
                console.log("svsdvsdv" , tit)
                slugText = tit !== '' ? helperFunction.contentFormData(tit) : '';

            }
            return (
                <div className={"fucks"}>
                    {slugText}
                </div>
            )
        } else {
            // handle change
            return (
                <input type={"text"}
                       defaultValue={categoryData.slug}
                       onChange={e => onChangeInput(e)}
                       name={"slug"} id={"title"}
                       className={"form-control slugest"}/>
            )
        }
    }


    return (
        <>
            <ul className="nav nav-tabs tab-layout" role="tablist">
                <Tab active={true} id={"cat-tab"} title={"دسته بندی"} href={"#cat"} icon={"bx bxs-pencil"}/>
                <Tab id={"seo-tab"} title={"سئو و آدرس"} href={"#seo"} icon={"bx bxl-internet-explorer"}/>

            </ul>
            <div className="tab-content" style={{padding: 0, position: 'relative'}}>
                <div className="tab-pane active" id="cat" aria-labelledby="cat-tab" role="tabpanel">
                    <div className={"content-pages"}>
                        <div className={"row"} style={{padding: '20px'}}>
                            <div className={"col-lg-3 col-md-4 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>عنوان دسته بندی</label>
                                    <input type={"text"} defaultValue={titleDefaultValue()}
                                           onChange={e => onChangeInput(e)}
                                           name={"name"} id={"title"}
                                           className={"form-control titleCat"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-3 col-md-4 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>دسته بندی پدر</label>
                                    <SelectOptions parents={parentId ? parentId : 0}
                                                   data={allCategory}
                                                   onChange={categoryParentId}/>

                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>وضعیت نمایش</label>
                                    <Switcher
                                        defaultState={dataUpdateParse ? dataUpdateParse.status == "active" ? true : false : true}
                                        handleSwitchStatus={handleSwither}
                                        name={"showState"}
                                        valueActive={"فعال"}
                                        valueDeActive={"غیرفعال"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>نمایش در منو</label>
                                    <Switcher
                                        defaultState={dataUpdateParse ? dataUpdateParse.is_menu == 0 ? false : true : false}
                                        handleSwitchStatus={handleSwither}
                                        name={"showMenu"}
                                        valueActive={"فعال"} valueDeActive={"غیرفعال"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}
                                 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                {_renderImgBox()}
                            </div>

                            <div className={"col-12"}>
                                <MyEditor editorDataFunc={editorData}
                                          id={"my-editor"}
                                          type={"perfect"}
                                          defaultVal={dataUpdateParse ? dataUpdateParse.content : ''}
                                />
                            </div>


                        </div>


                    </div>
                </div>
                <div className="tab-pane" id="seo" aria-labelledby="seo-tab" role="tabpanel">
                    <div className={"content-pages"}>
                        <div className={"row"} style={{padding: '25px'}}>
                            <div className={"col-lg-3 col-md-4 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>نوع آدرس</label>

                                    <Switcher defaultState={true}
                                              handleSwitchStatus={handleSwitchAddress}
                                              name={"AddressType"}
                                              valueActive={"خودکار"} valueDeActive={"دستی"}/>
                                </fieldset>
                            </div>

                            <div className={"col-lg-9 col-md-8 col-sm-12"}>
                                <fieldset className="form-group" style={{marginTop: '8px'}}>
                                    <label htmlFor={"title"}>آدرس صفحه دسته بندی</label>
                                    {_renderSlug()}
                                </fieldset>
                            </div>

                            <div className={"col s12"}>
                                <div className={"alert alert-primary mb-2 col-12"} role={"alert"}>
                                    اطلاعات تیتر و توضیحات صفحه به صورت خودکار توسط zerone برای سئوی بهتر ایجاد می‌شوند.
                                    در صورتی که تمایل به شخصی‌سازی آن دارید، می‌توانید از بخش زیر استفاده کنید.
                                </div>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>عنوان صفحه ( حداکثر 60 حرف )</label>
                                    <input type={"text"}
                                           defaultValue={metaDataUpdate ? metaDataUpdate.title : ''}
                                           onChange={handleMetaData} name={"title"} id={"title"}
                                           className={"form-control"}/>


                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>توضیح صفحه ( حداکثر 155 حرف )</label>
                                    <textarea
                                        defaultValue={metaDataUpdate ? metaDataUpdate.content : ''}
                                        type={"text"}
                                        onChange={handleMetaData} name={"content"}
                                        id={"title"}
                                        className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <label htmlFor={"title"}>کلمات کلیدی صفحه ( تایپ کنید و Enter بزنید تا اضافه شود.
                                    )</label>
                                <div className={"row"} style={{padding: '15px'}}>
                                    <div className={"col-12"} id={"chip-box"}>
                                        <div className={"row"}>
                                            <div className={"col-sm-12 col-md-4 col-lg-3"}>
                                                <ChipsetHandler onChange={handleAddChip}/>
                                            </div>
                                            {chipset.map((item, index) => (
                                                _renderChipset(index, item)
                                            ))}
                                        </div>

                                    </div>
                                </div>


                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس داخلی برای انتقال (301 Redirect)</label>
                                    <input type={"text"}
                                           defaultValue={metaDataUpdate ? metaDataUpdate.redirect : ''}
                                           onChange={handleMetaData} name={"redirect"}
                                           id={"title"} className={"form-control"}/>

                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس Canonical</label>
                                    <input
                                        defaultValue={metaDataUpdate ? metaDataUpdate.canonical : ''}
                                        onChange={handleMetaData}
                                        name={"canonical"} type={"text"}
                                        id={"title"} className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <label>تنظیمات Robots</label>

                                <BigSwitcher status={states => componentHandler.HandlerBigSwitcher(states, changeCheck)}
                                             name={"Robots"}
                                             valueOne={"غیرفعال"} valueTow={"noindex,follow"}
                                             defaultStatus={metaDataUpdate ? metaDataUpdate.robots : false}
                                             default={''}
                                             valueThree={"noindex,unfolow"}/>
                            </div>

                        </div>

                    </div>
                </div>


            </div>

        </>
    )


    function _renderChipset(index, item) {
        return (
            <div className="chip mr-1" key={index}>
                <div className="chip-body">
                    <span className="chip-text">{item}</span>
                    <div className="chip-closeable"
                         onClick={e => removeChipset(e, item)}>
                        <i className="bx bx-x"></i>
                    </div>
                </div>
            </div>
        )
    }


    // function _renderSlug() {
    //     // check auto or handle slug change
    //     if (slugManage) {
    //         if (actionType === "duplicate"){
    //             // let nameCategory ="vsdvsdv";
    //             console.log("____" , nameCategory)
    //             let slugText = helperFunction.contentFormData(nameCategory);
    //             return (
    //                 <div className={"fucks"}>
    //                     {slugText ? slugText : ''}
    //                 </div>
    //             )
    //         }else{
    //             let slugText = helperFunction.contentFormData(categoryData.name);
    //             return (
    //                 <div className={"fucks"}>
    //                     {slugText ? slugText : ''}
    //                 </div>
    //             )
    //         }
    //
    //     } else {
    //         // handle change
    //         return (
    //             <input type={"text"}
    //                    defaultValue={categoryData.slug}
    //                    onChange={e => onChangeInput(e)}
    //                    name={"slug"} id={"title"}
    //                    className={"form-control slugest"}/>
    //         )
    //     }
    // }


    function _renderImgBox() {
        if (preImage.uri !== "") {
            return (<div className={"mini-img-show-edit"}>
                <div className={"img-box"}>
                    <img src={`${preImage.uri}`}/>
                    <div className={"back"}><span
                        onClick={e => handledelImg(e)}><i
                        className={"bx bx-x"}></i> </span></div>
                </div>
            </div>)
        } else {
            if (imageGet.state) {
                return (
                    <div className={"mini-img-show-edit"}>
                        <div className={"img-box"}>
                            <img src={`${BASE_URL_IMG}/${imageGet.state}`}/>
                            <div className={"back"}><span
                                onClick={e => handledelImg(e)}>
                                <i className={"bx bx-x"}></i>
                            </span></div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <fieldset className="form-group" style={{width: '100%'}}>
                        <label id={"selectParent"}>افزودن فایل</label>
                        <div id={"file"}>
                            <input type={"file"} name={"image"}
                                   multiple="multiple"
                                   className={"fileInput"}
                                   style={{zIndex: 99}}
                                   onChange={e => handleFile(e)}
                            />
                            <button id="select-files" className="btn btn-primary mb-1">
                                <i className="icon-file2"></i>
                                انتخاب فایل
                            </button>
                        </div>
                    </fieldset>
                )
            }
        }

    }
}
