import React, {useState} from "react";
import {Footer} from "./Footer";
import {ContentFormParent} from "./ContentFormParent";
import ContentApi from "../Api/ContentApi";
import $ from "jquery";
import {error, successSwal, swalAccept} from "../../../../helper";

const ContentAdd = ({actionResult}) => {
    let helperFunction = new HelperFunction();
    const [slugManage, setSlugManage] = useState(true);
    let default_value = {
        is_menu: 0,
        comment_status: "deactivate",
        status: "active",
        content: '',
        slug: ''
    };

    const [contentForm, setContentForm] = useState(default_value);
    const [editorConten, setEditorContent] = useState('');
    const [edit, setEdit] = useState(false)
    const [metaData, setMetaData] = useState({
        robots: false
    });
    const [file, setFile] = useState({file: ''});
    const onCancel = (e) => {
        e.preventDefault();
        helperFunction.handleClose();
    }

    const handleInputs = e => {
        setSlugManage(true)
        if (e.target.name === "titleContent") {
            if (slugManage) {
                let contentFormClone = {...contentForm};
                contentFormClone.title = e.target.value;
                contentFormClone.slug = e.target.value;
                setContentForm(contentFormClone);
            } else {
                let contentFormClone = {...contentForm};
                contentFormClone.title = e.target.value;
                setContentForm(contentFormClone);

            }
        } else {
            let contentFormClone = {...contentForm};
            contentFormClone.slug = e.target.value;
            setContentForm(contentFormClone);
        }
    }

    const categoryOnChange = (categories) => {
        let contentFormDataClone = {...contentForm};
        let categorySelected = [];
        categories.map((idMap) => {
            categorySelected.push(parseInt(idMap.id));
        })
        contentFormDataClone.categories = categorySelected;
        setContentForm(contentFormDataClone);
    }

    const tagChange = (tagList) => {
        let contentFormDataClone = {...contentForm};
        contentFormDataClone.tag_list = tagList;
        setContentForm(contentFormDataClone);
    }

    const fileChange = file => {
        setFile({file: file})
    }

    const editorData = contentInput => {
        setEditorContent(contentInput);
    }

    const handleMetaData = event => {
        setMetaData({
            ...metaData,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = () => {
        let api = new ContentApi()
        console.log(contentForm)
        let contentDataClone = {...contentForm};
        let titleWrite = $("input[name=titleContent]").val();
        let contentFormResult = new FormData();
        contentFormResult.append("image", file.file ? file.file : '')
        let metaDataClone = {...metaData};
        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : contentDataClone.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : contentDataClone.status;
        let comment_status = localStorage.getItem("comment_status") ? localStorage.getItem("comment_status") : contentDataClone.comment_status;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaDataClone.robots;
        contentFormResult.append("status", status)
        contentFormResult.append("comment_status", comment_status)
        contentFormResult.append("is_menu", is_menu)
        let title = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        contentFormResult.append("title", title)
        if (slugManage == false) {
            contentFormResult.append("slug", title)
        } else {
            contentFormResult.append("slug", slug)
        }
        if (contentDataClone.slug == "") {
            contentFormResult.append("slug", title)
        }
        contentFormResult.append("content", editorConten)
        metaDataClone.robots = robots;
        let metaDataStringify = JSON.stringify(metaDataClone);
        contentFormResult.append("metadata", metaDataStringify)
        contentFormResult.append("category_list", contentDataClone.categories ? JSON.stringify(contentDataClone.categories) : '')
        contentFormResult.append("tag_list", contentDataClone.tag_list ? JSON.stringify(contentDataClone.tag_list) : '')
        if (contentDataClone.title && contentDataClone.title !== '') {
            $("input[name=titleContent]").removeClass("is-invalid");
            swalAccept("افزودن محتوا جدید").then(resSwal => {
                if (resSwal.value) {
                    api.create(contentFormResult).then(res => {
                        successSwal("با موفقیت اضافه شد !");
                        actionResult(res);
                    })
                }
            })
        } else {
            $("input[name=titleContent]").addClass("is-invalid");
            error("لطفا فیلد عنوان محتوا را پر کنید !")
        }

    }


    const changeCheck = (status) => {
        setEdit(status)
    }


    return (
        <div id={"category_add_pop_base"}>
            <ContentFormParent
                actionType={"create"}
                contentData={''}
                tagChange={tagChange}
                categoryOnChange={categoryOnChange}
                onChangeInput={handleInputs}
                editorData={editorData}
                changeCheck={changeCheck}
                fileChange={fileChange}
                handleMetaData={handleMetaData}
            />
            <div className={"col-12 bottom-footer"}>
                <Footer actionType={'save'} editStatus={edit} onClicked={onSubmit} onCancel={onCancel}/>
            </div>
        </div>
    )

}
export default ContentAdd;
