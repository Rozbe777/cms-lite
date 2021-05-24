import React from "react";

const InitialData = {
    task: {
        'input_01': {id: 'input_01', title: 'متن کوتاه', icon: 'bx-edit-alt' , size : 'small'},
        'input_02': {id: 'input_02', title: 'ایمیل', icon: 'bx-mail-send' , size : 'small'},
        'input_03': {id: 'input_03', title: 'تک انتخابی', icon: 'bx-toggle-right' ,size : 'small'},
        'input_04': {id: 'input_04', title: 'چند انتخابی', icon: 'bx-sitemap' , size : 'small'},
        'input_05': {id: 'input_05', title: 'تلفن', icon: ' bx-phone-call' , size : 'small'},
        'input_06': {id: 'input_06', title: 'عدد', icon: 'bxl-slack-old' , size : 'small'},
        'input_07': {id: 'input_07', title: 'متن بلند', icon: 'bx-align-middle' , size : 'long'},
        // 'input_8': {id: 'input_8', title: 'منو کشویی', icon: 'bx-menu' , size : 'small'},
        'input_09': {id: 'input_09', title: 'وب سایت', icon: 'bx-globe' , size : 'small'},
        'input_10': {id: 'input_10', title: 'فایل', icon: 'bx-file' , size : 'long'},
        'input_11': {id: 'input_11', title: 'زمان', icon: 'bx-time' ,size : 'small'},
        'input_12': {id: 'input_12', title: 'بله / خیر', icon: 'bxs-adjust-alt' , size : 'long'},
    }, columns: {
        'tools': {
            id: 'tools',
            title: 'افزودن فیلد',
            taskIds: [ 'input_01' ,  'input_02' , 'input_03', 'input_04', 'input_05', 'input_06', 'input_07', 'input_09', 'input_10', 'input_11', 'input_12' ]
        },
        'inspect' : {
            id:'inspect',
            title : 'المان های فرم',
            taskIds: []
        }
    } ,  columnOrder: ['tools' , 'inspect'],
}
export default InitialData;
