import React, {useEffect, useState} from 'react'
import ReactDom from 'react-dom';
import {BackLoader} from './../../_Micro/BackLoader'
import {TreeShowCategory} from './../../_Micro/TreeShow/TreeShowCategory';
import {TreeShowPage} from './../../_Micro/PageComponents/TreeShowPage';
import {Request} from './../../../../services/AdminService/Api'
import './../../_Micro/TreeShow/_Shared/style.scss';
import AddCategory from './../CategoryAdd';
import PageAdd from './../../Page/PageAdd'
import Loading from './../../_Micro/Loading'
import $ from 'jquery';

const LOCAL_CAT = "localcat-zerone-cmslite";

export const CategoryList = () => {
    const [dispaly, setDisplay] = useState(false)
    const [dispalyAdd, setDisplayAdd] = useState({dispaly: false})
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState({})
    const [pageData, setPageData] = useState({})

    const GetAllCategory = () => {
        setLoading(true)
        Request.GetAllCategory()
            .then(res => {
                localStorage.setItem(LOCAL_CAT, JSON.stringify(res));
                setLoading(false)
                setCategoryData(res.data)
            })
            .catch(err => console.log("errpr : ", err))
    }

    const GetAllPages = () => {
        setLoading(true)
        Request.GetAllPages()
            .then(res => {
                console.log("page data : " , res)
                localStorage.setItem(LOCAL_CAT, JSON.stringify(res));
                setLoading(false)
                setPageData(res.data)
            })
            .catch(err => console.log("errpr : ", err))
    }


    useEffect(() => {
        GetAllCategory();
        GetAllPages();
        $(function () {
            $("#add-category-selected").click(() => {
                $(".back-loader").fadeIn();
            })
            $(".back-loader").click(() => {
                $(".back-loader").fadeOut();
            })
        })
    }, [])

    const handleAddPage = () => {
        ReactDom.render(<PageAdd display={true} dataUpdate={''} idParent={0}
                                     result={item => handleBackPage(item)}/>, document.getElementById("add-datas"))
    }

    const HandleAdd = (item) => {
        if (item.status == 200) {
            GetAllCategory();
            GetAllPages();
            ReactDom.render('', document.getElementById("add-datas"))
        } else {
            console.log("error in add : ", item)
        }
    }

    const HandleDelete = (status) => {
        if (status == 200) {
            GetAllCategory();
            GetAllPages();
        } else {
            console.log("you have an error");
        }
    }

    const HandleDuplicate = (status) => {
        if (status == 200) {
            GetAllCategory();
            GetAllPages();
        } else {
            console.log("you have an error");
        }
    }

    const handleClickItem = (clickId) => {
        ReactDom.render(<AddCategory display={true} idParent={clickId}
                                     dataUpdate={''}
                                     result={item => handleBack(item)}/>, document.getElementById("add-datas"))

    }

    const handleBack = (item) => {
        if (item.status == 200) {
            GetAllCategory();
            GetAllPages();
            ReactDom.render('', document.getElementById('add-datas'))
        }
    }
    const handleBackPage = (item) => {
        if (item.status == 200) {
            GetAllPages();
            ReactDom.render('', document.getElementById('add-datas'))
        }
    }
    const HandleBackLoader = (data) => {
        // console.log("+++++++" , JSON.parse(JSON.parse(data).allData).parent_id)
        let id_parents = JSON.parse(JSON.parse(data).allData).parent_id;
        // console.log("loading loader : " , id_parents)
        ReactDom.render(<AddCategory display={true} dataUpdate={data} idParent={id_parents}
                                     result={item => handleBack(item)}/>, document.getElementById("add-datas"))
    }

    const HandleAddContentSelect = (data) => {
        let datas = JSON.parse(data);
        if (datas.type == "category")
        {
            ReactDom.render(<AddCategory display={true} dataUpdate={''} idParent={0}
                                         result={item => handleBack(item)}/>, document.getElementById("add-datas"))
        }else{
            ReactDom.render(<PageAdd display={true} dataUpdate={''} idParent={0}
                                         result={item => handleBack(item)}/>, document.getElementById("add-datas"))
        }
    }


    // page handlersssss

    const HandleDuplicatePage = (status) => {
        if (status == 200) {
            GetAllPages();
        } else {
            console.log("you have an error");
        }
    }


    const handleClickItemPage = (clickId) => {
        ReactDom.render(<PageAdd display={true} idParent={clickId}
                                     dataUpdate={''}
                                     result={item => handleBack(item)}/>, document.getElementById("add-datas"))

    }

    const HandleDeletePage = (status) => {
        if (status == 200) {
            GetAllPages();
        } else {
            console.log("you have an error");
        }
    }

    const HandleBackLoaderPage = (data) => {

        // console.log("+++++++" , JSON.parse(JSON.parse(data).allData).parent_id)
        // let id_parents = JSON.parse(JSON.parse(data).allData).parent_id;
        // console.log("loading loader : " , id_parents)
        ReactDom.render(<PageAdd display={true} dataUpdate={data} idParent={0}
                                     result={item => handleBack(item)}/>, document.getElementById("add-datas"))
    }


    return (
        <div>
            <div className="tab-content" style={{padding: 0}}>
                <div className="tab-pane active" id="home" aria-labelledby="home-tab" role="tabpanel">
                    {console.log("category dataaaaaaaa ...... : " , categoryData)}
                    {categoryData && categoryData.length  >  0 && loading == false ? (
                        <TreeShowCategory handleCata={itemCat => console.log("cat back ,", itemCat)}
                                          duplicate={item => HandleDuplicate(item)}
                                          itemClicks={clicks => handleClickItem(clicks)}
                                          callBack={item => HandleDelete(item)}
                                          delClick={item => HandleDelete(item)}
                                          updateData={item => HandleBackLoader(item)}
                                          data={categoryData}
                                          loading={loading}/>
                    ) : loading == false ?  (
                        <div>
                            <p style={{textAlign: 'center', marginTop: 20}}>
                                لیست دسته بندی برای نمایش وجود ندارد!
                            </p>

                            <div id={"maines"}>
                                <button id="add-category"
                                        onClick={() => handleAddPage()}
                                        style={{width: 180}}
                                        className="btn btn-primary glow mr-1 mb-1"
                                        type="button">
                                    <span className="align-middle ml-25">افزودن دسته بندی</span>
                                </button>
                            </div>
                        </div>
                        ) : <Loading />}

                </div>
                <div className="tab-pane" id="profile" aria-labelledby="profile-tab" role="tabpanel">

                    {/*{console.log("data page : " , pageData)}*/}
                    {pageData.data && pageData.data.length  >  0 && loading == false ? (
                        <TreeShowPage handleCata={itemCat => console.log("cat back ,", itemCat)}
                                          duplicate={item => HandleDuplicatePage(item)}
                                          itemClicks={clicks => handleClickItemPage(clicks)}
                                          callBack={item => HandleDeletePage(item)}
                                          delClick={item => HandleDeletePage(item)}
                                          updateData={item => HandleBackLoaderPage(item)}
                                          data={pageData}
                                          loading={loading}/>
                    ) : loading == false ?  (
                        <div>
                            <p style={{textAlign: 'center', marginTop: 20}}>
                                صفحه ای برای نمایش وجود ندارد!
                            </p>

                            <div id={"maines"}>
                                <button id="add-category"
                                        onClick={() => handleAddPage()}
                                        style={{width: 180}}
                                        className="btn btn-primary glow mr-1 mb-1"
                                        type="button">
                                    <span className="align-middle ml-25">افزودن صفحه </span>
                                </button>
                            </div>
                        </div>
                    ) : <Loading />}









                </div>
            </div>





            <BackLoader states={item => (HandleAddContentSelect(item))}/>
            <div id={"add-datas"}></div>

        </div>

    )
}

let elements = document.getElementById("category_box");
if (elements) {
    const props = Object.assign({}, elements.dataset)
    ReactDom.render(<CategoryList {...props} />, elements);
}
