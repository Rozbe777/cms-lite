import React, {useState} from "react";
import {Footer} from "./Footer";
import HelperFunction from './../Helper/HelperFunction';
import ComponentHandler from "../Helper/ComponentHandler";
import Create from "../Api/CategoryApi";
import $ from "jquery";
import {error, successSwal, swalAccept} from "../../../../helper";
import {CategoryFormParent} from "./CategoryFormParent";
import {CreateAddCategory} from "../Helper/Action";
import CategoryApi from "../Api/CategoryApi";

const CategoryAdd = ({actionResult, idParent , categoryData}) => {

    let helperFunction = new HelperFunction();
    let componentHandler = new ComponentHandler();
    let categoryApi = new CategoryApi();
    const [loading, setLoading] = useState(false);
    const [editorContent, setEditorContent] = useState('');
    const [ids, setIds] = useState();
    const [file , setFile] = useState({file : ''})
    const [contentNew, setContentNew] = useState('');
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

    const categoryOnChange = (categories) => {
        // let categoryFormDataClone = {...categoryForm};
        // let categorySelected = [];
        // categories.map((idMap) => {
        //     categorySelected.push(parseInt(idMap.id));
        // })
        // contentFormDataClone.categories = categorySelected;
        // setContentForm(contentFormDataClone);
    }

    const tagChange = (tagList) => {
        let categoryFormDataClone = {...categoryForm};
        categoryFormDataClone.tag_list = tagList;
        setCategoryForm(categoryFormDataClone);
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
        // let categoryFormClone = {...categoryForm};
        // categoryFormClone.status = status;
        // setCategoryForm(categoryFormClone);

    }


    const onSubmit = () => {
        let categoryFormClone = {...categoryForm};
        let caegoryFormData = new FormData();
        caegoryFormData.append("image", file.file ? file.file : '');
        caegoryFormData.append("content", contentNew);
        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : categoryFormClone.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : categoryFormClone.status;
        let parent_id = localStorage.getItem("selected") ? localStorage.getItem("selected") : categoryFormClone.parent_id;
        caegoryFormData.append("status", status);
        caegoryFormData.append("parent_id", parent_id ? parseInt(parent_id) : '');
        caegoryFormData.append("is_menu", is_menu);
        caegoryFormData.append("name", categoryFormClone.name);
        caegoryFormData.append("slug", categoryFormClone.slug);
        if (slugManage == false) {
            caegoryFormData.append("slug", categoryFormClone.name);
        } else {
        }

        if (categoryForm.slug == "") {
            caegoryFormData.append("slug", categoryFormClone.name);
        }


        metaData.robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : "false";
        caegoryFormData.append("metadata", JSON.stringify(metaData));
        if (categoryFormClone.name && categoryFormClone.name !== '') {
            $("input[name=name]").removeClass("is-invalid");
            swalAccept("افزودن دسته بندی جدید").then(resSwal => {
                if (resSwal.value) {
                    categoryApi.create(caegoryFormData).then(res => {
                        successSwal("با موفقیت اضافه شد !");
                        actionResult(res);
                    })
                }
            })
        } else {
            $("input[name=name]").addClass("is-invalid");
            error("لطفا فیلد نام دسته بندی را پر کنید !")
        }
        console.log(categoryForm);
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
                actionType={"create"}
                categoryData={categoryData}
                categoryDataMange={''} // get item data for update or duplicate
                tagChange={tagChange}
                categoryOnChange={categoryOnChange}
                onChangeInput={handleInputs}
                editorData={editorData}
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
