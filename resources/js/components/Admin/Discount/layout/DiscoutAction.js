import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import {Request} from "../../../../services/AdminService/Api";
import {MultiOption} from "./MultiOption";
import {MultiSelected} from "./MultiSelected";
import $ from "jquery";

export const DiscoutAction = ({defaultValue , limit,dataOut}) => {

    const {functionality} = defaultValue;

    const [status, setStatus] = useState(true);
    const [data, setData] = useState({limit: limit ? limit : null})
    const [productData, setProductData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [typeSel, setTypeSel] = useState({types: functionality.id ? functionality.id : ''});

    const [catSel, setCatSel] = useState(defaultValue ? defaultValue.catSel : []);



    console.log(functionality)
    const handleClose = e => {
        e.preventDefault();
        $("#back-loaderedss").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loaderedss"));
    }

    const handleAdd = e => {
        e.preventDefault();
        dataOut({data , catSel})
        console.log(catSel , "mmmm")
        handleClose(e);
    }

    const CategoryGet = async () => {

    }

    const handleSearchProducts = e => {
        let searchdata = {search: '', pageSize: 10}
        console.log(e);

        if (e) {
            searchdata.search = e;
            setLoading(true);
            Request.GetAllProducts(searchdata).then(res => {
                setLoading(false);
                setProductData(res.data.data.data);
            })
        } else {
            setLoading(true);
            Request.GetAllProducts(searchdata).then(res => {
                setLoading(false);
                setProductData(res.data.data.data);
            })
        }

    }

 const handleSearchCategore = e => {
        let searchdata = {search: '', pageSize: 10}
        if (e) {
            searchdata.search = e;
            setLoading(true);
            Request.GetAllCategorySearch(searchdata).then(res => {
                setLoading(false);
                setCategoryData(res.data.data.data);
            })
        } else {
            setLoading(true);
            Request.GetAllCategorySearch(searchdata).then(res => {
                setLoading(false)
                setCategoryData(res.data.data.data);
            })
        }

    }


    const HandleChange = (e) => {
        let checkBoxCustom = $("span.checkboxed.limi");
        if (e.target.checked) {
            checkBoxCustom.addClass("active")
            setStatus(true)
            setData({limit: null})
        } else {
            setData({limit: ''})
            checkBoxCustom.removeClass("active")
            setStatus(false)
        }
    }

    useEffect(() => {
        if (status) {
            $("span.checkboxed.limi").addClass("active");
        } else {
            $("span.checkboxed.limi").removeClass("active");
        }
    }, [])


    const HandleChangeLimit = e => {
        e.preventDefault();
        if (e.target.value < 1) {
            setData({
                ...data,
                [e.target.name]: 1
            })
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }

    }


    const handleChoise = (e, id , name , index) => {
        e.preventDefault();

        setData({
            ...data,
            name,
            index
        })

        setCatSel([])

        if (id == 0) {
            let typp = {...typeSel};
            typp.types = "total_card_price";
            setTypeSel(typp);
        } else if (id == 1) {
            let typpp = {...typeSel};
            typpp.types = "total_items_price";
            setTypeSel(typpp);

        } else if (id == 2) {
            let typpps = {...typeSel};
            typpps.types = "special_products";
            setTypeSel(typpps);
            handleSearchProducts();

        } else if (id == 3) {
            let typppb = {...typeSel};
            typppb.types = "special_categories";
            setTypeSel(typppb);
            handleSearchCategore();
        } else {

        }

    }

    $(".main-selected").click(function () {
        $(".input-searchsss").addClass("active");
        $(".input-searchsss input").focus();
    })


    const handleSelecete = e => {

        setCatSel(e);

    }


    return (
        <div className={"col-lg-4 col-sm-12 col-md-8 customPrice"} id={"prices"} style={{overflow: 'inherit'}}>

            <div className={"col-12"}>
                <div className={"row"} style={{marginTop: '15px'}}>
                    <div className={"col-12"}>

                        <div className={"content-select firstes"}>

                            <p style={{textAlign: 'center'}}>تخفیف اعمال شود روی</p>

                            <MultiOption name={"status"} handleChoise={handleChoise} data={[{
                                id: 'total_card_price',
                                name: 'کل مبلغ سبد خرید'
                            }, {
                                id: 'total_items_price',
                                name: 'مبلغ سبد خرید بدون هزینه ارسال'
                            }, {
                                id: 'special_products',
                                name: 'محصولات خاص بدون هزینه ارسال'
                            }, {
                                id: 'special_categories',
                                name: 'دسته بندی خاص بدون هزینه ارسال'
                            }]}
                                // selected={item => handleCloseFirst(item)}

                            />

                        </div>

                    </div>


                    {typeSel.types ? typeSel.types == "special_products" ? (
                        <div className={"col-12"}>
                            <p>لیست محصولات</p>


                            <MultiSelected name={"cat-show"} data={productData}
                                           loadings={loading}
                                           searchs={handleSearchProducts}
                                           selected={handleSelecete}
                                // selected={e => setCatSel(e)}
                            />
                        </div>

                    ) : typeSel.types == "special_categories" ? (
                        <div className={"col-12"}>
                            <p>لیست دسته بندی ها</p>

                            <MultiSelected name={"cat-show"} data={categoryData}
                                           loadings={loading}
                                           // defSelected={catSel ? catSel : null}
                                           selected={handleSelecete}
                                           searchs={handleSearchCategore}
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
