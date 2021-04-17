import React, {useEffect, useState} from 'react';
import {Request} from "../../services/AdminService/Api";
import Loading from "../Admin/_Micro/Loading";

export const MultiSelected = () => {

    const [check, setCheck] = useState()
    const [data, setData] = useState()
    const [load, setLoad] = useState(false);
    let selectCheckBox = new Set();
    useEffect(() => {
        GetAllCategory();
    }, [])

    const GetAllCategory = () => {
        setLoad(true)
        Request.GetAllCategory()
            .then(res => {
                setLoad(false)
                setData(res)
            })
    }

    // $(".main-selected").click(function () {
    //     if ($(this, " i").hasClass("active")) {
    //         $(this, " i").removeClass("active");
    //     } else {
    //         $(this, " i").addClass("active");
    //     }
    // })
    const HandleChange = (e, name) => {
        setCheck({
            ...check,
            [e.target.name]: name
        })
    }
    console.log("dataaaaaa******** : ", check);

    const ToggleCheckBox = label => {
        if (selectCheckBox.has(label)) {
            selectCheckBox.delete(label)
        } else {
            selectCheckBox.add(label);
        }
    }

    return (
        <div className={"main-selected"}>
            <i className={"bx bx-chevron-down"}></i>
            {console.log("data : ", data)}
            <div className={"optionBox"}>
                <ul>
                    {data ? data.data.map(item => (
                        <li>
                            <fieldset>
                                <input type="checkbox"
                                       onChange={e => HandleChange(e, item.name)}
                                       name={item.id}
                                       value={item.name} id="checkbox1"/>
                                <label id={"labels"} htmlFor="checkbox1">{item.name}</label>
                            </fieldset>

                            {item.childern.length > 0 ? (
                                <ul style={{padding : '0 20px'}}>
                                    {item.childern.map(child2 => (
                                        <li>
                                           <fieldset>
                                               &nbsp;&nbsp; <span style={{float : 'right'}}>></span> &nbsp;&nbsp;
                                                <input type="checkbox"
                                                       style={{float : 'right'}}
                                                       onChange={e => HandleChange(e, item.name)}
                                                       name={child2.id}
                                                       value={child2.name} id="checkbox1"/>

                                               <label id={"labels"} htmlFor="checkbox1">{child2.name}</label>
                                            </fieldset>

                                            {child2.children.length > 0 ? (
                                                <ul style={{padding : '0 30px'}}>
                                                    {child2.children.map(child3 => (
                                                        <li>
                                                            <fieldset>
                                                                &nbsp;&nbsp; <span style={{float : 'right'}}>>></span> &nbsp;&nbsp;
                                                                <input type="checkbox"
                                                                       onChange={e => HandleChange(e, item.name)}
                                                                       name={child3.id}
                                                                       value={child3.name} id="checkbox1"/>
                                                                <label id={"labels"} htmlFor="checkbox1">{child3.name}</label>
                                                            </fieldset>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : ''}
                                        </li>
                                    ))}
                                </ul>
                            ) : ''}


                        </li>

                    )) : (
                        <Loading/>
                    )}


                </ul>
            </div>

        </div>
    )
}
