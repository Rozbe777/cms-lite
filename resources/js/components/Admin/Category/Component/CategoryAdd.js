import React, {useState} from "react";
import {Footer} from "./Footer";
import HelperFunction from './../Helper/HelperFunction';
import ComponentHandler from "../Helper/ComponentHandler";
import Create from "../Api/CategoryApi";
import $ from "jquery";
import {error, successSwal, swalAccept} from "../../../../helper";
import {CategoryFormParent} from "./CategoryFormParent";

const CategoryAdd = ({actionResult, idParent , categoryData}) => {

    let helperFunction = new HelperFunction();
    let componentHandler = new ComponentHandler();

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
                categoryFormClone.title = e.target.value;
                categoryFormClone.slug = e.target.value;
                setCategoryForm(categoryFormClone);
            } else {
                let categoryFormClone = {...categoryForm};
                categoryFormClone.title = e.target.value;
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
        console.log(tagList);
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
        setEdit(status)
    }


    const onSubmit = () => {
        console.log(categoryForm);
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
                handleMetaData={handleMetaData}
            />
            <div className={"col-12 bottom-footer"}>
                <Footer actionType={'save'} editStatus={edit} onClicked={onSubmit} onCancel={onCancel}/>
            </div>
        </div>
    )


}
export default CategoryAdd;
