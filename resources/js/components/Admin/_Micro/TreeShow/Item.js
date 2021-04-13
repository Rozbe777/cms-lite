import React from 'react';
import './_Shared/style.scss';
import {Request} from './../../../../services/AdminService/Api';
const dataTransitionKey = "cmsLiteData123548$%";
export const Item = ({allData ,level , key , id ,name ,status , duplicate : pushDuplicate , responseUpdate:resPushDataUpdate , itemClick : pushItemClisk , delClick : pushDelClick , dataForEdit  : pushDataForEdit}) => {

    // adding new item by click on ( + ) in category item
    const handleAdding = (e) => {
        e.preventDefault();
        pushItemClisk(id);
    }

    // handle delete single item by category id
    const HandleDel = (e , idDel) => {
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
    const HandleEdit = (e , type) => {
        e.preventDefault();
        // console.log("dataaaaaaaa dup : " , allData)
        let editOrDup = JSON.stringify({type , allData})
        pushDataForEdit(editOrDup)
    }

    const handleDataRes = () => {

        resPushDataUpdate(allData);

        // localStorage.removeItem(dataTransitionKey);
        // localStorage.setItem(dataTransitionKey , allData);
        // console.log("all dataaaaaaas new click : " , allData)
    }

    return (
        <div id={"li-div"}>
            <div className={"row"} style={{padding: '0 20px', position: 'relative'}}>
                <div className={"col-md-6 col-sm-8"} style={{padding: 13}}>
                    {/*<input type="checkbox"*/}
                    {/*       id={"checkAll"}*/}
                    {/*       className="form-check-input check-category"/>*/}
                    {/*<label className="form-check-label"></label>*/}
                    <span id={"item-tree-show"}>{name}</span>
                </div>


                <span id={"sub-menu-custom"} onClick={handleDataRes} attr-ids={id} >
                    <i className={"bx bx-chevron-down"}></i>
                </span>


                <div className={"col-md-6 col-sm-4"} style={{padding: 13}} id={"icon-item-list"}>
                    <div className={"form-check"}>
                        {level == 3 ? (<i style={{opacity : '0.3'}} className={"bx bx-plus"}></i>) : (<i className={"bx bx-plus"} onClick={e => handleAdding(e)}></i>)}
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
