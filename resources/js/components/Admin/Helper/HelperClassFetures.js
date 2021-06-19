export const NoralizeFetures = (data) => {
    console.log("pricessssss____ : " , data)
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
                id : itemText.id,
                code: item,
                title: itemText.name,
                value: itemText.title,
                name: "متن"
            })
        })
        data[item].fetures.color.map((itemColor) => {
            fetures.push({
                code: item,
                id : itemColor.id,
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

    let tags_me = [];
    data.tags.map(id => {
        tags_me.push(id.name);
    });
    let dataNew = {
        id : data.id,
        title: data.title,
        slug: data.slug,
        tag_list: tags_me,
        content: data.content,
        metadata: data.metadata,
        attributes: data.attributes,
        category_list: data.categories,
        image: data.image,
        status: data.status,
    };
    return dataNew;
}

let NormalFet = data => {
    let out = {
        text: [],
        color: []
    }
    data.map(item => {
        if(item.color && item.color !== ""){
            out.color.push({
                id : item.id,
                name : item.title,
                title : item.value,
                value : item.color
            })
        }else{
            out.text.push({
                id : item.id,
                name : item.title,
                title : item.value
            })
        }
    })
    return out;
}


export const NormalAttrHead = data => {
    let headTitle = {
        text : [],
        color : [],
    }
    data.attributes.map(item => {
        item.type_features.map(item => {
            if(item.color && item.color !== ""){
                if (!headTitle.color.includes(item.title))
                {
                    headTitle.color.push(
                        item.title,
                    )
                }

            }else{
                if (!headTitle.text.includes(item.title)){
                    headTitle.text.push(
                        item.title,
                    )
                }

            }
        })
    })

    return headTitle;
}

export const NormalAttrOnePro = (data , types , counter) => {
    let priceData = {};
    if (types == "duplicate"){
        data.attributes.map(item => {
            priceData[counter++] = {
                attributes: {
                    price: item.price,
                    discount: item.discount,
                    limit: item.limit,
                    count: item.count,
                },
                fetures: NormalFet(item.type_features)
            }
        })
    }else{
        data.attributes.map(item => {
            priceData[item.product_code] = {
                attributes: {
                    price: item.price,
                    discount: item.discount,
                    limit: item.limit,
                    count: item.count,
                },
                fetures: NormalFet(item.type_features)
            }
        })
    }


    return priceData;
}

export const NormalNewEmptyFetures = data => {
    console.log("%%%%%%%" , data)
    let dataFetText = [];
    let dataFetColor = [];
    let dataaa = {...data};
    dataaa.fetures.text.map((item) => {
        dataFetText.push({
            id : null,
            name : item.name,
            title : item.title,
        })
    })
    dataaa.fetures.color.map((item) => {
        dataFetColor.push({
            id : null,
            name : item.name,
            title : item.title,
            value : item.value
        })
    })

    dataaa.fetures.text = dataFetText;
    dataaa.fetures.color = dataFetColor;

    return dataaa;
}
