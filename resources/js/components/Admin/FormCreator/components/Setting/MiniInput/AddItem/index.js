import React, {useContext, useState} from "react";
import {List} from "./List";
import $ from 'jquery';
import './_shared/style.scss';
import {ONE_OPTION_DATA} from "../../../Constant";
import {FormContext} from "../../../../Helper/Context";

export const Index = ({dataUpdate : pushData}) => {

    const {initialFormData , setInitialFormData} = useContext(FormContext)

    console.log("!!!!!!!!!!!" , initialFormData);
    let defaultData = initialFormData.input_3 ? initialFormData.input_3 : {
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
        console.log("^^^^^" , data)

        $("input[name=options]").val('');
        if (initial !== '') {
            let dataaa = [...data.Options];


            let filter = data.Options.filter(item => item == initial);
            if (filter.length == 0) {
                dataaa.push(initial);
                console.log("^^^^^" , dataaa)
                setData(
                    {
                        ...data,
                        Options : dataaa
                    }
                );
                pushData(
                    {
                        ...data,
                        Options : dataaa
                    }
                );
            }
        }
        setInitial('')
    }

    const HandleDelete = (name) => {
        var array = data.Options.filter(item => item !== name);
        setData(
            {
                ...data,
                Options : array
            }
        );
        pushData(
            {
                ...data ,
                Options : array
            }
        );
    }
    const HandleUpdate = (item) => {
        var array = [...data.Options];
        array[item.index] = item.data;
        setData(
            {
                ...data,
                Options : array
            }
        );
        pushData(
            {
                ...data ,
                Options : array
            }
        );

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
