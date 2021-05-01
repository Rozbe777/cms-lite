import React from 'react';
import './_shared/style.scss'

export const Item = ({dataItem, index}) => {
    let titleName =  parseInt(index+1) + " - " +dataItem.name ;
    return (
        <div className={"item_add_item"}>
            <span id={"title_add_item"}>{titleName}</span>

            <div id={"edit_add_item"}>
                <span id={"icon_box"}>
                    <i className={"bx bx-x"}></i>
                </span>
            </div>
        </div>
    )
}
