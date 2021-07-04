import React from "react";


export const ItemDis = data => {
    console.log(data , " in item")
    return (
        <div className={"item-discount"}>
            <div id={"detail-right"}>

                <span>100 درصد</span>
                <span>فعال</span>
                <div className={"detail-right"}>

                    <i className={"bx bx-copy-alt"}></i>
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
                }}>کد :</span> i2DCfbVya8b19c0dss</p>
                <p style={{margin: '0 5px', fontWeight: 100}}><span
                    style={{float: 'right', fontSize: '15px', fontWeight: 700, marginLeft: 5}}>استفاده :</span> 155 بار
                </p>
                <p style={{margin: '0 5px', fontWeight: 100}}><span
                    style={{float: 'right', fontSize: '15px', fontWeight: 700, marginLeft: 5}}>نوع :</span>درصد</p>
            </div>
        </div>
    )
}
