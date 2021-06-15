import React, {useState} from 'react';

export const NoralizeFetures = (data) => {
    let attributes = [];
    let fetures = [];
    Object.keys(data).map(item => {
        attributes.push({
            product_code: item,
            price: parseInt(data[item].attributes.price),
            discount: parseInt(data[item].attributes.discount),
            count: parseInt(data[item].attributes.count),
            limit: parseInt(data[item].attributes.limit),
        });
        data[item].fetures.text.map((itemText) => {
            fetures.push({
                code: item,
                title: itemText.name,
                value: itemText.title,
                name: "متن"
            })
        })
        data[item].fetures.color.map((itemColor) => {
            fetures.push({
                code: item,
                title: itemColor.name,
                value: itemColor.title,
                name: "رنگ",
                color: itemColor.value
            })
        })
    })
    return {attributes, fetures};
}


export const NormalFilter = (data) => {
    // let dataE = {entry : '' , status : '' , discount : ''}

    let filter = [];
    data.map(item => {
        switch (item.id) {
            case "entity" :
                filter["entity"] = true;
                break;
            case "status" :
                filter["status"] = true;
                break;
            case "discount" :
                filter["discount"] = true;
                break;
            // case "غیرفعال" :
            //     let dataSD = {...dataOut};
            //     dataSD.status = "deactivate";
            //     return setDataOut(dataSD)
            // case "با تخفیف" :
            //     let dataD = {...dataOut};
            //     dataD.discount = "active";
            //     return setDataOut(dataD)
            // case "بدون تخفیف" :
            //     let dataDN = {...dataOut};
            //     dataDN.discount = "deactivate";
            //     return setDataOut(dataDN)
            default :
                return item;
        }
    })
    return filter;
}

export const NormalCategorise = (data) => {
    let dataOut = [];
    data.map(item => {
        dataOut.push(item.id)
    })
    return dataOut;
}

export const CheckTextFetures = data => {
    let res = true;

    data.fetures.map(item => {
        if (item.value == "") {
            res = false
        }
    })
    return res;
}


export const NormalProductOneItem = data => {
    return data
}
