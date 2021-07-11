import React, {useEffect, useState} from "react";
import {Tab} from "../../_Micro/Tab";
import {Switcher} from "../../../HOC/Switch";
import {BASE_URL_IMG} from "../../../../services/Type";
import {MultiSelected} from "../../Shop/ProductManager/HOC/MultiSelected";
import {ChipsetHandler} from "../../../HOC/ChipsetHandler";
import MyEditor from "../../_Micro/MyEditor/MyEditor";
import {BigSwitcher} from "../../../HOC/BigSwitcher";
import ComponentHandler from "../Helper/ComponentHandler";
import FunctionHandler from "../Helper/FunctionHandler";
import './../_shared/style.scss';
import CategoryApi from "../../Category/Api/CategoryApi";
import HelperFunction from './../Helper/HelperFunction'
import $ from "jquery";


export const ContentFormParent = ({
                                      actionType,
                                      dataUpdate,
                                      onChangeInput,
                                      categoryOnChange,
                                      tagChange,
                                      editorData,
                                      fileChange,
                                      handleMetaData
                                  }) => {


    let componentHandler = new ComponentHandler();
    let functionHandler = new FunctionHandler();
    let helperFunction = new HelperFunction();
    let categoryApi = new CategoryApi();
    let titleWrite = $("input[name=titleContent]").text();

    const contentDataUpdate = dataUpdate ? JSON.parse(dataUpdate) : '';
    const dataUpdateParse = contentDataUpdate ? contentDataUpdate.allData : '';
    const [changeCheckSlug, setChangeCheck] = useState(false)
    const [preImage, setPreImage] = useState({uri: ''});
    const MetaDataUpdate = dataUpdateParse ? JSON.parse(dataUpdateParse.metadata) : {robots: false};
    const [categoryData, setCategoryData] = useState({});
    const [title, setTitle] = useState('');
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


    const handledelImg = (e) => {
        e.preventDefault();
        setEdit(true)
        let states = {...imageGet};
        states.state = '';
        setImage(states)
        let preImages = {...preImage}
        preImages.uri = '';
        setPreImage(preImages)
    }

    const handleFile = (e) => {
        handlePreShowImage(e)
        setEdit(true)
        let files = e.target.files[0];
        setFile({file: files});
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


    const handleMakeName = () => {
        if (dataUpdateParse) {
            if (actionType == "duplicate") {
                return this.MakeNewName(dataUpdateParse.title);
            } else {
                return dataUpdateParse.title;
            }
        } else {
            contentForm.slug = contentForm.title;
            return contentForm.title;
        }
    }


    const handleAddChip = (item) => {
        setEdit(true)
        setChipChange(true)
        let chipsets = [...chipset];
        if (item === "") {
        } else {
            chipsets.push(item);
            setChipset(chipsets);
            tagChange(chipsets);
        }
    }


    const RemoveChipset = (e, name) => {
        e.preventDefault();
        setChipChange(true)
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
        setEdit(true);
        setChangeCheck(event.target.checked)
        setSlugManage(status);
    }

    const handleChangeTitle = e => {
        onChangeInput(e);
        if (e.target.name === "title") {
            setTitle(e.target.value);
        }
    }
    return (
        <>
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
                                           defaultValue={handleMakeName}
                                           onChange={e => handleChangeTitle(e)}
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
                                {_renderImgBox()}
                            </div>

                            <div className={"col-lg-6 col-md-12 col-sm-12"}>
                                <label
                                    htmlFor="users-list-role">دسته بندی</label>
                                <MultiSelected name={"categories"} data={categoryData ? categoryData : []}
                                               defSelected={dataUpdateParse.categories ? dataUpdateParse.categories : []}
                                               selected={item => categoryOnChange(item)}
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
                                                    callback={item => handleAddChip(item)}/>
                                            </div>

                                            {chipset.map((item, index) => (
                                                _renderChipsetContent(index, item)
                                            ))}


                                        </div>

                                    </div>
                                </div>

                            </div>

                            {/*{console.log('...;..' , dataUpdateParse.content)}*/}
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

                            <div className={"col-lg-9 col-md-8 col-sm-12"} style={{paddingTop: 8}}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس صفحه محتوا</label>
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
                                           defaultValue={MetaDataUpdate ? MetaDataUpdate.title : ''}
                                           onChange={e => handleMetaData(e)}
                                           name={"title"} id={"title"}
                                           className={"form-control"}/>


                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>توضیح صفحه ( حداکثر 155 حرف )</label>
                                    <textarea type={"text"}
                                              onChange={e => handleMetaData(e)}
                                              name={"content"}
                                              defaultValue={MetaDataUpdate ? MetaDataUpdate.content : ''}
                                              id={"title"} className={"form-control"}/>


                                </fieldset>
                            </div>


                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس داخلی برای انتقال (301 Redirect)</label>
                                    <input type={"text"}
                                           onChange={e => handleMetaData(e)}
                                           name={"redirect"}
                                           defaultValue={MetaDataUpdate ? MetaDataUpdate.redirect : ''}
                                           id={"title"} className={"form-control"}/>

                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس Canonical</label>
                                    <input
                                        onChange={e => handleMetaData(e)}
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
            </div>
        </>
    )

    function _renderSlug() {
        // check auto or handle slug change
        let tit = $("input[name=titleContent]").val()+"";
        if (slugManage) {
            let slugText = helperFunction.contentFormData(tit);
            return (
                <div className={"fucks"}>
                    {slugText}
                </div>
            )
        } else {
            // handle change
            return (
                <input type={"text"}
                       defaultValue={contentForm.slug}
                       onChange={e => handleChangeTitle(e)}
                       name={"slug"} id={"title"}
                       className={"form-control slugest"}/>
            )
        }
    }

    function _renderChipsetContent(index, item) {
        return (
            <div key={index} className="chip mr-1">
                <div className="chip-body">
                    <span className="chip-text">{item}</span>
                    <div className="chip-closeable"
                         onClick={e => RemoveChipset(e, item)}>
                        <i className="bx bx-x"></i>
                    </div>
                </div>
            </div>
        )
    }


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
