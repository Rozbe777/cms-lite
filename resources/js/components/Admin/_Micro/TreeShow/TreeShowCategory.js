import React , {useEffect , useState} from 'react';
import {Item} from './Item'
export const TreeShowCategory = (props) => {

    console.log("data : " , props.props)
    useEffect(()=>{

    })

    return (
        <ul className={"content-li"}>
            <li>
               <Item />

                <ul style={{padding: '0 50px 0 0', listStyle: 'inherit', position: 'relative'}}>
                    <div className={"branch"}>
                        <div className={"box"}></div>
                    </div>

                    <li>
                        <Item />

                        <ul style={{padding: '0 50px 0 0', listStyle: 'inherit', position: 'relative'}}>
                            <div className={"branch"}>
                                <div className={"box"}></div>
                            </div>

                            <li>
                                <Item />
                            </li>
                        </ul>
                    </li>

                </ul>

            </li>
        </ul>
    )

}
