import React, {useEffect, useState} from "react";
import {Tab} from "../../_Micro/Tab";
import {Switcher} from "../../../HOC/Switch";
import {BASE_URL_IMG} from "../../../../services/Type";
import {MultiSelected} from "../../Shop/ProductManager/HOC/MultiSelected";
import {ChipsetHandler} from "../../../HOC/ChipsetHandler";
import MyEditor from "../../_Micro/MyEditor/MyEditor";
import {BigSwitcher} from "../../../HOC/BigSwitcher";
import ComponentHandler from "../Helper/ComponentHandler";
import './../_shared/style.scss';
import CategoryApi from "../../Category/Api/CategoryApi";
import HelperFunction from './../Helper/HelperFunction'
import $ from "jquery";


export const ContentFormParent = ({
                                      actionType,
                                      changeCheck,
                                      contentData,
                                      onChangeInput,
                                      categoryOnChange,
                                      tagChange,
                                      editorData,
                                      fileChange,
                                      handleMetaData
                                  }) => {


    let componentHandler = new ComponentHandler();
    let helperFunction = new HelperFunction();
    let categoryApi = new CategoryApi();

    const dataUpdateParse = contentData ? contentData : '';
    const [preImage, setPreImage] = useState({uri: ''});
    const MetaDataUpdate = dataUpdateParse ? JSON.parse(dataUpdateParse.metadata) : {robots: false};
    const [categoryData, setCategoryData] = useState({});
    const [chipset, setChipset] = useState([]);
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

    useEffect(() => {
        categoryApi.call().then(res => {
            setCategoryData(res.data.data);
        })

        dataUpdateParse ? dataUpdateParse.tags.map(item => {
            chipset.push(item.name);
            setChipset(chipset);
        }) : '';


    }, [])


    const handleSwither = (e, state, name) => {
        switch (name) {
            case "showCommentStatus" :
                componentHandler.handleSwitchComment(e, state, changeCheck);
                return true;
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
        changeCheck(true)
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

    const handleChangeTitle = e => {
        onChangeInput(e);
    }


    function handleMakeName(){
        let contentName = dataUpdateParse.title;
        const min = 1;
        const max = 1000;
        const rand = Number(min + Math.random() * (max - min)).toFixed(0);
        return contentName + rand + "_??????";
    }


    const titleDefaultValue = () => {
        if(actionType === "duplicate"){
            return handleMakeName();
        }else if (actionType === "edit"){
            return dataUpdateParse.title;
        }else{
            return '';
        }
    }
    return (
        <>
            <ul className="nav nav-tabs tab-layout" role="tablist">
                <Tab active={true} id={"cat-tab"} title={"??????????"} href={"#cat"} icon={"bx bxs-pencil"}/>
                <Tab id={"seo-tab"} title={"?????? ?? ????????"} href={"#seo"} icon={"bx bxl-internet-explorer"}/>

            </ul>
            <div className="tab-content" style={{padding: 0, position: 'relative'}}>
                <div className="tab-pane active" id="cat" aria-labelledby="cat-tab" role="tabpanel">
                    <div className={"content-pages"}>

                        <div className={"row"} style={{padding: '20px'}}>
                            <div className={"col-lg-4 col-md-8 col-sm-12"} style={{paddingTop: 5}}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>?????????? ??????????</label>
                                    <input type={"text"}
                                           defaultValue={titleDefaultValue()}
                                           onChange={e => handleChangeTitle(e)}
                                           name={"titleContent"} id={"title"}
                                           className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>????????????</label>
                                    <Switcher
                                        defaultState={dataUpdateParse ? dataUpdateParse.comment_status == "active" ? true : false : false}
                                        handleSwitchStatus={handleSwither} name={"showCommentStatus"}
                                        valueActive={"????????"}
                                        valueDeActive={"??????????????"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>?????????? ??????????</label>
                                    <Switcher
                                        defaultState={dataUpdateParse ? dataUpdateParse.status == "active" ? true : false : true}
                                        handleSwitchStatus={handleSwither}
                                        name={"showState"}
                                        valueActive={"????????"}
                                        valueDeActive={"??????????????"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>?????????? ???? ??????</label>
                                    <Switcher
                                        defaultState={dataUpdateParse ? dataUpdateParse.is_menu == 0 ? false : true : false}
                                        handleSwitchStatus={handleSwither}
                                        name={"showMenu"}
                                        valueActive={"????????"} valueDeActive={"??????????????"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}
                                 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                {_renderImgBox()}
                            </div>

                            <div className={"col-lg-6 col-md-12 col-sm-12"}>
                                <label
                                    htmlFor="users-list-role">???????? ????????</label>
                                <MultiSelected name={"categories"} data={categoryData ? categoryData : []}
                                               defSelected={dataUpdateParse.categories ? dataUpdateParse.categories : []}
                                               selected={item => categoryOnChange(item)}
                                               defaultsel={dataUpdateParse ? dataUpdateParse.categories : []}
                                />
                            </div>

                            <div className={"col-lg-6 col-md-12 col-sm-12"} style={{padding: '0px 30px'}}>
                                <label htmlFor={"title"}>?????????? ?????????? ???????? ( ???????? ???????? ?? Enter ?????????? ???? ?????????? ??????.
                                    )</label>
                                <div className={"row"}>

                                    <div className={"col-12"} id={"chip-box"} style={{minHeight: 50}}>
                                        <div className={"row"}>

                                            <div className={"col-sm-12 col-md-5 col-lg-5"}>
                                                <ChipsetHandler
                                                    onChange={handleAddChip}/>
                                            </div>

                                            {chipset.map((item, index) => (
                                                _renderChipsetContent(index, item)
                                            ))}


                                        </div>

                                    </div>
                                </div>

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
                                    <label id={"selectParent"}>?????? ????????</label>

                                    <Switcher defaultState={true}
                                              handleSwitchStatus={handleSwitchAddress}
                                              name={"AddressType"}
                                              valueActive={"????????????"} valueDeActive={"????????"}/>
                                </fieldset>
                            </div>

                            <div className={"col-lg-9 col-md-8 col-sm-12"} style={{paddingTop: 8}}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>???????? ???????? ??????????</label>
                                    {_renderSlug()}
                                </fieldset>
                            </div>

                            <div className={"col s12"}>
                                <div className={"alert alert-primary mb-2 col-12"} role={"alert"}>
                                    ?????????????? ???????? ?? ?????????????? ???????? ???? ???????? ???????????? ???????? zerone ???????? ???????? ???????? ?????????? ???????????????.
                                    ???? ?????????? ???? ?????????? ???? ??????????????????? ???? ???????????? ??????????????????? ???? ?????? ?????? ?????????????? ????????.
                                </div>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>?????????? ???????? ( ???????????? 60 ?????? )</label>
                                    <input type={"text"}
                                           defaultValue={MetaDataUpdate ? MetaDataUpdate.title : ''}
                                           onChange={e => handleMetaData(e)}
                                           name={"title"} id={"title"}
                                           className={"form-control"}/>


                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>?????????? ???????? ( ???????????? 155 ?????? )</label>
                                    <textarea type={"text"}
                                              onChange={e => handleMetaData(e)}
                                              name={"content"}
                                              defaultValue={MetaDataUpdate ? MetaDataUpdate.content : ''}
                                              id={"title"} className={"form-control"}/>


                                </fieldset>
                            </div>


                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>???????? ?????????? ???????? ???????????? (301 Redirect)</label>
                                    <input type={"text"}
                                           onChange={e => handleMetaData(e)}
                                           name={"redirect"}
                                           defaultValue={MetaDataUpdate ? MetaDataUpdate.redirect : ''}
                                           id={"title"} className={"form-control"}/>

                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>???????? Canonical</label>
                                    <input
                                        onChange={e => handleMetaData(e)}
                                        name={"canonical"} type={"text"}
                                        defaultValue={MetaDataUpdate ? MetaDataUpdate.canonical : ''}
                                        id={"title"} className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <label>?????????????? Robots</label>
                                <BigSwitcher status={states => componentHandler.HandlerBigSwitcher(states, changeCheck)}
                                             name={"Robots"}
                                             valueOne={"??????????????"} valueTow={"noindex,follow"}
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
        let tit = $("input[name=titleContent]").val() + "";
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
                         onClick={e => removeChipset(e, item)}>
                        <i className="bx bx-x"></i>
                    </div>
                </div>
            </div>
        )
    }


    function _renderImgBox() {
        console.log(dataUpdateParse);
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
                        <label id={"selectParent"}>???????????? ????????</label>
                        <div id={"file"}>
                            <input type={"file"} name={"image"}
                                   multiple="multiple"
                                   className={"fileInput"}
                                   style={{zIndex: 99}}
                                   onChange={e => handleFile(e)}
                            />
                            <button id="select-files" className="btn btn-primary mb-1">
                                <i className="icon-file2"></i>
                                ???????????? ????????
                            </button>
                        </div>
                    </fieldset>
                )
            }
        }

    }
}
