import React, {useEffect , useContext} from 'react';
import './../_Shared/style.scss';
import {FormTheme} from "../../../Helper/Context";
import $ from 'jquery'
const LinkAddressInput = ({name, label, defaultAddresss, value: pushValue}) => {

    const {formTheme, setFormTheme} = useContext(FormTheme)

    useEffect(()=>{


    },[])


    return (
        <div className={"col-12"} style={{marginBottom : '0px'}}>

            <label htmlFor={"baseInput"}>{label}</label>

            <div className={"addressInput"}>
                <span className={"defaultAdd"}>{defaultAddresss}</span>
                <input type={"text"} name={name} onChange={e => pushValue(e.target)} />
            </div>

        </div>

    )
}


export default LinkAddressInput;
