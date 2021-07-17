import React, {useState} from "react";
import {Footer} from "./Footer";
import HelperFunction from './../Helper/HelperFunction';
import ComponentHandler from "../Helper/ComponentHandler";
import $ from "jquery";
import {error, successSwal, swalAccept} from "../../../../helper";
import {PageFormParent} from "./PageFormParent";
import PageApi from "../Api/PageApi";

const PageAdd = ({actionResult, idParent , allPageData}) => {

    let helperFunction = new HelperFunction();
    let pageApi = new PageApi();
    const [editorContent, setEditorContent] = useState('');
    const [file , setFile] = useState({file : ''})
    const [pageForm, setPageForm] = useState({
        is_menu: 0,
        status: "active",
        content: '',
        parent_id: idParent,
        slug: ''
    })
    const [edit, setEdit] = useState(false);
    const [metaData, setMetaData] = useState({
        robots: false,
    });

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
                pageFormClone.name = e.target.value;
                pageFormClone.slug = e.target.value;
                setPageForm(pageFormClone);
            } else {
                let pageFormClone = {...pageForm};
                pageFormClone.name = e.target.value;
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
        let caegoryFormData = new FormData();
        let titleWrite = $("input[name=title]").val();
        caegoryFormData.append("image", file.file ? file.file : '');
        caegoryFormData.append("content", editorContent);
        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : pageFormClone.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : pageFormClone.status;
        let is_index = localStorage.getItem("is_index") ? localStorage.getItem("is_index") : pageFormClone.is_index;


        caegoryFormData.append("status", status);
        caegoryFormData.append("is_menu", is_menu);
        caegoryFormData.append("is_index", is_index);
        let name = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        if (slugManage == false) {
            caegoryFormData.append("slug", name);
        } else {
            caegoryFormData.append("slug", slug);
        }

        if (pageForm.slug == "") {
            caegoryFormData.append("slug", name);
        }

        caegoryFormData.append("name", name);

        metaData.robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : "false";
        caegoryFormData.append("metadata", JSON.stringify(metaData));
        if (name && name !== '') {
            $("input[name=name]").removeClass("is-invalid");
            swalAccept("افزودن دسته بندی جدید").then(resSwal => {
                if (resSwal.value) {
                    pageApi.create(caegoryFormData).then(res => {
                        successSwal("با موفقیت اضافه شد !");
                        actionResult(res);
                    })
                }
            })
        } else {
            $("input[name=name]").addClass("is-invalid");
            error("لطفا فیلد نام دسته بندی را پر کنید !")
        }
    }

    return (
        <div id={"category_add_pop_base"}>
            <PageFormParent
                actionType={"add"}
                pageData={''} // this data required for edit
                tagChange={tagChange}
                onChangeInput={handleInputs}
                editorData={editorData}
                allPage={allPageData}
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
export default PageAdd;
