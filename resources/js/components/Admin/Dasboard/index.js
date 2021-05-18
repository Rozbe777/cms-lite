import React from 'react'
import ReactDOM from 'react-dom';
import './_Shared/style.scss'

const Dashboard = () => {
    return (
        <div className={"container-fluid"} style={{padding: 0}}>
            <div className={"col-12"} style={{padding: 0, margin: 0, position: 'relative'}} id={"rol-status-dashboard"}>
                <div id={"rol-status-header"}>
                    <p>برای تکمیل سریع‌تر فروشگاه مراحل زیر را انجام دهید</p>
                </div>
                <div id={"rol-status-body"}>
                    <ul>
                        <li data-toggle="tooltip" data-placement="top" title="Tooltip on top">
                            <div id={"content"}>
                                <div className={"check-status"}>
                                    <div className={"rounded"}>
                                        <div id={"faded"}></div>
                                    </div>
                                </div>
                                <p>آپلود لوگو</p>
                            </div>
                        </li>
                        <li>
                            <div id={"content"}>
                                <div className={"check-status"}>
                                    <div className={"rounded active"}>
                                        <div id={"faded"} className={"deactive"}></div>
                                        <i className={"bx bx-check"}></i>
                                    </div>
                                </div>
                                <p>اتصال دامنه</p>
                            </div>
                        </li>
                        <li>
                            <div id={"content"}>
                                <div className={"check-status"}>
                                    <div className={"rounded active"}>
                                        <div id={"faded"} className={"deactive"}></div>
                                        <i className={"bx bx-check"}></i>
                                    </div>
                                </div>
                                <p>اضافه کردن محصول</p>
                            </div>
                        </li>
                        <li>
                            <div id={"content"}>
                                <div className={"check-status"}>
                                    <div className={"rounded"}>
                                        <div id={"faded"}></div>
                                    </div>
                                </div>
                                <p>اضافه کردن دسته بندی</p>
                            </div>
                        </li>
                        <li>
                            <div id={"content"}>
                                <div className={"check-status"}>
                                    <div className={"rounded"}>
                                        <div id={"faded"}></div>
                                    </div>
                                </div>
                                <p>تنظیمات پرداخت</p>
                            </div>
                        </li>
                        <li>
                            <div id={"content"}>
                                <div className={"check-status"}>
                                    <div className={"rounded active"}>
                                        <div id={"faded"} className={"deactive"}></div>
                                        <i className={"bx bx-check"}></i>
                                    </div>
                                </div>
                                <p>تنظیمات ارسال</p>
                            </div>
                        </li>

                        <li>
                            <div id={"content"}>
                                <div className={"check-status"}>
                                    <div className={"rounded active"}>
                                        <div id={"faded"} className={"deactive"}></div>
                                        <i className={"bx bx-check"}></i>
                                    </div>
                                </div>
                                <p>تغییر پوسته</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;

if (document.getElementById("main-dashboard"))
{
    ReactDOM.render(<Dashboard /> , document.getElementById("main-dashboard"));
}
