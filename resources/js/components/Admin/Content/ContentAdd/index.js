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

const ContentAdd = ({token,resultForm ,  checkChange: pushCheckChange, display, dataUpdate, result: pushResult}) => {

    let titleWrite = $("input[name=titleContent]").val();
    let formHandler = new FormHandler();
    const dataGet = dataUpdate ? JSON.parse(dataUpdate) : '';
    const dataUpdateParse = dataGet ? dataGet.allData : '';
    const [changeCheck, setChangeCheck] = useState(false)
    const [preImage, setPreImage] = useState({uri: ''});
    const MetaDataUpdate = dataUpdateParse ? JSON.parse(dataUpdateParse.metadata) : {robots: false};
    const [clear, setClear] = useState(false)
    const [categoryData, setCategoryData] = useState({});
    const [loading, setLoading] = useState(false);
    const [contentNew, setContentNew] = useState('');
    const [ids, setIds] = useState(0)
    const [imageGet, setImage] = useState({state: ''})
    const [chipset, setChipset] = useState([]);
    const [chipsetChange, setChipChange] = useState(false)
    const [edit, setEdit] = useState(false);
    const [file, setFile] = useState({file: ''});
    const [metaData, setMetaData] = useState({
        robots: false,
    });
    const type = dataGet ? dataGet.type : '';
    const [slugManage, setSlugManage] = useState(true);
    const [formData, setFormData] = useState({});
    let default_value = {
        is_menu: 0,
        comment_status: "deactivate",
        status: "active",
        content: '',
        slug: ''
    };

    let requestHandler = new RequestHandler();

    const GetAllCategory = () => {
        setLoading(true)
        Request.GetAllCategory()
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





    let formNews = {...formData};

    formNews = dataUpdateParse ? dataUpdateParse : default_value;

    let selecteds = [];
    dataUpdateParse ? dataUpdateParse.categories.map(item => {
        selecteds.push(item.id);
    }) : '';
    const [idSelCat, setIdSelCat] = useState(selecteds)


    useEffect(() => {
        GetAllCategory();


        if (formNews.image) {
            let img = formNews.image;

            requestHandler.HandleGetImg(img , setLoading , setImage);

        } else {
            setImage({state: ''})
        }

        dataUpdateParse ? dataUpdateParse.tags.map(item => {
            chipset.push(item.name);
            setChipset(chipset);
        }) : '';

        // dataUpdateParse ? dataUpdateParse.categories.map(item => {
        //     idSelCat.push(item.id);
        //     setIdSelCat(idSelCat);
        // }) : '';

        setMetaData(MetaDataUpdate)

        setIds(formNews.id);
        setFormData({
            id: formNews.id,
            image: formNews.image,
            content: formNews.content,
            is_menu: formNews.is_menu,
            status: formNews.status,
            comment_status: formNews.comment_status,
            metadata: formNews.metadata,
            slug: formNews.slug,
            title: formNews.title,
            tag_list: formNews.tag_list,
            category_list: formNews.category_list
        });


    }, [])




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
        imageGet.state = '';
        setImage(imageGet);
    }

    const handleInput = (e) => {
        setChangeCheck(true)
        setEdit(true);
        if (e.target.name == "titleContent") {
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
        let metaData = {...metaData};
        setChipChange(true)
        var chipsetArr = [...chipset];
        var index = chipsetArr.indexOf(name);
        if (index !== -1) {
            chipsetArr.splice(index, 1);
            setChipset(chipsetArr);
            setMetaData(metaData)
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
            title: 'ویرایش صفحه',
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
                Request.UpdateDataContent(data, id)
                    .then(res => {
                        $("span.checkboxeds").removeClass("active");
                        setClear(true)
                        pushResult(res);
                        localStorage.removeItem("is_menu");
                        localStorage.removeItem("status");
                        localStorage.removeItem("selected");
                        localStorage.removeItem("comment_status");
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
                        ErrorToast("خطای غیر منتظره ای رخ داده است")
                    }
                })
            }
        });

    }


    const HandleEdit = () => {
        let formOldData = {...formData};
        let formdts = new FormData();

        if (file.file) {
            if (imageGet.state == "") {
                formdts.append("image", file.file);
            } else {
                formdts.append("image", true);
            }
        } else {
            if (imageGet.state == '') {
                formdts.append("image", '');
            } else {
                formdts.append("image", true);
            }
        }

        let title = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        formdts.append("title", title)
        formdts.append("slug", slug)

        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : formData.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formData.status;
        let comment_status = localStorage.getItem("comment_status") ? localStorage.getItem("comment_status") : formData.comment_status;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        let metaDatas = {...metaData};
        formdts.append("_token", token);
        formdts.append("id", formOldData.id);

        metaDatas.robots = robots;
        let metadatas = JSON.stringify(metaDatas);
        formdts.append("metadata", metadatas)
        let contents = contentNew == "" ? dataUpdateParse.content : contentNew;
        formdts.append("content", contents)

        formdts.append("status", status)

        formdts.append("is_menu", parseInt(is_menu))
        formdts.append("comment_status", comment_status)
        formdts.append("category_list", JSON.stringify(idSelCat))
        let tagLL = setChipChange ? chipset : [];

        formdts.append("tag_list", JSON.stringify(tagLL))

        HandleUpdateForm(formdts, ids);
    }

    const HandleDuplicate = () => {
        let formOldData = {...formData};
        let formsData = new FormData();
        let title = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();

        formsData.append("title", title);
        formsData.append("slug", slug);

        if (file.file) {
            if (imageGet.state == "") {
                formsData.append("image", file.file);
            } else {
                formsData.append("image", true);
            }
        } else {
            if (imageGet.state == '') {
                formsData.append("image", '');
            } else {
                formsData.append("image", true);
            }
        }

        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : formData.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formData.status;
        let comment_status = localStorage.getItem("comment_status") ? localStorage.getItem("comment_status") : formData.comment_status;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        let metaDatas = {...metaData};
        metaDatas.robots = robots;
        let metadatas = JSON.stringify(metaDatas);
        let contents = contentNew == "" ? dataUpdateParse.content : contentNew;
        formsData.append("metadata", metadatas)
        formsData.append("tag_list", JSON.stringify(chipset))
        formsData.append("id", formOldData.id);
        formsData.append("status", status)
        formsData.append("category_list", JSON.stringify(idSelCat))
        formsData.append("content", contents)
        formsData.append("is_menu", parseInt(is_menu))
        formsData.append("comment_status", comment_status)
        CreateAddContent(formsData);
    }


    const handleEditorData = (data) => {
        setEdit(true)
        setContentNew(data)
    }

    let MakeNewName = (name) => {
        let formDatas = {...formData}
        const min = 1;
        const max = 1000;
        const rand = Number(min + Math.random() * (max - min)).toFixed(0);
        formDatas.title = name + rand + "_کپی";
        formDatas.slug = name + rand + "_کپی";
        return name + rand + "_کپی";
    }
    let MakeNewSlug = (name) => {
        let formDatas = {...formData}
        const min = 1;
        const max = 1000;
        const rand = Number(min + Math.random() * (max - min)).toFixed(0);
        formDatas.slug = name + rand + "_کپی";
        return name + rand + "_کپی";
    }
    const handleSwitchStatus = (e, statuses) => {
        e.preventDefault();
        setEdit(true)
        localStorage.setItem("status", statuses ? "active" : "deactivate");
    }
    const handleSwitchMenu = (e, status) => {
        e.preventDefault();
        setEdit(true)
        localStorage.setItem("is_menu", status ? 1 : 0);
    }
    const handleSwitchComment = (e, status) => {
        e.preventDefault();
        setEdit(true)
        localStorage.setItem("comment_status", status ? "active" : "deactivate");
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




    const checkResult = (statused) => {
        if (statused){
            resultForm(true)
            $("span.checkboxeds").removeClass("active");
            formHandler.HandleRemoveLocal();
        }
    }



    return (
            <div id={"category_add_pop_base"}>
            <ul className="nav nav-tabs tab-layout" role="tablist">
                <Tab active={true} id={"cat-tab"} title={"محتوا"} href={"#cat"} icon={"bx bxs-pencil"} />
                <Tab  id={"seo-tab"} title={"سئو و آدرس"} href={"#seo"} icon={"bx bxl-internet-explorer"} />

            </ul>
            <div className="tab-content" style={{padding: 0, position: 'relative'}}>
                <div className="tab-pane active" id="cat" aria-labelledby="cat-tab" role="tabpanel">
                    <div className={"content-pages"}>

                        <div className={"row"} style={{padding: '20px'}}>
                            <div className={"col-lg-4 col-md-8 col-sm-12"} style={{paddingTop: 5}}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>عنوان محتوا</label>
                                    <input type={"text"} defaultValue={HandleMakeName()} onChange={e => handleInput(e)}
                                           name={"titleContent"} id={"title"}
                                           className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>دیدگاه</label>
                                    <Switcher
                                        defaultState={dataUpdateParse ? dataUpdateParse.comment_status == "active" ? true : false : false}
                                        handleSwitchStatus={handleSwitchComment} name={"showCommentStatus"}
                                        valueActive={"فعال"}
                                        valueDeActive={"غیرفعال"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>وضعیت نمایش</label>
                                    <Switcher
                                        defaultState={dataUpdateParse ? dataUpdateParse.status == "active" ? true : false : true}
                                        handleSwitchStatus={handleSwitchStatus} name={"showState"}
                                        valueActive={"فعال"}
                                        valueDeActive={"غیرفعال"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>نمایش در منو</label>
                                    <Switcher
                                        defaultState={dataUpdateParse ? dataUpdateParse.is_menu == 0 ? false : true : false}
                                        handleSwitchStatus={handleSwitchMenu} name={"showMenu"}
                                        valueActive={"فعال"} valueDeActive={"غیرفعال"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}
                                 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
                                            <label id={"selectParent"}>افزودن فایل</label>
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
                                                   setIdSelCat([]);
                                                   setEdit(true)
                                                   item.map((ii, index) => {
                                                       let idsel = idSelCat.indexOf(parseInt(ii.id))
                                                       datame.push(parseInt(ii.id))
                                                       setIdSelCat(datame);
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
                                                    callback={item => handleAddChip(item)}/>
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

                                    <Switcher defaultState={true} status={state => handleAddress(state)}
                                              name={"AddressType"}
                                              valueActive={"خودکار"} valueDeActive={"دستی"}/>
                                </fieldset>
                            </div>

                            <div className={"col-lg-9 col-md-8 col-sm-12"} style={{paddingTop: 8}}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس صفحه محتوا</label>
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
                                    اطلاعات تیتر و توضیحات صفحه به صورت خودکار توسط zerone برای سئوی بهتر ایجاد می‌شوند.
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
                                    <textarea type={"text"} onChange={e => HandleMetaData(e)} name={"content"}
                                              defaultValue={MetaDataUpdate ? MetaDataUpdate.content : ''}
                                              id={"title"} className={"form-control"}/>


                                </fieldset>
                            </div>


                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس داخلی برای انتقال (301 Redirect)</label>
                                    <input type={"text"} onChange={e => HandleMetaData(e)} name={"redirect"}
                                           defaultValue={MetaDataUpdate ? MetaDataUpdate.redirect : ''}
                                           id={"title"} className={"form-control"}/>

                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس Canonical</label>
                                    <input onChange={e => HandleMetaData(e)} name={"canonical"} type={"text"}
                                           defaultValue={MetaDataUpdate ? MetaDataUpdate.canonical : ''}
                                           id={"title"} className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <label>تنظیمات Robots</label>
                                <BigSwitcher status={states => HandlerBigSwitcher(states)} name={"Robots"}
                                             valueOne={"غیرفعال"} valueTow={"noindex,follow"}
                                             defaultStatus={MetaDataUpdate ? MetaDataUpdate.robots : false}
                                             default={''}
                                             valueThree={"noindex,unfolow"}/>
                            </div>

                        </div>

                    </div>
                </div>

                <div className={"col-12 bottom-footer"}>
                    <div className={"row"}>

                        <div className={"col-6"} onClick={e => formHandler.handleClose(e)}
                             style={{
                                 cursor: 'pointer',
                                 textAlign: 'center',
                                 borderLeft: '1px solid #a9a9a9'
                             }}>
                            <button type={"reset"} id={"clear"}>
                                انصراف
                            </button>
                        </div>

                        {type ? type == 'edit' ? edit ? (
                                <div onClick={(e) => HandleEdit(e)}
                                     className={"col-6"}
                                     style={{textAlign: 'center', cursor: 'pointer', background: "#5a8dee", color: '#fff'}}>
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
                                <div onClick={(e) => formHandler.HandleForm(e , formData,file,contentNew,metaData,idSelCat,chipsetChange,chipset , slugManage , checkResult)} className={"col-6"}
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
    )


}
export default ContentAdd;
