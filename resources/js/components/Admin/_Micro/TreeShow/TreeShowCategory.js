import React, {useContext, useEffect, useState} from 'react';
import {Item} from './Item';
import {Request} from './../../../../services/AdminService/Api';
import Loading from './../../_Micro/Loading'
import $ from 'jquery';
import {ErroHandle, error as ErrorToast} from "../../../../helper";
import {CHECK_BOX_CONTENT} from "../../UserList/Helper/Context";

const dataTransitionKey = "cmsLiteData123548$%";

export const TreeShowCategory = ({
                                     data,
                                     loading,
                                     callBack: pushCallBack,
                                     itemClicks: pushItemCliks,
                                     duplicate: pushDuplicate,
                                     delClick: pushDelClick,
                                     updateData: pushUpdateData,
                                 }) => {
    const [responseData, setResponseData] = useState({});
    const [idDelete, setIdDelete] = useState([]);


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

        data.map(item => {
            var filterChild1 = checkBox.indexOf(item.id);
            if (filterChild1 !== -1){
                $("input[name=checkbox_"+item.id).prop("checked" , true)
            }else{
                $("input[name=checkbox_"+item.id).prop("checked" , false)
            }

            if(item.childern){
                item.childern.map(itemChild2 => {
                    var filterChild1 = checkBox.indexOf(itemChild2.id);
                    if (filterChild1 !== -1){
                        $("input[name=checkbox_"+itemChild2.id).prop("checked" , true)
                    }else{
                        $("input[name=checkbox_"+itemChild2.id).prop("checked" , false)
                    }


                    itemChild2.children.map(itemChild22 => {
                        var filterChild22 = checkBox.indexOf(itemChild22.id);
                        if (filterChild22 !== -1){
                            $("input[name=checkbox_"+itemChild22.id).prop("checked" , true)
                        }else{
                            $("input[name=checkbox_"+itemChild22.id).prop("checked" , false)
                        }
                    })

                })
            }


            if(item.children){
                item.children.map(itemChild3 => {
                    var filterChild3 = checkBox.indexOf(itemChild3.id);
                    if (filterChild3 !== -1){
                        $("input[name=checkbox_"+itemChild3.id).prop("checked" , true)
                    }else{
                        $("input[name=checkbox_"+itemChild3.id).prop("checked" , false)
                    }
                })
            }
        })
        checkBox.map(idCheck => {
            $("input[name=checkbox_" + idCheck).prop("checked", true)
        })
    })


    const {checkBox, setCheckBox} = useContext(CHECK_BOX_CONTENT)

    $(function () {
        $("span#sub-menu-custom").click(function () {
            $(".back-blur").fadeIn(100);
            let idDel = [...idDelete];
            let ids = $(this).attr("attr-ids");
            idDel.push(ids)
            setIdDelete(idDel)
            setTimeout(() => {
                $("#bottom-chip").addClass("active");
            }, 200)
        })
        $(".back-blur").click(() => {
            // localStorage.removeItem(dataTransitionKey);
            $("#bottom-chip").removeClass("active");
            setTimeout(() => {
                $(".back-blur").fadeOut(100)
            }, 200)
        })
    });
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

    // delte category or product when i used responsive mode

    const HandleDel = (e) => {
        e.preventDefault();
        console.log(("idsssssss : " , idDelete))
        if (idDelete) {
            swal({
                title: 'حذف دسته بندی',
                text: "آیا مطمئنید؟",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'تایید',
                confirmButtonClass: 'btn btn-primary',
                cancelButtonClass: 'btn btn-danger ml-1',
                cancelButtonText: 'انصراف',
                buttonsStyling: false,
            }).then(function (result) {
                if (result.value) {
                    Request.DeleteCategoryOne(idDelete)
                        .then(res => {
                            pushDelClick(res.status)
                            Swal.fire({
                                type: "success",
                                title: 'با موفقیت حذف شد !',
                                confirmButtonClass: 'btn btn-success',
                                confirmButtonText: 'باشه',
                            })



                        }).catch(error => {
                        if (error.response.data.errors) {
                            ErroHandle(error.response.data.errors)
                        } else {
                            ErrorToast("خطای غیر منتظره ای رخ داده است")
                        }
                    })
                }
            });

        } else {
            alert("لطفا آیتمی را برای حذف انتخاب کنید!");
        }

    }

    const handleAdding = () => {
        pushItemCliks(ids);
    }

    const HandleEdit = (e, type) => {
        e.preventDefault()
        let editOrDup = JSON.stringify({type, allData: responseData})
        console.log("loading dataaaaaaa  : ", editOrDup)

        pushUpdateData(editOrDup);
    }



    return (
        <CHECK_BOX_CONTENT.Provider value={{checkBox, setCheckBox}}>
            <div>
                <ul className={"content-li"}>
                    {data ? data.map(item => {
                            return (
                                <li id={"li-back-item"}>


                                    <div className={"branch-top"}>
                                    </div>

                                    <Item key={item.name} name={item.name}
                                          allData={item}
                                          allDataWidth = {data}
                                          checkSel={id => HandleCheckBox(id)}
                                          id={item.id} status={item.status}
                                          callBack={item => handlePush(item)}
                                          duplicate={item => HndleDuplicate(item)}
                                          delClick={item => HandleDelClick(item)}
                                          level={1}
                                          dataForEdit={item => HandleDataForUpdate(item)}
                                          itemClick={itemId => HandleClick(itemId)}
                                          dataAlls={data}
                                          responseUpdate={item => setResponseData(item)}
                                    />
                                    {item.childern.length > 0 ? item.childern.map((itemClildOne, i) => {
                                            return (
                                                <ul style={{padding: '0 50px 0 0', listStyle: 'inherit'}}>

                                                    <li id={"li-back-item"}>

                                                        <div className={"branch-top"}>
                                                        </div>


                                                        <div className={"branch"}>
                                                            <div className={"box"}></div>
                                                        </div>
                                                        <Item key={itemClildOne.id} status={itemClildOne.status}
                                                              name={itemClildOne.name} id={itemClildOne.id}
                                                              allData={itemClildOne}
                                                              callBack={item => handlePush(item)}
                                                              duplicate={item => HndleDuplicate(item)}
                                                              delClick={item => HandleDelClick(item)}
                                                              level={2}
                                                              dataAlls={data}
                                                              dataForEdit={item => HandleDataForUpdate(item)}
                                                              itemClick={itemId => HandleClick(itemId)}
                                                        />

                                                        {itemClildOne.children.length > 0 ? itemClildOne.children.map((childThree, i) => (
                                                            <ul style={{
                                                                padding: '0 50px 0 0',
                                                                listStyle: 'inherit'
                                                            }}>

                                                                <li id={"li-back-item"}>

                                                                    <div className={"branch-top"}>

                                                                    </div>
                                                                    <div className={"branch"}>
                                                                        <div className={"box"}></div>
                                                                    </div>

                                                                    <Item key={childThree.id} status={childThree.status}
                                                                          name={childThree.name} id={childThree.id}
                                                                          callBack={item => handlePush(item)}
                                                                          allData={childThree}
                                                                          duplicate={item => HndleDuplicate(item)}
                                                                          delClick={item => HandleDelClick(item)}
                                                                          level={3}
                                                                          dataAlls={data}
                                                                          dataForEdit={item => HandleDataForUpdate(item)}
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
                        <Loading/>
                    )}
                </ul>

                <div className={"back-blur"}>

                    <div id={"bottom-chip"}>
                        <div className={"form-check"}>

                            <ul>
                                <li onClick={e => HandleEdit(e, "dup")}>کپی دسته</li>
                                <li onClick={e => HandleEdit(e, "edit")}>ویرایش</li>
                                <li onClick={e => HandleDel(e)}>حذف</li>
                                <li>مشاهده</li>
                                <li onClick={e => handleAdding(e)}>زیردسته</li>
                            </ul>

                        </div>
                    </div>
                </div>
            </div>
        </CHECK_BOX_CONTENT.Provider>

    )

}
