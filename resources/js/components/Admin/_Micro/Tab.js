import React from 'react'


export const Tab = (props) => {
    return (
        <li className="nEav-item col-6 nav-custom">
            <a className={props.active ? "nav-link active" : "nav-link"} id={props.id} data-toggle="tab" href={props.href} aria-controls="cat"
               role="tab" aria-selected="true">
                <span className="align-middle">{props.title}</span>
                <i id={"visible-custom"} className={props.icon}></i>
            </a>
        </li>
    )
}
