import React, {useContext} from 'react';
import Item from './ItemForm';
import {Droppable} from 'react-beautiful-dnd';
import {FormContext} from "../Helper/Context";

const FormDrop = (props) => {

    // console.log("proppppss : " , props)
    return (
            <div className={"container"}
                 style={{display: 'flex', alignItem: 'center', justifyContent: 'center', width: '100%', padding: 0}}>
                <Droppable droppableId={props.column.id}>
                    {(provider) => (
                        <div className={"row"}
                             style={{width: '100%'}}
                             ref={provider.innerRef}
                             {...provider.droppableProps}
                        >
                            {props.tasks.map((task, index) => <Item lengths={props.langthhh} index={index} key={index} task={task}/>)}

                            {provider.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
    )
}
export default FormDrop;
