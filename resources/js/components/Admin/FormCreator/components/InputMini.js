import React, {useContext, useState, useEffect} from "react";
import $ from 'jquery';
import ReactDOM from "react-dom";
import {MiniInputSetting} from "./Setting/MiniInputSetting";
import {FormContextMini} from "../Helper/Context";

const InputMini = ({label, placeHolder, name = "name", required}) => {


    const [inputData, setInputData] = useState();
    const {initialFormDataMiniText, setInitialFormDataMiniText} = useContext(FormContextMini);
    const [counter, setCounter] = useState(parseInt(initialFormDataMiniText.maximum));
    const [counterUp, setCounterUp] = useState(0);

    const min = 1;
    const max = 100;
    const random = min + Math.random() * (max - min);

    const setting_main_content = document.getElementById("setting_main_content");

    const HandleClick = e => {
        e.preventDefault();
        ReactDOM.render(<FormContextMini.Provider value={{
            initialFormDataMiniText, setInitialFormDataMiniText
        }}><MiniInputSetting/></FormContextMini.Provider>, setting_main_content);
        $(".nav-tabs li a").removeClass("active");
        $(".tab-pane").removeClass("active");
        $(".tab-pane.field").addClass("active");
        $(".nav-tabs li a.field").addClass("active");

    }
    let tags = initialFormDataMiniText.Mandatory ? initialFormDataMiniText.title ? initialFormDataMiniText.title + "(*)" : 'عنوان (*)' : initialFormDataMiniText.title ? initialFormDataMiniText.title : 'عنوان';

    const changeInput = e => {
        e.preventDefault();
        let ofFinal = parseInt(initialFormDataMiniText.maximum) - e.target.value.length;

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


    console.log("maximum : ", initialFormDataMiniText.maximum)
    return (
        <fieldset className="form-group" style={{margin: 7}} onClick={e => HandleClick(e)}>
            <label htmlFor={random + "_label"}>{tags}</label>
            <input type="email" id={random + "_label"}
                   onChange={e => changeInput(e)}
                   name={name}
                   maxLength={initialFormDataMiniText.maximum}
                   className="form-control formcreator"
                   required={initialFormDataMiniText.Mandatory == true ? true : false}/>

            <div className={"row"} style={{padding: 0, margin: 0}}>
                <div className={"col-8"} style={{padding: 0, margin: 0}}>
                    <p>
                        <small
                            className="text-muted">{initialFormDataMiniText.description ? initialFormDataMiniText.description : 'توضیحات مختصر فیلد'}</small>
                    </p>
                </div>
                <div className={"col-4"} style={{padding: 0, margin: 0}}>
                    <p style={{textAlign: 'left', fontSize: '11px'}}>
                        <small className="text-muted">{initialFormDataMiniText.maximum ? counter < initialFormDataMiniText.maximum && counter > 0 ? "کاراکتر (" + counter + ")" : initialFormDataMiniText.maximum == counterUp ? "غیرمجاز" : "کاراکتر (" + initialFormDataMiniText.maximum + ")" : 'تعداد کارکتر'}</small>
                    </p>
                </div>
            </div>

        </fieldset>
    )
}

export default InputMini;
