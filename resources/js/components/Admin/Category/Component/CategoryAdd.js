import React, {useState} from "react";
import {Footer} from "./Footer";
import HelperFunction from './../Helper/HelperFunction';
import ComponentHandler from "../Helper/ComponentHandler";
import $ from "jquery";
import {error, successSwal, swalAccept} from "../../../../helper";
import {CategoryFormParent} from "./CategoryFormParent";
import CategoryApi from "../Api/CategoryApi";

const CategoryAdd = ({actionResult, idParent , categoryData , allCategoryData}) => {

    let helperFunction = new HelperFunction();
    let componentHandler = new ComponentHandler();
    let categoryApi = new CategoryApi();
    const [editorContent, setEditorContent] = useState('');
    const [file , setFile] = useState({file : ''})
    const [categoryForm, setCategoryForm] = useState({
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
                let categoryFormClone = {...categoryForm};
                categoryFormClone.name = e.target.value;
                categoryFormClone.slug = e.target.value;
                setCategoryForm(categoryFormClone);
            } else {
                let categoryFormClone = {...categoryForm};
                categoryFormClone.name = e.target.value;
                setCategoryForm(categoryFormClone);

            }
        } else {
            let categoryFormClone = {...categoryForm};
            categoryFormClone.slug = e.target.value;
            setCategoryForm(categoryFormClone);
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
        let categoryFormClone = {...categoryForm};
        let caegoryFormData = new FormData();
        let titleWrite = $("input[name=name]").val();

        caegoryFormData.append("image", file.file ? file.file : '');
        caegoryFormData.append("content", editorContent);
        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : categoryFormClone.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : categoryFormClone.status;
        let parent_id = localStorage.getItem("selected") ? localStorage.getItem("selected") : categoryFormClone.parent_id;
        caegoryFormData.append("status", status);
        caegoryFormData.append("parent_id", parent_id ? parseInt(parent_id) : '');
        caegoryFormData.append("is_menu", is_menu);
        let name = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        if (slugManage == false) {
            caegoryFormData.append("slug", name);
        } else {
            caegoryFormData.append("slug", slug);
        }

        if (categoryForm.slug == "") {
            caegoryFormData.append("slug", name);
        }

        caegoryFormData.append("name", name);

        metaData.robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : "false";
        caegoryFormData.append("metadata", JSON.stringify(metaData));
        if (name && name !== '') {
            $("input[name=name]").removeClass("is-invalid");
            swalAccept("???????????? ???????? ???????? ????????").then(resSwal => {
                if (resSwal.value) {
                    categoryApi.create(caegoryFormData).then(res => {
                        successSwal("???? ???????????? ?????????? ???? !");
                        actionResult(res);
                    })
                }
            })
        } else {
            $("input[name=name]").addClass("is-invalid");
            error("???????? ???????? ?????? ???????? ???????? ???? ???? ???????? !")
        }
    }

    // get parent id
    const  categoryParentId = id => {
       setCategoryForm({
           ...categoryForm,
           parent_id : id
       })
    }

    return (
        <div id={"category_add_pop_base"}>
            <CategoryFormParent
                actionType={"add"}
                categoryData={''} // this data required for edit
                tagChange={tagChange}
                onChangeInput={handleInputs}
                parentId={idParent ? idParent : 0}
                editorData={editorData}
                allCategory={allCategoryData}
                changeCheck={changeCheck}
                fileChange={fileChange}
                categoryParentId={categoryParentId}
                handleMetaData={handleMetaData}
            />
            <div className={"col-12 bottom-footer"}>
                <Footer actionType={'save'} editStatus={edit} onClicked={onSubmit} onCancel={onCancel}/>
            </div>
        </div>
    )


}
export default CategoryAdd;
