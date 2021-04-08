import React , {useState , useEffect} from 'react';
export const Item = () => {

    const handleAdding = (e) => {
        $(".back-loader").fadeOut();
        setTimeout(()=>{
            $("#category_add_pop_base").fadeIn();
        },300)
    }
    return (
        <div id={"li-div"}>
            <div className={"row"} style={{padding: '0 20px'}}>
                <div className={"col-md-6"} style={{padding: 13}}>
                    <div className={"form-check"}>
                        <input type="checkbox"
                               id={"checkAll"}
                               className="form-check-input check-category"/>
                        <label className="form-check-label"></label>
                        <span> تست دسته بندی</span>
                    </div>
                </div>
                <div className={"col-md-6"} style={{padding: 13}}>
                    <div className={"form-check"}>

                        <i className={"bx bx-plus"} onClick={() => handleAdding("cd")}></i>
                        <i className={"bx bx-show"}></i>
                        <i className={"bx bx-trash-alt"}></i>
                        <i className={"bx bx-edit"}></i>
                        <i className={"bx bx-duplicate"}></i>

                        <span className={"badge badge-success badge-pill ml-50"}>فعال</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
