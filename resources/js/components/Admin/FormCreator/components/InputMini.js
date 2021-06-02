import React, {useContext, useState, useEffect} from "react";
import $ from 'jquery';
import ReactDOM from "react-dom";
import MiniInputSetting from "./Setting/MiniInputSetting";
import {FormContextMini, FormTheme} from "../Helper/Context";

const InputMini = ({label, placeHolder, name = "name", required}) => {

    const nameRand = name.slice(9,12);




    const [inputData, setInputData] = useState();
    const {initialFormDataMiniText, setInitialFormDataMiniText} = useContext(FormContextMini);
    const [counter, setCounter] = useState(counter ? parseInt(initialFormDataMiniText[nameRand].maximum) : 0);
    const [counterUp, setCounterUp] = useState(0);

    const [data] = useState(initialFormDataMiniText[nameRand]);
    const {formTheme} = useContext(FormTheme);


    console.log("dataaaaaaaa////: " , data)

    useEffect(()=>{

    } , [])



    const min = 1;
    const max = 100;
    const random = min + Math.random() * (max - min);

    const setting_main_content = document.getElementById("setting_main_content");

    const HandleClick = e => {
        e.preventDefault();
        ReactDOM.render(<FormContextMini.Provider value={{
            initialFormDataMiniText, setInitialFormDataMiniText
        }}><MiniInputSetting name={name}/></FormContextMini.Provider>, setting_main_content);
        $(".nav-tabs li a").removeClass("active");
        $(".tab-pane").removeClass("active");
        $(".tab-pane.field").addClass("active");
        $(".nav-tabs li a.field").addClass("active");

    }
    let tags = initialFormDataMiniText[nameRand].Mandatory ? initialFormDataMiniText[nameRand].title ? initialFormDataMiniText[nameRand].title + "(*)" : 'عنوان (*)' : initialFormDataMiniText[nameRand].title ? initialFormDataMiniText[nameRand].title : 'عنوان';

    const changeInput = e => {
        e.preventDefault();
        let ofFinal = parseInt(initialFormDataMiniText[nameRand].maximum) - e.target.value.length;

        if (ofFinal < 0) {
            setCounter(0)
        } else {
            setInputData({
                ...inputData,
                name: e.target.value
            })
            setCounter(ofFinal)
            setCounterUp(parseInt(e.target.value.length))
        }
    }


    return (
        <fieldset className="form-group" style={{margin: 7}} onClick={e => HandleClick(e)}>
            <label style={{color : formTheme.textColor}} htmlFor={random + "_label"}>{tags}</label>
            <input type="email" id={random + "_label"}
                   onChange={e => changeInput(e)}
                   name={name}
                   style={{borderColor : formTheme.inputBorder , backgroundColor : formTheme.inputBackground , color : formTheme.placeholderColor}}
                   maxLength={initialFormDataMiniText[nameRand].maximum}
                   className="form-control formcreator"
                   required={initialFormDataMiniText[nameRand].Mandatory == true ? true : false} />

            <div className={"row"} style={{padding: 0, margin: 0}}>
                <div className={"col-8"} style={{padding: 0, margin: 0}}>
                    <p style={{color : formTheme.textColor + " !important"}}>
                        <small style={{color : formTheme.textColor}}
                           >{initialFormDataMiniText[nameRand].description ? initialFormDataMiniText[nameRand].description : 'توضیحات مختصر فیلد'}</small>
                    </p>
                </div>
                <div className={"col-4"} style={{padding: 0, margin: 0 ,color : formTheme.textColor + " !important"}}>
                    <p style={{textAlign: 'left', fontSize: '11px'}}>
                        <small style={{color : formTheme.textColor}}>{initialFormDataMiniText[nameRand].maximum ? counter < initialFormDataMiniText[nameRand].maximum && counter > 0 ? "کاراکتر (" + counter + ")" : initialFormDataMiniText[nameRand].maximum == counterUp ? "غیرمجاز" : "کاراکتر (" + initialFormDataMiniText[nameRand].maximum + ")" : 'تعداد کارکتر'}</small>
                    </p>
                </div>
            </div>

        </fieldset>
    )
}

export default InputMini;
