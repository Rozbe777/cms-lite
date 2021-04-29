import React from 'react';
import Item from './Item';
import {Droppable} from 'react-beautiful-dnd';

const FormDrop = (props) => {
    console.log("data form builder : " , props);
    return (
        <div className={"row"}>
            <div className={"col-12"}>
                <Droppable droppableId={props.column.id} >
                    {(provider) => (
                        <span
                            ref={provider.innerRef}
                            {...provider.droppableProps}
                        >
                            {props.tasks.map((task, index) => <Item index={index} key={task.id} task={task}/>)}

                            {provider.placeholder}
                        </span>
                    )}
                </Droppable>
            </div>
        </div>

    )
}
export default FormDrop;
