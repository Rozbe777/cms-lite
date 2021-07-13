import React, {useContext, useEffect} from 'react';
import './_Shared/style.scss';
import {Request} from './../../../../services/AdminService/Api';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
import {ErroHandle, error as ErrorToast} from "../../../../helper";
import $ from "jquery";

export const Item = ({
                         contentAllData,
                         thisItemData,
                         onDelete,
                         onEdit,
                         onDuplicate,
                     }) => {


    useEffect(() => {
        $("div#li-div").mouseover(function () {
            // $("#li-div div#moreOpp").removeClass("active")
            $(this).find("#moreOpp").addClass("active")
            $(this).find("#sub-menu-custom i").addClass("active")

        })
        $("div#li-div").mouseout(function () {
            // $("#li-div div#moreOpp").removeClass("active")
            $("#li-div #moreOpp").removeClass("active")
            $(this).find("#sub-menu-custom i").removeClass("active")
        })
    }, [])

    const show = (e, url) => {
        window.open(url, "_blank")
    }
    const {checkBox, setCheckBox} = useContext(CHECK_BOX_CONTENT)
    // handle delete single item by category id
    const HandlePushCheck = (e, idGet) => {
        let checkBoxx = [...checkBox];
        let checkState = e.target.checked;
        var filterRes = checkBoxx.indexOf(idGet);
        $("html, body").animate({scrollTop: 0}, 700);
        if (filterRes !== -1 && checkState === false) {
            checkBoxx.splice(filterRes, 1);
            checkBoxx.splice(filterRes, 1);
            setCheckBox(checkBoxx);
        } else {
            checkBoxx.push(idGet);
            setCheckBox(checkBoxx)
        }
    }


    return (
        <div id={"li-div"} className={"mini"}>
            <div className={"row"} style={{padding: '0 20px', position: 'relative'}}>
                <div className={"col-md-6 col-sm-8"} style={{padding: '12px 12px'}}>
                    <fieldset style={{float: "right"}}>
                        <div className="checkbox">
                            <input type="checkbox" name={"checkbox_content_" + thisItemData.id}
                                   onChange={e => HandlePushCheck(e, thisItemData.id)}
                                   className="checkbox-input"
                                   id={thisItemData.id}/>
                            <label htmlFor={thisItemData.id}></label>
                        </div>
                    </fieldset>
                    <span id={"item-tree-show"}>{thisItemData.title}</span>
                    <div id={"sub-menu-custom"}>
                        <i className={"bx bx-chevron-down"}></i>
                    </div>
                    <div className={"col-12 " + thisItemData.id} id={"moreOpp"}>
                        {_renderButtonAction()}
                        {_renderStatus(thisItemData.status)}
                    </div>
                </div>
                <div className={"col-md-6 col-sm-4"} style={{padding: 13}} id={"icon-item-list"}>
                    <div className={"form-check"}>
                        {_renderButtonAction()}
                        {_renderStatus(thisItemData.status)}
                    </div>
                </div>
            </div>
        </div>
    )

    function _renderButtonAction() {
        return (
            <React.Fragment>
                <i className={"bx bx-show"} onClick={e => show(e, thisItemData.url)}></i>
                <i className={"bx bx-trash-alt"} onClick={e => onDelete(e, thisItemData.id  , thisItemData.title)}></i>
                <i className={"bx bx-edit"} onClick={e => onEdit(e , thisItemData)}></i>
                <i className={"bx bx-duplicate"} onClick={e => onDuplicate(e , thisItemData)}></i>
            </React.Fragment>
        )
    }

    function _renderStatus(contentStatus) {
        if (contentStatus == "active") {
            return (
                <span className={"badge badge-success badge-pill ml-50"}>فعال</span>
            )
        } else {
            return (
                <span className={"badge badge-warning badge-pill ml-50"}>غیرفعال</span>
            )
        }
    }
}
