import React, {useState} from "react";
import {InputText} from "./MiniInput/InputText";
import './_shared/style.scss';
import {CheckBox} from "./MiniInput/CheckBox";
import {OneSelected} from "../OneSelected";
import {Index} from "./MiniInput/AddItem";
import {ONE_OPTION_DATA} from "../Constant";

export const OneSelectedSetting = ({data : pushData}) => {
    let OptionData = [];
    // var dataLocalOld = localStorage.getItem(ONE_OPTION_DATA) ? localStorage.getItem(ONE_OPTION_DATA) : '';
    const [dataAll , setDataAll] = useState({});
    // dataLocalOld ? setDataAll(dataLocalOld) : '';
    const HandleChange = (target) => {
        setDataAll({
            ...dataAll,
            [target.name] : target.value
        })
    }



    const HandleStatus = (item) => {
        let DataAllNew = {...dataAll};
        DataAllNew.Mandatory = item;
        setDataAll(DataAllNew);
        pushData(dataAll);
    }
    const HandleOptionData = (item) => {
        let DataAllNew = {...dataAll};
        DataAllNew.Options = item;
        setDataAll(DataAllNew);
        // console.log("oneSelOpSetting : " , DataAllNew)
        pushData(DataAllNew);
    }

    return (
        <div className={"row"} style={{padding: '0 15px'}}>
            <div className={"col-12"}>
                <InputText placeholder={"عنوان"} name={"title"} label={"نوع فیلد : متن کوتاه"} isInvalid={"is-invalid"} value={item => HandleChange(item)}/>
            </div>
            <div className={"col-12"}>
                <InputText placeholder={"توضیح"} name={"desc"} label={"توضیح"} isInvalid={''} value={item => HandleChange(item)}/>
            </div>
            <div className={"col-12"}>
                <CheckBox name={"Mandatory"} defaultState={false} valueActive={"غیر اجباری"} valueDeActive={" اجباری"} status={item => HandleStatus(item)}  />
            </div>
            <div className={"col-12"} style={{marginTop : 10}}>
                <Index data={item => HandleOptionData(item)} />
            </div>


        </div>
    )
}
