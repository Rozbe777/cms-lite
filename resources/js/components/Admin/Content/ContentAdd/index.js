import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {Switcher} from './../../../HOC/Switch'
import {BigSwitcher} from './../../../HOC/BigSwitcher';
import './../../_Shared/Style.scss'
import {Request} from './../../../../services/AdminService/Api'
import MyEditor from "../../_Micro/MyEditor/MyEditor";
import {ErroHandle, error as ErrorToast, error} from './../../../../helper'
import {ChipsetHandler} from './../../../HOC/ChipsetHandler'
import './../../_Micro/TreeShow/_Shared/style.scss';
import {MultiSelected} from "../../Shop/ProductManager/HOC/MultiSelected";
import FormHandler from "../Helper/FormHandler";
import $ from "jquery";
import {BASE_URL_IMG} from "../../../../services/Type";
import {Tab} from "../../_Micro/Tab";
import RequestHandler from "../Helper/RequestHandler";
import FunctionHandler from "../Helper/FunctionHandler";
import ComponentHandler from "../Helper/ComponentHandler";
import CreateContent from "../Api/ContentApi";
import {HandleFormAdd} from "../Helper/Action"
import HelperFunction from "../Helper/HelperFunction";
import ContentDependentApi from "../Api/ContentDependentApi";
import CategoryApi from "../../Category/Api/CategoryApi";
import {Footer} from "../Component/Footer";

const ContentAdd = ({token, resultForm, dataUpdate}) => {


    let formHandler = new FormHandler();
    let componentHandler = new ComponentHandler();
    let functionHandler = new FunctionHandler();
    let requestHandler = new RequestHandler();
    let helperFunction = new HelperFunction();
    let categoryApi = new CategoryApi();
    let contentDependentApi = new ContentDependentApi();
    let titleWrite = $("input[name=titleContent]").val();
    const contentDataUpdate = dataUpdate ? JSON.parse(dataUpdate) : '';
    const dataUpdateParse = contentDataUpdate ? contentDataUpdate.allData : '';
    const [changeCheckSlug, setChangeCheck] = useState(false)
    const [preImage, setPreImage] = useState({uri: ''});
    const MetaDataUpdate = dataUpdateParse ? JSON.parse(dataUpdateParse.metadata) : {robots: false};
    const [clear, setClear] = useState(false)
    const [categoryData, setCategoryData] = useState({});
    const [loading, setLoading] = useState(false);
    const [editorContent, setEditorContent] = useState('');
    const [currentContentId, setCurrentContentId] = useState(0)
    const [chipset, setChipset] = useState([]);
    const [chipsetChange, setChipChange] = useState(false)
    const [edit, setEdit] = useState(false);
    const [file, setFile] = useState({file: ''});
    const [metaData, setMetaData] = useState({
        robots: false,
    });
    const type = contentDataUpdate ? contentDataUpdate.type : '';
    const [slugManage, setSlugManage] = useState(true);
    const [contentForm, setContentForm] = useState({});
    let default_value = {
        is_menu: 0,
        comment_status: "deactivate",
        status: "active",
        content: '',
        slug: ''
    };
    let currentContentData = dataUpdateParse ? dataUpdateParse : default_value;
    let categorySelctedId = [];
    dataUpdateParse ? dataUpdateParse.categories.map(item => {
        categorySelctedId.push(item.id);
    }) : '';

    let imageOldUrl = currentContentData ? currentContentData.image : '';
    const [imageGet, setImage] = useState({state: imageOldUrl})

    const [categoryOldSelected, setCategoryOldSelected] = useState(categorySelctedId)
    useEffect(() => {
        categoryApi.call().then(res => {
            setCategoryData(res.data.data);
        })

        // if (currentContentData.image) {
        //     let name = currentContentData.image;
        //     let imgName = name.split("/")[2];
        //     setLoading(true);
        //     contentDependentApi.getImageUrl(imgName).then(res => {
        //         setLoading(false);
        //         setImage({state : res.data});
        //     })
        // } else {
        //     setImage({state: ''})
        // }


        dataUpdateParse ? dataUpdateParse.tags.map(item => {
            chipset.push(item.name);
            setChipset(chipset);
        }) : '';


        setMetaData(MetaDataUpdate)
        setCurrentContentId(currentContentData.id);
        setContentForm({
            id: currentContentData.id,
            image: currentContentData.image,
            content: currentContentData.content,
            is_menu: currentContentData.is_menu,
            status: currentContentData.status,
            comment_status: currentContentData.comment_status,
            metadata: currentContentData.metadata,
            slug: currentContentData.slug,
            title: currentContentData.title,
            tag_list: currentContentData.tag_list,
            category_list: currentContentData.category_list
        });

    }, [])

    const checkResult = (statused) => {
        if (statused) {
            resultForm(true)
            $("span.checkboxeds").removeClass("active");
            formHandler.HandleRemoveLocal();
        }
    }

    const handleSwither = (e, state, name) => {
        switch (name) {
            case "showCommentStatus" :
                componentHandler.handleSwitchComment(e, state, setEdit);
                return true;
            case 'showState' :
                componentHandler.handleSwitchStatus(e, state, setEdit);
                return true;
            case 'showMenu' :
                componentHandler.handleSwitchMenu(e, state, setEdit);
                return true;
            default :
                return true;
        }
    }

    const handleEditorData = (data) => {
        setEdit(true)
        setEditorContent(data)
    }


    return (
        <div id={"category_add_pop_base"}>
            <ul className="nav nav-tabs tab-layout" role="tablist">
                <Tab active={true} id={"cat-tab"} title={"محتوا"} href={"#cat"} icon={"bx bxs-pencil"}/>
                <Tab id={"seo-tab"} title={"سئو و آدرس"} href={"#seo"} icon={"bx bxl-internet-explorer"}/>

            </ul>
            <div className="tab-content" style={{padding: 0, position: 'relative'}}>
                <div className="tab-pane active" id="cat" aria-labelledby="cat-tab" role="tabpanel">
                    <div className={"content-pages"}>

                        <div className={"row"} style={{padding: '20px'}}>
                            <div className={"col-lg-4 col-md-8 col-sm-12"} style={{paddingTop: 5}}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>عنوان محتوا</label>
                                    <input type={"text"}
                                           defaultValue={functionHandler.HandleMakeName(dataUpdateParse, contentForm, type)}
                                           onChange={e => functionHandler.handleInput(e, setChangeCheck, setEdit, slugManage, contentForm, setContentForm)}
                                           name={"titleContent"} id={"title"}
                                           className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>دیدگاه</label>
                                    <Switcher
                                        defaultState={dataUpdateParse ? dataUpdateParse.comment_status == "active" ? true : false : false}
                                        handleSwitchStatus={handleSwither} name={"showCommentStatus"}
                                        valueActive={"فعال"}
                                        valueDeActive={"غیرفعال"}/>
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
                                {preImage.uri ? (
                                        <div className={"mini-img-show-edit"}>
                                            <div className={"img-box"}>
                                                <img src={`${preImage.uri}`}/>
                                                <div className={"back"}><span
                                                    onClick={e => functionHandler.handledelImg(e, setEdit, imageGet, setImage, setPreImage, preImage)}><i
                                                    className={"bx bx-x"}></i> </span></div>
                                            </div>
                                        </div>)
                                    : !loading ? !loading && imageGet.state !== "" ? (
                                        <div className={"mini-img-show-edit"}>
                                            <div className={"img-box"}>
                                                <img src={`${BASE_URL_IMG}/${imageGet.state}`}/>
                                                <div className={"back"}><span
                                                    onClick={e => functionHandler.handledelImg(e, setEdit, imageGet, setImage, setPreImage, preImage)}><i
                                                    className={"bx bx-x"}></i> </span></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <fieldset className="form-group" style={{width: '100%'}}>
                                            <label id={"selectParent"}>افزودن فایل</label>
                                            <div id={"file"}>
                                                <input type={"file"} name={"image"}
                                                       multiple="multiple"
                                                       onChange={e => functionHandler.HandleFile(e, preImage, setPreImage, setEdit, setFile, imageGet, setImage)}
                                                       style={{
                                                           opacity: 0,
                                                           zIndex: 9,
                                                           height: '100%',
                                                           position: 'absolute',
                                                           cursor: 'pointer'
                                                       }}/>
                                                <button id="select-files" className="btn btn-primary mb-1">
                                                    <i className="icon-file2"></i>
                                                    انتخاب فایل
                                                </button>

                                            </div>
                                        </fieldset>
                                    ) : (<div className="spinner-border" role="status">
                                        <span className="sr-only">در حال بارگذاری ...</span>
                                    </div>)}
                            </div>

                            <div className={"col-lg-6 col-md-12 col-sm-12"}>
                                <label
                                    htmlFor="users-list-role">دسته بندی</label>
                                <MultiSelected name={"categories"} data={categoryData ? categoryData : []}
                                               clear={clear}
                                               defSelected={dataUpdateParse.categories ? dataUpdateParse.categories : []}
                                               clearNew={cl => setClear(cl)}
                                               selected={item => {
                                                   let datame = [];
                                                   setCategoryOldSelected([]);
                                                   setEdit(true)
                                                   item.map((ii, index) => {
                                                       let idsel = categoryOldSelected.indexOf(parseInt(ii.id))
                                                       datame.push(parseInt(ii.id))
                                                       setCategoryOldSelected(datame);
                                                   })
                                               }}

                                               defaultsel={dataUpdateParse ? dataUpdateParse.categories : []}
                                />
                            </div>

                            <div className={"col-lg-6 col-md-12 col-sm-12"} style={{padding: '0px 30px'}}>
                                <label htmlFor={"title"}>کلمات کلیدی صفحه ( تایپ کنید و Enter بزنید تا اضافه شود.
                                    )</label>
                                <div className={"row"}>

                                    <div className={"col-12"} id={"chip-box"} style={{minHeight: 50}}>
                                        <div className={"row"}>

                                            <div className={"col-sm-12 col-md-5 col-lg-5"}>
                                                <ChipsetHandler
                                                    callback={item => functionHandler.handleAddChip(item, setEdit, setChipChange, chipset, setChipset)}/>
                                            </div>

                                            {chipset.map((item, index) => (
                                                <div key={index} className="chip mr-1">
                                                    <div className="chip-body">
                                                        <span className="chip-text">{item}</span>
                                                        <div className="chip-closeable"
                                                             onClick={e => functionHandler.RemoveChipset(e, item, chipset, setChipset, setChipChange)}>
                                                            <i className="bx bx-x"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}


                                        </div>

                                    </div>
                                </div>

                            </div>

                            {/*{console.log('...;..' , dataUpdateParse.content)}*/}
                            <div className={"col-12"}>
                                <MyEditor editorDataFunc={handleEditorData}
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
                                              status={state => functionHandler.handleAddress(status, setEdit, setSlugManage)}
                                              name={"AddressType"}
                                              valueActive={"خودکار"} valueDeActive={"دستی"}/>
                                </fieldset>
                            </div>

                            <div className={"col-lg-9 col-md-8 col-sm-12"} style={{paddingTop: 8}}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس صفحه محتوا</label>
                                    {slugManage ? changeCheckSlug ? (
                                        <div className={"fucks"}>
                                            {titleWrite}
                                        </div>
                                    ) : (
                                        <div className={"fucks"}>
                                            {contentForm.slug}
                                        </div>
                                    ) : (
                                        <input type={"text"}
                                               defaultValue={contentForm.slug}
                                               onChange={e => functionHandler.handleInput(e, setChangeCheck, setEdit, slugManage, contentForm, setContentForm)}
                                               name={"slug"} id={"title"}
                                               className={"form-control slugest"}/>
                                    )}
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
                                           defaultValue={MetaDataUpdate ? MetaDataUpdate.title : ''}
                                           onChange={e => functionHandler.HandleMetaData(e, setEdit, setMetaData, metaData)}
                                           name={"title"} id={"title"}
                                           className={"form-control"}/>


                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>توضیح صفحه ( حداکثر 155 حرف )</label>
                                    <textarea type={"text"}
                                              onChange={e => functionHandler.HandleMetaData(e, setEdit, setMetaData, metaData)}
                                              name={"content"}
                                              defaultValue={MetaDataUpdate ? MetaDataUpdate.content : ''}
                                              id={"title"} className={"form-control"}/>


                                </fieldset>
                            </div>


                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس داخلی برای انتقال (301 Redirect)</label>
                                    <input type={"text"}
                                           onChange={e => functionHandler.HandleMetaData(e, setEdit, setMetaData, metaData)}
                                           name={"redirect"}
                                           defaultValue={MetaDataUpdate ? MetaDataUpdate.redirect : ''}
                                           id={"title"} className={"form-control"}/>

                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس Canonical</label>
                                    <input
                                        onChange={e => functionHandler.HandleMetaData(e, setEdit, setMetaData, metaData)}
                                        name={"canonical"} type={"text"}
                                        defaultValue={MetaDataUpdate ? MetaDataUpdate.canonical : ''}
                                        id={"title"} className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <label>تنظیمات Robots</label>
                                <BigSwitcher status={states => componentHandler.HandlerBigSwitcher(states, setEdit)}
                                             name={"Robots"}
                                             valueOne={"غیرفعال"} valueTow={"noindex,follow"}
                                             defaultStatus={MetaDataUpdate ? MetaDataUpdate.robots : false}
                                             default={''}
                                             valueThree={"noindex,unfolow"}/>
                            </div>

                        </div>

                    </div>
                </div>

                <div className={"col-12 bottom-footer"}>
<Footer />
                </div>
            </div>
        </div>
    )

    function onSubmit() {
        let api = new CreateContent()
        let contentDataClone = {...contentForm};
        let titleWrite = $("input[name=titleContent]").val();
        let contentcontentForm = new contentForm();
        contentcontentForm.append("image", file.file ? file.file : '')
        let metaDataClone = {...metaData};
        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : contentDataClone.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : contentDataClone.status;
        let comment_status = localStorage.getItem("comment_status") ? localStorage.getItem("comment_status") : contentDataClone.comment_status;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaDataClone.robots;
        contentcontentForm.append("status", status)
        contentcontentForm.append("comment_status", comment_status)
        contentcontentForm.append("is_menu", is_menu)
        let title = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        contentcontentForm.append("title", title)
        if (slugManage == false) {
            contentcontentForm.append("slug", title)
        }else{
            contentcontentForm.append("slug", slug)
        }

        if (contentDataClone.slug == "") {
            contentcontentForm.append("slug", title)
        }
        contentcontentForm.append("content", editorContent)
        metaDataClone.robots = robots;
        let metaDataStringify = JSON.stringify(metaDataClone);
        contentcontentForm.append("metadata", metaDataStringify)
        contentcontentForm.append("category_list", JSON.stringify(categoryOldSelected))
        let contentTagList = chipsetChange ? chipset : [];
        contentcontentForm.append("tag_list", JSON.stringify(contentTagList))
        if (contentDataClone.title && contentDataClone.title !== '') {
            $("input[name=titleContent]").removeClass("is-invalid");
            api.create(contentcontentForm).then(res => {

            })
        } else {
            $("input[name=titleContent]").addClass("is-invalid");
            error("لطفا فیلد عنوان صفحه را پر کنید !")
        }

    }

}
export default ContentAdd;
