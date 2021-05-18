import React from 'react';
import './_Shared/style.scss';
import {RadioButton} from "./Component/RadioButton";
import {InputColor} from "./Component/InputColor";

const StyleSetting = () => {
    return (
        <>
            <div className={"container"} style={{padding: 0, margin: 0}}>
                <div className={"row"} style={{margin: 0, padding: 0}}>
                    <ul id={"color-selected"}>
                        <li>
                            <span>
                                رنگ دکمه ثبت
                            </span>

                            <div className={"close-color"}>
                                <input defaultValue={"#e91e63"} type={"color"}/>
                            </div>
                        </li>
                        <li>
                            <span>
                                رنگ متن ثبت
                            </span>

                            <div className={"close-color"}>
                                <input defaultValue={"#fff"} type={"color"}/>
                            </div>
                        </li>
                        <li>
                            <span>
                                رنگ زمینه
                            </span>

                            <div className={"close-color"}>
                                <input defaultValue={"#bdbdbd"} type={"color"}/>
                            </div>
                        </li>
                        <li>
                            <span>
                                رنگ فیلدها
                            </span>

                            <div className={"close-color"}>
                                <input defaultValue={"#fff"} type={"color"}/>
                            </div>
                        </li>
                        <li>
                            <span>
                                رنگ کادر فیلد
                            </span>

                            <div className={"close-color"}>
                                <input defaultValue="#f0f0f0" type={"color"}/>
                            </div>
                        </li>
                        <li>
                            <span>
                                رنگ متن
                            </span>

                            <div className={"close-color"}>
                                <input defaultValue={"#555"} type={"color"}/>
                            </div>
                        </li>
                    </ul>

                    <p style={{fontWeight: 900, padding: '15px 15px 0px'}}> انتخاب تم </p>

                    <div className={"container"} style={{borderBottom: '1px solid #eee'}}>
                            <div className={"row justify-content-center"}>
                                <div className={"col-3"} id={"theme-item"} style={{cursor: 'pointer'}}>
                                    <img src={"/images/default.png"} style={{width: 35}}/>
                                    <p style={{fontSize: 11, padding: '10px 0'}}>پیشفرض</p>
                                </div>

                                <div className={"col-3"} id={"theme-item"} style={{cursor: 'pointer'}}>
                                    <img src={"/images/mohsen.png"} style={{width: 35}}/>
                                    <p style={{fontSize: 11, padding: '10px 0'}}>محسن</p>
                                </div>

                                <div className={"col-3"} id={"theme-item"} style={{cursor: 'pointer'}}>
                                    <img src={"/images/emran.png"} style={{width: 35}}/>
                                    <p style={{fontSize: 11, padding: '10px 0'}}>عمران</p>
                                </div>
                                <div className={"col-3"} id={"theme-item"} style={{cursor: 'pointer'}}>
                                    <img src={"/images/nima.png"} style={{width: 35}}/>
                                    <p style={{fontSize: 11, padding: '10px 0'}}>نیما</p>
                                </div>
                            </div>
                    </div>

                    <p style={{fontWeight: 900, padding: '15px 15px 0px'}}> تصویر پس زمینه </p>

                    <div className={"uploadImageStyle"}>
                        <input type={"file"} name={"backgroundImage"} />
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;برای آپلود تصویر کلید کنید&nbsp;&nbsp;&nbsp;&nbsp;<i className={"bx bx-upload"}></i>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    </div>


                    <RadioButton name={"showBackType"} first={"تمام صفحه"} sec={"بالای صفحه"} label={"نوع نمایش پس زمینه"} />

                    <InputColor label={"سایه پس زمینه"}  name={"background-shadow"} />

                </div>
            </div>
        </>
    )
}

export default StyleSetting;
