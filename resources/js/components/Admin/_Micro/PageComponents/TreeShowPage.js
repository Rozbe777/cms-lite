import React from 'react';
import {Item} from './Item';
import Loading from './../../_Micro/Loading'
import $ from 'jquery';

export const TreeShowPage = ({data, loading, callBack: pushCallBack, itemClicks: pushItemCliks , duplicate : pushDuplicate ,delClick : pushDelClick , updateData : pushUpdateData}) => {
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

    let dataWithOutPaginate = data.data;
    const handlePush = (item) => {
        pushCallBack(item);
    }
    const HandleClick = (id) => {
        console.log("tree id : ", id)
        pushItemCliks(id);
    }
    const HndleDuplicate = (item) => {
        pushDuplicate(item)
    }
    const HandleDelClick = (item) => {
        pushDelClick(item)
    }
    const HandleDataForUpdate = (data) => {
        pushUpdateData(data);
    }
    if (loading) {
        return <Loading />
    }

    return (
        <ul className={"content-li"}>
            {dataWithOutPaginate ? dataWithOutPaginate.map((keyName) => {
                console.log(keyName.name , "\n")
                return (
                    <li style={{position: 'relative'}}>
                        <div className={"branch-top"}>
                        </div>
                        <Item key={keyName.id} name={keyName.title}
                              allData={keyName}
                              id={keyName.id}
                              status={keyName.status}
                              callBack={item => handlePush(item)}
                              duplicate={item => HndleDuplicate(item)}
                              delClick={item => HandleDelClick(item)}
                              dataForEdit={item => HandleDataForUpdate(item)}
                              itemClick={itemId => HandleClick(itemId)}
                        />

                    </li>

                    )
                }
            ) : (
               <Loading />
            )}
        </ul>
    )

}
