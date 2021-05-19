import React from 'react';
import {Item} from "./Item";

export const List = ({data, deleteItem: pushDel, update: pushUpdate}) => {

    return (
        <div>

            {data.Options.length > 0 ? data.Options.map((item, index) => (
                <Item dataItem={item} index={index} delete={item => pushDel(item)}
                      update={item => pushUpdate(item)}/>
            )) : (
                <p style={{borderRight: '3px solid #FC960F', paddingRight: '10px'}}>لطفا آپشن اضافه کنید !</p>
            )}
        </div>
    )
}
