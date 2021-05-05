import React, {useContext} from 'react';
import Item from './ItemForm';
import {Droppable} from 'react-beautiful-dnd';
import {FormContext} from "../Helper/Context";

const FormDrop = (props) => {

    const {initialFormData, setInitialFormData} = useContext(FormContext);
    return (
        <FormContext.Provider value={{initialFormData, setInitialFormData}}>
            <div className={"container"}
                 style={{display: 'flex', alignItem: 'center', justifyContent: 'center', width: '100%', padding: 0}}>
                <Droppable droppableId={props.column.id}>
                    {(provider) => (
                        <div className={"row"}
                             style={{width: '100%'}}
                             ref={provider.innerRef}
                             {...provider.droppableProps}
                        >
                            {props.tasks.map((task, index) => <Item index={index} key={task.id} task={task}/>)}

                            {provider.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </FormContext.Provider>
    )
}
export default FormDrop;
