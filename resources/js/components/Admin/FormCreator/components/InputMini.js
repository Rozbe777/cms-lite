import React, {useContext, useState, useEffect} from "react";
import $ from 'jquery';
import ReactDOM from "react-dom";
import MiniInputSetting from "./Setting/MiniInputSetting";
import {FormContextMini, FormTheme} from "../Helper/Context";

const InputMini = ({code , label, placeHolder, name = "name", required}) => {

    const initializeMini = {description : '' , maximum : 0 , Mandatory: false, title: ''}

    const {initialFormDataMiniText ,setInitialFormDataMiniText} = useContext(FormContextMini);
    console.log("...............: ",initialFormDataMiniText);

    let checked =initialFormDataMiniText[code] ? true : false
    // let initializesss = {...initialFormDataMiniText};
    // initializesss[code] = checked ? initialFormDataMiniText[code] :  initializeMini;
    // setInitialFormDataMiniText(initializesss);





    // let dataOld = JSON.parse(localStorage.getItem(localInput));

    // const nameRand = code ? code : localStorage.getItem(clickInput);



    const [data , setData] = useState(checked ? initialFormDataMiniText[code] :  initializeMini);
    console.log("................... data: ",data);

    const [inputData, setInputData] = useState();
    const [counter, setCounter] = useState(counter ? parseInt(data.maximum) : 0);
    const [counterUp, setCounterUp] = useState(0);


    const {formTheme} = useContext(FormTheme);


    console.log("dataaaaaaaa////: " , code)

    useEffect(()=>{

    } , [])



    const min = 1;
    const max = 100;
    const random = min + Math.random() * (max - min);

    const setting_main_content = document.getElementById("setting_main_content");

    const HandleClick = (e , nameRand) => {
        console.log("dataaaaaaaaa click" , nameRand)
        // e.preventDefault();
        ReactDOM.render(<MiniInputSetting code={nameRand} name={name}/>, setting_main_content);
        $(".nav-tabs li a").removeClass("active");
        $(".tab-pane").removeClass("active");
        $(".tab-pane.field").addClass("active");
        $(".nav-tabs li a.field").addClass("active");
    }
    let tags = initialFormDataMiniText[code].Mandatory ? initialFormDataMiniText[code].title ? initialFormDataMiniText[code].title + "(*)" : 'عنوان (*)' : initialFormDataMiniText[code].title ? initialFormDataMiniText[code].title : 'عنوان';

    const changeInput = e => {
        e.preventDefault();
        let ofFinal = parseInt(initialFormDataMiniText[code].maximum) - e.target.value.length;

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
        <fieldset className="form-group" style={{margin: 7}} onClick={e => HandleClick(e,code)}>
            <label style={{color : formTheme.textColor}} htmlFor={random + "_label"}>{tags}</label>
            <input type="email" id={random + "_label"}
                   onChange={e => changeInput(e)}
                   name={name}
                   style={{borderColor : formTheme.inputBorder , backgroundColor : formTheme.inputBackground , color : formTheme.placeholderColor}}
                   maxLength={initialFormDataMiniText[code].maximum}
                   className="form-control formcreator"
                   required={initialFormDataMiniText[code].Mandatory == true ? true : false} />

            <div className={"row"} style={{padding: 0, margin: 0}}>
                <div className={"col-8"} style={{padding: 0, margin: 0}}>
                    <p style={{color : formTheme.textColor + " !important"}}>
                        <small style={{color : formTheme.textColor}}>{initialFormDataMiniText[code].description ? initialFormDataMiniText[code].description : 'توضیحات مختصر فیلد'}</small>
                    </p>
                </div>
                <div className={"col-4"} style={{padding: 0, margin: 0 ,color : formTheme.textColor + " !important"}}>
                    <p style={{textAlign: 'left', fontSize: '11px'}}>
                        <small style={{color : formTheme.textColor}}>{initialFormDataMiniText[code].maximum ? counter < initialFormDataMiniText[code].maximum && counter > 0 ? "کاراکتر (" + counter + ")" : initialFormDataMiniText[code].maximum == counterUp ? "غیرمجاز" : "کاراکتر (" + initialFormDataMiniText[code].maximum + ")" : 'تعداد کارکتر'}</small>
                    </p>
                </div>
            </div>

        </fieldset>
    )
}

export default InputMini;
