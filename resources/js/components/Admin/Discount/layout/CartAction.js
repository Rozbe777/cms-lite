import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import {Request} from "../../../../services/AdminService/Api";
import {MultiOption} from "./MultiOption";
import {MultiSelected} from "./MultiSelected";
import $ from "jquery";

export const CartAction = ({defData, dataOut}) => {

    console.log(defData , "..______________")

    function handleCondName(id) {
        switch (id.typeSel.types) {
            case  'unlimited' :
                return 'بدون محدودیت';
            case 'min_purchase_number' :
                return 'حداقل مبلغ سبد خرید';
            case 'max_cart_price' :
                return `حداقل تعداد محصولات در سبد`;
            case "max_purchase_number" :
                return `حداکثر مبلغ سبد خرید`;
            default :
                return 'بدون محدودیت';
        }
    }

    const [typeSel, setTypeSel] = useState({types: defData ? defData.typeSel.types : 'unlimited'});
    const [typeName, setTypeName] = useState({
        text: defData ? handleCondName(defData) : '',
        type: defData ? defData.typeSel.types : null
    });
    const [card_conditions_amount, setCard_conditions_amount] = useState(defData ? defData.cart_conditions_amount : null);
    const handleClose = e => {
        e.preventDefault();
        $("#back-loaderedss").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loaderedss"));
    }

    const handleAdd = e => {
        e.preventDefault();
        let typesNn = typeName.type ? typeName.type == "max_purchase_number" || typeName.type == "min_purchase_number" ? typeName.text + " " + card_conditions_amount + " تومان " : typeName.text + " " + card_conditions_amount : typeName.text;
        dataOut({
            cart_conditions_amount : card_conditions_amount,
            typeSel,
            typesNn
        });
        // console.log("/////" ,{
        //     card_conditions_amount,
        //     typeSel,
        //     typesNn
        // } )
        handleClose(e);
    }


    useEffect(() => {

    }, [])


    const handleChoise = (e, id) => {
        e.preventDefault();

        if (id == 0) {
            let typp = {...typeSel};
            typp.types = "unlimited";
            setTypeSel(typp);
            setTypeName({text: "بدون محدودیت", type: 'unlimited'})
        } else if (id == 1) {
            let typpp = {...typeSel};
            typpp.types = "min_purchase_number";
            setTypeSel(typpp);
            setTypeName({text: "با محدودیت حداقل مبلغ خرید", type: 'min_purchase_number'});
        } else if (id == 2) {
            let typpps = {...typeSel};
            typpps.types = "max_purchase_number";
            setTypeSel(typpps);
            setTypeName({text: "با محدودیت حداقل تعداد محصولات", type: 'max_purchase_number'});

        } else if (id == 3) {
            let typppb = {...typeSel};
            typppb.types = "max_cart_price";
            setTypeSel(typppb);
            setTypeName({text: "با محدودیت حداکثر مبلغ خرید ", type: 'max_cart_price'});

        } else {

        }

    }


    const handleCartValue = e => {
        e.preventDefault();
        setCard_conditions_amount(e.target.value);
    }


    return (
        <div className={"col-lg-4 col-sm-12 col-md-8 customPrice"} id={"prices"} style={{overflow: 'inherit'}}>

            <div className={"col-12"}>
                <div className={"row"} style={{marginTop: '15px'}}>
                    <div className={"col-12"}>

                        <div className={"content-select firstes"}>

                            <p style={{textAlign: 'center'}}>حداقل شرایط سبد خرید</p>

                            <MultiOption defData={typeSel.types} name={"cart-roles"} handleChoise={handleChoise}
                                         data={[{
                                             id: 'unlimited',
                                             name: 'بدون محدودیت'
                                         }, {
                                             id: 'min_purchase_number',
                                             name: 'حداقل مبلغ سبد خرید'
                                         }, {
                                             id: 'max_purchase_number',
                                             name: 'حداقل تعداد محصولات در سبد خرید'
                                         }, {
                                             id: 'max_cart_price',
                                             name: 'حداکثر مبلغ سبد خرید'
                                         }]}
                                // selected={item => handleCloseFirst(item)}

                            />

                        </div>

                    </div>


                    {1 ? typeSel.types == "min_purchase_number" ? (
                        <div className={"col-12"}>
                            <p style={{textAlign: 'center'}}>مبلغ خرید </p>
                            <input style={{textAlign: 'center'}} onChange={e => handleCartValue(e)} type="number"
                                   value={card_conditions_amount ? card_conditions_amount : ''} id="title"
                                   className="form-control"/>

                        </div>

                    ) : typeSel.types == "max_cart_price" ? (
                        <div className={"col-12"}>
                            <p style={{textAlign: 'center'}}>مبلغ خرید </p>
                            <input style={{textAlign: 'center'}} onChange={e => handleCartValue(e)} type="number"
                                   value={card_conditions_amount ? card_conditions_amount : ''} id="title"
                                   className="form-control"/>

                        </div>


                    ) : typeSel.types == "max_purchase_number" ? (
                        <div className={"col-12"}>
                            <p style={{textAlign: 'center'}}>تعداد محصولات سبد خرید</p>
                            <input style={{textAlign: 'center'}} onChange={e => handleCartValue(e)} type="number"
                                   value={card_conditions_amount ? card_conditions_amount : ''} id="title"
                                   className="form-control"/>

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
