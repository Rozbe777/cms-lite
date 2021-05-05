import React, {useContext, useState} from "react";
import {InputText} from "./MiniInput/InputText";
import './_shared/style.scss';
import {CheckBox} from "./MiniInput/CheckBox";
import {OneSelected} from "../OneSelected";
import {Index} from "./MiniInput/AddItem";
import {ONE_OPTION_DATA} from "../Constant";
import {FormContext} from "../../Helper/Context";

export const OneSelectedSetting = ({defaultData, data: pushDataNew}) => {
    const {initialFormData, setInitialFormData} = useContext(FormContext);
    let defaultOld = initialFormData.input_3 ? initialFormData.input_3 : {
        title : '',
        description : '',
        Mandatory : true,
        Options: []
    };

    const [dataAll, setDataAll] = useState(defaultOld);

    const HandleChangeTitle = (target) => {
        let DataAllNew = {...dataAll};
        DataAllNew.title = target.value;
        setDataAll(DataAllNew);
        setInitialFormData(
            {
                ...initialFormData,
                input_3 : DataAllNew
            }
        )
    }
    const HandleChangeDesc = (target) => {
        let DataAllNew = {...dataAll};
        DataAllNew.description = target.value;
        setDataAll(DataAllNew);
        setInitialFormData(
            {
                ...initialFormData,
                input_3 : DataAllNew
            }
        )
    }

    const HandleStatus = (item) => {
        let DataAllNew = {...dataAll};
        DataAllNew.Mandatory = item;
        setDataAll(DataAllNew);
        setInitialFormData(
            {
                ...initialFormData,
                input_3 : DataAllNew
            }
        )
    }
    const HandleOptionData = (item) => {
        let DataAllNew = {...dataAll};
        DataAllNew.Options = item.Options;
        setDataAll(DataAllNew);
        setInitialFormData({
            ...initialFormData,
            input_3: DataAllNew
        })
    }

    return (
        <div className={"row"} style={{padding: '0 15px'}}>
            <div className={"col-12"}>
                <InputText placeholder={"عنوان"}  name={"title"} defaultValue={initialFormData.input_3.title ? initialFormData.input_3.title : ''} label={"نوع فیلد : متن کوتاه"} isInvalid={"is-invalid"}
                           value={(item) => HandleChangeTitle(item)}/>
            </div>
            <div className={"col-12"}>
                <InputText placeholder={"توضیح"} name={"desc"} defaultValue={initialFormData.input_3.description ? initialFormData.input_3.description : ''} label={"توضیح"} isInvalid={''}
                           value={(item) => HandleChangeDesc(item)}/>
            </div>
            <div className={"col-12"}>
                <CheckBox name={"Mandatory"} defaultState={initialFormData.input_3.Mandatory} valueActive={"غیر اجباری"} valueDeActive={" اجباری"}
                          status={item => HandleStatus(item)}/>
            </div>
            <div className={"col-12"} style={{marginTop: 10}}>
                <Index dataUpdate={item => HandleOptionData(item)}/>
            </div>
        </div>
    )
}
