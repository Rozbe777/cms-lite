import React, {useState} from 'react';
import {Item} from "./Item";

export const List = ({data}) => {

    return (
        <div>
            {data.map((item , index) => (
                <Item dataItem={item} index={index} />
            ))}
        </div>
    )
}
