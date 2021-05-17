import React from 'react';
import './_Shared/style.scss';
import {RadioButton} from "./Component/RadioButton";
import {InputColor} from "./Component/InputColor";
import LinkAddressInput from "./Component/LinkAddressInput";
import SelectingOtion from "./Component/SelectingOtion";
import InputText from "./Component/InputText";
import {CheckBox} from "./Component/CheckBox";

const FeedSetting = () => {
    return (
        <>
            <div className={"container"} style={{padding : 0 , margin : 0}}>
                <div className={"row"} style={{margin : 0 , padding : 0}}>
                    <CheckBox  defaultState={false} name={"sendCopyToReciver"} label={"ارسال کپی اطلاعات ارسالی به پاسخ دهنده"}  />
                    <CheckBox  defaultState={true} name={"sendCopyToYou"} label={"دریافت یکی کپی از اطلاعات ثبت شده به شما"}  />
                    <InputText type={"email"} name={"reciverFeed"} label={"ارسال ایمیل به"} placeholder={"example@gmail.com"} />

                </div>
            </div>
        </>
    )
}

export default FeedSetting;
