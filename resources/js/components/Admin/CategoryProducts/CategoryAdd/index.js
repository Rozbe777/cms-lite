import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {BASE_URL, BASE_URL_IMG} from "../../../../services/Type";
import {Switcher} from './../../../HOC/Switch'
import {BigSwitcher} from './../../../HOC/BigSwitcher';
import './../../_Shared/Style.scss'
import {Request} from './../../../../services/AdminService/Api'
import {SelectOptions} from './../../../HOC/SelectOptions'
import MyEditor from "../../_Micro/MyEditor/MyEditor";
import {ErroHandle, error as ErrorToast, error} from './../../../../helper'
import {ChipsetHandler} from './../../../HOC/ChipsetHandler';
import './../../_Micro/TreeShow/_Shared/style.scss';
import $ from "jquery";
import CatDataAdd from "form-data";

const AddCategory = ({token, dataAll, dataUpdate, idParent, result: pushResult}) => {
    const [categoryData] = useState({});
    const [preImage, setPreImage] = useState({uri: ''});
    const [loading, setLoading] = useState(false);
    const [ids, setIds] = useState();
    const [contentNew, setContentNew] = useState('');
    const [chipset, setChipset] = useState([]);
    const [edit, setEdit] = useState(false);
    const [file, setFile] = useState({file : ''});
    const [changeCheck, setChangeCheck] = useState(false)

    const [imageGet, setImage] = useState({state: ''})
    const [metaData, setMetaData] = useState({
        robots: false,
    });

    const dataGet = dataUpdate ? JSON.parse(dataUpdate) : '';

    const dataUpdateParse = dataGet ? dataGet.allData : '';
    const MetaDataUpdate = dataUpdateParse ? JSON.parse(dataUpdateParse.metadata) : '';
    const types = dataGet ? dataGet.type : '';


    const [slugManage, setSlugManage] = useState(true);
    const [CatData, setCatData] = useState({});
    let default_value = {
        is_menu: 0,
        status: "active",
        content: '',
        parent_id: idParent,
        slug: ''
    };

    // const dataCategory = JSON.parse(localStorage.getItem(LOCAL_CAT));
    const CreateAddCategory = (data) => {
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

                Request.AddNewCategory(data)
                    .then(res => {
                        pushResult(res);
                        localStorage.removeItem("is_menu");
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

    const handleGetImg = name => {
        let names = name.split("/")
        setLoading(true)
        Request.GetImage(names[2])
            .then(rr => {
                setLoading(false)
                setImage({state: rr.data})
            }).catch(err => {
            ErrorToast("خطایی در دانلود تصویر رخ داده است")
            setTimeout(() => {
                handleClose()
            }, 1300)

        })
    }
    useEffect(() => {
        let formNews = {...CatData};
        formNews = dataUpdateParse ? dataUpdateParse : default_value;
        if (formNews.image) {
            let img = formNews.image;

            handleGetImg(img)

        } else {
            setImage({state: ''})
        }

        setIds(formNews.id)
        setCatData({
            id: formNews.id,
            name: formNews.name,
            slug: formNews.slug,
            image: formNews.image,
            content: formNews.content,
            metadata: formNews.metadata,
            is_menu: formNews.is_menu,
            parent_id: formNews.parent_id,
            status: formNews.status,
        });
        let metaDataNew = {...metaData};
        metaDataNew = dataUpdateParse ? JSON.parse(dataUpdateParse.metadata) : {robots: false};
        setMetaData(metaDataNew)
        MetaDataUpdate.tags ? setChipset(MetaDataUpdate.tags) : '';
    }, [])
    const handleClose = () => {
        ReactDOM.render('', document.getElementById("add-datas"));
        setCatData({
            is_menu: 0,
            status: "active",
            content: '',
            parent_id: 0,
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
        setChangeCheck(true)
        setEdit(true);
        if (e.target.name == "name") {
            if (slugManage) {
                let CatDataOld = {...CatData};
                CatDataOld.name = e.target.value;
                CatDataOld.slug = e.target.value;
                setCatData(CatDataOld);
            } else {
                let CatDataOld = {...CatData};
                CatDataOld.name = e.target.value;
                setCatData(CatDataOld);
            }
        } else {
            let CatDataOld = {...CatData};
            CatDataOld.slug = e.target.value;
            setCatData(CatDataOld);
        }
    }


    const RemoveChipset = (name) => {
        setEdit(true)
        let metaDatas = {...metaData};
        var chipsetArr = [...chipset];
        var index = chipsetArr.indexOf(name);
        if (index !== -1) {
            chipsetArr.splice(index, 1);
        }
        setChipset(chipsetArr);
        metaDatas.tags = chipsetArr;
        setMetaData(metaDatas)
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

    const handleEditor = data => {
        setEdit(true)
        setContentNew(data)
    }

    let titleWrite = $("input[name=name]").val();

    const HandleForm = (e) => {
        let formNew = {...CatData};
        let formFiledss = new FormData();
        formFiledss.append("image", file.file ? file.file : '');
        formFiledss.append("content", contentNew);
        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : formNew.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formNew.status;
        let parent_id = localStorage.getItem("selected") ? localStorage.getItem("selected") : formNew.parent_id;
        formFiledss.append("status", status);
        formFiledss.append("parent_id", parent_id ? parseInt(parent_id) : '');
        formFiledss.append("is_menu", is_menu);
        formFiledss.append("name", formNew.name);
        formFiledss.append("slug", formNew.slug);
        // formFiledss.append("_token", token);
        if (slugManage == false) {
            formFiledss.append("slug", formNew.name);
        } else {
        }


        if (CatData.slug == "") {
            formFiledss.append("slug", formNew.name);
        }


        metaData.robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : "false";
        formFiledss.append("metadata", JSON.stringify(metaData));
        if (CatData.name && CatData.name !== '') {
            $("input[name=name]").removeClass("is-invalid");
            // formFiledss.append("parent_id", formNew.parent_id ? formNew.parent_id : 0);

            CreateAddCategory(formFiledss);
        } else {
            $("input[name=name]").addClass("is-invalid");
            error("لطفا فیلد نام دسته بندی را پر کنید !")
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
        setCatData({
            ...CatData,
            [e.target.name]: e.target.value
        })
    }

    const handleAddress = (status) => {
        setEdit(true)
        setSlugManage(status)
    }

    const HandleUpdateForm = (data, id) => {
        swal({
            title: 'ویرایش دسته بندی',
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
                Request.UpdateDataCategory(data, id)
                    .then(res => {
                        let resError = res.data.message ? res.data.message : '';
                        pushResult(res);
                        localStorage.removeItem("is_menu");
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
                            ErrorToast("خطای غیر منتظره ای رخ داده است")
                        }
                    }
                )
            }
        });
    }

    const HandleEdit = () => {
        let formOldData = {...CatData};
        let formDataFit = new FormData();
        if (file.file) {
            if (imageGet.state == "") {
                formDataFit.append("image", file.file);
            } else {
                formDataFit.append("image", true);
            }
        } else {
            if (imageGet.state == '') {
                formDataFit.append("image", '');
            } else {
                formDataFit.append("image", true);
            }
        }
        // formDataFit.append("image" , file.file ? file.file : '')
        formDataFit.append("content", contentNew);
        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : CatData.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : CatData.status;
        let parent_ids = localStorage.getItem("selected") ? localStorage.getItem("selected") : CatData.parent_id;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        let metaDatas = {...metaData};
        metaDatas.robots = robots;
        // delete formOldData.children;
        let name = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        formDataFit.append("name", name);
        formDataFit.append("id", formOldData.id);
        formDataFit.append("slug", slug);
        // formDataFit.append("_method", "PUT");
        formDataFit.append("_token", token);

        // delete formOldData.childern;
        // delete formOldData.content_count;
        // delete formOldData.contents;
        formDataFit.append("status", status);

        formDataFit.append("metadata", JSON.stringify(metaDatas));

        // formOldData.is_menu = parseInt(is_menu);
        formDataFit.append("is_menu", parseInt(is_menu))
        formDataFit.append("parent_id", parseInt(parent_ids))
        // formOldData.parent_id = parseInt(parent_ids);
        HandleUpdateForm(formDataFit, ids);
    }

    const HandleDuplicate = () => {
        let formOldData = {...CatData};
        let formsNews = new FormData();
        formsNews.append("content", contentNew)
        let name = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        formsNews.append("name", name)
        formsNews.append("slug", slug)

        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : CatData.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : CatData.status;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        let parent_id = localStorage.getItem("selected") ? localStorage.getItem("selected") : CatData.parent_id;

        formsNews.append("is_menu", parseInt(is_menu))
        formsNews.append("status", status)
        formsNews.append("id", formOldData.id)
        formsNews.append("parent_id", parseInt(parent_id))
        formsNews.append("image", file.file ? file.file : '')

        if (file.file) {
            if (imageGet.state == "") {
                formsNews.append("image", file.file);
            } else {
                formsNews.append("image", true);
            }
        } else {
            if (imageGet.state == '') {
                formsNews.append("image", '');
            } else {
                formsNews.append("image", true);
            }
        }


        let metaDatas = {...metaData};
        metaDatas.robots = robots;

        formsNews.append("status", status)
        formsNews.append("metadata", JSON.stringify(metaDatas))

        CreateAddCategory(formsNews);
    }


    const handleEditorData = (data) => {
        setEdit(true);
        setCatData({
            ...CatData,
            content: data
        })
    }

    let MakeNewName = (name) => {
        const min = 1;
        const max = 1000;
        const rand = Number(min + Math.random() * (max - min)).toFixed(0);
        let names = name + rand + "_کپی";
        let slugs = name + rand + "_کپی";
        return name + rand + "_کپی";
    }
    let MakeNewSlug = (name) => {
        const min = 1;
        const max = 1000;
        const rand = Number(min + Math.random() * (max - min)).toFixed(0);
        let slugs = name + rand + "_کپی";

        return name + rand + "_کپی";
    }
    const handleSwitchStatus = (status) => {
        setEdit(true)
        localStorage.setItem("status", status ? "active" : "deactivate");
    }
    const handleSwitchMenu = (status) => {
        setEdit(true)
        localStorage.setItem("is_menu", status ? 1 : 0);
    }
    const HandleSelectOption = (check) => {
        setEdit(true)
        localStorage.setItem("selected", check)
    }

    let HandleDefaultValuSlug = () => {
        if (dataUpdateParse) {
            if (types == "dup") {
                return MakeNewName(dataUpdateParse.slug);
            } else {
                return dataUpdateParse.slug;
            }
        } else {
            CatData.slug = CatData.name;
            return CatData.name;
        }
    }

    let HandleMakeName = () => {
        if (dataUpdateParse) {
            if (types == "dup") {
                return MakeNewName(dataUpdateParse.name);
            } else {
                return dataUpdateParse.name;
            }
        } else {
            CatData.slug = CatData.name;
            return CatData.name;
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
                        <span className="align-middle">دسته بندی</span>
                        <i id={"visible-custom"} className={"bx bxs-pencil"}></i>

                    </a>
                </li>
                <li className="nav-item col-6 nav-custom ">
                    <a className="nav-link" id="seo-tab" data-toggle="tab" href="#seo" aria-controls="seos"
                       role="tab" aria-selected="false">
                        <span className="align-middle">سئو و آدرس</span>
                        <i id={"visible-custom"} className={"bx bxl-internet-explorer"}></i>

                    </a>
                </li>
            </ul>
            <div className="tab-content" style={{padding: 0, position: 'relative'}}>
                <div className="tab-pane active" id="cat" aria-labelledby="cat-tab" role="tabpanel">
                    <div className={"content-pages"}>
                        <div className={"row"} style={{padding: '20px'}}>
                            <div className={"col-lg-3 col-md-4 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>عنوان دسته بندی</label>
                                    <input type={"text"} defaultValue={HandleMakeName()} onChange={e => handleInput(e)}
                                           name={"name"} id={"title"}
                                           className={"form-control titleCat"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-3 col-md-4 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>دسته بندی پدر</label>
                                    {categoryData ? (
                                        <SelectOptions parents={idParent ? idParent : dataUpdateParse.parent_id}
                                                       dataAllCat={dataAll}
                                                       selection={check => HandleSelectOption(check)}
                                                       loading={loading}/>
                                    ) : (
                                        <p>wait ...</p>
                                    )}

                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>وضعیت نمایش</label>
                                    <Switcher
                                        defaultState={dataUpdateParse ? dataUpdateParse.status == "active" ? true : false : true}
                                        status={(state) => handleSwitchStatus(state)} name={"showState"}
                                        valueActive={"فعال"}
                                        valueDeActive={"غیرفعال"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>نمایش در منو</label>
                                    <Switcher
                                        defaultState={dataUpdateParse ? dataUpdateParse.is_menu == 0 ? false : true : false}
                                        status={(state) => handleSwitchMenu(state)} name={"showMenu"}
                                        valueActive={"فعال"} valueDeActive={"غیرفعال"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}
                                 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                {preImage.uri ? (<div className={"mini-img-show-edit"}>
                                        <div className={"img-box"}>
                                            <img src={`${preImage.uri}`}/>
                                            <div className={"back"}><span onClick={e => handledelImg(e)}><i className={"bx bx-x"}></i> </span></div>
                                        </div>
                                    </div>)
                                 : !loading ?  imageGet.state !== "" ? (
                                    <div className={"mini-img-show-edit"}>
                                        <div className={"img-box"}>
                                            <img src={`${BASE_URL_IMG}${imageGet.state}`}/>
                                            <div className={"back"}><span onClick={e => handledelImg(e)}><i className={"bx bx-x"}></i> </span></div>
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
                                            <button id="select-files" className="btn btn-primary mb-1"><i
                                                className="icon-file2"></i>
                                                انتخاب فایل
                                            </button>

                                        </div>
                                    </fieldset>
                                ) : (<div className="spinner-border" role="status">
                                    <span className="sr-only">در حال بارگذاری ...</span>
                                </div>)}
                            </div>

                            <div className={"col-12"}>
                                <MyEditor editorData={data => {
                                    handleEditor(data)
                                }}
                                          id={"my-editor"}
                                          type={"perfect"}
                                          defaultVal={dataUpdateParse ? dataUpdateParse.content : ''}
                                          placeholder={"توضیحات دسته بندی را بنویسید ..."}/>
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

                            <div className={"col-lg-9 col-md-8 col-sm-12"}>
                                <fieldset className="form-group" style={{marginTop: '8px'}}>
                                    <label htmlFor={"title"}>آدرس صفحه دسته بندی</label>
                                    {slugManage ? changeCheck ? (
                                        <div className={"fucks"}>
                                            {titleWrite}
                                        </div>
                                    ) : (
                                        <div className={"fucks"}>
                                            {CatData.slug}
                                        </div>
                                    ) : (
                                        <input type={"text"}
                                               defaultValue={CatData.slug}
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
                                    <textarea
                                        defaultValue={MetaDataUpdate ? MetaDataUpdate.content : ''}
                                        type={"text"}
                                        onChange={e => HandleMetaData(e)} name={"content"}
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
    )


}
export default AddCategory;