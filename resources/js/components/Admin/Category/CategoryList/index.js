import React, {useEffect, useState} from 'react'
import ReactDom from 'react-dom';
import {BackLoader} from './../../_Micro/BackLoader'
import {TreeShowCategory} from './../../_Micro/TreeShow/TreeShowCategory';
import {Request} from './../../../../services/AdminService/Api'
import './../../_Micro/TreeShow/_Shared/style.scss';
import AddCategory from './../CategoryAdd';
import $ from 'jquery';

const LOCAL_CAT = "localcat-zerone-cmslite";

export const CategoryList = () => {
    const [dispaly, setDisplay] = useState(false)
    const [dispalyAdd, setDisplayAdd] = useState({dispaly : false})
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState({})

    const GetAllCategory = () => {
        setLoading(true)
        Request.GetAllCategory()
            .then(res => {
                localStorage.setItem(LOCAL_CAT , JSON.stringify(res));
                setLoading(false)
                setCategoryData(res.data)
            })
            .catch(err => console.log("errpr : " , err))
    }
    useEffect(() => {
        GetAllCategory();
        $(function (){
            $("#add-category").click(()=>{
                $(".back-loader").fadeIn();
            })
            $(".back-loader").click(()=>{
                $(".back-loader").fadeOut();
                setTimeout(() => {
                    let dispalys = {...dispalyAdd}
                    dispalys.dispaly = true;
                }, 200)
            })
        })
    }, [])



    $(function () {
        $("#add-category").click(() => {
            setDisplay(true)
        })
    })

    const handleAddPage = () => {
        $("#category_add_pop_base").fadeIn();
    }

    const HandleAdd = (item) => {
        if(item.status == 200){
            GetAllCategory();
            ReactDom.render('',document.getElementById("add-datas"))
        }else{
            console.log("error in add : " , item)
        }
    }

    const HandleDelete = (status) => {
        if (status == 200) {
            GetAllCategory();
        } else {
            console.log("you have an error");
        }
    }

    const HandleDuplicate = (status) => {
        if (status == 200) {
            GetAllCategory();
        } else {
            console.log("you have an error");
        }
    }


    const handleClickItem = (clickId) => {
        ReactDom.render(<AddCategory display={true} idParent={clickId}
                                     result={item => handleBack(item)}/>, document.getElementById("add-datas"))

    }

    const handleBack = (item) => {
        if (item.status == 200) {
            GetAllCategory();
            ReactDom.render('' , document.getElementById('add-datas'))
        }
    }
    const HandleBackLoader = (data) => {
        // let dataNew = JSON.parse(data);
        ReactDom.render(<AddCategory display={true} dataUpdate={data} idParent={null}
                                     result={item => handleBack(item)}/>, document.getElementById("add-datas"))

    }


    return (
        <div>
            <ul className="nav nav-tabs tab-layout" role="tablist">
                <li className="nav-item col-6 nav-custom">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" aria-controls="home"
                       role="tab" aria-selected="true">
                        <i className="bx bxs-categories align-middle" id={"tab-list-icon"}
                           style={{marginTop: '4px', fontSize: '35px !important'}}></i>
                        <span className="align-middle">دسته بندی</span>
                    </a>
                </li>
                <li className="nav-item col-6 nav-custom">
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" aria-controls="profile"
                       role="tab" aria-selected="false">
                        <i className="bx bxs-layer align-middle"
                           id={"tab-list-icon"}
                           style={{marginTop: '4px', fontSize: '35px !important'}}></i>
                        <span className="align-middle">صفحات داخلی</span>
                    </a>
                </li>

            </ul>

            <div className="tab-content" style={{padding: 0}}>
                <div className="tab-pane active" id="home" aria-labelledby="home-tab" role="tabpanel">

                    <TreeShowCategory handleCata={itemCat => console.log("cat back ,", itemCat)}
                                      duplicate={item => HandleDuplicate(item)}
                                      itemClicks={clicks => handleClickItem(clicks)}
                                      callBack={item => HandleDelete(item)}
                                      delClick={item => HandleDelete(item)}
                                      updateData={item => HandleBackLoader(item)}
                                      data={categoryData}
                                      loading={loading}/>

                </div>
                <div className="tab-pane" id="profile" aria-labelledby="profile-tab" role="tabpanel">
                    <p style={{textAlign: 'center', marginTop: 20}}>
                        صفحه ای برای نمایش وجود ندارد!
                    </p>

                    <div id={"maines"}>
                        <button id="add-category"
                                onClick={() => handleAddPage()}
                                style={{width: 180}}
                                className="btn btn-primary glow mr-1 mb-1"
                                type="button">
                            <span className="align-middle ml-25">ساخت صفحه جدید</span>
                        </button>
                    </div>
                </div>
            </div>


            <div className={"back-blur"}>

                <div id={"bottom-chip"}>
                    <div className={"form-check"}>

                        <ul>
                            <li>کپی دسته</li>
                            <li>ویرایش</li>
                            <li>حذف</li>
                            <li>مشاهده</li>
                            <li>زیردسته</li>
                            <li>
                                <span className={"badge badge-success badge-pill ml-50"}>فعال</span>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>


            <BackLoader states={item =>(HandleBackLoader(item))}/>
            <div id={"add-datas"}></div>

        </div>

    )
}

let elements = document.getElementById("category_box");
if (elements) {
    const props = Object.assign({}, elements.dataset)
    ReactDom.render(<CategoryList {...props} />, elements);
}
