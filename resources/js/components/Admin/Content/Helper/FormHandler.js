import $ from "jquery";
import {error} from "../../../../helper";
import {HandleFormAdd , HandleUpdateForm} from './Action'
import ReactDOM from "react-dom";

export default class FormHandler {

    constructor() {
    }
    HandleForm(e, formData, file, contentNew, metaData, idSelCat, chipsetChange, chipset, slugManage, checkResult) {
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
            HandleFormAdd(formDataAll, checkResult);
        } else {
            $("input[name=titleContent]").addClass("is-invalid");
            error("لطفا فیلد عنوان صفحه را پر کنید !")
        }
    }

    HandleDuplicate(e, formData, slugManage, file, imageGet, metaData, dataUpdateParse, contentNew, idSelCat, chipset, checkResult) {
        e.preventDefault();
        let formOldData = {...formData};
        let formsData = new FormData();
        let titleWrite = $("input[name=titleContent]").val();
        let title = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        formsData.append("title", title);
        formsData.append("slug", slug);

        if (file.file) {
            if (imageGet.state == "") {
                formsData.append("image", file.file);
            } else {
                formsData.append("image", true);
            }
        } else {
            if (imageGet.state == '') {
                formsData.append("image", '');
            } else {
                formsData.append("image", true);
            }
        }

        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : formData.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formData.status;
        let comment_status = localStorage.getItem("comment_status") ? localStorage.getItem("comment_status") : formData.comment_status;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        let metaDatas = {...metaData};
        metaDatas.robots = robots;
        let metadatas = JSON.stringify(metaDatas);
        let contents = contentNew == "" ? dataUpdateParse.content : contentNew;
        formsData.append("metadata", metadatas)
        formsData.append("tag_list", JSON.stringify(chipset))
        formsData.append("id", formOldData.id);
        formsData.append("status", status)
        formsData.append("category_list", JSON.stringify(idSelCat))
        formsData.append("content", contents)
        formsData.append("is_menu", parseInt(is_menu))
        formsData.append("comment_status", comment_status)
        HandleFormAdd(formsData, checkResult);
    }


    HandleEdit(e, formData, file, imageGet, metaData, contentNew, dataUpdateParse, chipset, token, setChipChange, ids, idSelCat, slugManage , checkResult) {
        e.preventDefault();
        let formOldData = {...formData};
        let titleWrite = $("input[name=titleContent]").val();
        let formdts = new FormData();
        if (file.file) {
            if (imageGet.state == "") {
                formdts.append("image", file.file);
            } else {
                formdts.append("image", true);
            }
        } else {
            if (imageGet.state == '') {
                formdts.append("image", '');
            } else {
                formdts.append("image", true);
            }
        }

        let title = titleWrite;
        let slug = slugManage ? titleWrite : $("input.slugest").val();
        formdts.append("title", title)
        formdts.append("slug", slug)

        let is_menu = localStorage.getItem("is_menu") ? localStorage.getItem("is_menu") : formData.is_menu;
        let status = localStorage.getItem("status") ? localStorage.getItem("status") : formData.status;
        let comment_status = localStorage.getItem("comment_status") ? localStorage.getItem("comment_status") : formData.comment_status;
        let robots = localStorage.getItem("robots") ? localStorage.getItem("robots") : metaData.robots;
        let metaDatas = {...metaData};
        formdts.append("_token", token);
        formdts.append("id", formOldData.id);

        metaDatas.robots = robots;
        let metadatas = JSON.stringify(metaDatas);
        formdts.append("metadata", metadatas)
        let contents = contentNew == "" ? dataUpdateParse.content : contentNew;
        formdts.append("content", contents)

        formdts.append("status", status)

        formdts.append("is_menu", parseInt(is_menu))
        formdts.append("comment_status", comment_status)
        formdts.append("category_list", JSON.stringify(idSelCat))
        let tagLL = setChipChange ? chipset : [];

        formdts.append("tag_list", JSON.stringify(tagLL))

        HandleUpdateForm(formdts, ids,checkResult);
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
