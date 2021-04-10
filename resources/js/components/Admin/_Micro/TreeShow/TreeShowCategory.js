import React, {useEffect, useState} from 'react';
import {Item} from './Item'
import $ from 'jquery';

export const TreeShowCategory = ({data, loading, callBack: pushCallBack, itemClicks: pushItemCliks , duplicate : pushDuplicate}) => {

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
    const handlePush = (item) => {
        pushCallBack(item);
    }
    const HandleClick = (id) => {
        pushItemCliks(id);
    }
    const HndleDuplicate = (item) => {
        pushDuplicate(item)
    }
    if (loading) {
        return <p>در حال پردازش ...</p>
    }

    return (
        <ul className={"content-li"}>
            {data ? Object.keys(data).map((keyName, i) => {
                    return (
                        <li style={{position: 'relative'}}>


                            <div className={"branch-top"}>
                            </div>

                            <Item key={data[keyName].name} name={data[keyName].name}
                                  allData = {JSON.stringify(data[keyName])}
                                  id={data[keyName].id} status={data[keyName].status}
                                  callBack={item => handlePush(item)}
                                  duplicate = {item => HndleDuplicate(item)}
                                  itemClick={itemId => HandleClick(itemId)}
                            />
                            {data[keyName].childern.length > 0 ? data[keyName].childern.map((itemClildOne, i) => {
                                    return (
                                        <ul style={{padding: '0 50px 0 0', listStyle: 'inherit', position: 'relative'}}>
                                            {console.log("indexed : ", i)}

                                            <li>

                                                <div className={"branch-top"}>
                                                </div>


                                                <div className={"branch"}>
                                                    <div className={"box"}></div>
                                                </div>
                                                <Item key={itemClildOne.id} status={itemClildOne.status}
                                                      name={itemClildOne.name} id={itemClildOne.id}
                                                      allData = {JSON.stringify(itemClildOne)}
                                                      callBack={item => handlePush(item)}
                                                      duplicate = {item => HndleDuplicate(item)}
                                                      itemClick={itemId => HandleClick(itemId)}
                                                />

                                                {itemClildOne.children.length > 0 ? itemClildOne.children.map((childThree, i) => (
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
                                                                  name={childThree.name} id={childThree.id}
                                                                  callBack={item => handlePush(item)}
                                                                  allData = {JSON.stringify(childThree)}
                                                                  duplicate = {item => HndleDuplicate(item)}
                                                                  itemClick={itemId => HandleClick(itemId)}
                                                            />
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
