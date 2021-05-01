import React, {useState} from "react";
import {List} from "./List";

export const Index = () => {
    const [data ,setData] = useState([
        {
            id : 1,
            name : "دسته 1",
        },{
            id : 2,
            name : "دسته 2",
        },{
            id : 3,
            name : "دسته 3",
        },{
            id : 4,
            name : "دسته 4",
        }
    ])
    return (
        <>
            <p>گزینه ها</p>
            <List data={data} />
        </>
    )
}
