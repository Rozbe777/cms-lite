import React, {useContext, useEffect, useState, useReducer , memo} from "react";
import ReactDOM from 'react-dom';
import {Draggable} from "react-beautiful-dnd";
import InputMini from "../components/InputMini";
import Email from "../components/Email"
import {MultiSelected} from "../components/MultiSelected";
import Phone from "../components/Phone";
import Number from "../components/Number";
import TextArea from "../components/TextArea";
import {OneSelected} from "../components/OneSelected";
import YesNo from "../components/YesNo";
import ImageUploaded from "../components/ImageUploaded";
import Url from "../components/Url";
import {EmailSetting} from "../components/Setting/EmailSetting";
import MiniInputSetting from "../components/Setting/MiniInputSetting";
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import {OneSelectedSetting} from "../components/Setting/OneSelectedSetting";
import {
    FormContext,
    FormContextEmail,
    FormContextMini,
    FormContextMobile,
    FormContextMultiSelected,
    FormContextTextArea,
    FormContextUrl,
    FormContextFile,
    FormContextNumber, FormTheme, FormContextYesNo
} from "../Helper/Context";
import {MobileSetting} from "../components/Setting/MobileSetting";
import {NumberSetting} from "../components/Setting/NumberSetting";
import {MultiSelectedSetting} from "../components/Setting/MultiSelectedSetting";
import {TextAreaSetting} from "../components/Setting/TextAreaSetting";
import {UrlSetting} from "../components/Setting/UlrSetting";
import {YesNoSetting} from "../components/Setting/YesNoSetting";


const clickInput = "INPUT_CLICK";
const localInput = "INPUT_ONES";
const Item =  memo((props) => {


    // const [initialFormData, setInitialFormData] = useState(
    //     {
    //     {Options: [], Mandatory: false, title: ''}
    //     });

    let code = '';
    const [initialFormData, setInitialFormData] = useState({});
    const [initialFormDataMultiSel, setInitialFormDataMultiSel] = useState({Options: [], Mandatory: false, title: ''});


    const {formTheme, setFormTheme} = useContext(FormTheme);
    // email state
    const [initialFormDataEmail, setInitialFormDataEmail] = useState({});

    // textArea state
    const [initialFormDataTextarea, setInitialFormDataTextarea] = useState({
        title: '',
        description: '',
        Mandatory: false,

    });

    // url state
    const [initialFormDataUrl, setInitialFormDataUrl] = useState({
        title: '',
        description: '',
        Mandatory: false,

    });

    // YesNo state
    const [initialFormDataYesNo, setInitialFormDataYesNo] = useState({
        title: '',
        description: '',
        Mandatory: false,

    });

    // Image state
    const [initialFormDataFile, setInitialFormDataFile] = useState({
        title: '',
        description: '',
        Mandatory: false,
        type: '',
        fileSize: 0

    });

    // number state
    const [initialFormDataNumber, setInitialFormDataNumber] = useState({
        title: '',
        description: '',
        Mandatory: false,
        min: 0,
        max: 0
    });

    // mobile state
    const [initialFormDataPhone, setInitialFormDataPhone] = useState({
        title: '',
        description: '',
        Mandatory: false,

    });
    // input mini state
    const [initialFormDataMiniText, setInitialFormDataMiniText] =  useState({})

    useEffect(() => {

        let choseSize = $(".element-chose").width();
        $("span.force").css({"width": choseSize + "px"})

        // let typess = props.task.slice(0, 8);
        // console.log("type : ", typess)
        // switch (typess) {
        //     case "input_01" :
        //         console.log("input 1")
        //         $("span.force#" + typess).css("width", "50%");
        //         break;
        //     case "input_02" :
        //         console.log("input 2")
        //         $("span.force#" + typess).css("width", "50%");
        //         break;
        //     default :
        //         $("span.force").css("width", "100%");
        //         break;
        // }

    }, [])

    // const [initializeMini] = {description : '' , maximum : 0 , Mandatory: false, title: ''}

    const setting_main_content = document.getElementById("setting_main_content");


    const reducerDefData = (state, action) => {
        switch (action.type) {
            case "input_1" :
                return {...state, [action.code]: action.data}


        }
    }

    const HandleMini = (task) => {
        let rand_name = task.slice(9, 12);



        // let initialFormDataMiniTexts = {...initialFormDataMiniText};
        // initialFormDataMiniTexts[rand_name] = {Options: [], Mandatory: false, title: ''};
        // setInitialFormDataMiniText(initialFormDataMiniTexts);
        //
        // const changeState = useReducer(reducerDefData , initialFormDataMiniText);
        // dispatch({type:"input_01" , code : rand_name , data :  {Options: [], Mandatory: false, title: ''}})
        //
        // console.log("dataaaaa", initialFormDataMiniTexts);
        // return;


        // setInitialFormDataMiniText({
        //     ...initialFormDataMiniText,
        //     [rand_name] : {description : ''+rand_name , maximum : 0 , Mandatory: false, title: ''}
        // })


        // localStorage.setItem(clickInput, rand_name);
        // let oldData = localStorage.getItem(localInput) ? JSON.parse(localStorage.getItem(localInput)) : {}
        // oldData[rand_name] = oldData[rand_name] ? oldData[rand_name] : {description: '' + rand_name, maximum: 0, Mandatory: false, title: '', code: rand_name};
        // localStorage.setItem(localInput, JSON.stringify(oldData));
        // console.log("old dataaaa : ", JSON.parse(localStorage.getItem(localInput)), "name rand : ", rand_name)
        //
        // let initialFormDataMiniTexts = {...initialFormDataMiniText};
        // initialFormDataMiniTexts[rand_name] = {description: '' + rand_name, maximum: 0, Mandatory: false, title: ''}
        // setInitialFormDataMiniText(initialFormDataMiniTexts , () =>{
        //
        // });
        // return initialFormDataMiniText;

        // console.log("item : " , initialFormDataMiniText);


        ReactDOM.render(<FormContextMini.Provider value={{initialFormDataMiniText , setInitialFormDataMiniText}}><MiniInputSetting code={rand_name} name={task}/></FormContextMini.Provider> , setting_main_content);
        return (
                <FormContextMini.Provider value={{initialFormDataMiniText , setInitialFormDataMiniText}}>
                    <InputMini code={rand_name} name={task}/>
                </FormContextMini.Provider>
        )
    }

    // console.log(".....", initialFormDataEmail)
    const HandleEmail = (task) => {

        // setInitialFormDataEmail({
        //     ...initialFormDataEmail,
        //     [task] : {
        //         title: '',
        //         description: '',
        //         Mandatory: false,
        //     }
        // })

        initialFormDataEmail[task] = {
            title: '',
            description: '',
            Mandatory: false,
        }


        ReactDOM.render(<FormContextEmail.Provider value={{
            initialFormDataEmail,
            setInitialFormDataEmail
        }}><EmailSetting taskName={task}/></FormContextEmail.Provider>, setting_main_content);


        return <FormContextEmail.Provider value={{
            initialFormDataEmail,
            setInitialFormDataEmail
        }}><Email taskName={task}/></FormContextEmail.Provider>
    }
    const HandleMobile = () => {
        ReactDOM.render(<FormContextMobile.Provider value={{
            initialFormDataPhone,
            setInitialFormDataPhone
        }}><MobileSetting/></FormContextMobile.Provider>, setting_main_content);
        return <FormContextMobile.Provider value={{
            initialFormDataPhone,
            setInitialFormDataPhone
        }}><Phone/></FormContextMobile.Provider>
    }

    const HandleNumber = () => {
        ReactDOM.render(<FormContextNumber.Provider value={{
            initialFormDataNumber,
            setInitialFormDataNumber
        }}><NumberSetting/></FormContextNumber.Provider>, setting_main_content);
        return <FormContextNumber.Provider value={{
            initialFormDataNumber,
            setInitialFormDataNumber
        }}><Number/></FormContextNumber.Provider>
    }
    const HandleOneSelected = () => {
        ReactDOM.render(<FormContext.Provider value={{
            initialFormData,
            setInitialFormData
        }}><OneSelectedSetting/></FormContext.Provider>, setting_main_content);
        return <FormContext.Provider value={{
            initialFormData,
            setInitialFormData
        }}><OneSelected/></FormContext.Provider>
    }
    const HandleMultiSelected = () => {
        ReactDOM.render(<FormContextMultiSelected.Provider value={{
            initialFormDataMultiSel,
            setInitialFormDataMultiSel
        }}><MultiSelectedSetting/>
        </FormContextMultiSelected.Provider>, setting_main_content);
        return <FormContextMultiSelected.Provider value={{
            initialFormDataMultiSel,
            setInitialFormDataMultiSel
        }}><MultiSelected/></FormContextMultiSelected.Provider>
    }


    const HandleTextarea = () => {
        ReactDOM.render(<FormContextTextArea.Provider value={{
            initialFormDataTextarea,
            setInitialFormDataTextarea
        }}><TextAreaSetting/>
        </FormContextTextArea.Provider>, setting_main_content);
        return <FormContextTextArea.Provider value={{
            initialFormDataTextarea,
            setInitialFormDataTextarea
        }}><TextArea/></FormContextTextArea.Provider>
    }
    const HandleUrl = () => {
        ReactDOM.render(<FormContextUrl.Provider value={{
            initialFormDataUrl,
            setInitialFormDataUrl
        }}><UrlSetting/>
        </FormContextUrl.Provider>, setting_main_content);
        return <FormContextUrl.Provider value={{
            initialFormDataUrl,
            setInitialFormDataUrl
        }}><Url/></FormContextUrl.Provider>
    }

    const HandleYesNo = () => {
        ReactDOM.render(<FormContextYesNo.Provider value={{
            initialFormDataYesNo,
            setInitialFormDataYesNo
        }}><YesNoSetting/>
        </FormContextYesNo.Provider>, setting_main_content);
        return <FormContextYesNo.Provider value={{
            initialFormDataYesNo,
            setInitialFormDataYesNo
        }}><YesNo/></FormContextYesNo.Provider>
    }

    // const HandleFormFile = () => {
    //     ReactDOM.render(<FormContextFile.Provider value={{
    //         initialFormDataFile,
    //         setInitialFormDataFile
    //     }}><ImageUploadedSetting/>
    //     </FormContextFile.Provider>, setting_main_content);
    //     return <FormContextFile.Provider value={{
    //         initialFormDataFile,
    //         setInitialFormDataFile
    //     }}><ImageUploaded/></FormContextFile.Provider>
    // }


    const HandleTask = (task) => {
        switch (task.slice(0, 8)) {
            case 'input_01' :
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleMini(task);
            case 'input_02' :
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleEmail(task);
            case 'input_03' :
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleOneSelected();
            case 'input_04' :
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleMultiSelected();
            case 'input_05':
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleMobile();
            case 'input_06' :
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleNumber();
            case 'input_07' :
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleTextarea();
            case 'input_09' :
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleUrl();
            case 'input_10' :
                return <ImageUploaded/>
            case 'input_12' :
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleYesNo();
            default :
                return task.id;
        }
    }


    let choseSize = $(".element-chose").width();
    $("span.force").css({"width": choseSize + "px"})

    {
        console.log("task drag ", props)
    }

    return (
        <Draggable key={props.index} draggableId={props.task} index={props.index}>
            {(provided, snapshot) => (
                <span
                    style={{width: "100%"}}
                    // id={props.task}
                    className={"force"}
                    // id={props.task.size === "small" ? "element" : "elementBig"}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >

                    {HandleTask(props.task)}
                </span>
            )}

        </Draggable>

    )
})
export default Item;
