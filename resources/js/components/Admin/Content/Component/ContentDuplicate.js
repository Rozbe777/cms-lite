import React, {useState} from "react";
import {Footer} from "./Footer";
import {ContentFormParent} from "./ContentFormParent";
import HelperFunction from './../Helper/HelperFunction';
import CreateContent from "../Api/ContentApi";
import $ from "jquery";
import {error, successSwal, swalAccept} from "../../../../helper";
import {TOKEN} from "../../../../services/Type";

const ContentDuplicate = ({actionResult, contentDataUpdate}) => {
    let helperFunction = new HelperFunction();
    const [slugManage, setSlugManage] = useState(true);




    function categoriesIdChunk(){
        let categoryIds = [];
        contentDataUpdate.categories.map(categoryItem => {
            categoryIds.push(categoryItem.id);
        })
        return categoryIds;
    }

    function tagsIdChunk(){
        let tagIds = [];
        contentDataUpdate.tags.map(tagItem => {
            tagIds.push(tagItem.name);
        })
        return tagIds;
    }

    let default_value = {
        id: contentDataUpdate.id,
        image: contentDataUpdate.image,
        content: contentDataUpdate.content,
        is_menu: contentDataUpdate.is_menu,
        status: contentDataUpdate.status,
        comment_status: contentDataUpdate.comment_status,
        metadata: contentDataUpdate.metadata,
        slug: contentDataUpdate.slug,
        title: contentDataUpdate.title,
        tag_list: tagsIdChunk(),
        category_list: categoriesIdChunk()
    };
    const [contentForm, setContentForm] = useState(default_value);

    const [edit, setEdit] = useState(false)
    const [editorConten, setEditorContent] = useState(contentDataUpdate.content);
    const [metaData, setMetaData] = useState(JSON.parse(contentDataUpdate.metadata));
    const [file, setFile] = useState({file: ''});
    const onCancel = (e) => {
        e.preventDefault();
        helperFunction.handleClose();
    }

    const handleInputs = e => {
        setSlugManage(true)
        setEdit(true)
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
        setEdit(true)
        let contentFormDataClone = {...contentForm};
        let categorySelected = [];
        categories.map((idMap) => {
            categorySelected.push(parseInt(idMap.id));
        })
        contentFormDataClone.category_list = categorySelected;
        setContentForm(contentFormDataClone);
    }

    const tagChange = (tagList) => {
        setEdit(true)
        let contentFormDataClone = {...contentForm};
        contentFormDataClone.tag_list = tagList;
        setContentForm(contentFormDataClone);
    }

    const fileChange = file => {
        setEdit(true)
        setFile({file: file})
    }

    const editorData = contentInput => {
        setEdit(true)
        setEditorContent(contentInput);
    }

    const handleMetaData = event => {
        setEdit(true)
        setMetaData({
            ...metaData,
            [event.target.name]: event.target.value
        })
    }

    const changeCheck = (status) => {
        setEdit(status)
    }

    const onSubmit = () => {
        let api = new CreateContent()
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
        contentFormResult.append("category_list", contentDataClone.category_list ? JSON.stringify(contentDataClone.category_list) : '')
        contentFormResult.append("tag_list", contentDataClone.tag_list ? JSON.stringify(contentDataClone.tag_list) : '')
        if (contentDataClone.title && contentDataClone.title !== '') {
            $("input[name=titleContent]").removeClass("is-invalid");
            swalAccept("کپی محتوا").then(resSwal => {
                if (resSwal.value) {
                    api.create(contentFormResult).then(res => {
                        successSwal("با موفقیت کپی شد !");
                        actionResult(res);
                    })
                }
            })
        } else {
            $("input[name=titleContent]").addClass("is-invalid");
            error("لطفا فیلد عنوان صفحه را پر کنید !")
        }

    }
    return (
        <div id={"category_add_pop_base"}>
            <ContentFormParent
                actionType={"duplicate"}
                contentData={contentDataUpdate}
                tagChange={tagChange}
                categoryOnChange={categoryOnChange}
                onChangeInput={handleInputs}
                editorData={editorData}
                fileChange={fileChange}
                changeCheck={changeCheck}
                handleMetaData={handleMetaData}
            />
            <div className={"col-12 bottom-footer"}>
                <Footer actionType={'duplicate'} editStatus={edit} onClicked={onSubmit} onCancel={onCancel}/>
            </div>
        </div>
    )

}
export default ContentDuplicate;
