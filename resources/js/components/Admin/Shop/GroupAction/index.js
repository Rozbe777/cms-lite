import React from 'react';


const GroupAction = ({data,allProduct, clickStatus: pushClickStatus , newCheck : pushNewCheck}) => {
    let idArray = [];
    const HandleClick = (e, type) => {
        e.preventDefault()
        pushClickStatus(type);
    }

    const CheckAll = (e , type) => {
        e.preventDefault();
        allProduct.map(item => {
            idArray.push(item.id);
        })
        pushNewCheck({idArray , type});
    }

    console.log("dataa...... : " , allProduct)

    return (
        <div className={"row"}>
            <div className={"col-5"}>
                <p>
                    {data.length} محصول انخاب شده
                </p>
            </div>
            <div className={"col-7 row"} id={"action-btn"}>
                <div className={"col-3"}>
                    <button type="button" style={{width: '100% !important'}} className="btn btn-primary"
                            onClick={e => CheckAll(e , "checkAll")}>انتخاب همه
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
