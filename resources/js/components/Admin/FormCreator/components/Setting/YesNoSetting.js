import React, {useContext, useState, useEffect} from "react";
import './_shared/style.scss';
import {CheckBoxYesNo} from "./MiniInput/yesNo/CheckBoxYesNo";
import {InputTextYesNo} from "./MiniInput/yesNo/InputTextYesNo";
import {FormContextYesNo} from "../../Helper/Context";

export const YesNoSetting = () => {

    const {initialFormDataYesNo, setInitialFormDataYesNo} = useContext(FormContextYesNo)
    const [data, setData] = useState({})

    useEffect(() => {
        setData(initialFormDataYesNo)
    }, [])

    const ChangeValueTitle = val => {
        let dataIn = {...data};
        dataIn.title = val.value;
        setData(dataIn)
        setInitialFormDataYesNo(dataIn)
    }
    const ChangeValueDesc = val => {
        let dataIn = {...data};
        dataIn.description = val.value;
        setData(dataIn)
        setInitialFormDataYesNo(dataIn)
    }

    const ChangeCheckBox = val => {
        let dataIn = {...data};
        dataIn.Mandatory = val;
        setData(dataIn)
        setInitialFormDataYesNo(dataIn)
    }
    return (
        <FormContextYesNo.Provider value={{initialFormDataYesNo, setInitialFormDataYesNo}}>
            <div className={"row"} style={{padding: '0 15px'}}>
                <p style={{padding : '0px 17px' , margin : 0 , color : 'grey' , fontWeight : 300 , fontSize : 13}}>نوع فیلد : ایمیل</p>
                <div className={"col-12"}>
                    <InputTextYesNo placeholder={"عنوان"} name={"title"} label={"عنوان"}
                                    defaultValue={initialFormDataYesNo.title ? initialFormDataYesNo.title : ''}
                                    isInvalid={"is-invalid"} value={val => ChangeValueTitle(val)}/>
                </div>
                <div className={"col-12"}>
                    <InputTextYesNo
                        placeholder={"توضیح"} name={"description"}
                        defaultValue={initialFormDataYesNo.description ? initialFormDataYesNo.description : ''}
                        label={"توضیح"} isInvalid={''} value={val => ChangeValueDesc(val)}/>
                </div>
                <div className={"col-12"}>
                    <CheckBoxYesNo name={"Mandatory"} defaultState={false} valueActive={"غیر اجباری"}
                                   defaultState={initialFormDataYesNo.Mandatory == true ? true : false}
                                   valueDeActive={"اجباری"} status={types => ChangeCheckBox(types)}/>
                </div>

            </div>
        </FormContextYesNo.Provider>
    )
}
