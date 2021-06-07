import React, {useContext, useState, useEffect} from "react";
import './_shared/style.scss';

import {FormContextFile} from "../../Helper/Context";
import {InputTextNumber} from "./MiniInput/number/InputTextNumber";
import {CheckBoxNumber} from "./MiniInput/number/CheckBoxNumber";
import {InputTextNumberNum} from "./MiniInput/number/InputTextNumberNum";

export const NumberSetting = () => {

    const {initialFormDataFile, setInitialFormDataFile} = useContext(FormContextFile)

    const [data, setData] = useState({})

    useEffect(() => {
        setData(initialFormDataFile)
    }, [])

    const ChangeValueTitle = val => {
        let dataIn = {...data};
        dataIn.title = val.value;
        setData(dataIn)
        setInitialFormDataFile(dataIn)
    }
    const ChangeValueDesc = val => {
        let dataIn = {...data};
        dataIn.description = val.value;
        setData(dataIn)
        setInitialFormDataFile(dataIn)
    }
    const ChangeValueMin = val => {
        let dataIn = {...data};
        dataIn.min = val.value;
        setData(dataIn)
        setInitialFormDataFile(dataIn)
    }
    const ChangeValueMax = val => {
        let dataIn = {...data};
        dataIn.max = val.value;
        setData(dataIn)
        setInitialFormDataFile(dataIn)
    }

    const ChangeCheckBox = val => {
        let dataIn = {...data};
        dataIn.Mandatory = val;
        setData(dataIn)
        setInitialFormDataFile(dataIn)
    }
    return (
        <FormContextFile.Provider value={{initialFormDataFile, setInitialFormDataFile}}>
            <div className={"row"} style={{padding: '0 15px'}}>
                <p style={{padding : '0px 17px' , margin : 0 , color : 'grey' , fontWeight : 300 , fontSize : 13}}>نوع فیلد : عدد</p>

                <div className={"col-12"}>
                    <InputTextNumber placeholder={"عنوان"} name={"title"} label={"عنوان"}
                                    defaultValue={initialFormDataFile.title ? initialFormDataFile.title : ''}
                                    isInvalid={"is-invalid"} value={val => ChangeValueTitle(val)}/>
                </div>
                <div className={"col-12"}>
                    <InputTextNumber
                        placeholder={"توضیح"} name={"description"}
                        defaultValue={initialFormDataFile.description ? initialFormDataFile.description : ''}
                        label={"توضیح"} isInvalid={''} value={val => ChangeValueDesc(val)}/>
                </div>
                <div className={"col-12"}>
                    <CheckBoxNumber name={"Mandatory"} defaultState={false} valueActive={"غیر اجباری"}
                                   defaultState={initialFormDataFile.Mandatory == true ? true : false}
                                   valueDeActive={"اجباری"} status={types => ChangeCheckBox(types)}/>
                </div>

                <div className={"col-12"}>
                    <InputTextNumberNum
                        max={10000000000000000000}
                        min={0}
                        placeholder={"حداقل مقدار"} name={"min"}
                        defaultValue={initialFormDataFile.min ? initialFormDataFile.min : ''}
                        label={"حداقل مقدار"} isInvalid={''} value={val => ChangeValueMin(val)}/>
                </div>

                <div className={"col-12"}>
                    <InputTextNumberNum
                        placeholder={"حداکثر مقدار"} name={"max"}
                        max={5}
                        min={1}
                        defaultValue={initialFormDataFile.max ? initialFormDataFile.max : ''}
                        label={"حداکثر مقدار"} isInvalid={''} value={val => ChangeValueMax(val)}/>
                </div>

            </div>
        </FormContextFile.Provider>
    )
}
