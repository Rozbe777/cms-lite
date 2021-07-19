import React, {useContext, useEffect, useReducer, useState} from "react";
import {Tab} from "./HOC/Tab";
import {Switcher} from "../../../HOC/Switch";
import {FilesShopContext} from "../Helper/Context";
import Doka from "../../../HOC/DropZone";
import {MultiSelected} from "../ProductManager/HOC/MultiSelected";
import {ChipsetHandler} from "../../../HOC/ChipsetHandler";
import './../_shared/Responsive.scss'

import MyEditor from "../../_Micro/MyEditor/MyEditor";
import {BigSwitcher} from "../../../HOC/BigSwitcher";
import $ from "jquery";
import ComponentHandler from "../Helper/ComponentHandler";
import {NoralizeFetures, NormalAttrHead, NormalAttrOnePro} from "../../Helper/HelperClassFetures";
import CategoryApi from './../../Category/Api/CategoryApi'
import {error as ErrorToast} from "../../../../helper";
import ReactDOM from "react-dom";
import {NewFeture} from "../../_Micro/ProductMiniComponent/NewFeture";
import ReactDOMs from "react-dom";
import HelperFunction from './../Helper/HelperFunction';
import {Price} from "../../_Micro/ProductMiniComponent/Price";
import {Inventory} from "../../_Micro/ProductMiniComponent/Inventoryz";
import {Limited} from "../../_Micro/ProductMiniComponent/Limited";

const ProductParentForm = ({
                               actionType,
                               edit,
                               defaultValuePro, // this data required for edit
                               onChangeInput,
                               categoryOnChange,
                               editorData,
                               checkChange,
                               handleTagDescription,
                               handleMetaData,
                               handleTagMetaData,
                               handleGalleryDeletedId,
                               handleEditAttributes
                           }) => {

    let helperFunction = new HelperFunction();
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        getCategoryList();
    }, [])

    const {allFiles, setAllFiles} = useContext(FilesShopContext);
    const [gallery, setGallery] = useState(defaultValuePro ? defaultValuePro.gallery : [])
    const [slugManage, setSlugManage] = useState(true);
    const [categoryData, setCategoryData] = useState(defaultValuePro ? defaultValuePro.category_list : []);
    const [chipset, setChipset] = useState(defaultValuePro ? defaultValuePro.tag_list : []);
    const [seoChipset, setSeoChipset] = useState(defaultValuePro ? JSON.parse(defaultValuePro.metadata) ? JSON.parse(defaultValuePro.metadata).tags : [] : []);

    const metaDataUpdate = defaultValuePro ? JSON.parse(defaultValuePro.metadata) : {robots: false};
    let componentHandler = new ComponentHandler();
    let categoryApi = new CategoryApi();
    // make reandom nuber id for new feature
    let mins = 10000000000;
    let maxs = 99999999999;
    let firstRand = Math.round(mins + Math.random() * (maxs - mins));
    let defCounters = {num: firstRand};
    const [counter, setCounter] = useState(defCounters);

    function handleMakeName() {
        let productName = defaultValuePro.title;
        const min = 1;
        const max = 1000;
        const rand = Number(min + Math.random() * (max - min)).toFixed(0);
        return productName + rand + "_کپی";
    }


    const handleAddChip = (item) => {
        checkChange(true)
        let chipsets = [...chipset];
        if (item === "") {
        } else {
            chipsets.push(item);
            setChipset(chipsets);
            handleTagDescription(chipsets);
        }
    }

    const handleAddChipMetaData = (item) => {
        checkChange(true)
        let chipsets = [...seoChipset];
        if (item === "") {
        } else {
            chipsets.push(item);
            setSeoChipset(chipsets);
            handleTagMetaData(chipsets);
        }
    }


    // this default attr for first type of product when added product
    let attributesDefault = [{
        product_code: counter.num,
        price: 0,
        discount: 0,
        count: null,
        isInfinite: true,
        limit: null,
    }]

    let defaultDataFirstAdding = {
        attributes: attributesDefault,
    }

    let defaultCol = {
        [counter.num]:
            {
                attributes: {
                    product_code: counter.num,
                    price: 0,
                    discount: 0,
                    count: null,
                    isInfinite: true,
                    limit: null,
                },
                fetures: {
                    text: [],
                    color: []
                }
            }
    };

    let normalHeadTitle = defaultValuePro ? NormalAttrHead(defaultValuePro) : {
        color: [],
        text: []
    };

    const [defaultTableHead, setDefaultTableHead] = useState(normalHeadTitle)


    let normalDefalutAttr = NormalAttrOnePro(defaultValuePro ? defaultValuePro : defaultDataFirstAdding, actionType, 0);
    console.log("sdvsdvsdv____", normalDefalutAttr)
    const [priceData, setPriceData] = useState(normalDefalutAttr ? normalDefalutAttr : defaultDataFirstAdding);
    const titleDefaultValue = () => {
        if (actionType === "duplicate") {
            return handleMakeName();
        } else if (actionType === "edit") {
            return defaultValuePro.title;
        } else {
            return '';
        }
    }
    const handleSwither = (e, state, name) => {
        switch (name) {
            case 'showState' :
                componentHandler.handleSwitchShowState(e, state, checkChange);
                return true;
            default :
                return true;
        }
    }

    const getCategoryList = () => {
        setLoading(true)
        categoryApi._moduleId = 2;
        categoryApi.call().then(response => {
            setLoading(false)
            setCategoryData(response.data.data);
        })
    }

    const reducerAttr = (state, action) => {
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
                checkChange(true)
                handleEditAttributes(newState);
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
                checkChange(true)

                handleEditAttributes(newStates);

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
                checkChange(true)

                handleEditAttributes(newStateLimit);

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
                checkChange(true)
                handleEditAttributes(newStateText);

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
                checkChange(true)

                handleEditAttributes(newStateColor);

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
                checkChange(true)
                handleEditAttributes(newStateColorVal);

                setPriceData(newStateColorVal)
                return newStateColorVal;

            case "addNew" :
                let dataNew = action.data[Object.keys(action.data)[Object.keys(action.data).length - 1]];
                console.log("New adding dataaaa", dataNew)
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
                handleEditAttributes(olddata);

                let newDataOut = olddata;
                newDataOut[counterCodess].attributes.link = "";
                setPriceData(newDataOut)
                return newDataOut;
            default:
                throw new Error();
        }
    }


    const [stateData, dispatchAttr] = useReducer(reducerAttr, defaultValuePro);


    const HandleAddNew = (e) => {
        e.preventDefault();
        let checkedFeatures = NoralizeFetures(priceData).fetures.length;
        if (checkedFeatures > 0) {
            checkChange(true)
            dispatchAttr({type: 'addNew', data: priceData})
        } else {
            ErrorToast("حداقل باید یک ویژگی اضافه کنید")
        }

    }


    const closeFeture = (e) => {
        e.preventDefault();
        $("#back-loaderedss").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loaderedss"));
    }

    const addFeture = (item) => {
        let newItemHead = {...defaultTableHead};
        let checkIncludeHeadTitle = newItemHead.text.includes(item.name) || newItemHead.color.includes(item.name);
        if (!checkIncludeHeadTitle) {
            if (item.type === "text") {
                checkChange(true)
                newItemHead.text.push(item.name);
                setDefaultTableHead(newItemHead);
                Object.keys(priceData).map((items, index) => {
                    if (priceData[items].fetures.text.length > 0) {
                        priceData[items].fetures.text.map(news => {
                            let indexFind = priceData[items].fetures.text.find(elem => elem.name === item.name);
                            if (!indexFind) {
                                priceData[items].fetures.text.push({
                                    name: item.name,
                                    title: ''
                                });
                                setPriceData(priceData);
                                handleEditAttributes(priceData)
                            }
                        })
                    } else {
                        priceData[items].fetures.text.push({
                            name: item.name,
                            title: ''
                        });
                        setPriceData(priceData);
                        handleEditAttributes(priceData)
                    }
                })
            } else {
                newItemHead.color.push(item.name);
                setDefaultTableHead(newItemHead)
                checkChange(true)
                Object.keys(priceData).map((items, index) => {
                    if (priceData[items].fetures.color.length > 0) {
                        priceData[items].fetures.color.map(news => {
                            let indexFind = priceData[items].fetures.color.find(elem => elem.name === item.name);
                            if (!indexFind) {
                                priceData[items].fetures.color.push({
                                    name: item.name,
                                    title: 'مشکی',
                                    value: '#000000'
                                });
                                setPriceData(priceData);
                            }
                        })
                    } else {
                        priceData[items].fetures.color.push({
                            name: item.name,
                            title: 'مشکی',
                            value: '#000000'
                        });
                        setPriceData(priceData);
                    }
                })
            }
            $("#back-loaderedss").removeClass("active");
            ReactDOM.render('', document.getElementById("back-loaderedss"));
        } else {
            ErrorToast("ویژگی قبلا ثبت شده است")
        }


    }


    const HandleFeture = (e) => {
        e.preventDefault();
        checkChange(true)
        $("#back-loaderedss").addClass("active");
        ReactDOM.render(<NewFeture close={e => closeFeture(e)}
                                   resulteFeature={addFeture}/>, document.getElementById("back-loaderedss"));
    }


    const handleDispatchAttr = (e, item, type, price, discount) => {
        e.preventDefault();
        $("#back-loaderedss").addClass("active");
        ReactDOMs.render(<Price priceDataOld
                                discount={discount}
                                price={price}
                                newPrice={prices => dispatchAttr({
                                    type: type,
                                    code: item,
                                    data: priceData,
                                    price: prices
                                })}
        />, document.getElementById("back-loaderedss"));

    }


    const HandleInventory = (e, item, type, count) => {
        e.preventDefault();
        $("#back-loaderedss").addClass("active");
        ReactDOM.render(<Inventory count={count}
                                   out={items => dispatchAttr({
                                       type: "count",
                                       code: item,
                                       data: priceData,
                                       count: items.count
                                   })}/>, document.getElementById("back-loaderedss"))

    }
    const HandleLimited = (e, item, type, count) => {
        e.preventDefault();
        $("#back-loaderedss").addClass("active");
        ReactDOM.render(<Limited count={count}
                                 out={items => dispatchAttr({
                                     type: "limit",
                                     code: item,
                                     data: priceData,
                                     count: items.limit
                                 })}/>, document.getElementById("back-loaderedss"))

    }


    const deleteColAttr = (e, items) => {
        e.preventDefault();
        checkChange(true)
        let priceChange = {...priceData};
        if (Object.keys(priceData).length > 1) {
            priceChange[items] ? delete priceChange[items] : '';
            setPriceData(priceChange);
            handleEditAttributes(priceChange);
        } else {
            ErrorToast("محصول حداقل باید یک تنوع محصولی داشته باشد")
        }
    }

    const renderFitureText = (dataIns, id) => {
        return dataIns.map((item, index) => (
            <td key={index} id={"color-col"}>
                <input type={"text"} id={"input-code-kala"}
                       placeholder={"مقدار"} className={"form-control productsss"}
                       name={item.name}
                       id={id + " " + index}
                       onChange={e => HandleFetureText(e, index, id, dataIns)}
                       style={{maxWidth: '130px'}}
                       value={item.title ? item.title : ''}/>
            </td>
        ))
    }


    const HandleFetureText = (e, index, item) => {
        e.preventDefault();
        checkChange(true)
        dispatchAttr({type: "text", index, title: e.target.value, data: priceData, code: item})
    }

    const HandleFetureColorTit = (e, index, id) => {
        e.preventDefault();
        checkChange(true)

        dispatchAttr({type: "colorTit", index, title: e.target.value, data: priceData, code: id})
    }
    const HandleFetureColorVal = (e, index, id) => {
        e.preventDefault();
        checkChange(true)

        dispatchAttr({type: "colorVal", index, value: e.target.value, data: priceData, code: id})
    }

    const renderFitureColor = (dataInss, id) => {
        return dataInss.map((item, index) => (
            <td key={index} id={"color-col"}>
                <input type={"text"} id={"input-code-kala"}
                       placeholder={"مقدار"} className={"form-control productsss"}
                       name={item.name}
                       style={{maxWidth: '120px', float: 'right'}}
                       onChange={e => HandleFetureColorTit(e, index, id)}
                       value={item.title ? item.title : ''}/>
                <input type={"color"} className={"feture-color"}
                       defaultValue={priceData[id] ? priceData[id].fetures.color[index].value : '#000000'}
                       onChange={e => HandleFetureColorVal(e, index, id)}/>
            </td>
        ))
    }

    const ChangeHeadTitleText = (e, index) => {
        e.preventDefault();
        checkChange(true)
        let dataHead = {...defaultTableHead};
        let priceDataClone = {...priceData};
        dataHead.text[index] = e.target.value;
        Object.keys(priceData).map((items, indexes) => {
            priceData[items].fetures.text[index].name = e.target.value;
            setPriceData(priceDataClone);
            handleEditAttributes(priceDataClone)
        })
        setDefaultTableHead(dataHead);
    }


    const ChangeHeadTitleColor = (e, index) => {
        e.preventDefault();
        let dataHead = {...defaultTableHead};
        let priceDataClone = {...priceData};
        checkChange(true);
        dataHead.color[index] = e.target.value;
        Object.keys(priceData).map((items, indexes) => {
            priceData[items].fetures.color[index].name = e.target.value;
            setPriceData(priceDataClone);
            handleEditAttributes(priceDataClone)
        })
        setDefaultTableHead(dataHead);
    }


    const removeChipset = (e, name) => {
        e.preventDefault();
        checkChange(true)
        let tagList = [...chipset];
        let index = tagList.indexOf(name);
        if (index !== -1) {
            tagList.splice(index, 1);
            setChipset(tagList);
            handleTagDescription(tagList);
        }
    }

    const removeChipsetMetaData = (e, name) => {
        e.preventDefault();
        checkChange(true)
        let tagList = [...chipset];
        let index = tagList.indexOf(name);
        if (index !== -1) {
            tagList.splice(index, 1);
            setChipset(tagList);
            handleTagDescription(tagList);
        }
    }


    const handleSwitchAddress = (event, status) => {
        event.preventDefault();
        checkChange(true);
        setSlugManage(status);
    }


    const handleDeleteImage = (e, id) => {
        e.preventDefault();
        let newGallery = gallery.filter(item => item.id !== id);
        setGallery(newGallery);
        handleGalleryDeletedId(id)
    }

    return (
        <>
            <ul className="nav nav-tabs tab-layout" role="tablist">

                <Tab active={true} id={"descript-tab"} href={"#descript"} title={"عنوان و عکس"} icon={"bx bxs-pencil"}/>
                <Tab id={"catdetail-tab"} href={"#catdetail"} title={"توضیحات  و دسته بندی"} icon={"bx bx-list-ul"}/>
                <Tab id={"price-tab"} href={"#price"} title={"قیمت و مشخصات"} icon={"bx bx-dollar-circle"}/>
                <Tab id={"seo-tab"} href={"#seo"} title={"سئو و آدرس"} icon={"bx bxl-internet-explorer"}/>

            </ul>
            <div className="tab-content" style={{padding: 0, position: 'relative'}}>

                <div className="tab-pane active" id="descript" aria-labelledby="descript-tab" role="tabpanel">
                    <div className={"content-pages"}>
                        <div className={"row"} style={{padding: '20px'}}>
                            <div className={"col-lg-8 col-md-8 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>عنوان محصول</label>
                                    <input type={"text"} defaultValue={titleDefaultValue()}
                                           onChange={e => onChangeInput(e)}
                                           name={"title"} id={"title"}
                                           id={"pro-title"}
                                           className={"form-control titleCat"}/>
                                </fieldset>
                            </div>
                            <div className={"col-lg-4 col-md-4 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>وضعیت نمایش</label>
                                    <Switcher
                                        defaultState={defaultValuePro ? defaultValuePro.status == "active" ? true : false : true}
                                        handleSwitchStatus={handleSwither}
                                        name={"showState"}
                                        valueActive={"فعال"}
                                        valueDeActive={"غیرفعال"}/>
                                </fieldset>
                            </div>
                            <div className={"col-12"}>
                                <FilesShopContext.Provider value={{allFiles, setAllFiles}}>
                                    <Doka imageList={gallery} handleDeleteImage={handleDeleteImage}/>
                                </FilesShopContext.Provider>

                            </div>
                        </div>


                    </div>
                </div>


                <div className="tab-pane" id="catdetail" aria-labelledby="catdetail-tab" role="tabpanel">
                    <div className={"row"} style={{padding: '20px'}}>
                        <div className="col-md-6" id={"inAddings"}>
                            <label>دسته بندی</label>
                            <MultiSelected name={"categories"} data={categoryData ? categoryData : []}
                                           defSelected={defaultValuePro.category_list ? defaultValuePro.category_list : []}
                                           selected={item => categoryOnChange(item)}
                            />
                        </div>

                        <div className={"col-lg-6 col-md-12 col-sm-12"} style={{padding: '0px 30px'}}>
                            <label htmlFor={"title"}>کلمات کلیدی صفحه ( تایپ کنید و Enter بزنید تا اضافه شود.
                                )</label>
                            <div className={"row"}>

                                <div className={"col-12"} id={"chip-box"} style={{minHeight: 50}}>
                                    <div className={"row"}>

                                        <div className={"col-sm-12 col-md-5 col-lg-5"}>
                                            <ChipsetHandler
                                                onChange={handleAddChip}/>
                                        </div>

                                        {chipset.map((item, index) => (
                                            _renderChipsetContent(index, item)
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"col-12"}>
                            <MyEditor editorDataFunc={editorData}
                                      id={"my-editor"}
                                      type={"perfect"}
                                      defaultVal={defaultValuePro ? defaultValuePro.content : ''}
                            />
                        </div>
                    </div>
                </div>
                <div className="tab-pane" id="price" aria-labelledby="price-tab" role="tabpanel">
                    <div className={"content-pages"} style={{padding: '20px'}}>
                        <div className={"row"}>
                            <div className={"col-12"}>
                                <p>اطلاعات تکمیلی محصول شامل رنگ، سایز، موجودی انبار، قیمت و... را در بخش زیر
                                    وارد
                                    کنید.</p>
                                <a id={"add-future"} style={{zIndex: 9999}} className={"mr-1 mb-1"}
                                   onClick={e => HandleFeture(e)}>
                                    <i className={"bx bx-plus"}></i>&nbsp;&nbsp;ویژگی
                                    جدید &nbsp;&nbsp;
                                </a>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                        <tr className={"product-table-head"}>
                                            <th id={"color-col"}>کدکالا</th>
                                            <th id={"color-col"}>قیمت</th>
                                            <th id={"color-col"}>موجودی</th>
                                            <th id={"color-col"}>محدودیت</th>


                                            {defaultTableHead.text.map((items, index) => (
                                                <th key={index} id={"color-col"}>
                                                    <input className={"top-table-input"} type={"text"}
                                                           onChange={e => ChangeHeadTitleText(e, index)}
                                                           value={items}/>
                                                </th>
                                            ))}

                                            {defaultTableHead.color.map((items, index) => (
                                                <th key={index} id={"color-col"}>
                                                    <input className={"top-table-input"} type={"text"}
                                                           onChange={e => ChangeHeadTitleColor(e, index)}
                                                           value={items}/>
                                                </th>
                                            ))}


                                            <th>
                                                عملیات ها
                                            </th>
                                        </tr>


                                        </thead>

                                        <tbody>

                                        {
                                            Object.keys(priceData).length == Object.keys(stateData).length ?
                                                Object.keys(stateData).map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td style={{maxWidth: '120px', padding: '0 10px'}}>
                                                                     <span style={{textAlign: 'center'}}
                                                                           className={"not-alloeds"}>{"RI_" + item}</span>
                                                            </td>
                                                            <td><span
                                                                onClick={e => handleDispatchAttr(e, item, "price", stateData[item].attributes.price, stateData[item].attributes.discount)}>{stateData[item].attributes.discount && stateData[item].attributes.discount !== 0 ? stateData[item].attributes.discount + " تومان " : stateData[item].attributes.price == 0 ? "رایگان" : stateData[item].attributes.price + "تومان"} </span>
                                                            </td>
                                                            <td><span
                                                                onClick={e => HandleInventory(e, item, "count", stateData[item].attributes.count)}>{stateData[item].attributes.count === null ? 'نامحدود' : stateData[item].attributes.count}</span>
                                                            </td>
                                                            <td><span
                                                                onClick={e => HandleLimited(e, item, "limit", stateData[item].attributes.limit)}>{stateData[item].attributes.limit === null ? stateData[item].attributes.count ? stateData[item].attributes.count : 'نامحدود' : stateData[item].attributes.limit}</span>
                                                            </td>
                                                            {renderFitureText(stateData[item].fetures.text, item)}
                                                            {renderFitureColor(stateData[item].fetures.color, item)}

                                                            {console.log("llllllll state data", stateData[item].attributes)}
                                                            <td id={"actions-item"}>
                                                                {stateData[item].attributes.link ? (
                                                                    <a id={"link-buy"} target={"_blank"}
                                                                       className={"active"}
                                                                       href={stateData[item].attributes.link}>
                                                                        <i className={"bx bx-link"}></i>
                                                                        لینک خرید
                                                                    </a>
                                                                ) : (
                                                                    <a id={"link-buy"}>
                                                                        <i className={"bx bx-link"}></i>
                                                                        لینک خرید
                                                                    </a>
                                                                )}

                                                                <a onClick={e => deleteColAttr(e, item)}>
                                                                    <i id={"del-fet"} className="bx bx-trash"></i>
                                                                </a>
                                                            </td>
                                                        </tr>

                                                    )
                                                }) : Object.keys(priceData).map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td style={{maxWidth: '120px', padding: '0 10px'}}>
                                                                <a style={{textAlign: 'center'}}
                                                                   className={"not-alloeds"}>{"RI_" + item}</a>
                                                            </td>
                                                            <td><span
                                                                onClick={e => handleDispatchAttr(e, item, "price", priceData[item].attributes.price, priceData[item].attributes.discount)}>{priceData[item].attributes.discount && priceData[item].attributes.discount !== 0 ? priceData[item].attributes.discount + " تومان " : priceData[item].attributes.price == 0 ? "رایگان" : priceData[item].attributes.price + "تومان"}</span>
                                                            </td>
                                                            <td><span
                                                                onClick={e => HandleInventory(e, item, "count", priceData[item].attributes.count)}>{priceData[item].attributes.count === null ? 'نامحدود' : priceData[item].attributes.count}</span>
                                                            </td>
                                                            <td><span
                                                                onClick={e => HandleLimited(e, item, "limit", priceData[item].attributes.limit)}>{priceData[item].attributes.limit === null ? priceData[item].attributes.count ? priceData[item].attributes.count : 'نامحدود' : priceData[item].attributes.limit}</span>
                                                            </td>
                                                            {renderFitureText(priceData[item].fetures.text, item)}
                                                            {renderFitureColor(priceData[item].fetures.color, item)}
                                                            <td id={"actions-item"}>
                                                                {console.log("llllllll price data", priceData[item].attributes)}
                                                                {priceData[item].attributes.link ? (
                                                                    <a id={"link-buy"} className={"active"}
                                                                       target={"_blank"}
                                                                       href={priceData[item].attributes.link}>
                                                                        <i className={"bx bx-link"}></i>
                                                                        لینک خرید
                                                                    </a>
                                                                ) : (
                                                                    <a id={"link-buy"}>
                                                                        <i className={"bx bx-link"}></i>
                                                                        لینک خرید
                                                                    </a>
                                                                )}
                                                                <a onClick={e => deleteColAttr(e, item)}>
                                                                    <i id={"del-fet"} className="bx bx-trash"></i>
                                                                </a>
                                                            </td>
                                                        </tr>

                                                    )
                                                })
                                        }

                                        </tbody>
                                    </table>

                                </div>
                                <div className={"col-md-3"} style={{padding: 0}}>
                                    <a className={"btn btn-primary"}
                                       onClick={e => HandleAddNew(e)}
                                       style={{
                                           width: '100%',
                                           color: '#fff',
                                           cursor: 'pointer',
                                           marginTop: '20px'
                                       }}>
                                        <i className={"bx bx-plus"}></i> &nbsp;
                                        اضافه کردن تنوع محصول
                                        &nbsp;
                                    </a>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>


                <div className="tab-pane" id="seo" aria-labelledby="seo-tab" role="tabpanel">
                    <div className={"content-pages"} style={{padding: '20px'}}>
                        <div className={"row"}>
                            <div className={"col-lg-3 col-md-4 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label id={"selectParent"}>نوع آدرس</label>


                                    <Switcher defaultState={true}
                                              handleSwitchStatus={handleSwitchAddress}
                                              name={"AddressType"}
                                              valueActive={"خودکار"} valueDeActive={"دستی"}/>
                                </fieldset>
                            </div>

                            <div className={"col-lg-9 col-md-8 col-sm-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس صفحه دسته بندی</label>
                                    {_renderSlug()}
                                </fieldset>
                            </div>

                            <div className={"col s12"}>
                                <div className={"alert alert-primary mb-2 col-12"} role={"alert"}>
                                    اطلاعات تیتر و توضیحات صفحه به صورت خودکار توسط ریسمان برای سئوی بهتر ایجاد
                                    می‌شوند.
                                    در صورتی که تمایل به شخصی‌سازی آن دارید، می‌توانید از بخش زیر استفاده کنید.
                                </div>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>عنوان صفحه ( حداکثر 60 حرف )</label>
                                    <input type={"text"}
                                           defaultValue={metaDataUpdate ? metaDataUpdate.title : ''}
                                           onChange={e => handleMetaData(e)} name={"title"} id={"title"}
                                           className={"form-control"}/>


                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>توضیح صفحه ( حداکثر 155 حرف )</label>
                                    <textarea
                                        defaultValue={metaDataUpdate ? metaDataUpdate.content : ''}
                                        type={"text"}
                                        onChange={e => handleMetaData(e)} name={"content"}
                                        id={"title"}
                                        className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <label htmlFor={"title"}>کلمات کلیدی صفحه ( تایپ کنید و Enter بزنید تا اضافه
                                    شود.
                                    )</label>
                                <div className={"row"} style={{padding: '15px'}}>
                                    <div className={"col-12"} id={"chip-box"}>
                                        <div className={"row"} style={{overflow: 'hidden'}}>
                                            <div className={"col-sm-12 col-md-5 col-lg-5"}>
                                                <ChipsetHandler
                                                    onChange={handleAddChipMetaData}/>
                                            </div>

                                            {console.log("_______________", seoChipset)}
                                            {seoChipset ? seoChipset.map((item, index) => (
                                                _renderChipsetMetaData(index, item)
                                            )) : ''}

                                        </div>

                                    </div>
                                </div>


                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس داخلی برای انتقال (301 Redirect)</label>
                                    <input type={"text"}
                                           defaultValue={metaDataUpdate ? metaDataUpdate.redirect : ''}
                                           onChange={e => handleMetaData(e)} name={"redirect"}
                                           id={"title"} className={"form-control"}/>

                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <fieldset className="form-group">
                                    <label htmlFor={"title"}>آدرس Canonical</label>
                                    <input
                                        defaultValue={metaDataUpdate ? metaDataUpdate.canonical : ''}
                                        onChange={e => handleMetaData(e)}
                                        name={"canonical"} type={"text"}
                                        id={"title"} className={"form-control"}/>
                                </fieldset>
                            </div>

                            <div className={"col-12"}>
                                <label>تنظیمات Robots</label>

                                <BigSwitcher status={states => componentHandler.HandlerBigSwitcher(states, checkChange)}
                                             name={"Robots"}
                                             valueOne={"غیرفعال"} valueTow={"noindex,follow"}
                                             defaultStatus={metaDataUpdate ? metaDataUpdate.robots : false}
                                             default={''}
                                             valueThree={"noindex,unfolow"}/>
                            </div>

                        </div>

                    </div>
                </div>


            </div>
        </>
    )


    function _renderChipsetContent(index, item) {
        return (
            <div key={index} className="chip mr-1">
                <div className="chip-body">
                    <span className="chip-text">{item}</span>
                    <div className="chip-closeable"
                         onClick={e => removeChipset(e, item)}>
                        <i className="bx bx-x"></i>
                    </div>
                </div>
            </div>
        )
    }

    function _renderChipsetMetaData(index, item) {
        return (
            <div key={index} className="chip mr-1">
                <div className="chip-body">
                    <span className="chip-text">{item}</span>
                    <div className="chip-closeable"
                         onClick={e => removeChipsetMetaData(e, item)}>
                        <i className="bx bx-x"></i>
                    </div>
                </div>
            </div>
        )
    }


    function _renderSlug() {
        // check auto or handle slug change
        let tit = $("input[name=title]").val() + "";
        if (slugManage) {
            let slugText;
            if (actionType === "duplicate") {
                slugText = helperFunction.contentFormData(edit || checkChange ? tit : handleMakeName(categoryData.name));
            } else if (actionType === "edit") {
                slugText = helperFunction.contentFormData(edit || checkChange ? tit : categoryData.name);
            } else {
                console.log("svsdvsdv", tit)
                slugText = tit !== '' ? helperFunction.contentFormData(tit) : '';

            }
            return (
                <div className={"fucks"}>
                    {slugText}
                </div>
            )
        } else {
            // handle change
            return (
                <input type={"text"}
                       defaultValue={categoryData.slug}
                       onChange={e => onChangeInput(e)}
                       name={"slug"} id={"title"}
                       className={"form-control slugest"}/>
            )
        }
    }
}

export default ProductParentForm;
