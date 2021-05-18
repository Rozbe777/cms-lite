import React, {useContext, useState, useEffect} from "react";
import './_shared/style.scss';
import {CheckBoxTextarea} from "./MiniInput/textarea/CheckBoxTextarea";
import {InputTextTextarea} from "./MiniInput/textarea/InputTextTextarea";
import {FormContextTextArea} from "../../Helper/Context";

export const TextAreaSetting = () => {

    const {initialFormDataTextarea, setInitialFormDataTextarea} = useContext(FormContextTextArea)
    const [data, setData] = useState({})

    useEffect(() => {
        setData(initialFormDataTextarea)
    }, [])

    const ChangeValueTitle = val => {
        let dataIn = {...data};
        dataIn.title = val.value;
        setData(dataIn)
        setInitialFormDataTextarea(dataIn)
    }
    const ChangeValueDesc = val => {
        let dataIn = {...data};
        dataIn.description = val.value;
        setData(dataIn)
        setInitialFormDataTextarea(dataIn)
    }

    const ChangeCheckBox = val => {
        let dataIn = {...data};
        dataIn.Mandatory = val;
        setData(dataIn)
        setInitialFormDataTextarea(dataIn)
    }
    return (
        <FormContextTextArea.Provider value={{initialFormDataTextarea, setInitialFormDataTextarea}}>
            <div className={"row"} style={{padding: '0 15px'}}>
                <p style={{padding : '0px 17px' , margin : 0 , color : 'grey' , fontWeight : 300 , fontSize : 13}}>نوع فیلد : متن بلند</p>
                <div className={"col-12"}>
                    <InputTextTextarea placeholder={"عنوان"} name={"title"} label={"عنوان"}
                                    defaultValue={initialFormDataTextarea.title ? initialFormDataTextarea.title : ''}
                                    isInvalid={"is-invalid"} value={val => ChangeValueTitle(val)}/>
                </div>
                <div className={"col-12"}>
                    <InputTextTextarea
                        placeholder={"توضیح"} name={"description"}
                        defaultValue={initialFormDataTextarea.description ? initialFormDataTextarea.description : ''}
                        label={"توضیح"} isInvalid={''} value={val => ChangeValueDesc(val)}/>
                </div>
                <div className={"col-12"}>
                    <CheckBoxTextarea name={"Mandatory"} defaultState={false} valueActive={"غیر اجباری"}
                                   defaultState={initialFormDataTextarea.Mandatory == true ? true : false}
                                   valueDeActive={"اجباری"} status={types => ChangeCheckBox(types)}/>
                </div>

            </div>
        </FormContextTextArea.Provider>
    )
}
