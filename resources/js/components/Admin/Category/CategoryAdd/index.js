import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Switcher} from './../../../HOC/Switch'
import {BigSwitcher} from './../../../HOC/BigSwitcher';
import './../../_Shared/Style.scss'
import {Request} from './../../../../services/AdminService/Api'
import {SelectOptions} from './../../../HOC/SelectOptions'
import {CaegoryAleert} from './../../_Shared/java'
import MyEditor from "../../_Micro/MyEditor/MyEditor";
import './../../_Micro/TreeShow/_Shared/style.scss';
const LOCAL_CAT = "localcat-zerone-cmslite";
const AddCategory = ({display ,idParent, result : pushResult}) => {
    const [comments, setComments] = useState();
    const [categoryData, setCategoryData] = useState({});
    const [loading, setLoading] = useState(false);
    const [metaData, setMetaData] = useState({
        robots: false,
    });

    const [slugManage, setSlugManage] = useState(false);
    const [formData, setFormData] = useState({
        is_menu: true,
        status: "active",
        content: '',
        parent_id : idParent,
        slug : ''
    });


    // get category data from localstorage
    const dataCategory=JSON.parse(localStorage.getItem(LOCAL_CAT));


    const CreateAddCategory = (data) => {
        Request.AddNewCategory(data)
            .then(res => pushResult(res))
            .catch(error => console.log("error add :", error))
    }

    useEffect(() => {
    }, [])

    // let {display} = props;


    const handleClose = () => {
        ReactDOM.render('' , document.getElementById("add-datas"));
        // let newFormData =
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
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }



    const HandleForm = (e) => {
        let formNew = {...formData};
        if (slugManage == false){
            formNew.slug = formNew.name;
        }else{
        }
        formNew.metadata = JSON.stringify(metaData);

        let msg = "اضافه کردن دسته بندی "+formData.name
        console.log("datasss : ", formNew)
        if (formData.name && formData.name !== '' ){
            $("input[name=name]").removeClass("is-invalid");
            console.log("cat name : ", formNew.name)

        }else{
            console.log("name is null")
            $("input[name=name]").addClass("is-invalid");

        }
        CreateAddCategory(formNew);
    }

    const HandleMetaData = (e) => {
        setMetaData({
            ...metaData,
            [e.target.name]: e.target.value
        })
    }
    const HandlerBigSwitcher = (states) => {
        let metaD = {...metaData};
        metaD.robots = states;
    }

    const HandleSlug = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSwitchStatus = (status) => {
        let formdatas = {...formData};
        formdatas.status = status ? "active" : "deactive";
    }
    const handleSwitchMenu = (status) => {
        let formdatas = {...formData};
        formdatas.is_menu = status;
    }
    const handleAddress = (status) => {
        setSlugManage(status)
    }


    const handleEditorData = (data) => {
        setFormData({
            ...formData,
            content: data
        })
    }

    const HandleSelectOption = (check) => {
        setFormData({
            ...formData,
            parent_id: parseInt(check)
        })
    }


    return (
        <div id={"category_add_pop_base"}>
            <form action={"#"}>
                {console.log("data cat : " , dataCategory.data)}
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
                                    <input type={"text"} onChange={e => handleInput(e)} name={"name"} id={"title"}
                                           className={"form-control"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-3 col-md-4 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>دسته بندی پدر</label>
                                    {categoryData ? (
                                        <SelectOptions parents={idParent} selection={check => HandleSelectOption(check)}
                                                       loading={loading} data={JSON.stringify(dataCategory.data)}/>
                                    ): (
                                        <p>wait ...</p>
                                    )}

                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>وضعیت نمایش</label>
                                    <Switcher status={state => handleSwitchStatus(state)} name={"showState"}
                                              valueActive={"فعال"} valueDeActive={"غیرفعال"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-2 col-md-3 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>نمایش در منو</label>
                                    <Switcher status={state => handleSwitchMenu(state)} name={"showMenu"}
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
                                <MyEditor editorData={data => handleEditorData(data)}
                                          id={"my-editor"}
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

                                    <Switcher status={state => handleAddress(state)} name={"AddressType"}
                                              valueActive={"خودکار"} valueDeActive={"دستی"}/>
                                </fieldset>
                            </div>

                            <div className={"col-lg-9 col-md-8 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس صفحه دسته بندی</label>
                                    {slugManage ? (
                                        <input type={"cancel"} defaultValue={formData.name}
                                               onChange={e => handleInput(e)} name={"slug"} id={"title"}
                                               className={"form-control slugest"}/>
                                    ) : (
                                        <input type={"cancel"} defaultValue={formData.name}
                                               disabled id={"title"} className={"form-control slugest"}/>
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
                        <div onClick={(e) => HandleForm(e)} className={"col-6"}
                             style={{textAlign: 'center', cursor: 'pointer'}}>
                            <span>اضافه کردن دسته</span>
                        </div>
                    </div>

                </div>
            </div>

            </form>

        </div>
    )


}
export default AddCategory;

// let element = document.getElementById("category_add_pop");
// if (element) {
//     let props = Object.assign({}, element.dataset);
//     ReactDOM.render(<Index  {...props} />, element);
// }
