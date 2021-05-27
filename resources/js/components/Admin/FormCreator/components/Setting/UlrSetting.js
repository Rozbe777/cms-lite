import React, {useContext, useState, useEffect} from "react";
import './_shared/style.scss';
import {CheckBoxUrl} from "./MiniInput/url/CheckBoxUrl";
import {InputTextUrl} from "./MiniInput/url/InputTextUrl";
import {FormContextUrl} from "../../Helper/Context";

export const UrlSetting = () => {

    const {initialFormDataUrl, setInitialFormDataUrl} = useContext(FormContextUrl)

    const [data, setData] = useState({})

    useEffect(() => {
        setData(initialFormDataUrl)
    }, [])

    const ChangeValueTitle = val => {
        let dataIn = {...data};
        dataIn.title = val.value;
        setData(dataIn)
        setInitialFormDataUrl(dataIn)
    }
    const ChangeValueDesc = val => {
        let dataIn = {...data};
        dataIn.description = val.value;
        setData(dataIn)
        setInitialFormDataUrl(dataIn)
    }

    const ChangeCheckBox = val => {
        let dataIn = {...data};
        dataIn.Mandatory = val;
        setData(dataIn)
        setInitialFormDataUrl(dataIn)
    }
    return (
        <FormContextUrl.Provider value={{initialFormDataUrl, setInitialFormDataUrl}}>
            { console.log("cascasc : " ,initialFormDataUrl )}
            <div className={"row"} style={{padding: '0 15px'}}>
                <p style={{padding : '0px 17px' , margin : 0 , color : 'grey' , fontWeight : 300 , fontSize : 13}}>نوع فیلد : لینک سایت</p>
                <div className={"col-12"}>
                    <InputTextUrl placeholder={"عنوان"} name={"title"} label={"عنوان"}
                                    defaultValue={initialFormDataUrl.title ? initialFormDataUrl.title : ''}
                                    isInvalid={"is-invalid"} value={val => ChangeValueTitle(val)}/>
                </div>
                <div className={"col-12"}>
                    <InputTextUrl
                        placeholder={"توضیح"} name={"description"}
                        defaultValue={initialFormDataUrl.description ? initialFormDataUrl.description : ''}
                        label={"توضیح"} isInvalid={''} value={val => ChangeValueDesc(val)}/>
                </div>
                <div className={"col-12"}>
                    <CheckBoxUrl name={"Mandatory"} defaultState={false} valueActive={"غیر اجباری"}
                                   defaultState={initialFormDataUrl.Mandatory == true ? true : false}
                                   valueDeActive={"اجباری"} status={types => ChangeCheckBox(types)}/>
                </div>

            </div>
        </FormContextUrl.Provider>
    )
}
