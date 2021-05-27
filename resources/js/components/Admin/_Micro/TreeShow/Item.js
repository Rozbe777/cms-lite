import React, {useContext} from 'react';
import './_Shared/style.scss';
import {Request} from './../../../../services/AdminService/Api';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";

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


    const {checkBox, setCheckBox} = useContext(CHECK_BOX_CONTENT)

    console.log("checcccccc : ", allData)
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
                        if (res.status == 200) {
                            Swal.fire({
                                type: "success",
                                title: 'با موفقیت حذف شد !',
                                confirmButtonClass: 'btn btn-success',
                                confirmButtonText: 'باشه',
                            })
                        } else {
                            Swal.fire({
                                type: "error",
                                title: 'خطایی رخ داده است !',
                                cancelButtonClass: 'btn btn-primary',
                                cancelButtonText: 'تلاش مجدد',
                            })
                        }
                    }).catch(error => console.log("error", error))
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

    const HandlePushCheck = (idGet) => {
        // pushCheckSel(idGet)
        console.log("id : ", idGet)
        let checkBoxx = [...checkBox]
        var filterRes = checkBoxx.indexOf(idGet);
        if (filterRes !== -1) {
            checkBoxx.splice(filterRes, 1);
            setCheckBox(checkBoxx);
            if (allData.childern) {
                allData.childern.map(itemChil => {
                    var filterChild = checkBoxx.indexOf(itemChil.id);
                    if (filterChild !== -1) {
                        checkBoxx.splice(filterChild, 1);
                        setCheckBox(checkBoxx);
                    } else {
                        checkBoxx.push(idGet);
                        setCheckBox(checkBoxx);
                    }

                    if (itemChil.children){
                        allData.children.map(itemChilss => {
                            var filterChilds = checkBoxx.indexOf(itemChilss.id);
                            if (filterChilds !== -1) {
                                checkBoxx.splice(filterChilds, 1);
                                setCheckBox(checkBoxx);
                            } else {
                                checkBoxx.push(idGet);
                                setCheckBox(checkBoxx);
                            }
                        })
                    }

                })
            }


        } else {
            checkBoxx.push(idGet);
            setCheckBox(checkBoxx);


            if (allData.childern) {
                allData.childern.map(itemChil => {
                    checkBoxx.push(itemChil.id);
                    setCheckBox(checkBoxx);
                    if (itemChil.children){
                        itemChil.children.map(itemIdCh => {
                            checkBoxx.push(itemIdCh.id);
                            setCheckBox(checkBoxx);
                        })
                    }

                })
            }


        }

    }

    console.log("checkbox :::: ", checkBox);
    return (
        <div id={"li-div"}>
            <div className={"row"} style={{padding: '0 20px', position: 'relative'}}>
                <div className={"col-md-6 col-sm-8"} style={{padding: 13}}>
                    <fieldset style={{float: "right"}}>
                        <div className="checkbox">
                            <input type="checkbox" onChange={e => HandlePushCheck(id)} className="checkbox-input"
                                   id={id}/>
                            <label htmlFor={id}></label>
                        </div>
                    </fieldset>
                    <span id={"item-tree-show"}>{name}</span>
                </div>


                <span id={"sub-menu-custom"} onClick={handleDataRes} attr-ids={id}>
                    <i className={"bx bx-chevron-down"}></i>
                </span>


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
