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

    const {checkBox, setCheckBox} = useContext(CHECK_BOX_CONTENT)
    useEffect(() => {
        $("div#li-div").mouseover(function () {
            $(this).find("#moreOpp").addClass("active")
            $(this).find("#sub-menu-custom i").addClass("active")
        })
        $("div#li-div").mouseout(function () {
            $("#li-div #moreOpp").removeClass("active")
            $(this).find("#sub-menu-custom i").removeClass("active")
        })
    }, [])


    data.data.map(item => {
        var filter = checkBox.indexOf(item.id);
        if (filter !== -1) {
            $("input[name=checkbox_content_" + item.id).prop("checked", true)
        } else {
            $("input[name=checkbox_content_" + item.id).prop("checked", false)
        }
    });


    let dataWithOutPaginate = data.data;

    const onSubcategMake = (id) => {
        pushItemCliks(id);
    }
    const onDuplicate = (item) => {
        pushDuplicate(item)
    }
    const onDelete = (item) => {
        pushDelClick(item)
    }
    const onEdit = (data) => {
        pushUpdateData(data);
    }
    if (loading) {
        return <Loading/>
    }

    return (
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <ul className={"content-li"}>
                {dataWithOutPaginate ? dataWithOutPaginate.map((keyName, index) => {
                        return (
                            <li key={index} style={{position: 'relative'}}>
                                <div className={"branch-top"}>
                                </div>
                                <Item
                                    name={keyName.title}
                                    allData={keyName}
                                    id={keyName.id}
                                    urlFastShow={keyName.url}
                                    contentStatus={keyName.status}
                                    onDuplicate={item => onDuplicate(item)}
                                    onDelete={item => onDelete(item)}
                                    onEdit={item => onEdit(item)}
                                    onSubcategMake={itemId => onSubcategMake(itemId)}
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
