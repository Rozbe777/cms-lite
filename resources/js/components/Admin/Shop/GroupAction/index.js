import React from 'react';


const GroupAction = ({data, clickStatus: pushClickStatus}) => {
    const HandleClick = (e, type) => {
        e.preventDefault()
        pushClickStatus(type);
    }

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
                            onClick={e => (e , "checkAll")}>انتخاب همه
                    </button>
                </div>
                <div className={"col-3"}>
                    <button type="button" style={{width: '100% !important'}} className="btn btn-danger"
                            onClick={e => (e , "delete")}>حذف محصول
                    </button>
                </div>
                <div className={"col-3"}>
                    <button type="button" style={{width: '100% !important'}} className="btn btn-warning"
                            onClick={e => (e , "cancel")}>لغو
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
