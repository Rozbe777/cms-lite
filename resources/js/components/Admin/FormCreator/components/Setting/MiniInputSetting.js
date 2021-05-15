import React, {useContext, useState , useEffect} from "react";
import './_shared/style.scss';
import {CheckBox} from "./MiniInput/oneSelected/CheckBox";
import {FormContextMini} from "../../Helper/Context";
import {InputTextMiniInput} from "./MiniInput/MiniInput/InputTextMiniInput";
import {CheckBoxMiniInput} from "./MiniInput/MiniInput/CheckBoxMiniInput";

export const MiniInputSetting = () => {
    const {initialFormDataMiniText, setInitialFormDataMiniText} = useContext(FormContextMini);


    const [data, setData] = useState({})

    useEffect(()=>{
        setData(initialFormDataMiniText);

    }, [])


    const ChangeValueTitle = val => {
        let dataIn = {...data};
        dataIn.title = val.value;
        setData(dataIn)
        setInitialFormDataMiniText(dataIn)
    }
    const ChangeValueDesc = val => {
        let dataIn = {...data};
        dataIn.description = val.value;
        setData(dataIn)
        setInitialFormDataMiniText(dataIn)
    }
    const ChangeValueMaximum = val => {
        let dataIn = {...data};
        dataIn.maximum = val.value;
        setData(dataIn)
        setInitialFormDataMiniText(dataIn)
    }

    const ChangeCheckBox = val => {
        let dataIn = {...data};
        dataIn.Mandatory = val;
        setData(dataIn)
        setInitialFormDataMiniText(dataIn)
    }
    return (
        <FormContextMini.Provider value={{initialFormDataMiniText, setInitialFormDataMiniText}}>
            <div className={"row"} style={{padding: '0 15px'}}>
                <div className={"col-12"}>
                    <InputTextMiniInput placeholder={"عنوان"} name={"title"} label={"نوع فیلد : متن کوتاه"}
                                        defaultValue={initialFormDataMiniText.title ? initialFormDataMiniText.title : ''}
                                        isInvalid={"is-invalid"} value={val => ChangeValueTitle(val)}/>
                </div>
                <div className={"col-12"}>
                    <InputTextMiniInput placeholder={"توضیح"} name={"description"} label={"توضیح"} isInvalid={''}
                                        defaultValue={initialFormDataMiniText.description ? initialFormDataMiniText.description : ''}
                                        value={val => ChangeValueDesc(val)}/>
                </div>
                <div className={"col-12"}>
                    <CheckBoxMiniInput name={"Mandatory"} defaultState={false} valueActive={"غیر اجباری"}
                                       defaultState={initialFormDataMiniText.Mandatory == true ? true : false}
                                       valueDeActive={"اجباری"} status={types => ChangeCheckBox(types)}/>
                </div>

                <div className={"col-12"} style={{marginTop: 10}}>
                    <InputTextMiniInput placeholder={"حداکثر تعداد حروف"} name={"maximum"}
                                        value={val => ChangeValueMaximum(val)}
                                        defaultValue={initialFormDataMiniText.maximum ? initialFormDataMiniText.maximum : 0}
                                        label={"حداکثر تعداد حروف"} isInvalid={''}/>
                </div>

            </div>
        </FormContextMini.Provider>


    )
}
