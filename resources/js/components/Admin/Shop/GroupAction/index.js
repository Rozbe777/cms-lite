import React from 'react';


const GroupAction = ({data,allProduct, clickStatus: pushClickStatus , newCheck : pushNewCheck}) => {
    let idArray = [];
    const HandleClick = (e, type) => {
        e.preventDefault()
        pushClickStatus(type);
    }

    const CheckAll = (e , type) => {
        e.preventDefault();
        if (type == "checkAll") {
            allProduct.map(item => {
                idArray.push(item.id);
            })
        } else if (type == "cancelAll") {
            idArray = [];
        }


        pushNewCheck(idArray);
    }

    return (
        <div className={"row"}>
            <div className={"col-lg-5 col-md-12 col-sm-12"}>
                <p>
                    {data.length} محصول انخاب شده
                </p>
            </div>
            <div className={"col-sm-12"} id={"mini-click-icons"}>
                <ul>
                    <li onClick={e => CheckAll(e, "checkAll")} style={{background: '#5a8dee'}}>
                        <i className={"bx bx-check-double"}></i>
                        <p id={"mini"}>همه</p>
                    </li>
                    <li onClick={e => (e , "delete")} style={{background: '#ff5b5c'}}>
                        <i className={"bx bxs-trash-alt"}></i>
                        <p id={"mini"}>حذف</p>
                    </li>
                    <li onClick={e => CheckAll(e, "cancelAll")} style={{background: '#fdac41'}}>
                        <i className={"bx bxs-minus-circle"}></i>
                        <p id={"mini"}>لغو</p>
                    </li>

                    <li onClick={e => (e , "print")} style={{background: '#00cfdd'}}>
                        <i className={"bx bx-printer"}></i>
                        <p id={"mini"}>پرینت</p>
                    </li>
                </ul>
            </div>

            <div className={"col-lg-7 col-md-12 col-sm-12 row"} id={"action-btn"}>
                <div className={"col-3"}>
                    <button type="button" style={{width: '100% !important'}} className="btn btn-primary"
                            onClick={e => CheckAll(e, "checkAll")}>انتخاب همه
                    </button>
                </div>
                <div className={"col-3"}>
                    <button type="button" style={{width: '100% !important'}} className="btn btn-danger"
                            onClick={e => (e , "delete")}>حذف محصول
                    </button>
                </div>
                <div className={"col-3"}>
                    <button type="button" style={{width: '100% !important'}} className="btn btn-warning"
                            onClick={e => CheckAll(e , "cancelAll")}>لغو
                    </button>
                </div>
                <div className={"col-3"}>
                    <button type="button" style={{width: '100% !important'}} className="btn btn-info"
                            onClick={e => (e , "print")}>پرینت
                    </button>
                </div>
            </div>

        </div>
    )
}

export default GroupAction
