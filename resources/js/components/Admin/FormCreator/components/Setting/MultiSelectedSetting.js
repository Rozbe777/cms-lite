import React, {useContext, useState} from "react";
import {InputText} from "./MiniInput/MultiSelected/InputText";
import './_shared/style.scss';
import {CheckBox} from "./MiniInput/MultiSelected/CheckBox";
import {Index} from "./MiniInput/AddItem";
import {FormContextMultiSelected} from "../../Helper/Context";

export const MultiSelectedSetting = ({defaultData, data: pushDataNew}) => {
    const {initialFormDataMultiSel, setInitialFormDataMultiSel} = useContext(FormContextMultiSelected);
    let defaultOld = initialFormDataMultiSel ? initialFormDataMultiSel : {
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
        setInitialFormDataMultiSel(
                 DataAllNew
        )
    }
    const HandleChangeDesc = (target) => {
        let DataAllNew = {...dataAll};
        DataAllNew.description = target.value;
        setDataAll(DataAllNew);
        setInitialFormDataMultiSel(DataAllNew)
    }

    const HandleStatus = (item) => {
        let DataAllNew = {...dataAll};
        DataAllNew.Mandatory = item;
        setDataAll(DataAllNew);
        setInitialFormDataMultiSel( DataAllNew )
    }
    const HandleOptionData = (item) => {
        let DataAllNew = {...dataAll};
        DataAllNew.Options = item.Options;
        setDataAll(DataAllNew);
        setInitialFormDataMultiSel( DataAllNew)
    }

    return (
        <div className={"row"} style={{padding: '0 15px'}}>
            <div className={"col-12"}>
                <InputText placeholder={"عنوان"}  name={"title"} defaultValue={initialFormDataMultiSel.title ? initialFormDataMultiSel.title : ''} label={"نوع فیلد : متن کوتاه"} isInvalid={"is-invalid"}
                           value={(item) => HandleChangeTitle(item)}/>
            </div>
            <div className={"col-12"}>
                <InputText placeholder={"توضیح"} name={"desc"} defaultValue={initialFormDataMultiSel.description ? initialFormDataMultiSel.description : ''} label={"توضیح"} isInvalid={''}
                           value={(item) => HandleChangeDesc(item)}/>
            </div>
            <div className={"col-12"}>
                <CheckBox name={"Mandatory"} defaultState={initialFormDataMultiSel.Mandatory} valueActive={"غیر اجباری"} valueDeActive={" اجباری"}
                          status={item => HandleStatus(item)}/>
            </div>
            <div className={"col-12"} style={{marginTop: 10}}>
                <Index dataUpdate={item => HandleOptionData(item)}/>
            </div>
        </div>
    )
}
