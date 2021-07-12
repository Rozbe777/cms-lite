import React, {useContext, useEffect} from 'react';
import {Item} from './Item';
import ContentsApi from "../../Content/Api/ContentApi";
import $ from 'jquery';
import ReactDOM from 'react-dom';
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";
import {successSwal, swalAccept} from "../../../../helper";
import ContentEdit from "../../Content/Component/ContentEdit";
import Loading from "../Loading";
import ContentDuplicate from "../../Content/Component/ContentDuplicate";

export const TreeShowPage = ({
                                 contentData,
                                 actionResult,
                                 loading
                             }) => {


    const {checkBox, setCheckBox} = useContext(CHECK_BOX_CONTENT);

    let contentApi = new ContentsApi();
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


    contentData.data.map(item => {
        var filter = checkBox.indexOf(item.id);
        if (filter !== -1) {
            $("input[name=checkbox_content_" + item.id).prop("checked", true)
        } else {
            $("input[name=checkbox_content_" + item.id).prop("checked", false)
        }
    });

    const onDelete = (e, contentId, contentName) => {
        e.preventDefault();
        contentApi._contentId[0] = contentId;
        // show swal for get accept delete
        swalAccept(`حذف ${contentName}`).then(resSwal => {
            if (resSwal.value) {
                contentApi.deleteContent().then(res => {
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

    const onEdit = (e, contentDataUpdateGet) => {
        e.preventDefault();
        ReactDOM.render(<ContentEdit contentDataUpdate={contentDataUpdateGet}
                                     actionResult={actionResult}/>, document.getElementById("add-datas"))

    }

    const onDuplicate = (e, contentDataUpdateGet) => {
        e.preventDefault();
        ReactDOM.render(<ContentDuplicate contentDataUpdate={contentDataUpdateGet}
                                     actionResult={actionResult}/>, document.getElementById("add-datas"))
    }

    return (
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <ul className={"content-li"}>
                {loading ? <Loading/> : contentData.data.map((itemData, index) => (
                    <li key={index} style={{position: 'relative'}}>
                        <div className={"branch-top"}>
                        </div>
                        <Item
                            contentAllData={contentData.data}
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
