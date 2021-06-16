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

    console.log("!!!!!!!!!! : " , data)
    let dataNew = {
        title : data.title,
        slug : data.slug,
        tag_list : data.tag_list,
        content : data.content,
        metadata : data.metadata,
        attributes : data.attributes,
        categories : data.categories,
        image : data.image,
        status : data.status,
    };

    return dataNew;
}


