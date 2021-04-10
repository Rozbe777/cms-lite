import React from 'react';
import ReactDOM from 'react-dom';
import './_Shared/style.scss';
import AddCategory from './../../Category/CategoryAdd';
import {Request} from './../../../../services/AdminService/Api';
import ReactDom from "react-dom";

export const Item = ({allData , key , id ,name ,status , duplicate : pushDuplicate , itemClick : pushItemClisk , delClick : pushDelClick , dataForEdit  : pushDataForEdit}) => {

    const handleAdding = (e) => {
        e.preventDefault();
        pushItemClisk(id);
    }

    const HandleDel = (e , idDel) => {
        e.preventDefault()
        Request.DeleteCategoryOne(idDel)
            .then(res => {
                pushDelClick(res.status);
            }).cache(error => console.log("error : " , error))
    }
    const HandleEdit = (e) => {
        e.preventDefault();
        pushDataForEdit(allData)
        // console.log("all thi data : " , JSON.parse(allData));
    }


    const HandleDuplicate = (e , id) => {
        e.preventDefault();
        let JsonData = JSON.parse(allData);
        let dataFit = {...JsonData};
        const min = 1;
        const max = 1000;
        const rand = Number(min + Math.random() * (max - min)).toFixed(0);
        dataFit.name = dataFit.name+rand+"_کپی";
        dataFit.slug = dataFit.slug+rand+"_کپی";
        dataFit.image = '';
        // console.log("dataaaaaaaa: ",dataFit)
        Request.AddNewCategory(dataFit)
            .then(res => {
                pushDuplicate(res.status)
            }).cache(error => console.log("error : " , error))
    }
    return (
        <div id={"li-div"}>
            <div className={"row"} style={{padding: '0 20px' , position : 'relative'}}>
                <div className={"col-md-6 col-sm-8"} style={{padding: 13}}>
                    <div className={"form-check"}>
                        <input type="checkbox"
                               id={"checkAll"}
                               className="form-check-input check-category"/>
                        <label className="form-check-label"></label>
                        <span>{name}</span>
                    </div>
                </div>


                <span id={"sub-menu-custom"}>
                    <i className={"bx bx-chevron-down"} ></i>
                </span>


                <div className={"col-md-6 col-sm-4"} style={{padding: 13}} id={"icon-item-list"}>
                    <div className={"form-check"}>
                        <i className={"bx bx-plus"} onClick={handleAdding}></i>
                        <i className={"bx bx-show"}></i>
                        <i className={"bx bx-trash-alt"} onClick={e=>HandleDel(e ,id)}></i>
                        <i className={"bx bx-edit"} onClick={e => HandleEdit(e)}></i>
                        <i className={"bx bx-duplicate"} onClick={e => HandleDuplicate(e , id)}></i>

                        {status == "active" ? (
                            <span className={"badge badge-success badge-pill ml-50"}>فعال</span>
                        ):(
                            <span className={"badge badge-warning badge-pill ml-50"}>غیرفعال</span>
                        )}
                    </div>
                </div>


            </div>

        </div>
    )
}
