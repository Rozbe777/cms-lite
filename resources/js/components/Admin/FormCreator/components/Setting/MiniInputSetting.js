import React, {useContext, useState, useEffect, memo} from "react";
import './_shared/style.scss';
import {CheckBox} from "./MiniInput/oneSelected/CheckBox";
import {FormContextMini} from "../../Helper/Context";
import {InputTextMiniInput} from "./MiniInput/MiniInput/InputTextMiniInput";
import {CheckBoxMiniInput} from "./MiniInput/MiniInput/CheckBoxMiniInput";

const MiniInputSetting = ({code, name}) => {
    const nameRand = name.slice(9, 12);
    // const initializeMini = {description: '', maximum: 0, Mandatory: false, title: ''}

    const {initialFormDataMiniText, setInitialFormDataMiniText} = useContext(FormContextMini);

    const [dataMe, setDataMe] = useState(initialFormDataMiniText[code]);

    console.log("////////first : " , dataMe , " /// all : " , initialFormDataMiniText);

    useEffect(() => {

        // setInitialFormDataMiniText({...initialFormDataMiniText, [code]: dataMe})
    }, [])


    const ChangeValueTitle = val => {
        let dataIn = {...dataMe};
        let inii = {...initialFormDataMiniText};
        dataIn.title = val.value;
        setDataMe(dataIn);
        inii[code] = dataIn;
        setInitialFormDataMiniText(inii)
        console.log("//////++", initialFormDataMiniText)

    }
    const ChangeValueDesc = val => {
        let dataIn = {...dataMe};
        dataIn[nameRand].description = val.value;
        setDataMe(dataIn)
        // setInitialFormDataMiniText(dataIn)
    }
    const ChangeValueMaximum = val => {
        let dataIn = {...dataMe};
        dataIn[nameRand].maximum = val.value;
        setDataMe(dataIn)
        // setInitialFormDataMiniText(dataIn)
    }

    const ChangeCheckBox = val => {
        let dataIn = {...dataMe};
        dataIn[nameRand].Mandatory = val;
        setDataMe(dataIn)
        // setInitialFormDataMiniText(dataIn)
    }

    // let dataaaa = initialFormDataMiniText[code] ?;
    // console.log("..........//////" , dataaaa)

    return (
        <>
            <div className={"row"} style={{padding: '0 15px'}}>
                <p style={{padding: '0px 17px', margin: 0, color: 'grey', fontWeight: 300, fontSize: 13}}>نوع فیلد : متن
                    کوتاه</p>
                <div className={"col-12"}>
                    {console.log('dataaaa : ', dataMe , "////////" , initialFormDataMiniText[code])}
                    <InputTextMiniInput placeholder={"عنوان"} name={"title"} label={"عنوان"}
                                        defaultValue={dataaaa.title ? dataaaa.title : ""}
                                        code={code}
                                        isInvalid={dataaaa.title ? "" : "is-invalid"}
                                        value={val => ChangeValueTitle(val)}/>

                </div>



                <div className={"col-12"}>
                    <InputTextMiniInput placeholder={"توضیح"} name={"description"} label={"توضیح"} isInvalid={''}
                                        code={code}
                                        defaultValue={dataaaa.description}
                                        value={val => ChangeValueDesc(val)}/>
                </div>
                <div className={"col-12"}>
                    <CheckBoxMiniInput name={"Mandatory"} defaultState={false} valueActive={"غیر اجباری"}
                                       defaultState={dataaaa.Mandatory === true ? true : false}
                                       code={code}
                                       valueDeActive={"اجباری"} status={types => ChangeCheckBox(types)}/>
                </div>

                <div className={"col-12"} style={{marginTop: 10}}>
                    <InputTextMiniInput placeholder={"حداکثر تعداد حروف"} name={"maximum"}
                                        value={val => ChangeValueMaximum(val)}
                                        type={"number"}
                                        code={code}
                                        defaultValue={dataaaa.maximum }
                                        label={"حداکثر تعداد حروف"} isInvalid={''}/>
                </div>

            </div>
        </>


    )
}

export default MiniInputSetting;
