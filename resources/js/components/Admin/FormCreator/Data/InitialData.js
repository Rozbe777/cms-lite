import React from "react";

const InitialData = {
    task: {
        'input_1': {id: 'input_1', title: 'متن کوتاه', icon: 'bx-edit-alt' , size : 'small'},
        'input_2': {id: 'input_2', title: 'ایمیل', icon: 'bx-mail-send' , size : 'small'},
        'input_3': {id: 'input_3', title: 'تک انتخابی', icon: 'bx-toggle-right' ,size : 'small'},
        'input_4': {id: 'input_4', title: 'چند انتخابی', icon: 'bx-sitemap' , size : 'small'},
        'input_5': {id: 'input_5', title: 'تلفن', icon: ' bx-phone-call' , size : 'small'},
        'input_6': {id: 'input_6', title: 'عدد', icon: 'bxl-slack-old' , size : 'small'},
        'input_7': {id: 'input_7', title: 'متن بلند', icon: 'bx-align-middle' , size : 'long'},
        // 'input_8': {id: 'input_8', title: 'منو کشویی', icon: 'bx-menu' , size : 'small'},
        'input_9': {id: 'input_9', title: 'وب سایت', icon: 'bx-globe' , size : 'small'},
        'input_10': {id: 'input_10', title: 'فایل', icon: 'bx-file' , size : 'long'},
        'input_11': {id: 'input_11', title: 'زمان', icon: 'bx-time' ,size : 'small'},
        'input_12': {id: 'input_12', title: 'بله / خیر', icon: 'bxs-adjust-alt' , size : 'long'},
    }, columns: {
        'tools': {
            id: 'tools',
            title: 'افزودن فیلد',
            taskIds: [ 'input_1' ,  'input_2' , 'input_3', 'input_4', 'input_5', 'input_6', 'input_7', 'input_9', 'input_10', 'input_11', 'input_12']
        },
        'inspect' : {
            id:'inspect',
            title : 'المان های فرم',
            taskIds: []
        }
    } ,  columnOrder: ['tools' , 'inspect'],
}
export default InitialData;
