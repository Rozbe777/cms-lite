import $ from "jquery";
import {error} from "../../../../helper";
import {CreateAddCategory, HandleFormAdd, HandleUpdateForm} from './Action'
import ReactDOM from "react-dom";

export default class FormHandler {

    HandleForm(CatData , contentNew ,slugManage ,metaData , checkResult,file){
        let formNew = {...CatData};
        let formFiledss = new FormData();
        formFiledss.append("image", file.file ? file.file : '');
        formFiledss.append("content", contentNew);
        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : formNew.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formNew.status;
        let parent_id = localStorage.getItem("selected") ? localStorage.getItem("selected") : formNew.parent_id;
        formFiledss.append("status", status);
        formFiledss.append("parent_id", parent_id ? parseInt(parent_id) : '');
        formFiledss.append("is_menu", is_menu);
        formFiledss.append("name", formNew.name);
        formFiledss.append("slug", formNew.slug);
        if (slugManage == false) {
            formFiledss.append("slug", formNew.name);
        } else {
        }

        if (CatData.slug == "") {
            formFiledss.append("slug", formNew.name);
        }


        metaData.robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : "false";
        formFiledss.append("metadata", JSON.stringify(metaData));
        if (CatData.name && CatData.name !== '') {
            $("input[name=name]").removeClass("is-invalid");
            CreateAddCategory(formFiledss , checkResult);
        } else {
            $("input[name=name]").addClass("is-invalid");
            error("لطفا فیلد نام دسته بندی را پر کنید !")
        }
    }



    handleClose() {
        $("span.checkboxeds").removeClass("active");
        ReactDOM.render('', document.getElementById("add-datas"));
        this.HandleRemoveLocal()
    }

    HandleRemoveLocal() {
        localStorage.removeItem("is_menu");
        localStorage.removeItem("status");
        localStorage.removeItem("selected");
        localStorage.removeItem("comment_status");
        localStorage.removeItem("robots");
    }


}
