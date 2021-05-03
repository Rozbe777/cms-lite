import React, {useState} from "react";
import {InputText} from "./MiniInput/InputText";
import './_shared/style.scss';
import {CheckBox} from "./MiniInput/CheckBox";
import {OneSelected} from "../OneSelected";
import {Index} from "./MiniInput/AddItem";
import {ONE_OPTION_DATA} from "../Constant";

export const OneSelectedSetting = ({defaultData , data : pushDataNew}) => {
    console.log("old date nnnnnn : " , defaultData)
    let defaultOld = defaultData[0] ? defaultData[0] : {
        Options : []
    } ;
    let OptionData = [];
    const [dataAll , setDataAll] = useState(defaultOld);

    const HandleChange = (target) => {
        setDataAll({
            ...dataAll,
            [target.name] : target.value
        })
    }

    const HandleStatus = (item) => {
        event.preventDefault();
        let DataAllNew = {...dataAll};
        DataAllNew.Mandatory = item;
        setDataAll(DataAllNew);
        let sendData = JSON.stringify(DataAllNew);
        pushDataNew(sendData);
    }
    const HandleOptionData = (item) => {
        event.preventDefault();
        let DataAllNew = {...dataAll};
        DataAllNew.Options = item.Options;
        let dataPushss = JSON.stringify(DataAllNew);
        console.log("dataaaa 111111" , dataPushss)
        pushDataNew(dataPushss);
        setDataAll(DataAllNew);
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
                <Index dataOld={defaultOld} dataUpdate={item => HandleOptionData(item)} />
            </div>
        </div>
    )
}
