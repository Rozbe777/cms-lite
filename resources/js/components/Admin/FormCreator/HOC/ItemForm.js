import React, {useRef} from "react";
import {Draggable} from "react-beautiful-dnd";
import InputMini from "../components/InputMini";
import Email from "../components/Email";
import {MultiSelected} from "../components/MultiSelected";
import Phone from "../components/Phone";
import Number from "../components/Number";
import TextArea from "../components/TextArea";
import {OneSelected} from "../components/OneSelected";
import YesNo from "../components/YesNo";
import ImageUploaded from "../components/ImageUploaded";


const Item = (props) => {
    const ref = useRef();

    const HandleTask = (task, provider, snapshot, providerDragProp, providerDragHandel) => {
        // console.log("itemsss : " , )
        switch (task.id) {
            case 'input_1' :
                return <InputMini/>
            case 'input_2' :
                return <Email/>
            case 'input_3' :
                return <OneSelected/>
            case 'input_4' :
                return <MultiSelected/>
            case 'input_5':
                return <Phone/>
            case 'input_6' :
                return <Number/>
            case 'input_7' :
                return <TextArea/>
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
