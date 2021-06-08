import React from 'react';
import ReactDOM from 'react-dom';
import './_shared/style.scss'
import {BreadCrumbs} from "../UserList/HOC/BreadCrumbs";

const ThemeSetting = () => {


    const breadData = {
        title: 'انتخاب پوسته',
        desc: 'تنظیمات و مدیریت پوسته ها'
    };

    ReactDOM.render(<BreadCrumbs fixed={true} data={breadData} /> , document.getElementById("bradcrummmm"))
    return (
        <div className={"container"}>

            <div className={"row"} style={{padding: 15}}>

                <div className={"main-active-theme"}>

                    <div className={"row"}>


                        <div className={"col-5"}>

                            <span id={"activeTheme"}>پوسته فعال</span>
                            <h3 id={"activeThemeH3"}>پوسته مینیمال</h3>
                            <p style={{fontSize: '14px', width: '80%', height: 235}}>در صورت تمایل، با استفاده از بخش
                                شخصی‌سازی امکان اضافه کردن و جا به جایی بخش‌های جدید در پوسته را خواهید داشت.</p>

                            <button className={"btn btn-primary"}
                                    style={{float: 'right', width: '83%', fontSize: 13, height: 50}}>تنظیمات و شخصی سازی
                                پوسته
                            </button>

                        </div>


                        <div className={"col-7"} style={{position: 'relative'}}>

                            <div className={"big-img"}>
                                <div className={"header"}>


                                    <div className={"sss"}></div>


                                    <ul>
                                        <li style={{background: 'red'}}></li>
                                        <li style={{background: 'yellow'}}></li>
                                        <li style={{background: 'green'}}></li>
                                    </ul>


                                </div>
                                <img src={"/images/activeTheme.jpg"} width={"100%"}
                                     style={{height: '295px', borderRadius: '0 0 5px 5px'}}/>


                                <div className={"mid-img"}>
                                    <div className={"contents"}>
                                        <img src={"/images/activeTheme.jpg"} width={"100%"} height={"100%"}/>
                                    </div>
                                    <span></span>

                                </div>
                                <div className={"min-img"}>

                                    <div className="contents">
                                        <img src={"/images/mobile.jpg"} width={"100%"} height={"100%"}/>

                                    </div>

                                    <span></span>
                                    <div className={"spanTop"}></div>
                                </div>


                            </div>

                        </div>


                    </div>

                </div>

            </div>

            <div className={"row"} style={{padding: '10px 0'}}>



                <div className={"col-lg-4 col-md-4 col-sm-12"}>
                    <div className={"main-box-item"}>

                        <div id={"toppoint"}>
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>

                        <img src={"/images/activeTheme.jpg"}/>


                        <div className={"backHoverActive"}>
                            <div className={"contenBottom"}>
                                <p style={{color : '#fff' , padding :'0px 10px' , margin : 0 , fontSize : 17 , fontWeight : 300}}>پوسته اول</p>
                                <span>پوسته فعال</span>
                            </div>

                        </div>

                    </div>
                </div>



                <div className={"col-lg-4 col-md-4 col-sm-12 "}>
                    <div className={"main-box-item"}>

                        <div id={"toppoint"}>
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>

                        <img src={"/images/activeTheme.jpg"}/>


                        <div className={"backHover"}>
                            <div className={"contentBack"}>
                                <h4 style={{color: '#fff'}}>پوسته اول</h4>
                                <div className={"row"} style={{width: '100%'}}>
                                    <div className={"col-6"} style={{padding: '5px'}}>
                                        <button className={"btn btn-success"}
                                                style={{width: '100%', fontSize: 13, padding: '10px 7px'}}>فعال سازی
                                        </button>
                                    </div>
                                    <div className={"col-6"} style={{padding: '5px'}}>
                                        <button className={"btn btn-primary"}
                                                style={{width: '100%', fontSize: 13, padding: '10px 7px'}}>پیش نمایش
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>


                <div className={"col-lg-4 col-md-4 col-sm-12"}>
                    <div className={"main-box-item"}>

                        <div id={"toppoint"}>
                            <ul>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>

                        <img src={"/images/activeTheme.jpg"}/>


                        <div className={"backHover"}>
                            <div className={"contentBack"}>
                                <h4 style={{color: '#fff'}}>پوسته اول</h4>
                                <div className={"row"} style={{width: '100%'}}>
                                    <div className={"col-6"} style={{padding: '5px'}}>
                                        <button className={"btn btn-success"}
                                                style={{width: '100%', fontSize: 13, padding: '10px 7px'}}>فعال سازی
                                        </button>
                                    </div>
                                    <div className={"col-6"} style={{padding: '5px'}}>
                                        <button className={"btn btn-primary"}
                                                style={{width: '100%', fontSize: 13, padding: '10px 7px'}}>پیش نمایش
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>


            </div>

        </div>
    )
}


export default ThemeSetting;


var element = "theme_setting_component";
var docElem = document.getElementById(element);
if (docElem) {
    ReactDOM.render(<ThemeSetting/>, docElem);
}
