import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import {Request} from "../../../../services/AdminService/Api";
import {MultiOption} from "./MultiOption";
import {MultiSelected} from "./MultiSelected";
import $ from "jquery";

export const UserSetting = ({dataOut, limit,oldData ,  out: setOut}) => {

    console.log(oldData , "/////////////********")

    const [status, setStatus] = useState(true);
    const [data, setData] = useState({limit: limit ? limit : null})
    const [productData, setProductData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [userGroup , setUserGroup] = useState(oldData ? oldData.userGroup : [])
    const [typeSel, setTypeSel] = useState({types: oldData ? oldData.userStatus : '' , name : oldData ? oldData.userTypeName : ''});
    const [catSel, setCatSel] = useState(oldData.userGroup ? oldData.userGroup :  []);

    const handleClose = e => {
        e.preventDefault();
        $("#back-loaderedss").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loaderedss"));
    }

    const handleAdd = e => {
        e.preventDefault();
        dataOut({user_status: typeSel, userGroup ,userSelecet : catSel});
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


    const handleChoiseGroup = (e , index , name , id) => {
        e.preventDefault();
        let userGroups = [];
        setCatSel([]);
        userGroups.push(id)
        setUserGroup(userGroups);
    }
    const handleChoise = (e, id) => {
        e.preventDefault();

        if (id == 0) {
            let typp = {...typeSel};
            typp.types = "all";
            typp.name = "برای همه کاربران";
            setTypeSel(typp);
        } else if (id == 1) {
            let typpp = {...typeSel};
            typpp.types = "group_of_users";
            typpp.name = "برای گروهی از کاربران";
            setTypeSel(typpp);

        } else if (id == 2) {
            let typpps = {...typeSel};
            typpps.types = "special_users";
            typpps.name = "برای کاربران خاص";

            setTypeSel(typpps);
            handleSearchUser();

        } else {

        }

    }

    $(".main-selected").click(function () {
        $(".input-searchsss").addClass("active");
        $(".input-searchsss input").focus();
    })


    const handleSelecete = e => {

        let UserGroups = [];
        setUserGroup(UserGroups)
        setCatSel(e);

    }


    return (
        <div className={"col-lg-4 col-sm-12 col-md-8 customPrice"} id={"prices"} style={{overflow: 'inherit'}}>

            <div className={"col-12"}>
                <div className={"row"} style={{marginTop: '15px'}}>
                    <div className={"col-12"}>

                        <div className={"content-select firstes"}>

                            <p style={{textAlign: 'center'}}> اعمال شود روی</p>

                            <MultiOption name={"status"} handleChoise={handleChoise} defData={oldData ? oldData.userStatus : null} data={[{
                                id: 'all',
                                name: 'همه کاربران'
                            }, {
                                id: 'group_of_users',
                                name: 'گروهی از کاربران'
                            }, {
                                id: 'special_users',
                                name: 'کاربران خاص'
                            }]}
                                // selected={item => handleCloseFirst(item)}

                            />

                        </div>

                    </div>


                    {typeSel.types ? typeSel.types == "group_of_users" ? (
                        <div className={"col-12"}>
                            <p style={{textAlign: 'center'}}>کاربرانی که</p>
                            <MultiOption name={"user_group"} data={[{
                                id: '-2',
                                name: 'کاربرانی که قبلا خرید کرده اند'
                            }, {
                                id: '-3',
                                name: 'کاربرانی که خرید نکرده اند'
                            }]}
                                         defData={userGroup[0] ? userGroup[0] : ''}
                                         handleChoise={handleChoiseGroup}
                                // selected={item => handleCloseFirst(item)}

                            />
                        </div>

                    ) : typeSel.types == "special_users" ? (
                        <div className={"col-12"}>
                            <p>کاربر</p>


                            <MultiSelected name={"cat-show"} data={userData}
                                           loadings={loading}
                                           selected={handleSelecete}
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
                        انصراف
                    </div>
                    <div onClick={e => handleAdd(e)} className={"col-6"} id={"btn-action"}>
                        ذخیره
                    </div>
                </div>
            </div>
        </div>
    )
}
