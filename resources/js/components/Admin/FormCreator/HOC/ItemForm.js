import React, {useContext , useEffect} from "react";
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
import {FormContext ,FormContextEmail , FormContextMini} from "../Helper/Context";


const Item = (props) => {

    const {initialFormData , setInitialFormData} = useContext(FormContext)
    const {initialFormDataEmail , setInitialFormDataEmail} = useContext(FormContextEmail)
    const {initialFormDataMiniText , setInitialFormDataMiniText} = useContext(FormContextMini)
    useEffect(()=>{
    } , [])

    const setting_main_content = document.getElementById("setting_main_content");

    const HandleMini = () => {
        ReactDOM.render(<FormContext.Provider value={{initialFormDataMiniText , setInitialFormDataMiniText}}><MiniInputSetting  /></FormContext.Provider> , setting_main_content);
        return <InputMini  />
    }
    const HandleEmail = () => {
        ReactDOM.render(<FormContext.Provider value={{initialFormDataEmail , setInitialFormDataEmail}}><EmailSetting  /></FormContext.Provider> , setting_main_content);
        return <Email  />
    }
    const HandleOneSelected = () => {
        ReactDOM.render(<FormContext.Provider value={{initialFormData , setInitialFormData}}><OneSelectedSetting  /></FormContext.Provider> , setting_main_content);
        return <OneSelected  />
    }

    const HandleTask = (task) => {
        switch (task.id) {
            case 'input_1' :
                ReactDOM.render('' , setting_main_content);
                return HandleMini();
            case 'input_2' :
                ReactDOM.render('' , setting_main_content);
                return HandleEmail();
            case 'input_3' :
                ReactDOM.render('' , setting_main_content);
                return HandleOneSelected();
            case 'input_4' :
                ReactDOM.render('' , setting_main_content);
                return <MultiSelected/>
            case 'input_5':
                return <Phone/>
            case 'input_6' :
                return <Number/>
            case 'input_7' :
                return <TextArea/>
            case 'input_9' :
                return <Url/>
            case 'input_10' :
                return <ImageUploaded/>
            case 'input_12' :
                return <YesNo/>
            default :
                return task.id;
        }
    }

    return (
        <FormContext.Provider value={{initialFormData , setInitialFormData}}>
            <Draggable key={props.key} draggableId={props.task.id} index={props.index}>
                {(provided, snapshot) => (
                    <span
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
        </FormContext.Provider>


    )
}
export default Item;
