import React, {useContext, useEffect, useState} from 'react';
import {Item} from './Item';
import ReactDOM from 'react-dom'
import {Request} from './../../../../services/AdminService/Api';
import Loading from './../../_Micro/Loading'
import $ from 'jquery';
import {ErroHandle, error as ErrorToast} from "../../../../helper";
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
import CategoryEdit from "../../Category/Component/CategoryEdit";
import CategoryDuplicate from "../../Category/Component/CategoryDuplicate";
import CategoryAdd from "../../Category/Component/CategoryAdd";

export const TreeShowCategory = ({
                                     categoryData,
                                     loading,
                                     multiCategoryDelete,
                                     actionResult
                                 }) => {


    useEffect(() => {

        $("div#li-div").mouseover(function () {
            // $("#li-div div#moreOpp").removeClass("active")
            $(this).find("#moreOpp").addClass("active")
            $(this).find("#sub-menu-custom i").addClass("active")

        })
        $("div#li-div").mouseout(function () {
            // $("#li-div div#moreOpp").removeClass("active")
            $("#li-div #moreOpp").removeClass("active")
            $(this).find("#sub-menu-custom i").removeClass("active")


        })

        categoryData.data.map(item => {
            let filterChild1 = checkBox.indexOf(item.id);
            if (filterChild1 !== -1) {
                $("input[name=checkbox_" + item.id).prop("checked", true)
            } else {
                $("input[name=checkbox_" + item.id).prop("checked", false)
            }

            if (item.childern) {
                item.childern.map(itemChild2 => {
                    let filterChild1 = checkBox.indexOf(itemChild2.id);
                    if (filterChild1 !== -1) {
                        $("input[name=checkbox_" + itemChild2.id).prop("checked", true)
                    } else {
                        $("input[name=checkbox_" + itemChild2.id).prop("checked", false)
                    }


                    itemChild2.children.map(itemChild22 => {
                        let filterChild22 = checkBox.indexOf(itemChild22.id);
                        if (filterChild22 !== -1) {
                            $("input[name=checkbox_" + itemChild22.id).prop("checked", true)
                        } else {
                            $("input[name=checkbox_" + itemChild22.id).prop("checked", false)
                        }
                    })

                })
            }


            if (item.children) {
                item.children.map(itemChild3 => {
                    let filterChild3 = checkBox.indexOf(itemChild3.id);
                    if (filterChild3 !== -1) {
                        $("input[name=checkbox_" + itemChild3.id).prop("checked", true)
                    } else {
                        $("input[name=checkbox_" + itemChild3.id).prop("checked", false)
                    }
                })
            }
        })
        checkBox.map(idCheck => {
            $("input[name=checkbox_" + idCheck).prop("checked", true)
        })
    })


    const {checkBox, setCheckBox} = useContext(CHECK_BOX_CONTENT)


    const onAdd = (e, parentId) => {
        e.preventDefault();
        ReactDOM.render(<CategoryAdd actionResult={actionResult} idParent={parentId} allCategoryData={categoryData}/> , document.getElementById("add-datas"));
    }

    const onEdit = (e, itemData) => {
        e.preventDefault()
        ReactDOM.render(<CategoryEdit actionResult={actionResult} categoryData={itemData} actionType={"edit"} allCategoryData={categoryData} /> ,document.getElementById("add-datas"))
    }


    const onDuplicate = (e, itemData) => {
        e.preventDefault()
        ReactDOM.render(<CategoryDuplicate actionResult={actionResult} categoryData={itemData} actionType={"duplicate"} allCategoryData={categoryData} /> ,document.getElementById("add-datas"))

    }

    const onDelete = (e, id) => {
        e.preventDefault()
        multiCategoryDelete(e , id);
    }


    return (
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <div>
                <ul className={"content-li"}>
                    {categoryData.data ? categoryData.data.map((item, index) => {
                            return (
                                <li key={index} id={"li-back-item"}>


                                    <div className={"branch-top"}>
                                    </div>

                                    {_renderItem(item, 1)}
                                    {item.childern.length > 0 ? item.childern.map((categoryItemOne, index) => {
                                        return (
                                            <ul key={index} style={{padding: '0 50px 0 0', listStyle: 'inherit'}}>

                                                <li id={"li-back-item"}>
                                                    <div className={"branch-top"}>
                                                    </div>
                                                    <div className={"branch"}>
                                                        <div className={"box"}></div>
                                                    </div>
                                                    {_renderItem(categoryItemOne, 2)}
                                                    {categoryItemOne.children.length > 0 ? categoryItemOne.children.map(categoryItemTow => {
                                                        return (
                                                            <ul key={index}
                                                                style={{padding: '0 50px 0 0', listStyle: 'inherit'}}>

                                                                <li id={"li-back-item"}>
                                                                    <div className={"branch-top"}>
                                                                    </div>
                                                                    <div className={"branch"}>
                                                                        <div className={"box"}></div>
                                                                    </div>
                                                                    {_renderItem(categoryItemTow, 3)}
                                                                </li>

                                                            </ul>
                                                        )
                                                    }) : ''}
                                                </li>

                                            </ul>
                                        )
                                    }) : ''
                                    }
                                    {/*{_renderChildrenOne(item.childern , 2)}*/}
                                </li>

                            )
                        }
                    ) : (
                        <Loading/>
                    )}
                </ul>

            </div>
        </CHECK_BOX_CONTENT.Provider>
    )


    function _renderItem(thisCategoryData, level) {
        return (
            <Item
                thisCategoryData={thisCategoryData}
                level={level}
                categoryData={categoryData}
                onEdit={onEdit}
                onDuplicate={onDuplicate}
                onAdd={onAdd}
                onDelete={onDelete}
            />
        )
    }

}
