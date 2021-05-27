import React, {useContext, useState} from "react";
import {InputText} from "./MiniInput/oneSelected/InputText";
import './_shared/style.scss';
import {CheckBox} from "./MiniInput/oneSelected/CheckBox";
import {OneSelected} from "../OneSelected";
import {Index} from "./MiniInput/AddItem";
import {ONE_OPTION_DATA} from "../Constant";
import {FormContext} from "../../Helper/Context";

export const OneSelectedSetting = ({defaultData, data: pushDataNew}) => {
    const {initialFormData, setInitialFormData} = useContext(FormContext);
    let defaultOld = initialFormData ? initialFormData : {
        title : '',
        description : '',
        Mandatory : false,
        Options: []
    };

    const [dataAll, setDataAll] = useState(defaultOld);

    const HandleChangeTitle = (target) => {
        let DataAllNew = {...dataAll};
        DataAllNew.title = target.value;
        setDataAll(DataAllNew);
        setInitialFormData(
                 DataAllNew
        )
    }
    const HandleChangeDesc = (target) => {
        let DataAllNew = {...dataAll};
        DataAllNew.description = target.value;
        setDataAll(DataAllNew);
        setInitialFormData(DataAllNew)
    }

    const HandleStatus = (item) => {
        let DataAllNew = {...dataAll};
        DataAllNew.Mandatory = item;
        setDataAll(DataAllNew);
        setInitialFormData( DataAllNew )
    }
    const HandleOptionData = (item) => {
        let DataAllNew = {...dataAll};
        DataAllNew.Options = item.Options;
        setDataAll(DataAllNew);
        setInitialFormData( DataAllNew)
    }

    return (
        <div className={"row"} style={{padding: '0 15px'}}>
            <p style={{padding : '0px 17px' , margin : 0 , color : 'grey' , fontWeight : 300 , fontSize : 13}}>نوع فیلد : تک انتخابی</p>

            <div className={"col-12"}>
                <InputText placeholder={"عنوان"}  name={"title"} defaultValue={initialFormData.title ? initialFormData.title : ''} label={"عنوان"} isInvalid={"is-invalid"}
                           value={(item) => HandleChangeTitle(item)}/>
            </div>
            <div className={"col-12"}>
                <InputText placeholder={"توضیح"} name={"desc"} defaultValue={initialFormData.description ? initialFormData.description : ''} label={"توضیح"} isInvalid={''}
                           value={(item) => HandleChangeDesc(item)}/>
            </div>
            <div className={"col-12"}>
                <CheckBox name={"Mandatory"} defaultState={initialFormData.Mandatory} valueActive={"غیر اجباری"} valueDeActive={" اجباری"}
                          status={item => HandleStatus(item)}/>
            </div>
            <div className={"col-12"} style={{marginTop: 10}}>
                <Index dataUpdate={item => HandleOptionData(item)}/>
            </div>
        </div>
    )
}
