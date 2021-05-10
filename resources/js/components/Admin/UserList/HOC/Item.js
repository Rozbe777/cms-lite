import React, {useContext, useEffect} from 'react';
import './../_shared/style.scss'
import $ from 'jquery';
import {CHECK_BOX_CONTENT} from "../Helper/Context";

export const Item = (props) => {

    useEffect(() => {

    }, [])

    const {checkBox, setCheckBox} = useContext(CHECK_BOX_CONTENT);

    let {id, fullname, email, persianStatus, userRole} = props.props;

    $("a.moreOptions").on('click', function (e) {
        e.preventDefault()
        $("a.moreOptions ul").removeClass("activeSet");
        let elems = $('ul ', this);
        elems.addClass("activeSet");
    })


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


    return (
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <div className={"col-12 itemUserShow"}>
                <fieldset id={"checkbox-fieldset"}>
                    <div className={"checkbox"}>
                        <input type={"checkbox"} checked={checkBox.indexOf(id) == -1 ? false : true} onChange={e => checkBoxCheck(e)} name={"checkbox_check_"+id}
                               className={"checkbox-input"} id={id}/>
                        <label htmlFor={id}></label>
                    </div>
                </fieldset>
                <span>
                <a className={"role"}>{fullname}</a>
            </span>

                <span>
                {persianStatus == "فعال" ? (<a className={"activeUser"}>فعال</a>) : (
                    <a className={"deactiveUser"}>غیرفعال</a>)} &nbsp;&nbsp;    وضعیت :&nbsp;&nbsp;
            </span>

                <span>
              <a className={"role"}>{userRole == "admin" ? "مدیر" : "کاربر"}</a> &nbsp;&nbsp;    نقش :&nbsp;&nbsp;
            </span>

                <span className={"final"}>
              <a className={"role"}> {email} </a>  <p id={"labels"}>ایمیل : </p>
            </span>

                <a className={"moreOptions"}>
                    <i id={"moreicon"} className={"bx bx-dots-vertical-rounded"}></i>

                    <ul>
                        <li>
                            <i className={"bx bxs-pencil"}></i>
                            ویرایش

                        </li>
                    </ul>
                </a>
            </div>
        </CHECK_BOX_CONTENT.Provider>
    )
}
