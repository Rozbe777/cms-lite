export default class ComponentHandler{
    handleSwitchShowState(event, status , setEdit){
        event.preventDefault();
        setEdit(true)
        localStorage.setItem("status", status ? "active" : "deactivate");
    }
}
