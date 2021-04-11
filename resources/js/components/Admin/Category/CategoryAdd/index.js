import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {Switcher} from './../../../HOC/Switch'
import {BigSwitcher} from './../../../HOC/BigSwitcher';
import './../../_Shared/Style.scss'
import {Request} from './../../../../services/AdminService/Api'
import {SelectOptions} from './../../../HOC/SelectOptions'
import MyEditor from "../../_Micro/MyEditor/MyEditor";
import './../../_Micro/TreeShow/_Shared/style.scss';

const LOCAL_CAT = "localcat-zerone-cmslite";
const AddCategory = ({display ,dataUpdate , idParent, result : pushResult}) => {

    const [comments, setComments] = useState();
    const [categoryData, setCategoryData] = useState({});
    const [loading, setLoading] = useState(false);
    const [contentNew, setContentNew] = useState({});
    const [statusNew, setStatusNew] = useState();
    const [menuShow, setMenuShow] = useState();
    const [edit, setEdit] = useState(false);
    const StatusSwitch = useRef(null);
    const [metaData, setMetaData] = useState({
        robots: false,
    });
    const dataGet = dataUpdate ? JSON.parse(dataUpdate) : '';
    const dataUpdateParse = dataGet ? JSON.parse(dataGet.allData) : '';
    console.log("data :::::: : ", dataUpdateParse)

    const type = dataGet ? dataGet.type : '';

    // const MetaData = dataUpdateParse.metadata ? JSON.parse(dataUpdateParse.metadata) : '';

    const [slugManage, setSlugManage] = useState(true);
    const [formData, setFormData] = useState({});

    let default_value = {
        is_menu: true,
        status: "active",
        content: '',
        parent_id: idParent,
        slug: ''
    };

    const dataCategory = JSON.parse(localStorage.getItem(LOCAL_CAT));


    const CreateAddCategory = (e, data) => {
        e.preventDefault();
        Request.AddNewCategory(data)
            .then(res => pushResult(res))
            .catch(error => console.log("error add :", error))
    }

    useEffect(() => {
        let formNews = {...formData};
        formNews = dataUpdateParse ? dataUpdateParse : default_value;
        console.log("form newssss : ", formNews)
        setFormData(formNews);
    }, [])

    const handleClose = () => {
        ReactDOM.render('', document.getElementById("add-datas"));
        setFormData({
            is_menu: true,
            status: "active",
            content: '',
            parent_id: 0,
            slug: ''
        });
        setMetaData({
            robots: false,
        })
        $("#my-editor").attr("defaultValue" , "");
    }

    const handleInput = (e) => {
        setEdit(true)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }



    const HandleForm = (e) => {

        let formNew = {...formData};
        let is_menu = localStorage.getItem("is_menu");
        let status = localStorage.getItem("status");
        formNew.status = status;
        formNew.is_menu = parseInt(is_menu);
        if (slugManage == false) {
            formNew.slug = formNew.name;
        } else {
        }

        if (formData.slug == "") {
            formNew.slug = formNew.name
        }
        let msg = "اضافه کردن دسته بندی " + formData.name
        console.log("datasss : ", formNew)
        if (formData.name && formData.name !== '') {
            $("input[name=name]").removeClass("is-invalid");
            console.log("cat name : ", formNew.name)
        } else {
            console.log("name is null")
            $("input[name=name]").addClass("is-invalid");

        }
        formNew.content = contentNew;
        formNew.metadata = "vsdvsdvsdvsdv";
        console.log("form data : " , formNew)
        CreateAddCategory(e, formNew);
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
        let metaD = {...metaData};
        metaD.robots = states;
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

    const HandleUpdateForm=(data , id)=>{
        Request.UpdateDataCategory(data , id)
            .then(res => {
                localStorage.removeItem("is_menu");
                localStorage.removeItem("status");
                pushResult(res)
            })
            .catch(error => console.log("error add :", error))
    }

    const HandleEdit = () => {
        let formOldData = {...formData};
        formOldData.content = contentNew;
        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : formData.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formData.status;
        // console.log("status : " , status , " / menu : " , is_menu);
        formOldData.status = status;
        formOldData.is_menu = parseInt(is_menu);
        HandleUpdateForm(formOldData , formOldData.id);
    }
    const handleEditorData = (data) => {
        setEdit(true);
        setFormData({
            ...formData,
            content: data
        })
    }

    let MakeNewName = (name) => {
        const min = 1;
        const max = 1000;
        const rand = Number(min + Math.random() * (max - min)).toFixed(0);
        return name+rand+"_کپی";
    }
    const handleSwitchStatus = (status) => {
        setEdit(true)
        localStorage.setItem("status", status ? "active" : "deactivate");
    }
    const handleSwitchMenu = ( status) => {
        setEdit(true)
        localStorage.setItem("is_menu", status ? 1 : 0);
    }

    const HandleSelectOption = (check) => {
        setEdit(true)
        setFormData({
            ...formData,
            parent_id: parseInt(check)
        })
    }

    return (
        <div id={"category_add_pop_base"}>
            <form action={"#"}>
                {console.log("data cat : ", dataCategory.data)}
                <ul className="nav nav-tabs tab-layout" role="tablist">
                    <li className="nEav-item col-6 nav-custom">
                        <a className="nav-link active" id="cat-tab" data-toggle="tab" href="#cat" aria-controls="cat"
                           role="tab" aria-selected="true">
                            <span className="align-middle">دسته بندی</span>
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
                            <div className={"col-lg-3 col-md-4 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>عنوان دسته بندی</label>
                                    <input type={"text"} defaultValue={dataUpdateParse ? type == "dup" ? MakeNewName(dataUpdateParse.name) : dataUpdateParse.name : ''} onChange={e => handleInput(e)} name={"name"} id={"title"}
                                           className={"form-control"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-3 col-md-4 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>دسته بندی پدر</label>
                                    {console.log("item selected : " ,idParent )}
                                    {categoryData ? (
                                        <SelectOptions parents={idParent ? idParent : dataUpdateParse.parent_id}
                                                       selection={check => HandleSelectOption(check)}
                                                       loading={loading} data={JSON.stringify(dataCategory.data)}/>
                                    ): (
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
                                        defaultState={dataUpdateParse ? dataUpdateParse.is_menu == 0 ? false : true : true}
                                        status={(state) => handleSwitchMenu(state)} name={"showMenu"}
                                        valueActive={"فعال"} valueDeActive={"غیرفعال"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>افزودن فایل</label>
                                    <div id={"file"}>
                                        <input type={"file"} name={"file-attach"}
                                               style={{
                                                   opacity: 0,
                                                   zIndex: 9,
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

                            <div className={"col-12"}>
                                <MyEditor editorData={data => {
                                    setEdit(true)
                                    setContentNew(data)
                                }}
                                          id={"my-editor"}
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
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس صفحه دسته بندی</label>
                                    {slugManage ? (
                                        <input type={"text"}
                                               defaultValue={dataUpdateParse.slug ? dataUpdateParse.slug : formData.name}
                                               disabled id={"title"} className={"form-control slugest"}/>
                                    ) : (
                                        <input type={"text"}
                                               defaultValue={dataUpdateParse.slug ? dataUpdateParse.slug : formData.name}
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
                                        <input type={"text"} onChange={e => HandleMetaData(e)} name={"title"} id={"title"}
                                               className={"form-control"}/>


                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>توضیح صفحه ( حداکثر 155 حرف )</label>
                                        <textarea type={"text"} onChange={e => HandleMetaData(e)} name={"content"}
                                                  id={"title"} className={"form-control"}/>


                                </fieldset>
                            </div>


                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>کلمات کلیدی صفحه ( با ویرگول جدا کنید )</label>
                                        <input type={"text"} onChange={e => HandleMetaData(e)} name={"tags"} id={"title"}
                                               className={"form-control"}/>


                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس داخلی برای انتقال (301 Redirect)</label>
                                        <input type={"text"} onChange={e => HandleMetaData(e)} name={"redirect"}
                                               id={"title"} className={"form-control"}/>

                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس Canonical</label>
                                        <input onChange={e => HandleMetaData(e)} name={"canonical"} type={"text"}
                                               id={"title"} className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <label>تنظیمات Robots</label>
                                <BigSwitcher status={states => HandlerBigSwitcher(states)} name={"Robots"}
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
                        {type ? type == 'edit' ? edit ? (
                                <div onClick={(e) => HandleEdit(e)}
                                     className={"col-6"}
                                     style={{textAlign: 'center', cursor: 'pointer'}}>
                                    <span>ویرایش</span>
                                </div>
                            )
                            : (
                                <div
                                    id={"disable-div"}
                                     className={"col-6"}
                                     style={{textAlign: 'center', cursor: 'pointer'}}>
                                    <span>ویرایش</span>
                                </div>
                            )
                            : (
                                <div onClick={(e) => HandleDuplicate(e)}
                                     className={"col-6"}
                                     style={{textAlign: 'center', cursor: 'pointer'}}>
                                    <span>ذخیره کپی</span>
                                </div>
                            ) :

                            (
                                <div onClick={(e) => HandleForm(e)} className={"col-6"}
                                     style={{textAlign: 'center', cursor: 'pointer'}}>
                                    <span>ذخیره</span>
                                </div>
                            )}

                    </div>

                </div>
            </div>

            </form>

        </div>
    )


}
export default AddCategory;
