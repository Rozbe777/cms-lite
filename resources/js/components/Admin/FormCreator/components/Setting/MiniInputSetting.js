import React, {useContext, useState, useEffect, memo} from "react";
import './_shared/style.scss';
import {CheckBox} from "./MiniInput/oneSelected/CheckBox";
import {FormContextMini} from "../../Helper/Context";
import {InputTextMiniInput} from "./MiniInput/MiniInput/InputTextMiniInput";
import {CheckBoxMiniInput} from "./MiniInput/MiniInput/CheckBoxMiniInput";

const MiniInputSetting = ({code , name}) => {
    const nameRand = name.slice(9, 12);
    const initializeMini = {description : '' , maximum : 0 , Mandatory: false, title: ''}

    const {initialFormDataMiniText, setInitialFormDataMiniText} = useContext(FormContextMini);
    let checked =initialFormDataMiniText[code] ? initialFormDataMiniText[code] : {...initialFormDataMiniText , [code] : initializeMini}

    console.log("????????" ,checked);
    const localInput = "INPUT_ONES";
    const clickInput = "INPUT_CLICK";

    let codeGet  = code;
    // let dataOld = JSON.parse(localStorage.getItem(localInput));
    console.log(",,,,,,,,,,,,,me" , code , " last  : " , initialFormDataMiniText , "datassss "   , initialFormDataMiniText[code]);

    console.log("initial state : " , initialFormDataMiniText);



    const [dataMe, setDataMe] = useState(initialFormDataMiniText[code] ? initialFormDataMiniText[code] : initializeMini);


    console.log("///////// , " , dataMe)
    // console.log("tttt" , JSON.parse(localStorage.getItem(localInput))[code] , "dataaaaa : " ,dataOld , " / rand name : " , codeGet , )


    useEffect(() => {
        let checked =initialFormDataMiniText[code] ? true : false
        let initializesss = {...initialFormDataMiniText};
        initializesss[code] = checked ? initializesss[code] :  initializeMini;
        setInitialFormDataMiniText(initializesss);
        setInitialFormDataMiniText({...initialFormDataMiniText , [code] : dataMe})
    }, [])


    const ChangeValueTitle = val => {
        let dataIn = {...dataMe};
        let inii = {...initialFormDataMiniText};



        // setInitialFormDataMiniText({
        //     ...initialFormDataMiniText,
        //     [nameRand] : {
        //         ...[nameRand],
        //         title :  val.value
        //     }
        // })
       dataIn.title = val.value;
        // dataIn[nameRand].title = val.value;
        setDataMe(dataIn);
        // let dataMes = {...dataMe};
        // dataMes[code] =dataIn;
        inii[code]=dataIn;
        // dataOld[code] = dataIn;
        // localStorage.setItem(localInput , JSON.stringify(dataMes));

        // initialFormDataMiniText[nameRand] = dataIn;
        setInitialFormDataMiniText(inii)
        console.log("//////++" , initialFormDataMiniText)

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
    return (
        <>
            <div className={"row"} style={{padding: '0 15px'}}>
                <p style={{padding: '0px 17px', margin: 0, color: 'grey', fontWeight: 300, fontSize: 13}}>نوع فیلد : متن
                    کوتاه</p>
                <div className={"col-12"}>
                    {console.log('dataaaa : ', dataMe)}
                    <InputTextMiniInput placeholder={"عنوان"} name={"title"} label={"عنوان"}
                                        defaultValue={dataMe.title ? dataMe.title : ''}
                                        code={code}
                                        isInvalid={dataMe.title ? "" : "is-invalid"}
                                        value={val => ChangeValueTitle(val)}/>
                </div>
                <div className={"col-12"}>
                    <InputTextMiniInput placeholder={"توضیح"} name={"description"} label={"توضیح"} isInvalid={''}
                                        code={code}
                                        defaultValue={dataMe.description ? dataMe.description : ''}
                                        value={val => ChangeValueDesc(val)}/>
                </div>
                <div className={"col-12"}>
                    <CheckBoxMiniInput name={"Mandatory"} defaultState={false} valueActive={"غیر اجباری"}
                                       defaultState={dataMe.Mandatory === true ? true : false}
                                       code={code}
                                       valueDeActive={"اجباری"} status={types => ChangeCheckBox(types)}/>
                </div>

                <div className={"col-12"} style={{marginTop: 10}}>
                    <InputTextMiniInput placeholder={"حداکثر تعداد حروف"} name={"maximum"}
                                        value={val => ChangeValueMaximum(val)}
                                        type={"number"}
                                        code={code}
                                        defaultValue={dataMe.maximum ? dataMe.maximum : 0}
                                        label={"حداکثر تعداد حروف"} isInvalid={''}/>
                </div>

            </div>
        </>


    )
}

export default MiniInputSetting;
