import React, {useEffect, useState} from 'react';
import {Item} from './Item'
import $ from 'jquery';

export const TreeShowCategory = (props) => {

    $(function () {
        $("span#sub-menu-custom").click(function () {
            $(".back-blur").fadeIn(100);
            setTimeout(() => {
                $("#bottom-chip").addClass("active");
            }, 200)
        })
        $(".back-blur").click(() => {
            $("#bottom-chip").removeClass("active");
            setTimeout(() => {
                $(".back-blur").fadeOut(100)
            }, 200)
        })
    })
    if (props.loading) {
        return <p>در حال پردازش ...</p>
    }

    return (
        <ul className={"content-li"}>
            {props.data ? Object.keys(props.data).map((keyName, i) => {
                    return (
                        // <p>{props.data[keyName].name}</p>
                        <li style={{position:'relative'}}>


                            <div className={"branch-top"}>

                            </div>


                            <Item key={props.data[keyName].name} name={props.data[keyName].name}
                                  id={props.data[keyName].id} status={props.data[keyName].status}/>
                            {console.log("childern : ", props.data[keyName].childern.length)}
                            {props.data[keyName].childern.length > 0 ? props.data[keyName].childern.map((itemClildOne , i) => {
                                    return (
                                        <ul style={{padding: '0 50px 0 0', listStyle: 'inherit', position: 'relative'}}>
                                            {console.log("indexed : " , i)}






                                            <li>

                                                <div className={"branch-top"}>

                                                </div>



                                                    <div className={"branch"}>
                                                        <div className={"box"}></div>
                                                    </div>
                                                <Item key={itemClildOne.id} status={itemClildOne.status}
                                                      name={itemClildOne.name} id={itemClildOne.id}/>

                                                {itemClildOne.children.length > 0 ? itemClildOne.children.map((childThree,i) => (
                                                    <ul style={{
                                                        padding: '0 50px 0 0',
                                                        listStyle: 'inherit',
                                                        position: 'relative'
                                                    }}>

                                                        <li>

                                                            <div className={"branch-top"}>

                                                            </div>
                                                                <div className={"branch"}>
                                                                    <div className={"box"}></div>
                                                                </div>

                                                            <Item key={childThree.id} status={childThree.status}
                                                                  name={childThree.name} id={childThree.id}/>
                                                        </li>
                                                    </ul>
                                                )) : ''}


                                            </li>

                                        </ul>

                                    )
                                }
                            ) : (
                                ''
                            )}
                        </li>

                    )
                }
            ) : (
                <p>wait</p>
            )}


        </ul>
    )

}
