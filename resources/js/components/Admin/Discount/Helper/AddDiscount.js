import {useState} from "react";


export default class AddDiscount{

    handleCondName(id, value) {
        switch (id) {
            case  'unlimited' :
                return 'بدون محدودیت';
            case 'min_purchase_number' :
                return `با محدودیت حداقل مبلغ خرید ${value} تومان`;
            case 'max_card_price' :
                return `با محدودیت حداکثر مبلغ خرید ${value} تومان`;
            case "max_purchase_number" :
                return `با محدودیت حداقل تعداد محصولات ${value}`;
            default :
                return 'بدون محدودیت';
        }
    }

    handleNameUser(id) {
        if (id == "all") {
            return "همه کاربران"
        } else if (id == "group_of_users") {
            return "گروهی از کاربران"
        } else if (id == "special_users") {
            return "کاربران خاص"
        } else {
            return "همه کاربران";
        }
    }







}
