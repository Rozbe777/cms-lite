import {Request} from "./Api";

 export const GetAllUser = () => {
        Request.GetAllUser()
            .then(res => {
                return res;
            })
    }

