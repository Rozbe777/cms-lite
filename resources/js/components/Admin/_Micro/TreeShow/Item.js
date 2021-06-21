import React, {useContext, useEffect} from 'react';
import './_Shared/style.scss';
import {Request} from './../../../../services/AdminService/Api';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
import $ from "jquery";
import {ErroHandle} from "../../../../helper";

const dataTransitionKey = "cmsLiteData123548$%";
// allData => all data for this item BUT dataAlls => is all category data for category selected parent
export const Item = ({
                         allData,
                         dataAlls,
                         level,
                         key,
                         id,
                         name,
                         status,
                         checkSel: pushCheckSel,
                         duplicate: pushDuplicate,
                         responseUpdate: resPushDataUpdate,
                         itemClick: pushItemClisk,
                         delClick: pushDelClick,
                         dataForEdit: pushDataForEdit
                     }) => {

    // adding new item by click on ( + ) in category item
    const handleAdding = (e) => {
        e.preventDefault();
        let data
        pushItemClisk(id);
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

    // handle delete single item by category id
    const HandleDel = (e, idDel) => {
        e.preventDefault()
        swal({
            title: 'حذف دسته بندی',
            text: "آیا مطمئنید؟",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'تایید',
            confirmButtonClass: 'btn btn-primary',
            cancelButtonClass: 'btn btn-danger ml-1',
            cancelButtonText: 'انصراف',
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                Request.DeleteCategoryOne(idDel)
                    .then(res => {
                        pushDelClick(res.status)
                            Swal.fire({
                                type: "success",
                                title: 'با موفقیت حذف شد !',
                                confirmButtonClass: 'btn btn-success',
                                confirmButtonText: 'باشه',
                            })

                    }).catch(error =>  ErroHandle("خطای غیر منتظره ای رخ داده است"))
            }
        });

    }


    // handle edit single item by id and data
    // this function used for edit and duplicate category
    const HandleEdit = (e, type) => {
        e.preventDefault();
        let editOrDup = JSON.stringify({type, allData, allCatData: dataAlls})
        pushDataForEdit(editOrDup)
    }

    const handleDataRes = () => {
        resPushDataUpdate(allData);

    }


    // remove item from array
    function arrayRemove(arr, value) {

        return arr.filter(function (ele) {
            return ele != value;
        });
    }

    const HandlePushCheck = (e, idGet) => {
        let checkBoxx = [...checkBox];
        let checkState = e.target.checked;
        var filterRes = checkBoxx.indexOf(idGet);

        if (filterRes !== -1) {
            checkBoxx.splice(filterRes, 1);
            setCheckBox(checkBoxx);
            if (allData.childern) {
                if (checkState) {
                    allData.childern.map(itemChil => {
                        var filterChild = checkBoxx.indexOf(itemChil.id);
                        if (filterChild !== -1) {
                            checkBoxx.splice(filterChild, 1);
                            setCheckBox(checkBoxx);
                        } else {
                            checkBoxx.push(itemChil.id);
                            setCheckBox(checkBoxx);
                        }

                        if (itemChil.children && checkState) {
                            itemChil.children.map(itemChilss => {
                                var filterChilds = checkBoxx.indexOf(itemChilss.id);
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
                    allData.childern.map(itemChil => {
                        var filterChild = checkBoxx.indexOf(itemChil.id);
                        if (filterChild !== -1) {
                            checkBoxx.splice(filterChild, 1);
                            setCheckBox(checkBoxx);
                        }

                        if (itemChil.children) {
                            itemChil.children.map(itemChilss => {
                                var filterChilds = checkBoxx.indexOf(itemChilss.id);
                                if (filterChilds !== -1) {
                                    checkBoxx.splice(filterChilds, 1);
                                    setCheckBox(checkBoxx);
                                }
                            })
                        }


                    })
                }

            } else if (allData.children) {
                allData.children.map(itemChilss => {
                    var filterChild = checkBoxx.indexOf(itemChilss.id);
                    if (filterChild !== -1) {
                        checkBoxx.splice(filterChild, 1);
                        setCheckBox(checkBoxx);
                    } else {
                        checkBoxx.push(itemChilss.id);
                        setCheckBox(checkBoxx);
                    }

                })
            } else {
                var filterChild = checkBoxx.indexOf(idGet);
                if (filterChild !== -1) {
                    checkBoxx.splice(filterChild, 1);
                    setCheckBox(checkBoxx);
                }


            }


        } else if (filterRes === -1) {
            checkBoxx.push(idGet);
            setCheckBox(checkBoxx);
            if (allData.childern) {
                allData.childern.map(itemChil => {
                    var filterChil1 = checkBoxx.indexOf(itemChil.id);
                    if (filterChil1 === -1) {
                        checkBoxx.push(itemChil.id);
                        setCheckBox(checkBoxx);
                        if (itemChil.children) {
                            itemChil.children.map(itemIdCh => {
                                var filterChild2 = checkBoxx.indexOf(itemIdCh.id);
                                if (filterChild2 === -1) {
                                    checkBoxx.push(itemIdCh.id);
                                    setCheckBox(checkBoxx);
                                }
                            })
                        }
                    }
                })
            } else if (allData.children) {
                allData.children.map(itemChil => {
                    var filterChil1 = checkBoxx.indexOf(itemChil.id);
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
                            <input type="checkbox" name={"checkbox_" + id} onChange={e => HandlePushCheck(e, id)}
                                   className="checkbox-input"
                                   id={id}/>
                            <label htmlFor={id}></label>
                        </div>
                    </fieldset>
                    <span id={"item-tree-show"}>{name}</span>
                    <div id={"sub-menu-custom"} onClick={handleDataRes} attr-ids={id}>
                        <i className={"bx bx-chevron-down"}></i>
                    </div>
                    <div className={"col-12 " + id} id={"moreOpp"}>
                        <i className={"bx bx-show"}></i>
                        <i className={"bx bx-trash-alt"} onClick={e => HandleDel(e, id)}></i>
                        <i className={"bx bx-edit"} onClick={e => HandleEdit(e, "edit")}></i>
                        <i className={"bx bx-duplicate"} onClick={e => HandleEdit(e, "dup")}></i>

                        {level == 3 ? (<i style={{opacity: '0.3'}} className={"bx bx-plus"}></i>) : (
                            <i className={"bx bx-plus"} onClick={e => handleAdding(e)}></i>)}

                        {status == "active" ? (
                            <span className={"badge badge-success badge-pill ml-50"}>فعال</span>
                        ) : (
                            <span className={"badge badge-warning badge-pill ml-50"}>غیرفعال</span>
                        )}
                    </div>
                </div>


                <div className={"col-md-6 col-sm-4"} style={{padding: 13}} id={"icon-item-list"}>
                    <div className={"form-check"}>
                        {level == 3 ? (<i style={{opacity: '0.3'}} className={"bx bx-plus"}></i>) : (
                            <i className={"bx bx-plus"} onClick={e => handleAdding(e)}></i>)}
                        <i className={"bx bx-show"}></i>
                        <i className={"bx bx-trash-alt"} onClick={e => HandleDel(e, id)}></i>
                        <i className={"bx bx-edit"} onClick={e => HandleEdit(e, "edit")}></i>
                        <i className={"bx bx-duplicate"} onClick={e => HandleEdit(e, "dup")}></i>

                        {status == "active" ? (
                            <span className={"badge badge-success badge-pill ml-50"}>فعال</span>
                        ) : (
                            <span className={"badge badge-warning badge-pill ml-50"}>غیرفعال</span>
                        )}
                    </div>
                </div>


            </div>

        </div>
    )
}
