import React, {useContext, useEffect} from 'react';
import {Item} from './Item';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
import {successSwal, swalAccept} from "../../../../helper";
import Loading from "../Loading";
import PageApi from "../../Page/Api/PageApi";
import PageEdit from "../../Page/Component/PageEdit";
import PageDuplicate from "../../Page/Component/PageDuplicate";
export const TreeShowPage = ({
                                 pageData,
                                 actionResult,
                                 loading
                             }) => {


    const {checkBox, setCheckBox} = useContext(CHECK_BOX_CONTENT);

    let pageApi = new PageApi();
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


    pageData.data.data.map(item => {
        var filter = checkBox.indexOf(item.id);
        if (filter !== -1) {
            $("input[name=checkbox_content_" + item.id).prop("checked", true)
        } else {
            $("input[name=checkbox_content_" + item.id).prop("checked", false)
        }
    });

    const onDelete = (e, pageId, pageName) => {
        e.preventDefault();
        pageApi._pageIds[0] = pageId;
        // show swal for get accept delete
        swalAccept(`حذف ${pageName}`).then(resSwal => {
            if (resSwal.value) {
                pageApi.delete().then(res => {
                    successSwal("با موفقیت حذف شد !");

                    $(".pagination li.page-item.numberss").removeClass("active")
                    $("ul.pagination li").eq(1).addClass("active")
                    $("span.checkboxeds").removeClass("active");

                    $("li.page-item.numberss").removeClass("active");
                    $("li.page-item").eq(1).addClass("active");
                    $("li.page-item.next").css("opacity", 1);
                    $("li.page-item.previous").css("opacity", 0.4);
                    actionResult(res);
                })
            }
        })
    }

    const onEdit = (e, pageDataUpdateGet) => {
        e.preventDefault();
        ReactDOM.render(<PageEdit pageData={pageDataUpdateGet}
                                  actionType={"edit"}
                                     actionResult={actionResult}/>, document.getElementById("add-datas"))

    }

    const onDuplicate = (e, pageDataUpdateGet) => {
        e.preventDefault();
        ReactDOM.render(<PageDuplicate pageData={pageDataUpdateGet}
                                       actionType={"duplicate"}
                                          actionResult={actionResult}/>, document.getElementById("add-datas"))
    }

    return (
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <ul className={"content-li"}>
                {loading ? <Loading/> : pageData.data.data.map((itemData, index) => (
                    <li key={index} style={{position: 'relative'}}>
                        <div className={"branch-top"}>
                        </div>
                        <Item
                            pageAllData={pageData.data.data}
                            thisItemData={itemData}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onDuplicate={onDuplicate}
                        />
                    </li>
                ))
                }
            </ul>
        </CHECK_BOX_CONTENT.Provider>
    )


}
