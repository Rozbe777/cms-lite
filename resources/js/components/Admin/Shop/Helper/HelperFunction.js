import $ from "jquery";
import ReactDOM from "react-dom";

export default class HelperFunction {
    contentFormData(string){
        if (string !== " ") {
            let slugArray = string.split(" ");
            let _newSlug = slugArray.join("-");
            return _newSlug;
        }else{
            return "";
        }
    }
    handleClose() {
        $("span.checkboxeds").removeClass("active");
        ReactDOM.render('', document.getElementById("add-datas"));
        this.HandleRemoveLocal()
    }

    HandleRemoveLocal() {
        localStorage.removeItem("status");
        localStorage.removeItem("selected");
        localStorage.removeItem("robots");
    }




    reducerAttr(state, action , setEdit , setPriceData , setCounter){
        switch (action.type) {
            case "price" :
                let newState = {
                    ...action.data,
                    [action.code]: {
                        ...action.data[action.code],
                        attributes: {
                            ...action.data[action.code].attributes,
                            price: action.price.price,
                            discount: action.price.discount
                        }
                    }
                }
                setEdit(true)
                setPriceData(newState)
                return newState;
            case "count" :
                let newStates = {
                    ...action.data,
                    [action.code]: {
                        ...action.data[action.code],
                        attributes: {
                            ...action.data[action.code].attributes,
                            count: action.count
                        }
                    }
                }
                setEdit(true)

                setPriceData(newStates)
                return newStates;
            case "limit" :
                let newStateLimit = {
                    ...action.data,
                    [action.code]: {
                        ...action.data[action.code],
                        attributes: {
                            ...action.data[action.code].attributes,
                            limit: action.count
                        }
                    }
                }
                setEdit(true)

                setPriceData(newStateLimit)
                return newStateLimit;

            case "text" :
                let oldest = [...action.data[action.code].fetures.text];
                oldest[action.index] = {
                    ...oldest[action.index],
                    title: action.title
                }
                let newStateText = {
                    ...action.data,
                    [action.code]: {
                        ...action.data[action.code],
                        fetures: {
                            ...action.data[action.code].fetures,
                            text: oldest
                        }
                    }
                }
                setEdit(true)

                setPriceData(newStateText)
                return newStateText;

            case "colorTit" :
                let oldestColor = [...action.data[action.code].fetures.color];
                oldestColor[action.index] = {
                    ...oldestColor[action.index],
                    title: action.title,
                }
                let newStateColor = {
                    ...action.data,
                    [action.code]: {
                        ...action.data[action.code],
                        fetures: {
                            ...action.data[action.code].fetures,
                            color: oldestColor
                        }
                    }
                }
                setEdit(true)

                setPriceData(newStateColor)
                return newStateColor;

            case "colorVal" :
                let oldestColorVal = [...action.data[action.code].fetures.color];
                oldestColorVal[action.index] = {
                    ...oldestColorVal[action.index],
                    value: action.value
                }
                let newStateColorVal = {
                    ...action.data,
                    [action.code]: {
                        ...action.data[action.code],
                        fetures: {
                            ...action.data[action.code].fetures,
                            color: oldestColorVal
                        }
                    }
                }
                setEdit(true)

                setPriceData(newStateColorVal)
                return newStateColorVal;

            case "addNew" :
                let dataNew = action.data[Object.keys(action.data)[Object.keys(action.data).length - 1]]
                let now_num = Object.keys(action.data)[Object.keys(action.data).length - 1]
                let texts = [];
                let counterCodess = parseInt(now_num) + 1;
                let olddata = {...action.data};
                dataNew.fetures.text.map(itemT => {
                    texts.push({
                        id: null,
                        name: itemT.name,
                        title: itemT.title,
                    })
                })

                let colors = [];
                dataNew.fetures.color.map(itemT => {
                    colors.push({
                        id: null,
                        name: itemT.name,
                        title: itemT.title,
                        value: itemT.value,
                    })
                })
                let attrs = dataNew.attributes;

                let newOut = {
                    attributes: attrs,
                    fetures: {
                        text: texts,
                        color: colors
                    }
                }
                olddata[counterCodess] = newOut;
                setCounter(counterCodess);
                setPriceData(olddata)
                return olddata;
            default:
                throw new Error();
        }
    }


}
