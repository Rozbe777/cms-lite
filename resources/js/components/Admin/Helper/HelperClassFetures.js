export const NoralizeFetures = (data) => {
    let attributes = [];
    let fetures = [];
    Object.keys(data).map(item => {
        attributes.push({
            product_code : item,
            price : parseInt(data[item].attributes.price),
            discount : parseInt(data[item].attributes.discount),
            count : parseInt(data[item].attributes.count),
            limit : parseInt(data[item].attributes.limit),
        });
        data[item].fetures.text.map((itemText) => {
            fetures.push({
                code : item,
                title : itemText.name,
                value : itemText.title,
                name : "متن"
            })
        })
        data[item].fetures.color.map((itemColor) => {
            fetures.push({
                code : item,
                title : itemColor.name,
                value : itemColor.title,
                name : "رنگ",
                color : itemColor.value
            })
        })
    })
    return {attributes , fetures};
}
