import React from 'react';
import './_Shared/style.scss'
import LinkAddressInput from "./Component/LinkAddressInput";
import DatePickerInput from "./Component/DatePickerInput"
import InputText from './Component/InputText'
import {CheckBox} from "./Component/CheckBox";

const FormSetting = () => {
    return (
        <>
            <div className={"container"} style={{padding : 0 , margin : 0}}>
                <div className={"row"} style={{margin : 0 , padding : 0}}>
                    <LinkAddressInput label={"آدرس"} defaultAddresss={"https://cms-lite.test/"} name={"linkAddresss"}/>
                    {/*<DatePickerInput label={"فعال از"}  name={"dateActive"}/>*/}
                    {/*<DatePickerInput label={"فعال تا"}  name={"dateActive"}/>*/}
                    <LinkAddressInput label={"هدایت کاربر به آدرس زیر بعد از ارسال فرم"} defaultAddresss={"http://"} name={"linkAddresss"}/>
                    <InputText type={"number"} name={"maximumAnswer"} label={"حداکثر تعداد پاسخ"} placeholder={0} />
                    <CheckBox  defaultState={false} name={"showForm"} label={"نمایش عنوان فرم"}  />
                    <CheckBox  defaultState={true} name={"formStatus"} label={"فرم فعال"}  />
                </div>
            </div>
        </>
    )
}


export default FormSetting;
