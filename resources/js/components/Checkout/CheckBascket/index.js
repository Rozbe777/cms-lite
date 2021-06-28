import React, {useState, useEffect} from 'react';
import {Header} from './../Partials/Header'
import {ItemCheckOut} from "../Partials/ItemCheckOut";
import './../_shared/style.scss';
import ReactDOM from 'react-dom';
import SendDetail from './../SendDetail';
const CheckBascket = () => {
    useEffect(() => {
    }, [])
    // const {mini} = props;
    const [state, setState] = useState();

    const handleNext = e => {
        e.preventDefault();
        ReactDOM.render(<SendDetail /> , document.getElementById("mains-content"));
    }
    const handlePrev = e => {
        e.preventDefault();
        ReactDOM.render(<SendDetail /> , document.getElementById("mains-content"));
    }

    return (
        <>
            <Header selected={"check"}/>
            <div classNme={"container-fluid"}>
                <div classNme={"row"}>
                    <ul id={"title-checkout"}>
                        <li>محصول</li>
                        <div id={"price-data"}>
                            <span>قیمت</span>
                            <span>تعداد</span>
                            <span>جمع قیمت</span>
                        </div>

                        <li style={{width: '45px'}}></li>
                    </ul>
                    <ItemCheckOut/>
                    <ItemCheckOut/>
                    <ItemCheckOut/>

                    <div className={"row"}>
                        <div className={"col-lg-4 col-md-6 col-sm-12"}>
                        </div>
                        <div className={"col-lg-4 col-md-6 col-sm-12"}>

                        </div>
                        <div className={"col-lg-4 col-md-6 col-sm-12"}>
                            <div className={"total-price-check"}>
                               <div className={"row"}>
                                   <div className={"col-6"} style={{fontSize : '16px',fontWeight : 100,lineHeight : '3.4'}}>مبلغ کل سبد خرید : </div>
                                   <div className={"col-6"} style={{fontSize : '17px',color : "#000000",lineHeight : '3.2' , textAlign : 'left'}}>100000 تومان</div>
                               </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className={"col-12"} style={{marginTop : '30px' , padding : 0}}>
                <button onClick={e => handleNext(e)} style={{float : 'left' , fontSize : '16px' , fontWeight : 100}} className={"btn btn-primary"}> ثبت سفارش  <i className={"bx bx-chevron-left"}></i>  </button>
                <button onClick={e => handlePrev(e)} style={{float : 'right' , background : '#fff' ,  fontSize : '16px' , fontWeight : 100}} className={"btn"}><i className={"bx bx-chevron-right"}></i> بازگشت  </button>
            </div>
        </>
    )
}

export default CheckBascket;
