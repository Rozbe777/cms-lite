import React, {useContext, useState, useEffect} from "react";
import './_shared/style.scss';
import {CheckBoxEmail} from "./MiniInput/email/CheckBoxEmail";
import {InputTextEmail} from "./MiniInput/email/InputTextEmail";
import {FormContextEmail} from "../../Helper/Context";

export const EmailSetting = (props) => {

    const {taskName} = props;
    const {initialFormDataEmail, setInitialFormDataEmail} = useContext(FormContextEmail);
    const [data, setData] = useState(initialFormDataEmail[taskName])

    // console.log("<<<<<<", initialFormDataEmail, "\n props : ", taskName)

    useEffect(() => {
        // setData(initialFormDataEmail[taskName])
        initialFormDataEmail[taskName] = data;
        setInitialFormDataEmail(initialFormDataEmail)
    }, [data])

    const ChangeValueTitle = val => {
        let dataIn = {...data};
        dataIn.title = val.value;
        setData(dataIn);
        // initialFormDataEmail[taskName] = dataIn;
        // setInitialFormDataEmail(initialFormDataEmail)
    }
    const ChangeValueDesc = val => {
        let dataIn = {...data};
        dataIn.description = val.value;
        setData(dataIn)
        // initialFormDataEmail[taskName] = dataIn;
        // setInitialFormDataEmail(initialFormDataEmail)
    }
    const ChangeCheckBox = val => {
        let dataIn = {...data};
        dataIn.Mandatory = val;
        setData(dataIn)
        // initialFormDataEmail[taskName] = dataIn;
        // setInitialFormDataEmail(initialFormDataEmail)
    }





    return (
        <FormContextEmail.Provider value={{initialFormDataEmail, setInitialFormDataEmail}}>
            <div className={"row"} style={{padding: '0 15px'}}>
                <p style={{padding: '0px 17px', margin: 0, color: 'grey', fontWeight: 300, fontSize: 13}}>نوع فیلد :
                    ایمیل</p>

                {console.log("iniiiii : ", initialFormDataEmail)}
                <div className={"col-12"}>
                    <InputTextEmail placeholder={"عنوان"} name={"title"} label={"عنوان"}
                                    taskName={taskName}
                                    defaultValue={initialFormDataEmail[taskName].title ? initialFormDataEmail[taskName].title : ''}
                                    isInvalid={"is-invalid"} value={val => ChangeValueTitle(val)}/>
                </div>
                <div className={"col-12"}>
                    <InputTextEmail
                        taskName={taskName}
                        placeholder={"توضیح"} name={"description"}
                        defaultValue={initialFormDataEmail[taskName].description ? initialFormDataEmail[taskName].description : ''}
                        label={"توضیح"} isInvalid={''} value={val => ChangeValueDesc(val)}/>
                </div>
                <div className={"col-12"}>
                    <CheckBoxEmail name={"Mandatory"} defaultState={false} valueActive={"غیر اجباری"}
                                   taskName={taskName}
                                   defaultState={initialFormDataEmail[taskName].Mandatory == true ? true : false}
                                   valueDeActive={"اجباری"} status={types => ChangeCheckBox(types)}/>
                </div>

            </div>
        </FormContextEmail.Provider>
    )
}
