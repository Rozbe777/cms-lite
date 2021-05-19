import React, {useContext, useEffect, useState} from "react";
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
import {MiniInputSetting} from "../components/Setting/MiniInputSetting";
import {OneSelectedSetting} from "../components/Setting/OneSelectedSetting";
import {
    FormContext,
    FormContextEmail,
    FormContextMini,
    FormContextMobile,
    FormContextMultiSelected,
    FormContextTextArea,
    FormContextUrl,
    FormContextNumber, FormTheme, FormContextYesNo
} from "../Helper/Context";
import {MobileSetting} from "../components/Setting/MobileSetting";
import {NumberSetting} from "../components/Setting/NumberSetting";
import {MultiSelectedSetting} from "../components/Setting/MultiSelectedSetting";
import {TextAreaSetting} from "../components/Setting/TextAreaSetting";
import {UrlSetting} from "../components/Setting/UlrSetting";
import {YesNoSetting} from "../components/Setting/YesNoSetting";


const Item = (props) => {

    const [initialFormData, setInitialFormData] = useState({Options: [], Mandatory: false, title: ''});
    const [initialFormDataMultiSel, setInitialFormDataMultiSel] = useState({Options: [], Mandatory: false, title: ''});

    const {formTheme, setFormTheme} = useContext(FormTheme);
    // email state
    const [initialFormDataEmail, setInitialFormDataEmail] = useState({
        title: '',
        description: '',
        Mandatory: false,

    });

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
    const [initialFormDataMiniText, setInitialFormDataMiniText] = useState({
        title: '',
        description: '',
        Mandatory: false,
        maximum: 0,
    })

    useEffect(() => {
    }, [])

    const setting_main_content = document.getElementById("setting_main_content");

    const HandleMini = () => {
        ReactDOM.render(<FormContextMini.Provider value={{
            initialFormDataMiniText,
            setInitialFormDataMiniText
        }}><MiniInputSetting/></FormContextMini.Provider>, setting_main_content);
        return <FormContextMini.Provider
            value={{
                initialFormDataMiniText,
                setInitialFormDataMiniText
            }}>
            <InputMini/>
        </FormContextMini.Provider>
    }
    const HandleEmail = () => {
        ReactDOM.render(<FormContextEmail.Provider value={{
            initialFormDataEmail,
            setInitialFormDataEmail
        }}><EmailSetting/></FormContextEmail.Provider>, setting_main_content);
        return <FormContextEmail.Provider value={{
            initialFormDataEmail,
            setInitialFormDataEmail
        }}><Email/></FormContextEmail.Provider>
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
        }}><TextAreaSetting />
        </FormContextTextArea.Provider>, setting_main_content);
        return <FormContextTextArea.Provider value={{
            initialFormDataTextarea,
            setInitialFormDataTextarea
        }}><TextArea /></FormContextTextArea.Provider>
    }
    const HandleUrl = () => {
        ReactDOM.render(<FormContextUrl.Provider value={{
            initialFormDataUrl ,
            setInitialFormDataUrl
        }}><UrlSetting />
        </FormContextUrl.Provider>, setting_main_content);
        return <FormContextUrl.Provider value={{
            initialFormDataUrl ,
            setInitialFormDataUrl
        }}><Url /></FormContextUrl.Provider>
    }

    const HandleYesNo = () => {
        ReactDOM.render(<FormContextYesNo.Provider value={{
            initialFormDataYesNo,
            setInitialFormDataYesNo
        }}><YesNoSetting />
        </FormContextYesNo.Provider>, setting_main_content);
        return <FormContextYesNo.Provider value={{
            initialFormDataYesNo,
            setInitialFormDataYesNo
        }}><YesNo /></FormContextYesNo.Provider>
    }

    const HandleTask = (task) => {
        switch (task.id) {
            case 'input_1' :
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleMini();
            case 'input_2' :
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleEmail();
            case 'input_3' :
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleOneSelected();
            case 'input_4' :
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleMultiSelected();
            case 'input_5':
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleMobile();
            case 'input_6' :
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleNumber();
            case 'input_7' :
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleTextarea();
            case 'input_9' :
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleUrl();
            case 'input_10' :
                return <ImageUploaded />
            case 'input_12' :
                ReactDOM.render("<p id='not-selected'>فیلدی انتخاب نشده است!</p>", setting_main_content);
                return HandleYesNo();
            default :
                return task.id;
        }
    }

    return (
        <FormTheme.Provider value={{formTheme, setFormTheme}}>
            <Draggable key={props.key} draggableId={props.task.id} index={props.index}>
                {(provided, snapshot) => (
                    <span
                        className={"force"}
                        id={props.task.size === "small" ? "element" : "elementBig"}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                    {HandleTask(props.task)}
                </span>
                )}

            </Draggable>
        </FormTheme.Provider>

    )
}
export default Item;
