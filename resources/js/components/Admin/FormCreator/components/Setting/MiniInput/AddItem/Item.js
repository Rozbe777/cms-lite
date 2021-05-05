import React, {useState} from 'react';
import './_shared/style.scss'
import {ONE_OPTION_DATA} from "../../../Constant";

export const Item = ({dataItem, index, delete: pushDel, update: pushUp}) => {
    console.log("data==============" , dataItem)
    const [states, setStates] = useState(false);
    // let initialData = localStorage.getItem(ONE_OPTION_DATA) ? JSON.parse(localStorage.getItem(ONE_OPTION_DATA)).Options : dataItem;
    const [data, setData] = useState(dataItem);
    const HandleDel = e => {
        e.preventDefault();
        pushDel(dataItem);
    }
    const HandleEdit = e => {
        e.preventDefault();
        setStates(true)
    }
    const HandleChange = (e) => {
        e.preventDefault();
        setData(e.target.value);
    }
    const HandleSave = e => {
        e.preventDefault();
        pushUp({data , index});
        setStates(false)
    }
    return (
        <div className={"item_add_item"}>
            <span id={"counter"}>{index + 1} - </span>
            {states ? (
                <input type={"text"} defaultValue={dataItem} onChange={e => HandleChange(e)}/>
            ) : (
                <span id={"title_add_item"} onClick={e => HandleEdit(e)}>{dataItem}</span>
            )}

            <div id={"edit_add_item"}>
                <span id={"icon_box"} onClick={e => HandleDel(e)}>
                    <i className={"bx bx-x"}></i>
                </span>
                {states ? (
                    <span id={"icon_box"} onClick={e => HandleSave(e)}>
                    <i className={"bx bx-save"}></i>
                </span>
                ) : (
                    <span id={"icon_box"} onClick={e => HandleEdit(e)}>
                    <i className={"bx bx-pencil"}></i>
                </span>
                )}
            </div>
        </div>
    )
}
