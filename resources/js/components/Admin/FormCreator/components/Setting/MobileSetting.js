import React, {useContext, useState, useEffect} from "react";
import './_shared/style.scss';
import {CheckBoxPhone} from "./MiniInput/phone/CheckBoxPhone";
import {InputTextPhone} from "./MiniInput/phone/InputTextPhone";
import {FormContextMobile} from "../../Helper/Context";

export const MobileSetting = () => {

    const {initialFormDataPhone, setInitialFormDataPhone} = useContext(FormContextMobile)

    const [data, setData] = useState({})

    useEffect(() => {
        setData(initialFormDataPhone)
    }, [])

    const ChangeValueTitle = val => {
        let dataIn = {...data};
        dataIn.title = val.value;
        setData(dataIn)
        setInitialFormDataPhone(dataIn)
    }
    const ChangeValueDesc = val => {
        let dataIn = {...data};
        dataIn.description = val.value;
        setData(dataIn)
        setInitialFormDataPhone(dataIn)
    }

    const ChangeCheckBox = val => {
        let dataIn = {...data};
        dataIn.Mandatory = val;
        setData(dataIn)
        setInitialFormDataPhone(dataIn)
    }
    return (
        <FormContextMobile.Provider value={{initialFormDataPhone, setInitialFormDataPhone}}>
            <div className={"row"} style={{padding: '0 15px'}}>
                <div className={"col-12"}>
                    <InputTextPhone placeholder={"عنوان"} name={"title"} label={"نوع فیلد : متن کوتاه"}
                                    defaultValue={initialFormDataPhone.title ? initialFormDataPhone.title : ''}
                                    isInvalid={"is-invalid"} value={val => ChangeValueTitle(val)}/>
                </div>
                <div className={"col-12"}>
                    <InputTextPhone
                        placeholder={"توضیح"} name={"description"}
                        defaultValue={initialFormDataPhone.description ? initialFormDataPhone.description : ''}
                        label={"توضیح"} isInvalid={''} value={val => ChangeValueDesc(val)}/>
                </div>
                <div className={"col-12"}>
                    <CheckBoxPhone name={"Mandatory"} defaultState={false} valueActive={"غیر اجباری"}
                                   defaultState={initialFormDataPhone.Mandatory == true ? true : false}
                                   valueDeActive={"اجباری"} status={types => ChangeCheckBox(types)}/>
                </div>

            </div>
        </FormContextMobile.Provider>
    )
}
