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
}
