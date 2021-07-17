export default class ComponentHandler{
    HandlerBigSwitcher(states , setEdit){
        setEdit(true)
        localStorage.setItem("robots", states)
    }
    handleSwitchStatus(event, statuses , setEdit){
        event.preventDefault();
        setEdit(true)
        localStorage.setItem("status", statuses ? "active" : "deactivate");
    }
    handleSwitchMenu(event, status , setEdit){
        event.preventDefault();
        setEdit(true)
        localStorage.setItem("is_menu", status ? 1 : 0);
    }
    handleSwitchIsIndex(event, status , setEdit){
        event.preventDefault();
        setEdit(true)
        localStorage.setItem("is_index", status ? 1 : 0);
    }
}