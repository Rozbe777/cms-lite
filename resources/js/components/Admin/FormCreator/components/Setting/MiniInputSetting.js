import React, {useContext, useState, useEffect, memo} from "react";
import './_shared/style.scss';
import {CheckBox} from "./MiniInput/oneSelected/CheckBox";
import {FormContextMini} from "../../Helper/Context";
import {InputTextMiniInput} from "./MiniInput/MiniInput/InputTextMiniInput";
import {CheckBoxMiniInput} from "./MiniInput/MiniInput/CheckBoxMiniInput";

export default memo(({name}) => {
    const nameRand = name.slice(9, 12);

    const {initialFormDataMiniText, setInitialFormDataMiniText} = useContext(FormContextMini);


    console.log("tttt" , initialFormDataMiniText[nameRand])

    const [data, setData] = useState(initialFormDataMiniText);

    useEffect(() => {

    }, [])


    const ChangeValueTitle = val => {
        let dataIn = {...data};
        // let inii = {...initialFormDataMiniText};



        // setInitialFormDataMiniText({
        //     ...initialFormDataMiniText,
        //     [nameRand] : {
        //         ...[nameRand],
        //         title :  val.value
        //     }
        // })
       dataIn[nameRand].title = val.value;
        // dataIn[nameRand].title = val.value;
        setData(dataIn)
        setInitialFormDataMiniText(dataIn)
        console.log("//////++" , initialFormDataMiniText)

    }
    const ChangeValueDesc = val => {
        let dataIn = {...data};
        dataIn[nameRand].description = val.value;
        setData(dataIn)
        setInitialFormDataMiniText(dataIn)
    }
    const ChangeValueMaximum = val => {
        let dataIn = {...data};
        dataIn[nameRand].maximum = val.value;
        setData(dataIn)
        setInitialFormDataMiniText(dataIn)
    }

    const ChangeCheckBox = val => {
        let dataIn = {...data};
        dataIn[nameRand].Mandatory = val;
        setData(dataIn)
        setInitialFormDataMiniText(dataIn)
    }
    return (
        <FormContextMini.Provider value={{initialFormDataMiniText, setInitialFormDataMiniText}}>
            <div className={"row"} style={{padding: '0 15px'}}>
                <p style={{padding: '0px 17px', margin: 0, color: 'grey', fontWeight: 300, fontSize: 13}}>نوع فیلد : متن
                    کوتاه</p>
                <div className={"col-12"}>
                    {console.log('dataaaa : ', data)}
                    <InputTextMiniInput placeholder={"عنوان"} name={"title"} label={"عنوان"}
                                        defaultValue={initialFormDataMiniText[nameRand].title ? initialFormDataMiniText[nameRand].title : ''}
                                        isInvalid={data.title ? "" : "is-invalid"}
                                        value={val => ChangeValueTitle(val)}/>
                </div>
                <div className={"col-12"}>
                    <InputTextMiniInput placeholder={"توضیح"} name={"description"} label={"توضیح"} isInvalid={''}
                                        defaultValue={initialFormDataMiniText[nameRand].description ? initialFormDataMiniText[nameRand].description : ''}
                                        value={val => ChangeValueDesc(val)}/>
                </div>
                <div className={"col-12"}>
                    <CheckBoxMiniInput name={"Mandatory"} defaultState={false} valueActive={"غیر اجباری"}
                                       defaultState={initialFormDataMiniText[nameRand].Mandatory === true ? true : false}
                                       valueDeActive={"اجباری"} status={types => ChangeCheckBox(types)}/>
                </div>

                <div className={"col-12"} style={{marginTop: 10}}>
                    <InputTextMiniInput placeholder={"حداکثر تعداد حروف"} name={"maximum"}
                                        value={val => ChangeValueMaximum(val)}
                                        type={"number"}
                                        defaultValue={initialFormDataMiniText[nameRand].maximum ? initialFormDataMiniText[nameRand].maximum : 0}
                                        label={"حداکثر تعداد حروف"} isInvalid={''}/>
                </div>

            </div>
        </FormContextMini.Provider>


    )
})
