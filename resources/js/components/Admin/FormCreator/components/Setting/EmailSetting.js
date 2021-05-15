import React, {useContext, useState, useEffect} from "react";
import './_shared/style.scss';
import {CheckBoxEmail} from "./MiniInput/email/CheckBoxEmail";
import {InputTextEmail} from "./MiniInput/email/InputTextEmail";
import {FormContextEmail} from "../../Helper/Context";

export const EmailSetting = () => {

    const {initialFormDataEmail, setInitialFormDataEmail} = useContext(FormContextEmail)
    const [data, setData] = useState({})

    useEffect(() => {
        setData(initialFormDataEmail)
    }, [])

    const ChangeValueTitle = val => {
        let dataIn = {...data};
        dataIn.title = val.value;
        setData(dataIn)
        setInitialFormDataEmail(dataIn)
    }
    const ChangeValueDesc = val => {
        let dataIn = {...data};
        dataIn.description = val.value;
        setData(dataIn)
        setInitialFormDataEmail(dataIn)
    }

    const ChangeCheckBox = val => {
        let dataIn = {...data};
        dataIn.Mandatory = val;
        setData(dataIn)
        setInitialFormDataEmail(dataIn)
    }
    return (
        <FormContextEmail.Provider value={{initialFormDataEmail, setInitialFormDataEmail}}>
            <div className={"row"} style={{padding: '0 15px'}}>
                <div className={"col-12"}>
                    <InputTextEmail placeholder={"عنوان"} name={"title"} label={"نوع فیلد : متن کوتاه"}
                                    defaultValue={initialFormDataEmail.title ? initialFormDataEmail.title : ''}
                                    isInvalid={"is-invalid"} value={val => ChangeValueTitle(val)}/>
                </div>
                <div className={"col-12"}>
                    <InputTextEmail
                        placeholder={"توضیح"} name={"description"}
                        defaultValue={initialFormDataEmail.description ? initialFormDataEmail.description : ''}
                        label={"توضیح"} isInvalid={''} value={val => ChangeValueDesc(val)}/>
                </div>
                <div className={"col-12"}>
                    <CheckBoxEmail name={"Mandatory"} defaultState={false} valueActive={"غیر اجباری"}
                                   defaultState={initialFormDataEmail.Mandatory == true ? true : false}
                                   valueDeActive={"اجباری"} status={types => ChangeCheckBox(types)}/>
                </div>

            </div>
        </FormContextEmail.Provider>
    )
}
