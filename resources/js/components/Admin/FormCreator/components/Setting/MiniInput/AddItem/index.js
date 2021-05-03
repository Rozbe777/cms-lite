import React, {useState} from "react";
import {List} from "./List";
import $ from 'jquery';
import './_shared/style.scss';
import {ONE_OPTION_DATA} from "../../../Constant";

export const Index = ({dataOld, dataUpdate : pushData}) => {

    console.log("mmmmmmm : " , dataOld);
    let defaultData = dataOld.Options ? dataOld : {
        Options : []
    };
    const [initial, setInitial] = useState({});
    const [data, setData] = useState(defaultData)

    const HandleChange = (e) => {
        e.preventDefault();
        setInitial(e.target.value)
    }
    const HandleAddOption = (e) => {
        e.preventDefault();
        $("input[name=options]").val('');
        if (initial !== '') {
            let dataaa = [...data.Options];
            let filter = data.Options.filter(item => item == initial);
            if (filter.length == 0) {
                dataaa.push(initial);
                setData({
                    ...data,
                    Options : dataaa
                });
                pushData({
                    ...data,
                    Options : dataaa
                });
            }
        }
        setInitial('')
    }

    const HandleDelete = (name) => {
        console.log("dataaaa : " , data)
        var array = data.Options.filter(item => item !== name);
        setData({
            ...data,
            Options : array
        });
        pushData({
            ...data ,
            Options : array
        });
    }
    const HandleUpdate = (item) => {
        console.log("data default******** : " , data)
        console.log("data default********//// : " , item)
        var array = [...data.Options];
        array[item.index] = item.data;
        setData({
            ...data,
            Options : array
        });
        // console.log("0000000000000" , array)
        // let arrayUpdate = JSON.stringify(array);
        pushData({
            ...data ,
            Options : array
        });

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
