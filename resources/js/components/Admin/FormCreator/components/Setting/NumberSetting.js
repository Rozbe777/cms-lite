import React, {useContext, useState, useEffect} from "react";
import './_shared/style.scss';

import {FormContextNumber} from "../../Helper/Context";
import {InputTextNumber} from "./MiniInput/number/InputTextNumber";
import {CheckBoxNumber} from "./MiniInput/number/CheckBoxNumber";
import {InputTextNumberNum} from "./MiniInput/number/InputTextNumberNum";

export const NumberSetting = () => {

    const {initialFormDataNumber, setInitialFormDataNumber} = useContext(FormContextNumber)

    const [data, setData] = useState({})

    useEffect(() => {
        setData(initialFormDataNumber)
    }, [])

    const ChangeValueTitle = val => {
        let dataIn = {...data};
        dataIn.title = val.value;
        setData(dataIn)
        setInitialFormDataNumber(dataIn)
    }
    const ChangeValueDesc = val => {
        let dataIn = {...data};
        dataIn.description = val.value;
        setData(dataIn)
        setInitialFormDataNumber(dataIn)
    }
    const ChangeValueMin = val => {
        let dataIn = {...data};
        dataIn.min = val.value;
        setData(dataIn)
        setInitialFormDataNumber(dataIn)
    }
    const ChangeValueMax = val => {
        let dataIn = {...data};
        dataIn.max = val.value;
        setData(dataIn)
        setInitialFormDataNumber(dataIn)
    }

    const ChangeCheckBox = val => {
        let dataIn = {...data};
        dataIn.Mandatory = val;
        setData(dataIn)
        setInitialFormDataNumber(dataIn)
    }
    return (
        <FormContextNumber.Provider value={{initialFormDataNumber, setInitialFormDataNumber}}>
            <div className={"row"} style={{padding: '0 15px'}}>
                <p style={{padding : '0px 17px' , margin : 0 , color : 'grey' , fontWeight : 300 , fontSize : 13}}>نوع فیلد : عدد</p>

                <div className={"col-12"}>
                    <InputTextNumber placeholder={"عنوان"} name={"title"} label={"عنوان"}
                                    defaultValue={initialFormDataNumber.title ? initialFormDataNumber.title : ''}
                                    isInvalid={"is-invalid"} value={val => ChangeValueTitle(val)}/>
                </div>
                <div className={"col-12"}>
                    <InputTextNumber
                        placeholder={"توضیح"} name={"description"}
                        defaultValue={initialFormDataNumber.description ? initialFormDataNumber.description : ''}
                        label={"توضیح"} isInvalid={''} value={val => ChangeValueDesc(val)}/>
                </div>
                <div className={"col-12"}>
                    <CheckBoxNumber name={"Mandatory"} defaultState={false} valueActive={"غیر اجباری"}
                                   defaultState={initialFormDataNumber.Mandatory == true ? true : false}
                                   valueDeActive={"اجباری"} status={types => ChangeCheckBox(types)}/>
                </div>

                <div className={"col-12"}>
                    <InputTextNumberNum
                        max={10000000000000000000}
                        min={0}
                        placeholder={"حداقل مقدار"} name={"min"}
                        defaultValue={initialFormDataNumber.min ? initialFormDataNumber.min : ''}
                        label={"حداقل مقدار"} isInvalid={''} value={val => ChangeValueMin(val)}/>
                </div>

                <div className={"col-12"}>
                    <InputTextNumberNum
                        placeholder={"حداکثر مقدار"} name={"max"}
                        max={5}
                        min={1}
                        defaultValue={initialFormDataNumber.max ? initialFormDataNumber.max : ''}
                        label={"حداکثر مقدار"} isInvalid={''} value={val => ChangeValueMax(val)}/>
                </div>

            </div>
        </FormContextNumber.Provider>
    )
}
