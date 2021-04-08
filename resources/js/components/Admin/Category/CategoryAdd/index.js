import React, {useState , useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Switcher} from './../../../HOC/Switch'
import {BigSwitcher} from './../../../HOC/BigSwitcher';
import './../../_Shared/Style.scss'
import {Request} from './../../../../services/AdminService/Api'
import {SelectOptions} from './../../../HOC/SelectOptions'

// import { DraftailEditor } from "draftail";
// import { EditorState } from "draft-js";
// import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
// import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
// import "draft-js/dist/Draft.css";
// import "draftail/dist/draftail.css";
// import "draft-js-inline-toolbar-plugin/lib/plugin.css";
// import "draft-js-side-toolbar-plugin/lib/plugin.css";
// const inlineToolbarPlugin = createInlineToolbarPlugin();
// const { InlineToolbar } = inlineToolbarPlugin;
// const sideToolbarPlugin = createSideToolbarPlugin();
// const { SideToolbar } = sideToolbarPlugin;
// const plugins = [inlineToolbarPlugin, sideToolbarPlugin];

const Index = (props) => {
    const [comments, setComments] = useState();
    const [categoryData, setCategoryData] = useState({});
    const [loading, setLoading] = useState(false);
    const [metaData, setMetaData] = useState({
        robots : "false"
    });

    const ChangeStateEditor = (state) => {
        setEditorState(state)
    }


    const [formData, setFormData] = useState({
        is_menu: false,
        status: "deactive",
        content: '',
        AddressType : false,
        parent_id : 0
    });

    const GetAllCategory = () => {
        setLoading(true)
        Request.GetAllCategory()
            .then(res => {
                setLoading(false)
                setCategoryData(res.data.data)
            })
            .catch(err => console.log("errpr : " , err))
    }

    const CreateAddCategory = (data) => {
        Request.AddNewCategory(data)
            .then(res => console.log("response add : " , res))
            .catch(error => console.log("error add :" , error))
    }

    useEffect(() => {
        GetAllCategory();
    } , [])

    let {display} = props;


    const handleClose = () => {
        $("#category_add_pop_base").fadeOut();
    }

    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const HandleForm = () => {
        let formNew = {...formData};
        formNew.metadata = "meta data";
        console.log("datasss : " , formNew)
        CreateAddCategory(formNew);
    }

    const HandleMetaData = (e) => {
        setMetaData({
            ...metaData ,
            [e.target.name] : e.target.value
        })
    }
    const HandlerBigSwitcher = (states) => {
        setMetaData(({
            ...metaData,
            robots : states
        }))
    }

    const handleSwitchStatus = (status) => {
        let formdatas = {...formData};
        formdatas.status = status ? "active" : "deactive";
    }
    const handleSwitchMenu = (status) => {
        let formdatas = {...formData};
        formdatas.is_menu = status;
    }
    const handleAddress = ( status) => {
        console.log(status)
    }
    return (
        <div id={"category_add_pop_base"}>
            <ul className="nav nav-tabs tab-layout" role="tablist">
                <li className="nav-item col-6 nav-custom">
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
                                <input type={"text"} onChange={e => {
                                    setFormData({
                                        ...formData,
                                        name : e.target.value,
                                        slug : e.target.value
                                    })
                                }} name={"name"} id={"title"}
                                       className={"form-control"}/>
                            </fieldset>
                        </div>
                        <div className={"col-lg-3 col-md-4 col-sm-12"}>
                            <fieldset className="form-group">
                                <label id={"selectParent"}>دسته بندی پدر</label>
                                <SelectOptions selection={check =>  setFormData({...formData , parent_id : check})} loading={loading} data={JSON.stringify(categoryData)} />
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
                                           style={{opacity: 0, zIndex: 9, position: 'absolute', cursor: 'pointer'}}/>
                                    <button id="select-files" className="btn btn-primary mb-1"><i
                                        className="icon-file2"></i>
                                        انتخاب فایل
                                    </button>

                                </div>
                            </fieldset>
                        </div>

                        {/*<div className={"col-12"}>*/}
                        {/*    <textarea style={{width : "100%"}} name={"content"} onChange={e =>handleInput(e)}/>*/}
                        {/*</div>*/}




                        {/*<DraftailEditor*/}
                        {/*    editorState={editorState}*/}
                        {/*    onChange={changeState}*/}
                        {/*    placeholder="Tell your story..."*/}
                        {/*    plugins={plugins}*/}
                        {/*/>*/}
                        {/*<InlineToolbar />*/}
                        {/*<SideToolbar />*/}







                    </div>
                    </div>
                </div>
                <div className="tab-pane" id="seo" aria-labelledby="seo-tab" role="tabpanel">
                    <div className={"content-pages"}>
                        <div className={"row"} style={{padding: '25px'}}>
                            <div className={"col-lg-3 col-md-4 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>نوع آدرس</label>

                                    <Switcher  status={state => handleAddress(state)} name={"AddressType"} valueActive={"خودکار"} valueDeActive={"دستی"}/>
                                </fieldset>
                            </div>

                            <div className={"col-lg-9 col-md-8 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>عنوان دسته بندی</label>
                                    {formData.AddressType ? (
                                        <input type={"cancel"} defaultValue={formData.name ? formData.name : ''} onChange={e =>handleInput((e))} name={"slug"} id={"title"} className={"form-control"}/>
                                    ):(
                                        <input type={"cancel"} defaultValue={formData.slug ? formData.slug : ''} disabled id={"title"} className={"form-control"}/>
                                    )}
                                </fieldset>
                            </div>

                            <div className={"col s12"}>
                                <div className={"alert alert-primary mb-2 col-12"} role={"alert"}>
                                    اطلاعات تیتر و توضیحات صفحه به صورت خودکار توسط zerone برای سئوی بهتر ایجاد می‌شوند. در صورتی که تمایل به شخصی‌سازی آن دارید، می‌توانید از بخش زیر استفاده کنید.
                                </div>
                            </div>

                            <div className={"col-12"}>
                                    <fieldset className="form-group">
                                        <label htmlFor={"title"}>عنوان صفحه ( حداکثر 60 حرف )</label>
                                        <input type={"text"} onChange={e => HandleMetaData(e)} name={"title"} id={"title"} className={"form-control"}/>
                                    </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>توضیح صفحه ( حداکثر 155 حرف )</label>
                                    <textarea type={"text"} onChange={e => HandleMetaData(e)} name={"content"} id={"title"} className={"form-control"}/>
                                </fieldset>
                            </div>


                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>کلمات کلیدی صفحه ( با ویرگول جدا کنید )</label>
                                    <input type={"text"} onChange={e => HandleMetaData(e)} name={"tags"} id={"title"} className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس داخلی برای انتقال (301 Redirect)</label>
                                    <input type={"text"} onChange={e => HandleMetaData(e)} name={"redirect"} id={"title"} className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس Canonical</label>
                                    <input onChange={e => HandleMetaData(e)} name={"canonical"} type={"text"} id={"title"} className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <label >تنظیمات Robots</label>
                                <BigSwitcher status={states => HandlerBigSwitcher(states)} name={"Robots"} valueOne={"غیرفعال"} valueTow={"noindex,follow"} valueThree={"noindex,unfolow"} />
                            </div>

                        </div>

                    </div>
                </div>

                <div className={"col-12 bottom-footer"}>
                    <div className={"row"}>
                        <div className={"col-6"} onClick={handleClose}
                             style={{cursor: 'pointer', textAlign: 'center', borderLeft: '1px solid #a9a9a9'}}>
                            <span>انصراف</span>
                        </div>
                        <div onClick={() => HandleForm()} className={"col-6"}
                             style={{textAlign: 'center', cursor: 'pointer'}}>
                            <span>اضافه کردن دسته</span>
                        </div>
                    </div>

                </div>

            </div>


        </div>
    )


}
export default Index;

let element = document.getElementById("category_add_pop");
if (element) {
    let props = Object.assign({}, element.dataset);
    ReactDOM.render(<Index  {...props} />, element);
}
