import React from 'react';
import './../_Shared/style.scss';
import $ from 'jquery';

export const RadioButton = ({first,sec,label, name,  status: pushState}) => {

    const handleChange = e => {
        if (e.target.checked){
            pushState(true)
        }else{

            pushState(false)
        }
    }



    return (
        <div className={"col-12"} style={{marginBottom : '15px' , marginTop : 10 ,padding : 0}}>
            <span style={{marginTop : 11 , marginBottom : 11 , fontSize : 11 , float : 'right' , width : '100%'}}>{label}</span>
            <div className={"checkbox-mini frmSett"} style={{float : 'right'}}>
                <div className={"row"} id={"main-radio"}>
                    <div className={"col-6"}>
                        <fieldset>
                            <div className={"radio radio-primary"}>
                                <input defaultChecked={true} type={"radio"} name={name} id={first} />
                                <label style={{fontSize : '11px'}} htmlFor={first}>{first}</label>
                            </div>
                        </fieldset>
                    </div>
                    <div className={"col-6"}>
                        <fieldset>
                            <div className={"radio radio-primary"}>
                                <input type={"radio"} name={name} id={sec} />
                                <label style={{fontSize : '11px'}} htmlFor={sec}>{sec}</label>
                            </div>
                        </fieldset>
                    </div>
                </div>


            </div>
        </div>

    )
}



