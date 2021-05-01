import React from "react";
import {InputText} from "./MiniInput/InputText";
import './_shared/style.scss';
import {CheckBox} from "./MiniInput/CheckBox";
import {OneSelected} from "../OneSelected";
import {Index} from "./MiniInput/AddItem";

export const OneSelectedSetting = () => {
    return (
        <div className={"row"} style={{padding: '0 15px'}}>
            <div className={"col-12"}>
                <InputText placeholder={"عنوان"} name={"title"} label={"نوع فیلد : متن کوتاه"} isInvalid={"is-invalid"}/>
            </div>
            <div className={"col-12"}>
                <InputText placeholder={"توضیح"} name={"desc"} label={"توضیح"} isInvalid={''}/>
            </div>
            <div className={"col-12"}>
                <CheckBox name={"Mandatory"} defaultState={false} valueActive={"غیر اجباری"} valueDeActive={" اجباری"}  />
            </div>
            <div className={"col-12"} style={{marginTop : 10}}>
                <Index />
            </div>
        </div>
    )
}
