import React, {useState} from "react";
import {List} from "./List";
import $ from 'jquery';
import './_shared/style.scss';

export const Index = ({data : pushData}) => {
    const [initial, setInitial] = useState({});
    const [data, setData] = useState([])

    const HandleChange = (e) => {
        e.preventDefault();
        setInitial(e.target.value)
    }
    const HandleAddOption = (e) => {
        e.preventDefault();
        $("input[name=options]").val('');

        if (initial !== '') {
            let dataaa = [...data];
            let filter = data.filter(item => item == initial);
            if (filter.length == 0) {
                dataaa.push(initial);
                setData(dataaa);
                pushData(dataaa);
            }
        }

        setInitial('')
    }

    const HandleDelete = (name) => {
        var array = data.filter(item => item !== name);
        setData(array);
        pushData(array);

    }
    const HandleUpdate = (item) => {
        var array = [...data];
        array[item.index] = item.data;
        setData(array);
        console.log("0000000000000" , array)
        pushData(array);
        // console.log("data upppp : " , item);
        // console.log("datataaaaa //////" , item)
    }
    return (
        <>
            <p>گزینه ها</p>
            <List data={data} deleteItem={item => HandleDelete(item)} update={item=> HandleUpdate(item)}/>
            <div className={"add-option-for-sel"}>
                <input type={"text"} name={"options"} placeholder={"گزینه جدید"} onChange={e => HandleChange(e)} />
                <button className={"btn btn-primary mr-1 mb-1"} onClick={e => HandleAddOption(e)}>افزودن</button>
            </div>
        </>
    )
}
