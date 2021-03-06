import React, {useState, useEffect, useContext} from "react";
import ReactDOM from 'react-dom';
import {Request} from "../../../../services/AdminService/Api";
import {MultiOption} from "./MultiOption";
import {MultiSelectedUser} from "./MultiSelectedUser";
import {USER_SETTING} from './../layout/Context';
import $ from "jquery";

export const UserSetting = ({dataOut, oldData}) => {


    useEffect(() => {
        handleSearchUser();
    }, [])

    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [userGroup, setUserGroup] = useState(oldData ? oldData.userGroup : [-1])
    const [typeSel, setTypeSel] = useState({type: oldData ? oldData.userStatus : 'all'});

    const handleClose = e => {
        e.preventDefault();
        $("#back-loaderedss").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loaderedss"));
    }

    const handleAdd = e => {
        e.preventDefault();
        console.log("______", userGroup)
        dataOut({user_status: typeSel, userGroup});
        handleClose(e);
    }


    const handleSearchUser = e => {
        let searchdata = {search: '', pageSize: 10}
        if (e) {
            searchdata.search = e;
            setLoading(true);
            Request.GetAllUserApi({params: searchdata}).then(res => {
                setLoading(false);
                setUserData(res.data.data.data);
            })
        } else {
            setLoading(true);
            Request.GetAllUserApi({params: searchdata}).then(res => {
                setLoading(false);
                setUserData(res.data.data.data);
            })
        }

    }


    const handleChoiseGroup = (e, index, name, id) => {
        e.preventDefault();
        let userGroups = [];
        userGroups.push(parseInt(id))
        setUserGroup(userGroups);
    }
    const handleChoise = (e, id) => {
        e.preventDefault();
        if (id == 0) {

            let userState = {...typeSel};
            userState.type = "all";
            setTypeSel(userState)
        } else if (id == 1) {

            let userState = {...typeSel};
            userState.type = "group_of_users";
            setUserGroup([-2])
            setTypeSel(userState);

        } else if (id == 2) {
            let userState = {...typeSel};
            userState.type = "special_users";
            setTypeSel(userState);
            setUserGroup([])
            handleSearchUser();

        } else {

        }

    }

    $(".main-selected").click(function () {
        $(".input-searchsss").addClass("active");
        $(".input-searchsss input").focus();
    })


    const handleSelecete = data => {
        console.log(data, "======")
        setUserGroup(data)
    }


    return (
        <div className={"col-lg-4 col-sm-12 col-md-8 customPrice"} id={"prices"} style={{overflow: 'inherit'}}>

            <div className={"col-12"}>
                <div className={"row"} style={{marginTop: '15px'}}>
                    <div className={"col-12"}>

                        <div className={"content-select firstes"}>

                            <p style={{textAlign: 'center'}}> ?????????? ?????? ??????</p>

                            <MultiOption name={"status"} handleChoise={handleChoise}
                                         defData={typeSel.type ? typeSel.type : "all"} data={[{
                                id: 'all',
                                name: '?????? ??????????????'
                            }, {
                                id: 'group_of_users',
                                name: '?????????? ???? ??????????????'
                            }, {
                                id: 'special_users',
                                name: '?????????????? ??????'
                            }]}
                                // selected={item => handleCloseFirst(item)}
                            />

                        </div>

                    </div>


                    {typeSel.type ? typeSel.type == "group_of_users" ? (
                        <div className={"col-12"}>
                            <p style={{textAlign: 'center'}}>???????????????? ????</p>
                            <MultiOption name={"user_group"} data={[{
                                id: '-2',
                                name: '???????????????? ???? ???????? ???????? ???????? ??????'
                            }, {
                                id: '-3',
                                name: '???????????????? ???? ???????? ?????????? ??????'
                            }]}
                                         defData={userGroup ? userGroup[0] : -2}
                                         handleChoise={handleChoiseGroup}
                                // selected={item => handleCloseFirst(item)}

                            />
                        </div>

                    ) : typeSel.type == "special_users" ? (
                        <div className={"col-12"}>
                            <p>??????????</p>


                            <MultiSelectedUser name={"cat-show"} data={userData}
                                               loadings={loading}
                                               defSelected={userGroup[0] == -1 ? [] : userGroup}
                                               handleSelecete={handleSelecete}
                                               searchs={handleSearchUser}

                                // me={e => handleSearchCategory(e)}
                            />
                        </div>

                    ) : '' : ''}


                </div>
            </div>
            <div className={"bottom-btns"}>
                <div className={"row"}>
                    <div onClick={e => handleClose(e)} className={"col-6"} style={{borderLeft: '1px solid #ccc'}}
                         id={"btn-action"}>
                        ????????????
                    </div>
                    <div onClick={e => handleAdd(e)} className={"col-6"} id={"btn-action"}>
                        ??????????
                    </div>
                </div>
            </div>
        </div>
    )
}
