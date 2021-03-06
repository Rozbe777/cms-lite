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
import $ from "jquery";
import {BASE_URL_IMG} from "../../../../services/Type";

const LOCAL_CAT = "localcat-zerone-cmslite";
const PageAdd = ({token, display, dataUpdate, result: pushResult}) => {



    const dataGet = dataUpdate ? JSON.parse(dataUpdate) : '';
    const dataUpdateParse = dataGet ? dataGet.allData : '';
    const MetaDataUpdate = dataUpdateParse ? JSON.parse(dataUpdateParse.metadata) : {robots: false};

    console.log("*************", dataUpdateParse);

    let titleWrite = $("input[name=titlePage]").val();
    const [preImage, setPreImage] = useState({uri: ''});

    const [changeCheck, setChangeCheck] = useState(false)
    const [categoryData, setCategoryData] = useState({});
    const [imageGet, setImage] = useState({state: ''})

    const [loading, setLoading] = useState(false);
    const [contentNew, setContentNew] = useState('');
    const [statusNew, setStatusNew] = useState();
    const [menuShow, setMenuShow] = useState();
    // const [MetaDataUpdate , setMetaDataUpdate] = useState({});
    const [ids, setIds] = useState(0)
    const [chipset, setChipset] = useState([]);
    let tags = [];
    const [edit, setEdit] = useState(false);
    const [file, setFile] = useState({file : ''});
    const StatusSwitch = useRef(null);
    const [metaData, setMetaData] = useState({
        robots: false,
    });


    const type = dataGet ? dataGet.type : '';

    const [slugManage, setSlugManage] = useState(true)
    let default_value = {
        is_menu: 0,
        is_index: 0,
        status: "active",
        content: '',
        slug: ''
    };
    const [formData, setFormData] = useState(default_value);



    const dataCategory = JSON.parse(localStorage.getItem(LOCAL_CAT));
    const CreateAddPage = (data) => {
        swal({
            title: '???????????? ?????????? ????????',
            text: "?????? ????????????????",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: '??????????',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn btn-danger ml-1',
            cancelButtonText: '????????????',
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                Request.AddNewPage(data)
                    .then(res => {
                        pushResult(res);
                        localStorage.removeItem("is_menu");
                        localStorage.removeItem("status");
                        localStorage.removeItem("selected");
                        localStorage.removeItem("is_index");
                        localStorage.removeItem("robots");
                        Swal.fire({
                            type: "success",
                            title: '???? ???????????? ?????????? ???? !',
                            confirmButtonClass: 'btn btn-success',
                            confirmButtonText: '????????',
                        })

                    }).catch(err => {
                    if (err.response.data.errors) {
                        ErroHandle(err.response.data.errors);
                    } else {
                        ErrorToast("???????? ?????? ???????????? ???? ???? ???????? ??????")
                    }
                })
            }
        });
    }

    const handleGetImg = name => {
        let names = name.split("/")
        setLoading(true)
        Request.GetImage(names[2])
            .then(rr => {
                setLoading(false)
                setImage({state: rr.data})
            }).catch(err => {
            ErrorToast("?????????? ???? ???????????? ?????????? ???? ???????? ??????")
            setTimeout(() => {
                handleClose()
            }, 1300)

        })
    }



    useEffect(() => {


        let formNews = {...formData};
        formNews = dataUpdateParse ? dataUpdateParse : default_value;

        setMetaData(MetaDataUpdate)


        if (formNews.image) {
            let img = formNews.image;

            handleGetImg(img)

        } else {
            setImage({state: ''})
        }


        setIds(formNews.id);
        setFormData({
            id: formNews.id,
            content: formNews.content,
            is_index: formNews.is_index,
            comment_status : formNews.comment_status,
            status : formNews.status,
            is_menu: formNews.is_menu,
            metadata: formNews.metadata,
            slug: formNews.slug,
            title: formNews.title
        });


        MetaDataUpdate.tags ? setChipset(MetaDataUpdate.tags) : '';
    }, [])


    const handleClose = () => {
        ReactDOM.render('', document.getElementById("add-datas"));
        setFormData({
            is_menu: 0,
            is_index: 0,
            status: "active",
            content: '',
            slug: ''
        });
        setMetaData({
            robots: false,
        })
        $("#my-editor").attr("defaultValue", "");
    }

    const handlePreShowImage = e => {
        e.preventDefault();
        let preImages = {...preImage}
        if (event.target.files && event.target.files[0]) {
            preImages.uri = URL.createObjectURL(event.target.files[0])
            setPreImage(preImages)
        }
    }

    const HandleFile = (e) => {
        handlePreShowImage(e)
        setEdit(true)
        let files = e.target.files[0];
        setFile({file: files});
    }
    const handleInput = (e) => {
        setEdit(true);

        setChangeCheck(true)
        let formDataOld = {...formData};
        if (e.target.name == "titlePage") {
            formDataOld.title = e.target.value;
            formDataOld.slug = e.target.value;
            setFormData(formDataOld);
        } else {
            formDataOld.slug = e.target.value;
            setFormData(formDataOld);
        }

    }

    const RemoveChipset = (name) => {
        let metaDatas = {...metaData};
        var chipsetArr = [...chipset];
        setEdit(true)
        var index = chipsetArr.indexOf(name);
        if (index !== -1) {
            chipsetArr.splice(index, 1);
            setChipset(chipsetArr);
            metaDatas.tags = chipsetArr;
            setMetaData(metaDatas)
        }
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
        formFile.append("image", file.file ? file.file : '')
        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : formNew.is_menu;
        let statusa = localStorage.getItem("status") ? localStorage.getItem("status") : formNew.status;
        let is_index = localStorage.getItem("is_index") ? localStorage.getItem("is_index") : formNew.is_index;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        formFile.append("status", statusa ? statusa : "active");
        formFile.append("is_index", parseInt(is_index))
        formFile.append("is_menu", parseInt(is_menu))


        if (slugManage == false) {
            formFile.append("is_menu", formNew.title)
        } else {
        }

        let title = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();

        formFile.append("title", title)
        formFile.append("slug", slug)
        if (slugManage == false) {
            formFile.append("slug", title)
        } else {
        }

        if (formData.slug == "") {
            formFile.append("slug", title)

        }
        let contents =contentNew;
        formFile.append("content", contents)

        let MetaDaa = {...metaData};
        MetaDaa.robots = robots;
        let metadatas = JSON.stringify(MetaDaa);
        formFile.append("metadata", metadatas)

        if (formData.title && formData.title !== '') {
            $("input[name=titlePage]").removeClass("is-invalid");
            CreateAddPage(formFile);
        } else {
            $("input[name=titlePage]").addClass("is-invalid");
            error("???????? ???????? ?????????? ???????? ???? ???? ???????? !")
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
        swal({
            title: '???????????? ????????',
            text: "?????? ????????????????",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: '??????????',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn btn-danger ml-1',
            cancelButtonText: '????????????',
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                Request.UpdateDataPage(data, id)
                    .then(res => {
                        pushResult(res);
                        localStorage.removeItem("is_menu");
                        localStorage.removeItem("status");
                        localStorage.removeItem("selected");
                        localStorage.removeItem("is_index");
                        localStorage.removeItem("robots");
                        Swal.fire({
                            type: "success",
                            title: '???? ???????????? ???????????? ???? !',
                            confirmButtonClass: 'btn btn-success',
                            confirmButtonText: '????????',
                        })

                    }).catch(err => {

                    if (err.response.data.errors) {
                        ErroHandle(err.response.data.errors);
                    } else {
                        //<button onclick='`${reloadpage()}`'  id='reloads' style='margin : 0 !important' class='btn btn-secondary  round mr-1 mb-1'>???????????? ????????</button>
                        ErrorToast("???????? ?????? ???????????? ???? ???? ???????? ??????")
                    }
                })
            }
        });

    }


    const HandleEdit = () => {
        let formOldData = {...formData};
        let title = titleWrite;
        let formDta = new FormData();
        let slug = slugManage ? titleWrite : $("input.slugest").val();

        if (file.file) {
            if (imageGet.state == "") {
                formDta.append("image", file.file);
            } else {
                formDta.append("image", true);
            }
        } else {
            if (imageGet.state == '') {
                formDta.append("image", '');
            } else {
                formDta.append("image", true);
            }
        }


        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : formData.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formData.status;
        // console.log("____=====" , formData.comment_status , " /// " ,  localStorage.getItem("comment_status") )
        // let comment_status = localStorage.getItem("comment_status") ? localStorage.getItem("comment_status") : formData.comment_status;
        let is_index = localStorage.getItem("is_index") ? localStorage.getItem("is_index") : formData.is_index;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        let metaDatas = {...metaData};
        metaDatas.robots = robots;
        let normalCon = contentNew == "" ? dataUpdateParse.content : contentNew;
        formDta.append("metadata", JSON.stringify(metaDatas))
        formDta.append("content", normalCon)
        formDta.append("status", status ? status : 'active')
        // formDta.append("comment_status", comment_status)
        formDta.append("is_index", parseInt(is_index))
        formDta.append("is_menu", parseInt(is_menu))
        formDta.append("title", title);
        formDta.append("_token", token);
        formDta.append("id", formOldData.id);
        formDta.append("slug", slug);
        HandleUpdateForm(formDta, ids);
    }

    const HandleDuplicate = () => {
        let formOldData = {...formData};
        let formDta = new FormData();
        if (file.file) {
            if (imageGet.state == "") {
                formDta.append("image", file.file);
            } else {
                formDta.append("image", true);
            }
        } else {
            if (imageGet.state == '') {
                formDta.append("image", '');
            } else {
                formDta.append("image", true);
            }
        }
        let title = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : formData.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formData.status;
        let is_index = localStorage.getItem("is_index") ? localStorage.getItem("is_index") : formData.is_index;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        // let comment_status = localStorage.getItem("comment_status") ? localStorage.getItem("comment_status") : formData.comment_status;
        let metaDatas = {...metaData};
        metaDatas.robots = robots;
        let normalCon = contentNew == "" ? dataUpdateParse.content : contentNew;
        formDta.append("metadata", JSON.stringify(metaDatas))
        formDta.append("content", normalCon)
        formDta.append("status", status)
        formDta.append("id", formOldData.id)
        // formDta.append("comment_status", comment_status)
        formDta.append("is_index", parseInt(is_index))
        formDta.append("is_menu", parseInt(is_menu))
        formDta.append("title", title);
        formDta.append("slug", slug);
        CreateAddPage(formDta);
    }


    const handleEditorData = (data) => {
        setEdit(true);
        setFormData({
            ...formData,
            content: data
        })
    }

    let MakeNewName = (name) => {
        let formDatas = {...formData}
        const min = 1;
        const max = 1000;
        const rand = Number(min + Math.random() * (max - min)).toFixed(0);
        formDatas.title = name + rand + "_??????";
        formDatas.slug = name + rand + "_??????";
        return name + rand + "_??????";
    }
    let MakeNewSlug = (name) => {
        let formDatas = {...formData}
        const min = 1;
        const max = 1000;
        const rand = Number(min + Math.random() * (max - min)).toFixed(0);
        formDatas.slug = name + rand + "_??????";
        return name + rand + "_??????";
    }
    const handleSwitchStatus = (status) => {
        setEdit(true)
        localStorage.setItem("status", status ? "active" : "deactivate");
    }
    const handleSwitchMenu = (status) => {
        setEdit(true)
        localStorage.setItem("is_menu", status ? 1 : 0);
    }
    const handleSwitchComment = (status) => {
        setEdit(true)
        localStorage.setItem("is_index", status ? 1 : 0);
    }
    const HandleSelectOption = (check) => {
        setEdit(true)
        localStorage.setItem("selected", check)
    }

    let HandleDefaultValuSlug = () => {
        if (dataUpdateParse) {
            if (type == "dup") {
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
            if (type == "dup") {
                return MakeNewName(dataUpdateParse.title);
            } else {
                return dataUpdateParse.title;
            }
        } else {
            formData.slug = formData.title;
            return formData.title;
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


    return (
        <div id={"category_add_pop_base"}>
            <ul className="nav nav-tabs tab-layout" role="tablist">
                <li className="nEav-item col-6 nav-custom">
                    <a className="nav-link active" id="cat-tab" data-toggle="tab" href="#cat" aria-controls="cat"
                       role="tab" aria-selected="true">
                        <span className="align-middle">?????????????? ????????</span>
                        <i id={"visible-custom"} className={"bx bxs-pencil"}></i>
                    </a>
                </li>
                <li className="nav-item col-6 nav-custom ">
                    <a className="nav-link" id="seo-tab" data-toggle="tab" href="#seo" aria-controls="seos"
                       role="tab" aria-selected="false">
                        <span className="align-middle">?????? ?? ????????</span>
                        <i id={"visible-custom"} className={"bx bxl-internet-explorer"}></i>
                    </a>
                </li>
            </ul>
            <div className="tab-content" style={{padding: 0, position: 'relative'}}>
                <div className="tab-pane active" id="cat" aria-labelledby="cat-tab" role="tabpanel">
                    <div className={"content-pages"}>

                        <div className={"row"} style={{padding: '20px'}}>
                            <div className={"col-lg-4 col-md-12 col-sm-12"} style={{paddingTop: 4}}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>?????????? ??????????</label>
                                    <input type={"text"} defaultValue={HandleMakeName()} onChange={e => handleInput(e)}
                                           name={"titlePage"} id={"title"}
                                           className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>?????????? ??????????</label>
                                    <Switcher
                                        defaultState={dataUpdateParse ? dataUpdateParse.status == "active" ? true : false : true}
                                        status={(state) => handleSwitchStatus(state)} name={"showState"}
                                        valueActive={"????????"}
                                        valueDeActive={"??????????????"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>?????????? ???? ??????</label>
                                    <Switcher
                                        defaultState={dataUpdateParse ? dataUpdateParse.is_menu == 0 ? false : true : false}
                                        status={(state) => handleSwitchMenu(state)} name={"showMenu"}
                                        valueActive={"????????"} valueDeActive={"??????????????"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>???????? ????????</label>
                                    <Switcher
                                        defaultState={dataUpdateParse ? dataUpdateParse.is_index == 1 ? true : false : false}
                                        status={(state) => handleSwitchComment(state)} name={"is_index"}
                                        valueActive={"??????"}
                                        valueDeActive={"??????"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}   style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                {preImage.uri ? (
                                        <div className={"mini-img-show-edit"}>
                                            <div className={"img-box"}>
                                                <img src={`${preImage.uri}`}/>
                                                <div className={"back"}><span onClick={e => handledelImg(e)}><i
                                                    className={"bx bx-x"}></i> </span></div>
                                            </div>
                                        </div>)
                                    : !loading ? !loading && imageGet.state !== "" ? (
                                        <div className={"mini-img-show-edit"}>
                                            <div className={"img-box"}>
                                                <img src={`${BASE_URL_IMG}${imageGet.state}`}/>
                                                <div className={"back"}><span onClick={e => handledelImg(e)}><i
                                                    className={"bx bx-x"}></i> </span></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <fieldset className="form-group" style={{width: '100%'}}>
                                            <label id={"selectParent"}>???????????? ????????</label>
                                            <div id={"file"}>
                                                <input type={"file"} name={"image"}
                                                       multiple="multiple"
                                                       onChange={e => HandleFile(e)}
                                                       style={{
                                                           opacity: 0,
                                                           zIndex: 9,
                                                           height: '100%',
                                                           position: 'absolute',
                                                           cursor: 'pointer'
                                                       }}/>
                                                <button id="select-files" className="btn btn-primary mb-1">
                                                    <i className="icon-file2"></i>
                                                    ???????????? ????????
                                                </button>

                                            </div>
                                        </fieldset>
                                    ) : (<div className="spinner-border" role="status">
                                        <span className="sr-only">???? ?????? ???????????????? ...</span>
                                    </div>)}
                            </div>

                            <div className={"col-12"}>
                                <MyEditor editorData={data => {
                                    setEdit(true)
                                    setContentNew(data)
                                }}
                                          id={"my-editor"}
                                          type={"perfect"}
                                          defaultVal={dataUpdateParse ?dataUpdateParse.content : ''}
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

                                    <Switcher defaultState={true} status={state => handleAddress(state)}
                                              name={"AddressType"}
                                              valueActive={"????????????"} valueDeActive={"????????"}/>
                                </fieldset>
                            </div>

                            <div className={"col-lg-9 col-md-8 col-sm-12"} style={{paddingTop: 7}}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>???????? ???????? ??????????</label>
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
                                    ?????????????? ???????? ?? ?????????????? ???????? ???? ???????? ???????????? ???????? zerone ???????? ???????? ???????? ?????????? ???????????????.
                                    ???? ?????????? ???? ?????????? ???? ??????????????????? ???? ???????????? ??????????????????? ???? ?????? ?????? ?????????????? ????????.
                                </div>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>?????????? ???????? ( ???????????? 60 ?????? )</label>
                                    <input type={"text"}
                                           defaultValue={MetaDataUpdate ? MetaDataUpdate.title : ''}
                                           onChange={e => HandleMetaData(e)} name={"title"} id={"title"}
                                           className={"form-control"}/>


                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>?????????? ???????? ( ???????????? 155 ?????? )</label>
                                    <textarea type={"text"} onChange={e => HandleMetaData(e)} name={"content"}
                                              defaultValue={MetaDataUpdate ? MetaDataUpdate.content : ''}
                                              id={"title"} className={"form-control"}/>


                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <label htmlFor={"title"}>?????????? ?????????? ???????? ( ???????? ???????? ?? Enter ?????????? ???? ?????????? ??????.
                                    )</label>
                                <div className={"row"} style={{padding: '15px'}}>

                                    <div className={"col-12"} id={"chip-box"} style={{minHeight: 50}}>
                                        <div className={"row"}>

                                            <div className={"col-sm-12 col-md-3 col-lg-2"}>
                                                <ChipsetHandler callback={item => handleAddChip(item)}/>
                                            </div>

                                            {chipset.map((item, index) => (
                                                <div key={index} className="chip mr-1">
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
                                    <label htmlFor={"title"}>???????? ?????????? ???????? ???????????? (301 Redirect)</label>
                                    <input type={"text"} onChange={e => HandleMetaData(e)} name={"redirect"}
                                           defaultValue={MetaDataUpdate ? MetaDataUpdate.redirect : ''}
                                           id={"title"} className={"form-control"}/>

                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>???????? Canonical</label>
                                    <input onChange={e => HandleMetaData(e)} name={"canonical"} type={"text"}
                                           defaultValue={MetaDataUpdate ? MetaDataUpdate.canonical : ''}
                                           id={"title"} className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <label>?????????????? Robots</label>
                                <BigSwitcher status={states => HandlerBigSwitcher(states)} name={"Robots"}
                                             valueOne={"??????????????"} valueTow={"noindex,follow"}
                                             defaultStatus={MetaDataUpdate ? MetaDataUpdate.robots : false}
                                             default={''}
                                             valueThree={"noindex,unfolow"}/>
                            </div>

                        </div>

                    </div>
                </div>

                <div className={"col-12 bottom-footer"}>
                    <div className={"row"}>

                        <div className={"col-6"} onClick={handleClose}
                             style={{
                                 cursor: 'pointer',
                                 textAlign: 'center',
                                 borderLeft: '1px solid #a9a9a9'
                             }}>
                            <button type={"reset"} id={"clear"}>
                                ????????????
                            </button>
                        </div>

                        {type ? type == 'edit' ? edit ? (
                                <div onClick={(e) => HandleEdit(e)}
                                     className={"col-6"}
                                     style={{textAlign: 'center', cursor: 'pointer', background: "#5a8dee", color: '#fff'}}>
                                    <span>????????????</span>
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
                                    <span style={{color: '#fff !important'}}>????????????</span>
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
                                    <span style={{color: '#fff !important'}}>?????????? ??????</span>
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
                                    <span style={{color: '#fff !important'}}>??????????</span>
                                </div>
                            )}


                    </div>

                </div>
            </div>

        </div>
    )


}
export default PageAdd;
