import React, {useContext, useEffect} from 'react';
import './_Shared/style.scss';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
import $ from "jquery";

export const Item = ({
                         thisCategoryData,
                         level,
                         categoryData,
                         onEdit,
                         onDuplicate,
                         onAdd,
                         onDelete
                     }) => {

    // adding new item by click on ( + ) in category item
    const handleAdding = (e) => {
        e.preventDefault();
        onAdd(e, thisCategoryData.id)
    }


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

    const {checkBox, setCheckBox} = useContext(CHECK_BOX_CONTENT)

    const show = (e, url) => {
        e.preventDefault();
        window.open(url, "_blank")
    }


    const HandlePushCheck = (e, idGet) => {
        let checkBoxx = [...checkBox];
        let checkState = e.target.checked;
        let filterRes = checkBoxx.indexOf(idGet);

        if (filterRes !== -1) {
            checkBoxx.splice(filterRes, 1);
            setCheckBox(checkBoxx);
            if (thisCategoryData.childern) {
                if (checkState) {
                    thisCategoryData.childern.map(itemChil => {
                        let filterChild = checkBoxx.indexOf(itemChil.id);
                        if (filterChild !== -1) {
                            checkBoxx.splice(filterChild, 1);
                            setCheckBox(checkBoxx);
                        } else {
                            checkBoxx.push(itemChil.id);
                            setCheckBox(checkBoxx);
                        }

                        if (itemChil.children && checkState) {
                            itemChil.children.map(itemChilss => {
                                let filterChilds = checkBoxx.indexOf(itemChilss.id);
                                if (filterChilds !== -1) {
                                    checkBoxx.splice(filterChilds, 1);
                                    setCheckBox(checkBoxx);
                                } else {
                                    checkBoxx.push(itemChilss.id);
                                    setCheckBox(checkBoxx);
                                }
                            })
                        }


                    })
                } else {
                    thisCategoryData.childern.map(itemChil => {
                        let filterChild = checkBoxx.indexOf(itemChil.id);
                        if (filterChild !== -1) {
                            checkBoxx.splice(filterChild, 1);
                            setCheckBox(checkBoxx);
                        }

                        if (itemChil.children) {
                            itemChil.children.map(itemChilss => {
                                let filterChilds = checkBoxx.indexOf(itemChilss.id);
                                if (filterChilds !== -1) {
                                    checkBoxx.splice(filterChilds, 1);
                                    setCheckBox(checkBoxx);
                                }
                            })
                        }


                    })
                }

            } else if (thisCategoryData.children) {
                thisCategoryData.children.map(itemChilss => {
                    let filterChild = checkBoxx.indexOf(itemChilss.id);
                    if (filterChild !== -1) {
                        checkBoxx.splice(filterChild, 1);
                        setCheckBox(checkBoxx);
                    } else {
                        checkBoxx.push(itemChilss.id);
                        setCheckBox(checkBoxx);
                    }

                })
            } else {
                let filterChild = checkBoxx.indexOf(idGet);
                if (filterChild !== -1) {
                    checkBoxx.splice(filterChild, 1);
                    setCheckBox(checkBoxx);
                }


            }


        } else if (filterRes === -1) {
            checkBoxx.push(idGet);
            setCheckBox(checkBoxx);
            if (thisCategoryData.childern) {
                thisCategoryData.childern.map(itemChil => {
                    let filterChil1 = checkBoxx.indexOf(itemChil.id);
                    if (filterChil1 === -1) {
                        checkBoxx.push(itemChil.id);
                        setCheckBox(checkBoxx);
                        if (itemChil.children) {
                            itemChil.children.map(itemIdCh => {
                                let filterChild2 = checkBoxx.indexOf(itemIdCh.id);
                                if (filterChild2 === -1) {
                                    checkBoxx.push(itemIdCh.id);
                                    setCheckBox(checkBoxx);
                                }
                            })
                        }
                    }
                })
            } else if (thisCategoryData.children) {
                thisCategoryData.children.map(itemChil => {
                    let filterChil1 = checkBoxx.indexOf(itemChil.id);
                    if (filterChil1 !== -1) {
                    } else {
                        checkBoxx.push(itemChil.id);
                        setCheckBox(checkBoxx);
                    }
                })
            }
        } else {

        }

    }

    return (
        <div id={"li-div"} className={"mini"}>
            <div className={"row"} style={{padding: '0 20px', position: 'relative'}}>
                <div className={"col-md-6 col-sm-8"} style={{padding: 13}}>
                    <fieldset style={{float: "right"}}>
                        <div className="checkbox">
                            <input type="checkbox" name={"checkbox_" + thisCategoryData.id}
                                   onChange={e => HandlePushCheck(e, thisCategoryData.id)}
                                   className="checkbox-input"
                                   id={thisCategoryData.id}/>
                            <label htmlFor={thisCategoryData.id}></label>
                        </div>
                    </fieldset>
                    <span id={"item-tree-show"}>{thisCategoryData.name}</span>
                    <div id={"sub-menu-custom"} attr-ids={thisCategoryData.id}>
                        <i className={"bx bx-chevron-down"}></i>
                    </div>
                    <div className={"col-12 " + thisCategoryData.id} id={"moreOpp"}>

                        {_renderMenuInResponsive()}
                    </div>
                </div>


                <div className={"col-md-6 col-sm-4"} style={{padding: 13}} id={"icon-item-list"}>
                    <div className={"form-check"}>
                        {_renderMenuInResponsive()}
                    </div>
                </div>


            </div>

        </div>
    )


    function _renderMenuInResponsive() {
        return (
            <React.Fragment>
                {_renderLevelCheck()}
                <i className={"bx bx-show"} onClick={e => show(e, thisCategoryData.url)}></i>
                <i className={"bx bx-trash-alt"} onClick={e => onDelete(e, thisCategoryData.id)}></i>
                <i className={"bx bx-edit"} onClick={e => onEdit(e, thisCategoryData)}></i>
                <i className={"bx bx-duplicate"} onClick={e => onDuplicate(e, thisCategoryData)}></i>
                {_renderCheckStatus()}
            </React.Fragment>

        )
    }

    function _renderLevelCheck() {
        if (level === 3) {
            return <i style={{opacity: '0.3'}} className={"bx bx-plus"}></i>
        } else {
            return <i className={"bx bx-plus"} onClick={e => onAdd(e, thisCategoryData.id)}></i>
        }
    }

    function _renderCheckStatus() {
        if (thisCategoryData.status === "active") {
            return <span className={"badge badge-success badge-pill ml-50"}>فعال</span>
        } else {
            return <span className={"badge badge-warning badge-pill ml-50"}>غیرفعال</span>
        }
    }
}
