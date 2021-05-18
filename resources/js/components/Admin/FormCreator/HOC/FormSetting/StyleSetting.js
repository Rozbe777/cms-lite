import React, {useContext, useEffect} from 'react';
import './_Shared/style.scss';
import {RadioButton} from "./Component/RadioButton";
import {InputColor} from "./Component/InputColor";
import {FormTheme} from "../../Helper/Context";

const StyleSetting = () => {
    const {formTheme, setFormTheme} = useContext(FormTheme)
    const handleChangeTheme = e => {
        setFormTheme({
            ...formTheme,
            [e.target.name]: e.target.value
        });
    }

    let old


    useEffect(() => {
        $(function () {
            $("#choose-theme #theme-item").hover(function () {
                let themes = $(this).attr("attr-names");
                if (themes == "emran") {
                    setFormTheme(emran);
                } else if (themes == "mohsen") {
                    setFormTheme(mohsen);
                } else if (themes == "nima") {
                    setFormTheme(nima);
                } else {
                    setFormTheme(defaultTheme);
                }

            }, function () {
                let oldTheme = localStorage.getItem("selTheme");
                if (oldTheme == "emran") {
                    setFormTheme(emran);
                } else if (oldTheme == "mohsen") {
                    setFormTheme(mohsen);
                } else if (oldTheme == "nima") {
                    setFormTheme(nima);
                } else {
                    setFormTheme(defaultTheme);
                }
            })
        })

    }, [])


    const mohsen = {
        buttonBackground: '#333333',
        buttonColor: '#2ECC40',
        bodyBackground: '#111111',
        inputBackground: '#533110',
        inputBorder: '#FF851B',
        textColor: '#FF851B',
        placeholderColor: '#FF851B',
        topEditorColor: '#111111',
        editorIcon: '#FF851B',
        iconHoverColor: '#000000',
        editorContentColor: '#FF851B',
        editorContentBackground: '#111111',
    }


    const defaultTheme = {
        buttonBackground: '#e91e63',
        buttonColor: '#ffffff',
        bodyBackground: '#ffffff',
        inputBackground: '#ffffff',
        inputBorder: '#f0f0f0',
        textColor: '#555555',
        placeholderColor: '#000000',
        topEditorColor: '#fafafa',
        editorIcon: '#000000',
        iconHoverColor: '#ffffff',
        editorContentColor: '#000000',
        editorContentBackground: '#ffffff',
    }

    const emran = {
        buttonBackground: '#ffffff',
        buttonColor: '#010a31',
        bodyBackground: '#010a31',
        inputBackground: '#0d184e',
        inputBorder: '#0d184e',
        textColor: '#ffffff',
        placeholderColor: '#ffffff',
        topEditorColor: '#010a31',
        editorIcon: '#ffffff',
        iconHoverColor: '#000000',
        editorContentColor: '#ffffff',
        editorContentBackground: '#010a31',
    }

    const nima = {
        buttonBackground: '#d2af40',
        buttonColor: '#ffffff',
        bodyBackground: '#434e52',
        inputBackground: '#434e52',
        inputBorder: '#cdc39a',
        textColor: '#faeaad',
        placeholderColor: '#cdc39a',
        topEditorColor: '#434e52',
        editorIcon: '#faeaad',
        iconHoverColor: '#434e52',
        editorContentColor: '#faeaad',
        editorContentBackground: '#434e52',
    }


    const handleTheme = (themeName, name) => {

        console.log("/////////" , themeName)
        localStorage.setItem("selTheme", name);
        setFormTheme(themeName);

    }


    return (
        <>
            <FormTheme.Provider value={{formTheme, setFormTheme}}>
                <div className={"container"} style={{padding: 0, margin: 0}}>
                    <div className={"row"} style={{margin: 0, padding: 0}}>
                        <ul id={"color-selected"}>
                            <li>
                            <span>
                                رنگ دکمه ثبت
                            </span>

                                <div className={"close-color"}>
                                    <input defaultValue={formTheme.buttonBackground}
                                           onChange={e => handleChangeTheme(e)} name={"buttonBackground"}
                                           type={"color"}/>
                                </div>
                            </li>
                            <li>
                            <span>
                                رنگ متن دکمه
                            </span>

                                <div className={"close-color"}>
                                    <input defaultValue={formTheme.buttonColor} onChange={e => handleChangeTheme(e)}
                                           name={"buttonColor"} type={"color"}/>
                                </div>
                            </li>
                            <li>
                            <span>
                                رنگ زمینه
                            </span>

                                <div className={"close-color"}>
                                    <input defaultValue={formTheme.bodyBackground} onChange={e => handleChangeTheme(e)}
                                           name={"bodyBackground"} type={"color"}/>
                                </div>
                            </li>
                            <li>
                            <span>
                                رنگ فیلدها
                            </span>

                                <div className={"close-color"}>
                                    <input defaultValue={formTheme.inputBackground} onChange={e => handleChangeTheme(e)}
                                           name={"inputBackground"} type={"color"}/>
                                </div>
                            </li>
                            <li>
                            <span>
                                رنگ کادر فیلد
                            </span>

                                <div className={"close-color"}>
                                    <input defaultValue={formTheme.inputBorder} onChange={e => handleChangeTheme(e)}
                                           name={"inputBorder"} type={"color"}/>
                                </div>
                            </li>
                            <li>
                            <span>
                                رنگ متن
                            </span>

                                <div className={"close-color"}>
                                    <input defaultValue={formTheme.textColor} onChange={e => handleChangeTheme(e)}
                                           name={"textColor"} type={"color"}/>
                                </div>
                            </li>
                            <li>
                            <span>
                                رنگ متن داخلی فیلد
                            </span>

                                <div className={"close-color"}>
                                    <input defaultValue={formTheme.placeholderColor}
                                           onChange={e => handleChangeTheme(e)} name={"placeholderColor"}
                                           type={"color"}/>
                                </div>
                            </li>
                            <li>
                            <span>
                                رنگ هدر ویرایشگر حرفه ای متن
                            </span>

                                <div className={"close-color"}>
                                    <input defaultValue={formTheme.topEditorColor} onChange={e => handleChangeTheme(e)}
                                           name={"topEditorColor"} type={"color"}/>
                                </div>
                            </li>

                            <li>
                            <span>
                                رنگ آیکون های ویرایشگر حرفه ای متن
                            </span>

                                <div className={"close-color"}>
                                    <input defaultValue={formTheme.editorIcon} onChange={e => handleChangeTheme(e)}
                                           name={"editorIcon"} type={"color"}/>
                                </div>
                            </li>
                            <li>
                            <span>
                                رنگ آیکون های ویرایشگر زمان حرکت موس روی آنها
                            </span>

                                <div className={"close-color"}>
                                    <input defaultValue={formTheme.iconHoverColor} onChange={e => handleChangeTheme(e)}
                                           name={"iconHoverColor"} type={"color"}/>
                                </div>
                            </li>
                            <li>
                            <span>
                                رنگ متن محل تایپ ویرایشگر حرفه ای متن
                            </span>

                                <div className={"close-color"}>
                                    <input defaultValue={formTheme.editorContentColor}
                                           onChange={e => handleChangeTheme(e)} name={"editorContentColor"}
                                           type={"color"}/>
                                </div>
                            </li>
                            <li>
                            <span>
                                رنگ پس زمینه محل تایپ ویرایشگر حرفه ای متن
                            </span>

                                <div className={"close-color"}>
                                    <input defaultValue={formTheme.editorContentBackground}
                                           onChange={e => handleChangeTheme(e)} name={"editorContentBackground"}
                                           type={"color"}/>
                                </div>
                            </li>
                        </ul>

                        <p style={{fontWeight: 900, padding: '15px 15px 0px'}}> انتخاب تم </p>

                        <div className={"container"} style={{borderBottom: '1px solid #eee'}}>
                            <div className={"row justify-content-center"} id={"choose-theme"}>
                                <div className={"col-3"} id={"theme-item"}
                                     onClick={e => handleTheme(defaultTheme, "defaultTheme")}
                                     attr-names={"defaultTheme"}
                                     style={{cursor: 'pointer'}}>
                                    <img src={"/images/default.png"} style={{width: 35}}/>
                                    <p style={{fontSize: 11, padding: '10px 0'}}>پیشفرض</p>
                                </div>

                                <div className={"col-3"} id={"theme-item"} onClick={e => handleTheme(mohsen, "mohsen")}
                                     attr-names={"mohsen"}
                                     style={{cursor: 'pointer'}}>
                                    <img src={"/images/mohsen.png"} style={{width: 35}}/>
                                    <p style={{fontSize: 11, padding: '10px 0'}}>محسن</p>
                                </div>

                                <div className={"col-3"} id={"theme-item"} onClick={e => handleTheme(emran, "emran")}
                                     attr-names={"emran"}
                                     style={{cursor: 'pointer'}}>
                                    <img src={"/images/emran.png"} style={{width: 35}}/>
                                    <p style={{fontSize: 11, padding: '10px 0'}}>عمران</p>
                                </div>
                                <div className={"col-3"} id={"theme-item"} onClick={e => handleTheme(nima, "nima")}
                                     attr-names={"nima"}
                                     style={{cursor: 'pointer'}}>
                                    <img src={"/images/nima.png"} style={{width: 35}}/>
                                    <p style={{fontSize: 11, padding: '10px 0'}}>نیما</p>
                                </div>
                            </div>
                        </div>

                        <p style={{fontWeight: 900, padding: '15px 15px 0px'}}> تصویر پس زمینه </p>

                        <div className={"uploadImageStyle"}>
                            <input type={"file"} name={"backgroundImage"}/>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;برای آپلود تصویر کلید کنید&nbsp;&nbsp;&nbsp;&nbsp;<i
                                className={"bx bx-upload"}></i>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                        </div>


                        <RadioButton name={"showBackType"} first={"تمام صفحه"} sec={"بالای صفحه"}
                                     label={"نوع نمایش پس زمینه"}/>

                        <InputColor label={"سایه پس زمینه"} name={"background-shadow"}/>

                    </div>
                </div>
            </FormTheme.Provider>

        </>
    )
}

export default StyleSetting;
