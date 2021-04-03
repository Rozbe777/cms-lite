import React , { memo , useEffect} from 'react';
import ReactDOM from 'react-dom';
import {request as Request } from "../../services/Request";
import $ from 'jquery';
const UserList = memo((props)=> {
    let token = $('meta[name=author]').attr('content');
    useEffect(()=>{
        Request.get("/admin/user/export")
            .then(res => {
                console.log("hi dataaaaa : " , res);
            })
    })
    return (
        <div>
            hi div vdfvdfv
        </div>

    )
})

export default UserList;

let elementId = 'show-user-list-by-admin';
let element = document.getElementById(elementId);
if (element) {
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<UserList {...props}/>, element);
}
