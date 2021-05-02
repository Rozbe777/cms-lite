import React, {useRef, useState} from "react";
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


const Item = (props) => {
    const [oneSel , setOneSel] = useState([]);
    const ref = useRef();
    const setting_main_content = document.getElementById("setting_main_content");
    const handleRendering = (component) => {

    }
    const HandleMini = () => {
        ReactDOM.render(<MiniInputSetting  />, setting_main_content);
        return <InputMini />
    }
    const HandleEmail = () => {
        ReactDOM.render(<EmailSetting  />, setting_main_content);
        return <Email />
    }
    const HandleOneSelected = () => {
        ReactDOM.render(<OneSelectedSetting data={item => setOneSel(item)}  />, setting_main_content);
        return <OneSelected data={oneSel} />
    }

    const HandleTask = (task, provider, snapshot, providerDragProp, providerDragHandel) => {
        switch (task.id) {
            case 'input_1' :
                return HandleMini();
            case 'input_2' :
                return HandleEmail();
            case 'input_3' :
                return HandleOneSelected();
            case 'input_4' :
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
        <Draggable key={props.key} draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => (
                <span
                    id={props.task.size === "small" ? "element" : "elementBig"}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {HandleTask(props.task, provided.innerRef, snapshot.isDragging, provided.draggableProps, provided.dragHandleProps)}
                </span>
            )}

        </Draggable>

    )
}
export default Item;
