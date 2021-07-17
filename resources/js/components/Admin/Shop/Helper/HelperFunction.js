import $ from "jquery";
import ReactDOM from "react-dom";

export default class HelperFunction {
    contentFormData(string){
        if (string !== " ") {
            let slugArray = string.split(" ");
            let _newSlug = slugArray.join("-");
            return _newSlug;
        }else{
            return "";
        }
    }
    handleClose() {
        $("span.checkboxeds").removeClass("active");
        ReactDOM.render('', document.getElementById("add-datas"));
        this.HandleRemoveLocal()
    }

    HandleRemoveLocal() {
        localStorage.removeItem("status");
        localStorage.removeItem("selected");
        localStorage.removeItem("robots");
    }



}
