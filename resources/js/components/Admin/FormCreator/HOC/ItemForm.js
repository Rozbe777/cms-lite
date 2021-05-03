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
import {ONE_OPTION_DATA} from "../components/Constant";


const Item = (props) => {

    const [formDataTotal , setFormDataTotal] = useState({
        input_1 : [],
        input_2 : [],
        input_3 : [],
        input_4 : []
    })

    const [oneSel , setOneSel] = useState();
    const ref = useRef();
    const setting_main_content = document.getElementById("setting_main_content");
    const HandleTotlaDataOneSel = (data) => {
        let oldData = [...formDataTotal.input_3];
        let parseData = JSON.parse(data);
        oldData[0] = parseData;
        setFormDataTotal({
            ...formDataTotal,
            input_3: oldData
        })
        console.log("0..........0 : " , formDataTotal)
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
        // console.log("33333333333" , formDataTotal.input_3 )
        ReactDOM.render(<OneSelectedSetting defaultData={formDataTotal.input_3} data={item => HandleTotlaDataOneSel(item)}  />, setting_main_content);
        return <OneSelected data={formDataTotal.input_3} />
    }

    const HandleTask = (task) => {
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
                    {HandleTask(props.task)}
                </span>
            )}

        </Draggable>

    )
}
export default Item;
