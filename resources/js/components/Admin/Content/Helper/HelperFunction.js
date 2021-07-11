export default class HelperFunction {
    contentFormData(string){
        let slugArray = string.split(" ");
        let _newSlug = slugArray.join("-");
        return _newSlug;
    }
}
