import React from 'react';
import Item from './ItemForm';
import {Droppable} from 'react-beautiful-dnd';

const FormDrop = (props) => {
    console.log("data form builder : " , props);
    return (
        <div className={"container"} style={{display : 'flex' , alignItem : 'center' , justifyContent : 'center' , width : '100%' , padding : 0}}>
                <Droppable  droppableId={props.column.id} >
                    {(provider) => (
                        <div className={"row"}
                             style={{width : '100%'}}
                            ref={provider.innerRef}
                            {...provider.droppableProps}
                        >
                            {props.tasks.map((task, index) => <Item index={index} key={task.id} task={task}/>)}

                            {provider.placeholder}
                        </div>
                    )}
                </Droppable>
        </div>

    )
}
export default FormDrop;
