import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Switcher} from './../../../HOC/Switch'
import ReactQuill from 'react-quill';
import {BigSwitcher} from './../../../HOC/BigSwitcher';
import './../../_Shared/Style.scss'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const Index = (props) => {

    const [comments, setComments] = useState();
    const [modules] = useState({
        toolbar: [
            [{'font': []}],
            [{'size': ['small', false, 'large', 'huge']}],
            ['bold', 'italic', 'underline'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'align': []}],
            [{'color': []}, {'background': []}],
            ['clean']
        ]
    })
    const [formats] = useState([
        'font',
        'size',
        'bold', 'italic', 'underline',
        'list', 'bullet',
        'align',
        'color', 'background'
    ])
    let {display} = props;
    console.log("props : ", props)

    const changeQuil = (content, delta, source, editor) => {
        console.log(editor.getHTML()); // HTML/rich text
        console.log(editor.getText()); // plain text
        console.log(editor.getLength()); // number of characters
    }

    const handleClose = () => {
        $("#category_add_pop_base").fadeOut();
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
                                <label for={"title"}>عنوان دسته بندی</label>
                                <input type={"text"} id={"title"} className={"form-control"}/>
                            </fieldset>
                        </div>
                        <div className={"col-lg-3 col-md-4 col-sm-12"}>
                            <fieldset className="form-group">
                                <label id={"selectParent"}>دسته بندی پدر</label>
                                <select className="form-control" id="selectParent">
                                    <option>IT</option>
                                    <option>Blade Runner</option>
                                    <option>Thor Ragnarok</option>
                                </select>
                            </fieldset>
                        </div>
                        <div className={"col-lg-2 col-md-3 col-sm-12"}>
                            <fieldset className="form-group">
                                <label id={"selectParent"}>وضعیت نمایش</label>
                                <Switcher name={"showState"} valueActive={"فعال"} valueDeActive={"غیرفعال"}/>
                            </fieldset>
                        </div>
                        <div className={"col-lg-2 col-md-3 col-sm-12"}>
                            <fieldset className="form-group">
                                <label id={"selectParent"}>نمایش در منو</label>
                                <Switcher name={"showMenu"} valueActive={"فعال"} valueDeActive={"غیرفعال"}/>
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


                        <div className={"col-12"}>

                            <ReactQuill theme="snow" modules={modules}
                                        formats={formats} onChange={changeQuil}
                                        value={setComments || ''}/>

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
                                    <Switcher name={"AddressType"} valueActive={"خودکار"} valueDeActive={"دستی"}/>
                                </fieldset>
                            </div>

                            <div className={"col-lg-9 col-md-8 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>عنوان دسته بندی</label>
                                    <input type={"text"} id={"title"} className={"form-control"}/>
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
                                        <input type={"text"} id={"title"} className={"form-control"}/>
                                    </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>توضیح صفحه ( حداکثر 155 حرف )</label>
                                    <textarea type={"text"} id={"title"} className={"form-control"}/>
                                </fieldset>
                            </div>


                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>کلمات کلیدی صفحه ( با ویرگول جدا کنید )</label>
                                    <input type={"text"} id={"title"} className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس داخلی برای انتقال (301 Redirect)</label>
                                    <input type={"text"} id={"title"} className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس Canonical</label>
                                    <input type={"text"} id={"title"} className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <BigSwitcher name={"Robots"} valueOne={"غیرفعال"} valueTow={"noindex,follow"} valueThree={"noindex,unfolow"} />
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
                        <div className={"col-6"} style={{textAlign: 'center', cursor: 'pointer'}}>
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
