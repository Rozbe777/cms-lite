import React, {useContext, useEffect} from 'react';
import {Item} from './Item';
import Loading from './../../_Micro/Loading'
import $ from 'jquery';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";

export const TreeShowPage = ({
                                 data,
                                 loading,
                                 callBack: pushCallBack,
                                 itemClicks: pushItemCliks,
                                 duplicate: pushDuplicate,
                                 delClick: pushDelClick,
                                 updateData: pushUpdateData
                             }) => {

    console.log(">>>>>>>>>>>>>>>", data.data)

    const {checkBox, setCheckBox} = useContext(CHECK_BOX_CONTENT)

    useEffect(()=>{

    }, [])


    data.data.map(item => {
        var filter = checkBox.indexOf(item.id);
        if (filter !== -1) {
            $("input[name=checkbox_content_" + item.id).prop("checked", true)
        } else {
            $("input[name=checkbox_content_" + item.id).prop("checked", false)
        }
    });


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
        return <Loading/>
    }

    return (
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <ul className={"content-li"}>
                {dataWithOutPaginate ? dataWithOutPaginate.map((keyName) => {
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
                    <Loading/>
                )}
            </ul>
        </CHECK_BOX_CONTENT.Provider>
    )

}
