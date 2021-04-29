import React, {useRef} from "react";
import {Draggable} from "react-beautiful-dnd";
import InputMini from "../components/InputMini";
import Email from "../components/Email";


const Item = (props) => {
    const ref = useRef();

    const HandleTask = (task) => {
        switch (task.id){
            case 'input_1' :
                return <InputMini />
            case 'input_2' :
                return <Email />
            default : return task.id;
        }
    }

    return (
        <Draggable key={props.key} draggableId={props.task.id} index={props.index}>
            {(provided , snapshot) => (
                <li
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                >
                    <i className={"bx "+props.task.icon}></i>

                    <p>{props.task.title}</p>
                </li>
            )}

        </Draggable>
    )
}
export default Item;
