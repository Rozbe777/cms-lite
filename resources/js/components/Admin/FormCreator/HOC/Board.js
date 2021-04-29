import React, {useRef} from 'react';
import Item from './Item';
import {Droppable} from 'react-beautiful-dnd';

const Board = (props) => {
    const ref = useRef();
    return (
        <div className={"action-tools"}>
            <ul className={"column"}>


                <Droppable droppableId={props.column.id} direction={"vertical"}>
                    {(provider) => (
                        <ul className={"column"}
                            ref={provider.innerRef}
                            {...provider.droppableProps}
                        >
                            {props.tasks.map((task, index) => <Item index={index} key={task.id} task={task}/>)}

                            {provider.placeholder}
                        </ul>
                    )}
                </Droppable>
            </ul>
        </div>

    )
}
export default Board;
