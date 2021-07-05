import React from "react";


export const ItemDis = data => {
    console.log(data , " in item")
    return (
        <div className={"item-discount"}>
            <div id={"detail-right"}>

                {/*<span id={"darsad"}>100 درصد</span>*/}
                {data.data.status == "active" ? (
                    <span id={"status"} className={"active"}>فعال</span>
                ) : (
                    <span id={"status"}>غیر فعال</span>

                )}
                <div className={"detail-right-action"}>

                    <i className={"bx bxs-trash"}></i>
                    <i className={"bx bxs-pencil"}></i>


                </div>
            </div>
            <div id={"detail-left"}>
                <p style={{margin: '0 5px', fontWeight: 100}}><span style={{
                    float: 'right',
                    fontSize: '15px',
                    fontWeight: 700,
                    marginLeft: 5
                }}>کد :</span> {data.data.code}</p>
                <p style={{margin: '0 5px', fontWeight: 100}}><span
                    style={{float: 'right', fontSize: '15px', fontWeight: 700, marginLeft: 5}}>استفاده :</span> 155 بار
                </p>
                <p style={{margin: '0 5px', fontWeight: 100}}><span
                    style={{float: 'right', fontSize: '15px', fontWeight: 700, marginLeft: 5}}>نوع :</span>{
                    data.data.type == "free_delivery" ? "ارسال رایگان" : data.data.type == "percentage" ? "درصد" : data.data.type == "fixed_price" ? "مبلغ ثابت" : ''
                }</p>
            </div>
        </div>
    )
}
