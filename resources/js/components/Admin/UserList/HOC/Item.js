import React, {useContext, useEffect, useState} from 'react';
import './../_shared/style.scss'
import $ from 'jquery';
import {CHECK_BOX_CONTENT} from "../Helper/Context";

export const Item = (props) => {

    useEffect(() => {
        let interValOption;
        $("a.moreOptions").mouseover(function (e) {
            clearInterval(interValOption)
            interValOption = setInterval(() => {
                $("a.moreOptions ul").removeClass("activeSet")
                let elems = $('ul ', this);
                elems.addClass("activeSet");
            }, 300)
        })
        $("a.moreOptions").mouseout(function (e) {
            clearInterval(interValOption)
            interValOption = setInterval(() => {
                $("a.moreOptions ul").removeClass("activeSet")
            }, 300)
        })
    }, [])

    const [data, setData] = useState({})
    const {checkBox, setCheckBox} = useContext(CHECK_BOX_CONTENT);
    let {id, name , last_name, email, persianStatus, userRole, mobile} = props.props;

    const checkBoxCheck = (e) => {
        let dataCheck = [...checkBox];
        if (e.target.checked) {
            dataCheck.push(id)
        } else {
            var index = dataCheck.indexOf(id)
            if (index != -1) {
                dataCheck.splice(index, 1);
            }
        }
        setCheckBox(dataCheck)
    }


    const openMoreDet = e => {
        e.preventDefault();

        let statuss = persianStatus == "فعال" ? '<a class="checkActivate">فعال</a>' :
            '<a class="checkDeActivate">غیرفعال</a>';

        let roles = userRole == "admin" ? "مدیر" : "کاربر";
        document.querySelector("li#fullname").innerHTML = "&nbsp;" + name + " " + last_name + "&nbsp;";
        document.querySelector("li#mobile").innerHTML = "&nbsp;" + mobile + "&nbsp;";
        document.querySelector("li#email").innerHTML = "&nbsp;" + email ? email : "ثبت نشده" + "&nbsp;";
        document.querySelector("li#status").innerHTML = "&nbsp;" + statuss + "&nbsp;";
        document.querySelector("li#role").innerHTML = "&nbsp;" + roles + "&nbsp;";

        console.log("full name", props.props)
        $("#back-loader-detail").fadeIn();
        setTimeout(() => {
            $(".more-detail-user").addClass("activeShowDetail");
            $(".more-detail-user span#close").addClass("activeCloseDetail");
        }, 300)
    }

    const closeClik = e => {
        e.preventDefault();
        $(".more-detail-user").removeClass("activeShowDetail");
        $(".more-detail-user span#close").removeClass("activeCloseDetail");
        setTimeout(() => {
            $("#back-loader-detail").fadeOut();
        }, 300)
    }

    return (
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <>
                <div className={"col-12 itemUserShow"}>

                    <fieldset id={"checkbox-fieldset"}>
                        <div className={"checkbox"}>
                            <input type={"checkbox"} checked={checkBox.indexOf(id) == -1 ? false : true}
                                   onChange={e => checkBoxCheck(e)} name={"checkbox_check_" + id}
                                   className={"checkbox-input"} id={id}/>
                            <label htmlFor={id}></label>
                        </div>
                    </fieldset>
                    <span>
                <a className={"role"}>{name + " " +last_name}</a>
            </span>

                    <span className={"d-none d-lg-block"}>
                {persianStatus == "فعال" ? (<a className={"activeUser"}>فعال</a>) : (
                    <a className={"deactiveUser"}>غیرفعال</a>)} &nbsp;&nbsp;    وضعیت :&nbsp;&nbsp;
            </span>

                    <span className={"d-none d-lg-block"}>
              <a className={"role"}>{userRole == "admin" ? "مدیر" : "کاربر"}</a> &nbsp;&nbsp;    نقش :&nbsp;&nbsp;
            </span>

                    <span className={"final"} className={"d-none d-lg-block"}>
              <a className={"role"}> {mobile ? mobile : "ندارد"} </a>  <p id={"labels"}>تلفن : </p>
            </span>


                    <a className={"moreOptions"}>
                        <i id={"moreicon"} className={"bx bx-dots-vertical-rounded"}></i>
                        <ul>

                            <a style={{color : '#727E8C'}} href={"users/"+id+"/edit"}>
                                <li>
                                    <i className={"bx bxs-pencil"}></i>
                                    ویرایش
                                </li>
                            </a>

                        </ul>
                    </a>
                    <a className={"more-details"} onClick={e => openMoreDet(e)}>
                        <i className={"bx bxs-show"}></i>
                    </a>
                </div>


                <div id={"back-loader-detail"}>
                    <div className={"more-detail-user"}>
                        <span id={"close"} onClick={e => closeClik(e)}>
                            <i className={"bx bx-x"}></i>
                        </span>

                        <div className={"content"}>
                            <ul>
                                <li>
                                    <ul>
                                        <li>&nbsp;نام و نام خانوادگی : &nbsp;</li>
                                        <li id={"fullname"}></li>
                                    </ul>
                                </li>

                                <li>
                                    <ul>
                                        <li>&nbsp;ایمیل : &nbsp;</li>
                                        <li id={"email"}></li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li>&nbsp;موبایل : &nbsp;</li>
                                        <li id={"mobile"}></li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>

                                        <li>&nbsp;وضعیت : &nbsp;</li>
                                        <li id={"status"}></li>
                                    </ul>
                                </li>
                                <li>
                                    <ul>
                                        <li>&nbsp;نقش :&nbsp;</li>
                                        <li id={"role"}></li>
                                    </ul>
                                </li>

                            </ul>
                        </div>

                    </div>
                </div>


            </>
        </CHECK_BOX_CONTENT.Provider>
    )
}
