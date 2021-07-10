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



    HandleDuplicate(e , CatData,contentNew,slugManage ,metaData , file , imageGet , checkResult ){
        e.preventDefault();
        let formOldData = {...CatData};
        let titleWrite = $("input[name=name]").val();
        let formsNews = new FormData();
        formsNews.append("content", contentNew)
        let name = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        formsNews.append("name", name)
        formsNews.append("slug", slug)

        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : CatData.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : CatData.status;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        let parent_id = localStorage.getItem("selected") ? localStorage.getItem("selected") : CatData.parent_id;

        formsNews.append("is_menu", parseInt(is_menu))
        formsNews.append("status", status)
        formsNews.append("id", formOldData.id)
        formsNews.append("parent_id", parseInt(parent_id))
        formsNews.append("image", file.file ? file.file : '')

        if (file.file) {
            if (imageGet.state == "") {
                formsNews.append("image", file.file);
            } else {
                formsNews.append("image", true);
            }
        } else {
            if (imageGet.state == '') {
                formsNews.append("image", '');
            } else {
                formsNews.append("image", true);
            }
        }
        let metaDatas = {...metaData};
        metaDatas.robots = robots;

        formsNews.append("status", status)
        formsNews.append("metadata", JSON.stringify(metaDatas))

        CreateAddCategory(formsNews,checkResult);
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
