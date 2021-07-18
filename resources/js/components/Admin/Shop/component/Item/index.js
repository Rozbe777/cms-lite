import React, {useContext, useEffect} from 'react';
import './_Shared/style.scss'
import $ from 'jquery';
import {CHECK_BOX_CONTENT} from "../../../UserList/Helper/Context";
import {separate, info} from "../../../../../helper";

const Index = ({data, checkStateOfOut, sizeOf,onEdit, checkBoxSelected, onDuplicate, onDelete}) => {
    const {checkBox, setCheckBox} = useContext(CHECK_BOX_CONTENT)

    useEffect(() => {
        checkTest();
        checkBox.map(item => {
            $(".item-product.id_" + item).addClass("activeCheck");
            $("input#checkbox_" + item).prop("checked", true);
        })
    })

    function checkTest() {
        if (checkStateOfOut.length == sizeOf) {
            checkStateOfOut.map(item => {
                $(".item-product.id_" + item).addClass("activeCheck");
                $("input[name=product_" + item + "]").prop("checked", true);
            })
        } else if (checkStateOfOut.length == 0) {
            $(".item-product").removeClass("activeCheck");
            $(".itemcheckboxed").prop("checked", false);
        }
    }


    const HandlePushCheck = (check, idGet) => {
        let checkBoxx = [...checkBox];
        var filterRes = checkBoxx.indexOf(idGet);
        if (filterRes !== -1 || check === false) {
            checkBoxx.splice(filterRes, 1);
            setCheckBox(checkBoxx);
        } else {
            checkBoxx.push(idGet);
            setCheckBox(checkBoxx)
        }

    }

    const show = (url) => {
        window.open(url, "_blank")
    }
    const checkboxChange = (e, id) => {

        if (e.target.checked) {
            $("html, body").animate({scrollTop: 0}, 700);
            // $(".item-product.id_" + id).addClass("activeCheck");
            HandlePushCheck(true, id)
        } else {
            $(".item-product.id_" + id).removeClass("activeCheck");
            checkBoxSelected("removed", id);
            HandlePushCheck(false, id)

        }
    }

    const handleFasrChange = e => {
        e.preventDefault();
        info("به زودی ارائه می گردد")
    }

    return (
        <div className={"col-lg-3 col-md-4 col-sm-12"} id={"product-item"} style={{padding: '8px !important'}}>
            <div className={"item-product  maxi id_" + data.id}>
                <div className={"header-box-pro"}>
                    <fieldset>
                        <div className={"checkbox"}>
                            <input type={"checkbox"} className={"checkbox-input itemcheckboxed"}
                                   name={"product_" + data.id}
                                   id={"checkbox_" + data.id} onChange={e => checkboxChange(e, data.id)}/>
                            <label htmlFor={"checkbox_" + data.id}></label>
                        </div>
                    </fieldset>
                </div>

                {data.image_url !== "" && data.image_url !== "0" ? (
                    <div className={"image-src"}>
                        <img className={"default"} src={data.image_url} alt=""/>
                    </div>
                ) : (
                    <div className={"image"}>
                        <img className={"default"} src="/images/avatar.jpg" alt=""/>
                    </div>
                )}
                <ul>
                    <li>
                        <p id={"title"}>{data.title}</p>
                    </li>
                    <li>
                        <span>&nbsp;&nbsp;12 <i className={"bx bx-cart"}
                                                style={{fontSize: '14px'}}></i>&nbsp;&nbsp; </span>
                        <span style={{float: 'right'}}>&nbsp;&nbsp;<h5 style={{
                            float: "right",
                            padding: 0,
                            marginTop: '8px',
                            fontSize: 14,
                            fontWeight: 100
                        }}>12</h5> <i className={"bx bx-show"} style={{
                            float: 'right',
                            fontSize: 17,
                            marginTop: 10,
                            marginRight: 5
                        }}></i>&nbsp;&nbsp; </span>
                        <span>{data.price !== 0 ? separate(data.price) + " تومان " : 'رایگان'}</span>
                    </li>
                </ul>

                <div className={"back-show-detail-pro"}>

                    <div className={"manage-pro"}>
                        <a className={"btn"} onClick={e => onEdit(e ,data)}>ویرایش</a>
                        <a className={"btn btn-primary"} onClick={e => handleFasrChange(e)}>ویرایش سریع</a>
                    </div>

                    <div className={"footer-manage-pro"}>
                        <i className={"bx bx-trash-alt"} onClick={e => onDelete(e,data.id)}></i>
                        <i className={"bx bx-duplicate"} onClick={e => onDuplicate(e , data)}></i>
                        <i className={"bx bx-link-alt"} onClick={e => show(data.url)} id={"right"}></i>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Index;
