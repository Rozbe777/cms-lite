import React, {useContext, useState, useEffect, memo} from "react";
import './_shared/style.scss';
import {CheckBox} from "./MiniInput/oneSelected/CheckBox";
import {FormContextMini} from "../../Helper/Context";
import {InputTextMiniInput} from "./MiniInput/MiniInput/InputTextMiniInput";
import {CheckBoxMiniInput} from "./MiniInput/MiniInput/CheckBoxMiniInput";

const MiniInputSetting = ({code, slices}) => {
    const nameRand = slices.slice(9, 12);
    // const initializeMini = {description: '', maximum: 0, Mandatory: false, title: ''}

    const {initialFormDataMiniText, setInitialFormDataMiniText} = useContext(FormContextMini);
    const [dataMe, setDataMe] = useState(initialFormDataMiniText[nameRand] ? initialFormDataMiniText[nameRand] :
        {
            description: '',
            maximum: 0,
            Mandatory: false,
            title: ''
        }
    );


    console.log("////////first : ", dataMe, " /// all : ", initialFormDataMiniText);

    useEffect(() => {

        // setInitialFormDataMiniText({...initialFormDataMiniText, [code]: dataMe})
    }, [])


    const ChangeValueTitle = val => {
        let dataIn = {...dataMe};
        console.log("dataaaaaaaaaaaain", dataIn)
        let inii = {...initialFormDataMiniText};
        dataIn.title = val.value;
        setDataMe(dataIn);
        inii[nameRand] = dataIn;
        setInitialFormDataMiniText(inii)
        console.log("//////++", initialFormDataMiniText, inii, dataMe)
    }
    const ChangeValueDesc = val => {
        let dataIn = {...initialFormDataMiniText[code]};
        dataIn[nameRand].description = val.value;
        setDataMe(dataIn)
        // setInitialFormDataMiniText(dataIn)
    }
    const ChangeValueMaximum = val => {
        let dataIn = {...initialFormDataMiniText[code]};
        dataIn[nameRand].maximum = val.value;
        setDataMe(dataIn)
        // setInitialFormDataMiniText(dataIn)
    }

    const ChangeCheckBox = val => {
        let dataIn = {...initialFormDataMiniText[code]};
        dataIn[nameRand].Mandatory = val;
        setDataMe(dataIn)
        // setInitialFormDataMiniText(dataIn)
    }

    // let dataaaa = initialFormDataMiniText[code] ?;
    // console.log("..........//////" , dataaaa)


    return (
        initialFormDataMiniText[nameRand] ? (
            <>
                <div className={"row"} style={{padding: '0 15px'}}>
                    <p style={{padding: '0px 17px', margin: 0, color: 'grey', fontWeight: 300, fontSize: 13}}>?????? ???????? :
                        ??????
                        ??????????</p>
                    <div className={"col-12"}>
                        {console.log('dataaaaaaaaaaaaaaaa : ', initialFormDataMiniText[nameRand] , dataMe)}
                        {/*<InputTextMiniInput placeholder={"??????????"} name={"title"} label={"??????????"}*/}
                        {/*                    defaultValue={}*/}
                        {/*                    code={code}*/}
                        {/*                    isInvalid={initialFormDataMiniText[nameRand].title ? "" : "is-invalid"}*/}
                        {/*                    value={val => ChangeValueTitle(val)}/>*/}


                        <div className={"form-group"}>
                            <label htmlFor={"baseInput"}>??????????</label>
                            <input type={"text"}
                                   value={initialFormDataMiniText[nameRand].title}
                                   onChange={e => ChangeValueTitle(e.target)} className={"form-control"}
                                   id={"baseInput"} name={"title"}/>
                            {/*{!dataOld[code].title ? (*/}
                            {/*    <div className="invalid-feedback">*/}
                            {/*        <i className="bx bx-radio-circle"></i>*/}
                            {/*        ???????? ???????? ?????? ???????? ???????????? ??????.*/}
                            {/*    </div>*/}
                            {/*): ''}*/}
                        </div>

                    </div>


                    <div className={"col-12"}>
                        <InputTextMiniInput placeholder={"??????????"} name={"description"} label={"??????????"} isInvalid={''}
                                            code={code}
                                            defaultValue={initialFormDataMiniText[nameRand].description}
                                            value={val => ChangeValueDesc(val)}/>
                    </div>
                    <div className={"col-12"}>
                        <CheckBoxMiniInput name={"Mandatory"} defaultState={false} valueActive={"?????? ????????????"}
                                           defaultState={initialFormDataMiniText[nameRand].Mandatory === true ? true : false}
                                           code={code}
                                           valueDeActive={"????????????"} status={types => ChangeCheckBox(types)}/>
                    </div>

                    <div className={"col-12"} style={{marginTop: 10}}>
                        <InputTextMiniInput placeholder={"???????????? ?????????? ????????"} name={"maximum"}
                                            value={val => ChangeValueMaximum(val)}
                                            type={"number"}
                                            code={code}
                                            defaultValue={initialFormDataMiniText[nameRand].maximum}
                                            label={"???????????? ?????????? ????????"} isInvalid={''}/>
                    </div>

                </div>
            </>
        ) : ''
    )
}

export default MiniInputSetting;
