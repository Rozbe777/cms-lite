import React, {useState} from "react";
import {Footer} from "./Footer";
import HelperFunction from './../Helper/HelperFunction';
import ComponentHandler from "../Helper/ComponentHandler";
import $ from "jquery";
import {error, successSwal, swalAccept} from "../../../../helper";
import {PageFormParent} from "./PageFormParent";
import PageApi from "../Api/PageApi";

const PageDuplicate = ({actionResult , pageData , actionType , allPageData}) => {

    let helperFunction = new HelperFunction();
    let componentHandler = new ComponentHandler();
    let pageApi = new PageApi();
    const [file , setFile] = useState({file : ''})
    const [edit, setEdit] = useState(false);
    const [metaData, setMetaData] = useState(JSON.parse(pageData.metadata));


    console.log("__//////_____" , pageData)
    let default_value = {
        id: pageData.id,
        image: pageData.image,
        content: pageData.content,
        is_menu: pageData.is_menu,
        status: pageData.status,
        metadata: pageData.metadata,
        slug: pageData.slug,
        title: pageData.title,

    };
    const [editorContent, setEditorContent] = useState(pageData.content);


    const [pageForm, setPageForm] = useState(default_value)


    const [slugManage, setSlugManage] = useState(true);

    const onCancel = (e) => {
        e.preventDefault();
        helperFunction.handleClose();
    }

    const handleInputs = e => {
        setSlugManage(true)
        if (e.target.name === "name") {
            if (slugManage) {
                let pageFormClone = {...pageForm};
                pageFormClone.title = e.target.value;
                pageFormClone.slug = e.target.value;
                setPageForm(pageFormClone);
            } else {
                let pageFormClone = {...pageForm};
                pageFormClone.title = e.target.value;
                setPageForm(pageFormClone);

            }
        } else {
            let pageFormClone = {...pageForm};
            pageFormClone.slug = e.target.value;
            setPageForm(pageFormClone);
        }
    }


    const tagChange = (tagList) => {
        let metaDataClone = {...metaData};
        metaDataClone.tags = tagList;
        setMetaData(metaDataClone);
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

    const changeCheck = (status) => {
        setEdit(true)
    }


    const onSubmit = () => {
        let pageFormClone = {...pageForm};
        let pageFormData = new FormData();
        let titleWrite = $("input[name=title]").val();
        pageFormData.append("image", file.file ? file.file : '');
        pageFormData.append("content", editorContent);
        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : pageFormClone.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : pageFormClone.status;
        let parent_id = localStorage.getItem("selected") ? localStorage.getItem("selected") : pageFormClone.parent_id;
        pageFormData.append("status", status);
        pageFormData.append("parent_id", parent_id ? parseInt(parent_id) : '');
        pageFormData.append("is_menu", is_menu);
        let name = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        if (slugManage == false) {
            pageFormData.append("slug", name);
        } else {
            pageFormData.append("slug", slug);
        }
        if (pageForm.slug == "") {
            pageFormData.append("slug", name);
        }
        pageFormData.append("title", name);

        metaData.robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : "false";
        pageFormData.append("metadata", JSON.stringify(metaData));
        if (name && name !== '') {
            $("input[name=title]").removeClass("is-invalid");
            swalAccept(`کپی صفحه`).then(resSwal => {
                if (resSwal.value) {
                    pageApi.create(pageFormData).then(res => {
                        successSwal("با موفقیت کپی شد !");
                        actionResult(res);
                    })
                }
            })
        } else {
            $("input[name=name]").addClass("is-invalid");
            error("لطفا فیلد نام صفحه را پر کنید !")
        }
    }



    return (
        <div id={"category_add_pop_base"}>
            <PageFormParent
                actionType={"duplicate"}
                edit={edit}
                pageData={pageData} // this data required for duplicate
                tagChange={tagChange}
                onChangeInput={handleInputs}
                editorData={editorData}
                allpage={allPageData}
                changeCheck={changeCheck}
                fileChange={fileChange}
                handleMetaData={handleMetaData}
            />
            <div className={"col-12 bottom-footer"}>
                <Footer actionType={'duplicate'} editStatus={edit} onClicked={onSubmit} onCancel={onCancel}/>
            </div>
        </div>
    )


}
export default PageDuplicate;
