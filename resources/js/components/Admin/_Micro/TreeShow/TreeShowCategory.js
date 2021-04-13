import React, {useEffect , useState} from 'react';
import {Item} from './Item';
import {Request} from './../../../../services/AdminService/Api';
import Loading from './../../_Micro/Loading'
import $ from 'jquery';

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
    const [responseData , setResponseData] = useState({});
    const [idDelete , setIdDelete] = useState();
    useEffect(() => {
    })

    $(function () {
        $("span#sub-menu-custom").click(function () {
            $(".back-blur").fadeIn(100);
            let ids = $(this).attr("attr-ids");
            setIdDelete(ids)
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
        console.log("tree id : " , id)
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
                            if (res.status == 200) {
                                Swal.fire({
                                    type: "success",
                                    title: 'با موفقیت حذف شد !',
                                    confirmButtonClass: 'btn btn-success',
                                    confirmButtonText: 'باشه',
                                })
                            } else {
                                Swal.fire({
                                    type: "error",
                                    title: 'خطایی رخ داده است !',
                                    cancelButtonClass: 'btn btn-primary',
                                    cancelButtonText: 'تلاش مجدد',
                                })
                            }
                        }).catch(error => console.log("error", error))
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
        let editOrDup = JSON.stringify({type,allData : responseData})
        console.log("loading dataaaaaaa  : " , editOrDup)

        pushUpdateData(editOrDup);
    }


    return (
        <div>
            <ul className={"content-li"}>
                {data ? Object.keys(data).map((keyName, i) => {
                        return (
                            <li id={"li-back-item"}>


                                <div className={"branch-top"}>
                                </div>

                                <Item key={data[keyName].name} name={data[keyName].name}
                                      allData={JSON.stringify(data[keyName])}
                                      id={data[keyName].id} status={data[keyName].status}
                                      callBack={item => handlePush(item)}
                                      duplicate={item => HndleDuplicate(item)}
                                      delClick={item => HandleDelClick(item)}
                                      level={1}
                                      dataForEdit={item => HandleDataForUpdate(item)}
                                      itemClick={itemId => HandleClick(itemId)}
                                      responseUpdate = {item => setResponseData(item)}
                                />
                                {data[keyName].childern.length > 0 ? data[keyName].childern.map((itemClildOne, i) => {
                                        return (
                                            <ul style={{padding: '0 50px 0 0', listStyle: 'inherit'}}>
                                                {console.log("indexed : ", i)}

                                                <li id={"li-back-item"}>

                                                    <div className={"branch-top"}>
                                                    </div>


                                                    <div className={"branch"}>
                                                        <div className={"box"}></div>
                                                    </div>
                                                    <Item key={itemClildOne.id} status={itemClildOne.status}
                                                          name={itemClildOne.name} id={itemClildOne.id}
                                                          allData={JSON.stringify(itemClildOne)}
                                                          callBack={item => handlePush(item)}
                                                          duplicate={item => HndleDuplicate(item)}
                                                          delClick={item => HandleDelClick(item)}
                                                          level={2}
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
                                                                      allData={JSON.stringify(childThree)}
                                                                      duplicate={item => HndleDuplicate(item)}
                                                                      delClick={item => HandleDelClick(item)}
                                                                      level={3}
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

    )

}
