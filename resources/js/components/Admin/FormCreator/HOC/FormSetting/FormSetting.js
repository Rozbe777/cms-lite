import React, {useState} from 'react';
import './_Shared/style.scss'
import LinkAddressInput from "./Component/LinkAddressInput";
import DatePickerInput from "./Component/DatePickerInput"
import InputText from './Component/InputText'
import {CheckBox} from "./Component/CheckBox";
import SelectingOtion from './Component/SelectingOtion'

const FormSetting = () => {



    const [data, setData] = useState([
        {
            id: 1,
            name: 'دسته بندی کوتاه'
        }, {
            id: 2,
            name: 'دسته بندی دیگر'
        }, {
            id: 3,
            name: 'دسته بندی بلند'
        },
    ])

    return (
        <>

                <div className={"container"} style={{padding: 0, margin: 0}}>
                    <div className={"row"} style={{margin: 0, padding: 0}}>
                        <LinkAddressInput label={"آدرس"} defaultAddresss={"https://cms-lite.test/"}
                                          name={"linkAddresss"}/>
                        {/*<DatePickerInput label={"فعال از"}  name={"dateActive"}/>*/}
                        {/*<DatePickerInput label={"فعال تا"}  name={"dateActive"}/>*/}
                        <SelectingOtion data={data}/>
                        <LinkAddressInput label={"هدایت کاربر به آدرس زیر بعد از ارسال فرم"} defaultAddresss={"http://"}
                                          name={"linkAddresss"}/>
                        <InputText type={"number"} name={"maximumAnswer"} label={"حداکثر تعداد پاسخ"} placeholder={0}/>
                        <CheckBox defaultState={false} name={"showForm"} label={"نمایش عنوان فرم"}/>
                        <CheckBox defaultState={true} name={"formStatus"} label={"فرم فعال"}/>
                    </div>
                </div>
        </>
    )
}


export default FormSetting;
