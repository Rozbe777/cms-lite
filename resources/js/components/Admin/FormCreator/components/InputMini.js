import React, {useContext, useState, useEffect , lazy} from "react";
import $ from 'jquery';
import ReactDOM from "react-dom";
import MiniInputSetting from "./Setting/MiniInputSetting";
import {FormContextMini, FormTheme} from "../Helper/Context";

const InputMini = ({newData , code,slices ,  label, placeHolder,  required}) => {

    const initializeMini = {description: '', maximum: 0, Mandatory: false, title: ''}

    const {initialFormDataMiniText, setInitialFormDataMiniText} = useContext(FormContextMini);
    // const [data , setData] = useState({})

    // lazy(() => setInitialFormDataMiniText({
    //     ...initialFormDataMiniText,
    //     newData
    // }))


    // // let checked = initialFormDataMiniText[code] ? true : false
    //
    const [data, setData] = useState(initialFormDataMiniText[code]);
    console.log("................... data: ", initialFormDataMiniText);
    //
    const [inputData, setInputData] = useState();
    const [counter, setCounter] = useState(counter ? parseInt(data.maximum) : 0);
    const [counterUp, setCounterUp] = useState(0);
    //
    //
    const {formTheme} = useContext(FormTheme);
    //
    //
    // console.log("dataaaaaaaa////: ", code)
    //
    useEffect(() => {
        //




        // console.log("////////first : before" , initialFormDataMiniText)
        // let initialize = {...initialFormDataMiniText};
        //
        //
        //
        // console.log("////////first : before" , initialFormDataMiniText[code])
        //
        // initialize[code] = initialize[code] ? initialize[code] : initializeMini;
        // console.log("////////first : mid"  ,  initialize)
        //
        // setInitialFormDataMiniText(initialize);
        // console.log("////////first : afterssss" , initialFormDataMiniText , initializeMini)
        //
        // let initialState = {...initialFormDataMiniText}
        //
        // initialState[code] = newData[code];
        //
        // setInitialFormDataMiniText(initialState);
        //
        // console.log("data : " , initialFormDataMiniText  , initialState,newData[code] ,  code)
        //

        // setInitialFormDataMiniText(initialFormDataMiniText)

    }, [])
    //
    //
    const min = 1;
    const max = 100;
    const random = min + Math.random() * (max - min);

    const setting_main_content = document.getElementById("setting_main_content");

    const HandleClick = (e, nameRand) => {
        // console.log("dataaaaaaaaa click" , initialFormDataMiniText)
        e.preventDefault();
        ReactDOM.render(<FormContextMini.Provider value={{initialFormDataMiniText, setInitialFormDataMiniText}}><MiniInputSetting code={nameRand} slices={slices} /></FormContextMini.Provider>, setting_main_content);
        console.log("rerender")

        $(".nav-tabs li a").removeClass("active");
        $(".tab-pane").removeClass("active");
        $(".tab-pane.field").addClass("active");
        $(".nav-tabs li a.field").addClass("active");
    }
    let tags = initialFormDataMiniText[code] ? initialFormDataMiniText[code].Mandatory ? initialFormDataMiniText[code].title ? initialFormDataMiniText[code].title + "(*)" : '?????????? (*)' : initialFormDataMiniText[code].title ? initialFormDataMiniText[code].title : '??????????' : '??????????';

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


    return(
        initialFormDataMiniText[code] ? (
        <fieldset className="form-group" style={{margin: 7}} onClick={e => HandleClick(e, code)}>
            {console.log("dataaaaavvvvvvvvvvvvvvvvv : " , initialFormDataMiniText , code , data )}
            <label style={{color: formTheme.textColor}} htmlFor={random + "_label"}>{initialFormDataMiniText[code].Mandatory ? initialFormDataMiniText[code].title ? initialFormDataMiniText[code].title + "(*)" : '?????????? (*)' : initialFormDataMiniText[code].title ? initialFormDataMiniText[code].title : '??????????' }</label>
            <input type="email" id={random + "_label"}
                   onChange={e => changeInput(e)}
                   name={name}
                   style={{
                       borderColor: formTheme.inputBorder,
                       backgroundColor: formTheme.inputBackground,
                       color: formTheme.placeholderColor
                   }}
                   maxLength={initialFormDataMiniText[code].maximum}
                   className="form-control formcreator"
                   required={initialFormDataMiniText[code].Mandatory === true ? true : false}/>

            <div className={"row"} style={{padding: 0, margin: 0}}>
                <div className={"col-8"} style={{padding: 0, margin: 0}}>
                    <p style={{color: formTheme.textColor + " !important"}}>
                        <small
                            style={{color: formTheme.textColor}}>{initialFormDataMiniText[code].description ? initialFormDataMiniText[code].description : '?????????????? ?????????? ????????'}</small>
                    </p>
                </div>
                <div className={"col-4"} style={{padding: 0, margin: 0, color: formTheme.textColor + " !important"}}>
                    <p style={{textAlign: 'left', fontSize: '11px'}}>
                        <small
                            style={{color: formTheme.textColor}}>{initialFormDataMiniText[code].maximum ? counter < initialFormDataMiniText[code].maximum && counter > 0 ? "?????????????? (" + counter + ")" : initialFormDataMiniText[code].maximum == counterUp ? "??????????????" : "?????????????? (" + initialFormDataMiniText[code].maximum + ")" : '?????????? ????????????'}</small>
                    </p>
                </div>
            </div>

        </fieldset>) : ''

        // <div>{counter}</div>
    )
}

export default InputMini;
