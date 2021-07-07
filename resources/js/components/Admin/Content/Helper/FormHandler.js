import $ from "jquery";
import {error} from "../../../../helper";
import {HandleFormAdd} from './Action'
import ReactDOM from "react-dom";
export default class FormHandler{

    HandleForm(e , formData , file , contentNew , metaData,idSelCat , chipsetChange , chipset,slugManage , checkResult){
        let formNew = {...formData};
        let titleWrite = $("input[name=titleContent]").val();
        let formDataAll = new FormData();
        formDataAll.append("image", file.file ? file.file : '')
        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : formNew.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formNew.status;
        let comment_status = localStorage.getItem("comment_status") ? localStorage.getItem("comment_status") : formNew.comment_status;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        formDataAll.append("status", status)
        formDataAll.append("comment_status", comment_status)
        formDataAll.append("is_menu", is_menu)
        let title = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        formDataAll.append("title", title)
        formDataAll.append("slug", slug)
        if (slugManage == false) {
            formDataAll.append("slug", title)
        } else {
        }
        if (formData.slug == "") {
            formDataAll.append("slug", title)
        }
        let vcontent = contentNew;
        formDataAll.append("content", vcontent)
        let MetaDaa = {...metaData};
        MetaDaa.robots = robots;
        let vmetadata = JSON.stringify(MetaDaa);
        formDataAll.append("metadata", vmetadata)
        formDataAll.append("category_list", JSON.stringify(idSelCat))
        let vtag_list = chipsetChange ? chipset : [];
        formDataAll.append("tag_list", JSON.stringify(vtag_list))
        if (formData.title && formData.title !== '') {
            $("input[name=titleContent]").removeClass("is-invalid");
            HandleFormAdd(formDataAll ,checkResult);
        } else {
            $("input[name=titleContent]").addClass("is-invalid");
            error("لطفا فیلد عنوان صفحه را پر کنید !")
        }
    }

    handleClose(e){
        e.preventDefault()
        $("span.checkboxeds").removeClass("active");
        ReactDOM.render('', document.getElementById("add-datas"));
        this.HandleRemoveLocal()
    }

    HandleRemoveLocal(){
        localStorage.removeItem("is_menu");
        localStorage.removeItem("status");
        localStorage.removeItem("selected");
        localStorage.removeItem("comment_status");
        localStorage.removeItem("robots");
    }


}
