import React, {useState, useEffect} from 'react';
import {Header} from './../Partials/Header'
import {ItemCheckOut} from "../Partials/ItemCheckOut";
import './../_shared/style.scss';
import ReactDOM from 'react-dom';
import SendDetail from './../SendDetail';
import {separate} from "../../../helper";

const CheckBascket = ({checkAuth, attributes, historyCartData, historyTotalPrice , transform}) => {
    const [attributeParse, setAttributePrase] = useState([]);
    const [customCheckOutData, setCustomCheckOutData] = useState(historyCartData ? historyCartData : []);
    const [totalPrice, setTotalPrice] = useState(historyTotalPrice ? historyTotalPrice : 0);

    function calculateTotalPrice(attrData) {
        let totalPriceCal = 0;
        attrData.map(item => {
            totalPriceCal = totalPriceCal + item.totalPrice;

        })
        setTotalPrice(totalPriceCal);

    }

    function createCustomCheckoutData(data) {
        let totalPriceCal = 0;
        data.map(item => {
            customCheckOutData.push({
                id: item.id,
                final_price: item.final_price,
                totalPrice: item.final_price,
                title: item.product.title,
                image_url: item.product.image_url,
                count: 1
            })
            totalPriceCal = totalPriceCal + item.final_price;
            setTotalPrice(totalPriceCal)
        })
    }


    const getAttributes = () => {
        try {
            return new Promise(resolve => {
                setAttributePrase(JSON.parse(attributes))
                createCustomCheckoutData(JSON.parse(attributes));
                resolve(true)
            })
        } catch (e) {
            return new Promise(reject => {
                reject(e)
            })
        }
    }


    useEffect(() => {
        getAttributes();
    }, [])

    const handleNext = e => {
        e.preventDefault();
        ReactDOM.render(<SendDetail transform={transform} checkAuth={checkAuth} attributesData={attributes} cartInvoice={customCheckOutData}
                                    totalPrice={totalPrice}/>, document.getElementById("mains-content"));
    }
    const handlePrev = e => {
        e.preventDefault();
        ReactDOM.render(<SendDetail/>, document.getElementById("mains-content"));
    }


    const onDelete = (e, id) => {
        e.preventDefault();
        let customDataClone = [...customCheckOutData];
        // let newAttrAfterFilter = customDataClone.filter(item => item.id !== id);
        setCustomCheckOutData(customDataClone.filter(item => item.id !== id));
        calculateTotalPrice(customDataClone.filter(item => item.id !== id));

    }

    const handleTotalCartPrice = () => {

    }

    const onChangeTotalCount = (e, id, count, final_price, index) => {
        e.preventDefault();
        let customCheckOutDataClone = [...customCheckOutData];
        customCheckOutDataClone[index].count = count ? count : 1;
        customCheckOutDataClone[index].totalPrice = count * final_price;
        setCustomCheckOutData(customCheckOutDataClone);
        calculateTotalPrice(customCheckOutDataClone);

    }


    if (customCheckOutData && customCheckOutData.length > 0) {
        return (
            <>
                <Header selected={"check"}/>
                <div className={"container-fluid"}>
                    <div className={"row"}>
                        <ul id={"title-checkout"}>
                            <li>??????????</li>
                            <div id={"price-data"}>
                                <span>????????</span>
                                <span>??????????</span>
                                <span>?????? ????????</span>
                            </div>

                            <li style={{width: '45px'}}></li>
                        </ul>

                        {customCheckOutData.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <ItemCheckOut
                                        final_price={item.final_price}
                                        name={item.title}
                                        id={item.id}
                                        onDelete={onDelete}
                                        image={item.image_url}
                                        firstCount={item.count}
                                        onChangeTotalCount={onChangeTotalCount}
                                        index={index}
                                    />
                                </React.Fragment>
                            )

                        })}

                        <div className={"row"} style={{width: '100%'}}>
                            <div className={"col-lg-4 col-md-6 col-sm-12"}>
                            </div>
                            <div className={"col-lg-4 col-md-6 col-sm-12"}>

                            </div>
                            <div className={"col-lg-4 col-md-6 col-sm-12"}>
                                <div className={"total-price-check"}>
                                    <div className={"row"}>
                                        <div className={"col-6"}
                                             style={{fontSize: '16px', fontWeight: 100, lineHeight: '3.4'}}>???????? ???? ??????
                                            ???????? :
                                        </div>
                                        <div className={"col-6"} style={{
                                            fontSize: '17px',
                                            color: "#000000",
                                            lineHeight: '3.2',
                                            textAlign: 'left'
                                        }}>{separate(totalPrice)} ??????????
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className={"col-12"} style={{marginTop: '30px', padding: 0}}>
                    <button onClick={e => handleNext(e)} style={{float: 'left', fontSize: '16px', fontWeight: 100}}
                            className={"btn btn-primary"}> ?????? ?????????? <i className={"bx bx-chevron-left"}></i></button>
                    <button onClick={e => handlePrev(e)}
                            style={{float: 'right', background: '#fff', fontSize: '16px', fontWeight: 100}}
                            className={"btn"}><i className={"bx bx-chevron-right"}></i> ????????????
                    </button>
                </div>
            </>
        )
    } else {
        return <p>?????? ???????? ?????? ???????? ????????????!</p>
    }


}

export default CheckBascket;
