import React, {useContext, useEffect, useState} from "react";
import './../../UserList/HOC/styleAction.scss'
import {CHECK_BOX_CONTENT} from './../../UserList/Helper/Context'
import $ from "jquery";

export const TotalActions = ({text , data, allData , deleteUsers :pushDeleteUser }) => {

    useEffect(() => {

    }, [])
    const {checkBox, setCheckBox} = useContext(CHECK_BOX_CONTENT);

    const [checkFixed, setCheckFixed] = useState(false);

    const checkAll = e => {
        e.preventDefault();
        let dataAlls = [...checkBox];
        allData.data.map(item => {
            var indexc1 = dataAlls.indexOf(item.id);
            if (indexc1 == -1) {
                dataAlls.push(item.id);
            }
        })
        setCheckBox(dataAlls);
    }

    const unCheckAll = e => {
        e.preventDefault();
        let dataAlls = [];
        setCheckBox(dataAlls);
    }

    // var sidebarWidth = $('.main-menu').parent().width() - $('.main-menu').width();
    // $(document).scroll(function () {
    //     sidebarWidth = $('.main-menu').parent().width() - $('.main-menu').width();
    //     var sr = $(document).scrollTop();
    //     if (sr > 0) {
    //         $(".header-navbar").fadeOut(0)
    //         $("#totalAction").addClass("fixed")
    //         // $("#totalAction").width(sidebarWidth)
    //         setCheckFixed(true)
    //     } else {
    //         $("#totalAction").removeClass("fixed")
    //         $(".header-navbar").fadeIn(0)
    //         setCheckFixed(false)
    //     }
    // })

    console.log("******** >>>" , checkBox)

    return (
            <div id={"totalAction"}>
                <div className={"container-fluid"} style={{padding : 0 , margin : 0}}>
                    <div className={"row justify-content-center"}>
                        <div className={checkFixed == false ? "col-0" : "col-2 d-none d-lg-block"}>

                        </div>
                        <div className={checkFixed == false ? "col-12" : "col-10"}>
                            <div className={"row"}>
                                <div className={"col-lg-6 col-md-3"}
                                     style={{textAlign : 'center',marginBottom: 5, marginTop: 5, lineHeight: '3.1' ,fontSize : '13px'}}>
                                    {text ? (
                                        data.length + text
                                    ) : (
                                        data.length+ " ?????????? ???????????? ?????? ?????? "
                                    ) }

                                </div>
                                <div className={"col-lg-2 col-md-3"} style={{marginBottom: 5, marginTop: 5}}>
                                    <button style={{width: '100%'}} className={"btn btn-primary"}
                                            onClick={e => checkAll(e)}>????????????
                                        ??????
                                    </button>
                                </div>
                                <div className={"col-lg-2 col-md-3"} style={{marginBottom: 5, marginTop: 5}}>
                                    <button style={{width: '100%'}} className={"btn btn-warning"}
                                            onClick={e => unCheckAll(e)}>??????
                                    </button>
                                </div>
                                <div className={"col-lg-2 col-md-3"} style={{marginBottom: 5, marginTop: 5}}>
                                    <button style={{width: '100%'}} className={"btn btn-danger"} onClick={e => pushDeleteUser(e)}>??????</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



    )
}
