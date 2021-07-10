import React, {Component} from "react";
import ReactDom from "react-dom";
import {TotalActions} from "../../UserList/HOC/TotalActions";
import {BreadCrumbs} from "../../UserList/HOC/BreadCrumbs";
import {TreeShowCategory} from "../../_Micro/TreeShow/TreeShowCategory";
import NotFound from "../../_Micro/NotFound";
import Loading from "../../_Micro/Loading";
import CategoryItem from "./CategoryItem";
import Webservice from "../../../../classes/webservice";
import {API_V1} from "../../../../system";

export const MAX_LEVEL = 3;
export default class Category extends Component {

    _apiGetCategories = async () => {
        let ws = new Webservice();
        ws.url = "";
        ws.token = `${API_V1}`;
        ws.call();
    }

    render() {
        return (
            <div>
                <ul className={"content-li"}>
                    <CategoryItem/>
                    <CategoryItem/>
                    <CategoryItem/>
                    <CategoryItem/>
                    <CategoryItem/>
                    <CategoryItem/>
                </ul>
            </div>
        )
    }


}


let elements = document.getElementById("category_box");
if (elements) {
    const props = Object.assign({}, elements.dataset)
    ReactDom.render(<Category {...props} />, elements);
}

