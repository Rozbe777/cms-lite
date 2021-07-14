import React from 'react'

export const TextInput = props => {
    return(
        <div className="form-group">
            <label htmlFor="first-name-vertical">{props.title}</label>
            <input type={props.type} id="first-name-vertical" className="form-control"
                   name={props.name}
                   onChange={e => props.onChange(e)}
                   required={props.require}
                   disabled={props.disabled ? true : false}
                   placeholder={props.placeholder ? props.placeholder : props.title}/>
        </div>
    )
}
