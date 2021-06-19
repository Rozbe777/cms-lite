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
import $ from "jquery";

const LOCAL_CAT = "localcat-zerone-cmslite";
const ContentAdd = ({checkChange : pushCheckChange , display, dataUpdate, result: pushResult}) => {

    const [categories, setCategorise] = useState([]);
    const dataGet = dataUpdate ? JSON.parse(dataUpdate) : '';
    const dataUpdateParse = dataGet ? dataGet.allData : '';
    const [changeCheck,setChangeCheck] = useState(false)
    const MetaDataUpdate = dataUpdateParse ? JSON.parse(dataUpdateParse.metadata) : {robots: false};

    const [comments, setComments] = useState();
    const [clear, setClear] = useState(false)
    const [categoryData, setCategoryData] = useState({});
    const [loading, setLoading] = useState(false);
    const [contentNew, setContentNew] = useState({});
    const [statusNew, setStatusNew] = useState();
    const [menuShow, setMenuShow] = useState();
    const [idSelCat, setIdSelCat] = useState([])
    // const [MetaDataUpdate , setMetaDataUpdate] = useState({});
    const [ids, setIds] = useState(0)
    const [chipset, setChipset] = useState([]);
    const [chipsetChange , setChipChange] = useState(false)
    let tags = [];
    const [edit, setEdit] = useState(false);
    const [file, setFile] = useState();
    const StatusSwitch = useRef(null);
    const [metaData, setMetaData] = useState({
        robots: false,
    });

    let titleWrite = $("input[name=titleContent]").val();

    const type = dataGet ? dataGet.type : '';

    const [slugManage, setSlugManage] = useState(true);
    const [formData, setFormData] = useState({});

    let default_value = {
        is_menu: 0,
        status: "active",
        content: '',
        slug: ''
    };


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


    const CreateAddContent = (data) => {
        swal({
            title: 'افزودن محتوا جدید',
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
                Request.AddNewContent(data)
                    .then(res => {
                        $(".pagination li.page-item.numberss").removeClass("active")
                        $(".pagination li#1.page-item.numberss").addClass("active")
                        pushCheckChange(true);
                        $("span.checkboxeds").removeClass("active");
                        pushResult(res);
                        setClear(true)
                        localStorage.removeItem("is_menu");
                        localStorage.removeItem("status");
                        localStorage.removeItem("selected");
                        localStorage.removeItem("comment_status");
                        localStorage.removeItem("robots");
                        Swal.fire({
                            type: "success",
                            title: 'با موفقیت اضافه شد !',
                            confirmButtonClass: 'btn btn-success',
                            confirmButtonText: 'باشه',
                        })

                    }).catch(err => {
                    // pushCheckChange(true)
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

    useEffect(() => {
        GetAllCategory();
        let formNews = {...formData};
        formNews = dataUpdateParse ? dataUpdateParse : default_value;

        dataUpdateParse ? dataUpdateParse.tags.map(item => {
            chipset.push(item.name);
            setChipset(chipset);
        }) : '';

        setMetaData(MetaDataUpdate)

        setIds(formNews.id);
        setFormData({
            content: formNews.content,
            is_index: formNews.is_index,
            is_menu: formNews.is_menu,
            metadata: formNews.metadata,
            slug: formNews.slug,
            title: formNews.title,
            tag_list: formNews.tag_list,
            category_list: formNews.category_list
        });


    }, [])


    const handleClose = (e) => {
        e.preventDefault()
        setClear(true)
        $("span.checkboxeds").removeClass("active");
        ReactDOM.render('', document.getElementById("add-datas"));
        setFormData({
            is_menu: 0,
            status: "active",
            content: '',
            slug: ''
        });
        localStorage.removeItem("is_menu");
        localStorage.removeItem("status");
        localStorage.removeItem("selected");
        localStorage.removeItem("comment_status");
        localStorage.removeItem("robots");
        setMetaData({
            robots: false,
        })
        $("#my-editor").attr("defaultValue", "");
    }

    const HandleFile = (e) => {
        setFile(e.target.files[0]);
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


    const HandleForm = (e) => {
        let formNew = {...formData};
        let formFile = new FormData();
        formFile.append("file", file);
        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : formNew.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formNew.status;
        let comment_status = localStorage.getItem("comment_status") ? localStorage.getItem("comment_status") : formNew.comment_status;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        formNew.status = status;
        formNew.comment_status = comment_status;
        formNew.image = file;
        formNew.is_menu = is_menu;
        if (slugManage == false) {
            formNew.slug = formNew.title;
        } else {
        }

        if (formData.slug == "") {
            formNew.slug = formNew.title
        }
        formNew.content = JSON.stringify(contentNew);
        let MetaDaa = {...metaData};
        MetaDaa.robots = robots;
        formNew.metadata = JSON.stringify(MetaDaa);
        formNew.category_list = idSelCat;
        formNew.tag_list = chipsetChange ? chipset : [];
        if (formData.title && formData.title !== '') {
            $("input[name=titleContent]").removeClass("is-invalid");
            CreateAddContent(formNew);
        } else {
            $("input[name=titleContent]").addClass("is-invalid");
            error("لطفا فیلد عنوان صفحه را پر کنید !")
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
                        //<button onclick='`${reloadpage()}`'  id='reloads' style='margin : 0 !important' class='btn btn-secondary  round mr-1 mb-1'>پردازش مجدد</button>
                        ErrorToast("خطای غیر منتظره ای رخ داده است")
                    }
                })
            }
        });

    }


    const HandleEdit = () => {
        let formOldData = {...formData};
        let title = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        formOldData.title = title;
        formOldData.slug = slug;
        formOldData.content = JSON.stringify(contentNew);
        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : formData.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formData.status;
        let comment_status = localStorage.getItem("comment_status") ? localStorage.getItem("comment_status") : formData.comment_status;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        let metaDatas = {...metaData};
        metaDatas.robots = robots;
        formOldData.title = titleWrite;
        formOldData.metadata = JSON.stringify(metaDatas);
        formOldData.status = status;
        formOldData.comment_status = comment_status;
        formOldData.is_menu = parseInt(is_menu);
        formOldData.category_list = idSelCat;
        formOldData.tag_list = setChipChange ? chipset : [];
        HandleUpdateForm(formOldData, ids);
    }

    const HandleDuplicate = () => {
        let formOldData = {...formData};
        let title = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();

        formOldData.content = JSON.stringify(contentNew);
        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : formData.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formData.status;
        let comment_status = localStorage.getItem("comment_status") ? localStorage.getItem("comment_status") : formData.comment_status;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        let metaDatas = {...metaData};
        metaDatas.robots = robots;
        formOldData.metadata = JSON.stringify(metaDatas);
        formOldData.status = status;
        formOldData.category_list = idSelCat;
        formOldData.tag_list = chipset;
        formOldData.title = title;
        formOldData.slug = slug;
        formOldData.comment_status = comment_status;
        formOldData.is_menu = parseInt(is_menu);
        // console.log("data duplicate : " , formOldData);
        CreateAddContent(formOldData);
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
        localStorage.setItem("comment_status", status ? "active" : "deactivate");
    }
    const HandleSelectOption = (check) => {
        setEdit(true)
        console.log("data checked : ", check)
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


    return (
        <div id={"category_add_pop_base"}>
            <ul className="nav nav-tabs tab-layout" role="tablist">
                <li className="nEav-item col-6 nav-custom">
                    <a className="nav-link active" id="cat-tab" data-toggle="tab" href="#cat" aria-controls="cat"
                       role="tab" aria-selected="true">
                        <span className="align-middle">محتوا</span>
                    </a>
                </li>
                <li className="nav-item col-6 nav-custom ">
                    <a className="nav-link" id="seo-tab" data-toggle="tab" href="#seo" aria-controls="seos"
                       role="tab" aria-selected="false">
                        <span className="align-middle">سئو و آدرس</span>
                    </a>
                </li>
            </ul>
            <div className="tab-content" style={{padding: 0, position: 'relative'}}>
                <div className="tab-pane active" id="cat" aria-labelledby="cat-tab" role="tabpanel">
                    <div className={"content-pages"}>

                        <div className={"row"} style={{padding: '20px'}}>
                            <div className={"col-lg-6 col-md-12 col-sm-12"} style={{paddingTop: 5}}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>عنوان محتوا</label>
                                    <input type={"text"} defaultValue={HandleMakeName()} onChange={e => handleInput(e)}
                                           name={"titleContent"} id={"title"}
                                           className={"form-control"}/>
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
                            {/*<div className={"col-lg-2 col-md-3 col-sm-12"}>*/}
                            {/*    <fieldset className="form-group">*/}
                            {/*        <label id={"selectParent"}>نظرسنجی</label>*/}
                            {/*        <Switcher*/}
                            {/*            defaultState={dataUpdateParse ? dataUpdateParse.comment_status == "active" ? true : false : true}*/}
                            {/*            status={(state) => handleSwitchComment(state)} name={"comment_status"}*/}
                            {/*            valueActive={"فعال"}*/}
                            {/*            valueDeActive={"غیرفعال"}/>*/}
                            {/*    </fieldset>*/}
                            {/*</div>*/}
                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
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
                            </div>

                            <div className={"col-lg-6 col-md-12 col-sm-12"}>
                                <label
                                    htmlFor="users-list-role">دسته بندی</label>
                                <MultiSelected name={"categories"} data={categoryData ? categoryData : []}
                                               clear={clear}
                                               defSelected={dataUpdateParse.categories ? dataUpdateParse.categories : []}
                                               clearNew={cl => setClear(cl)}
                                               selected={item => {
                                                   setEdit(true)
                                                   item.map(ii => {
                                                       let idsel = idSelCat.indexOf(parseInt(ii.id))
                                                       if (idsel !== -1) {

                                                       } else {
                                                           idSelCat.push(parseInt(ii.id));
                                                           setIdSelCat(idSelCat);
                                                       }

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
                                <MyEditor editorData={data => {
                                    setEdit(true)
                                    setContentNew(data)
                                }}
                                          id={"my-editor"}
                                          type={"perfect"}
                                          defaultVal={dataUpdateParse ? JSON.parse(dataUpdateParse.content) : ''}
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

                        <div className={"col-6"} onClick={e => handleClose(e)}
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
export default ContentAdd;
