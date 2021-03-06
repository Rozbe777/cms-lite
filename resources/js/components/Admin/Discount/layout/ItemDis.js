import React, {useContext, useEffect} from "react";
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
import $ from "jquery";


export const ItemDis = ({
                            data,
                            checkStateOfOut,
                            sizeOf,
                            handleDelete,
                            handleCheck,
                            handleEdit,
                            selected: pushSelected
                        }) => {


    const {checkBox, setCheckBox} = useContext(CHECK_BOX_CONTENT)
    useEffect(() => {
        checkTest();
        checkBox.map(item => {
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

    checkBox.map(item => {
        $("input#checkbox_" + item).prop("checked", true);
    })

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

    const HandleChange = (e, id) => {

        if (e.target.checked) {
            $("html, body").animate({scrollTop: 0}, 700);
            $(".item-product.id_" + id).addClass("activeCheck");
            HandlePushCheck(true, id)
        } else {
            $(".item-product.id_" + id).removeClass("activeCheck");
            handleCheck({type: "removed", id})
            HandlePushCheck(false, id)
        }
    }

    return (
        <div className={"item-discount"}>
            <div id={"detail-right"}>

                {/*<span id={"darsad"}>100 ????????</span>*/}

                <div className={"detail-right-action"}>

                    <fieldset>
                        <div className={"checkbox"}>
                            <input type={"checkbox"} className={"checkbox-input itemcheckboxed"}
                                   name={"product_" + data.id}
                                   id={"checkbox_" + data.id} onChange={e => HandleChange(e, data.id)}/>
                            <label htmlFor={"checkbox_" + data.id}></label>
                        </div>
                    </fieldset>

                    <i className={"bx bxs-trash"} onClick={e => handleDelete(e , data.id)}></i>
                    <i className={"bx bxs-pencil"} onClick={e => handleEdit(e, data.id)}></i>


                </div>
            </div>
            <div id={"detail-left"}>
                <p style={{margin: '0 5px', fontWeight: 100}}><span style={{
                    float: 'right',
                    fontSize: '15px',
                    fontWeight: 700,
                    marginLeft: 5
                }}>???? :</span> {data.code}</p>

                <p style={{margin: '0 5px', fontWeight: 100}}><span
                    style={{float: 'right', fontSize: '15px', fontWeight: 700, marginLeft: 5}}>?????? :</span>{
                    data.type == "free_delivery" ? "?????????? ????????????" : data.type == "percentage" ? "????????" : data.type == "fixed_price" ? "???????? ????????" : ''
                }</p>

                {data.status == "active" ? (
                    <span id={"status"} className={"active"}>????????</span>
                ) : (
                    <span id={"status"}>?????? ????????</span>

                )}
            </div>
        </div>
    )
}
