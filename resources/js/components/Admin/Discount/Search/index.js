import React, {useEffect, useState} from "react";
import {MultiSelected} from "./../layout/MultiSelected";
import $ from 'jquery';
import ReactDOM from "react-dom";
import {MainRate} from "@emran-rastadi/reactjs-persian-calender-beauty";
import {AddDiscount} from "../AddDiscount";

const SearchComponent = ({token, sort: pushSort}) => {

    const [size, setSize] = useState(0);
    const [load, setLoad] = useState(false)
    const [categories, setCategories] = useState([]);
    const [dateStart, setDateStart] = useState();
    const [sizeCategory, setSizeCategory] = useState(0);
    const [sorting, setSorting] = useState({
        filter: []
    });


    const handleSelected = (select) => {
        console.log(select)
        let dataSe = [];
        let sortings = {...sorting};
        // let normalizes = NormalFilter(select);
        select.map(item => {
            if (item.id == "activeed"){
                dataSe.push("active")
            }else if (item.id == "deactivateded"){
                dataSe.push("deactivated")
            }else{
                dataSe.push("expaierd")
            }
        })
        sortings.status = dataSe;
        pushSort(sortings);
    }


    const handleFade = (e) => {
        $(".filter-content-fix").removeClass("active")
        setTimeout(() => {
            $(".filter-search").removeClass("active");
        }, 100);
    }

    const handleFadeSearchInput = (e) => {
        $(".search-input-float").toggleClass("active");
    }


    // jquery code in responsive
    const HandleResponsiveAdd = (e) => {
        e.preventDefault();
        ReactDOM.render(<AddDiscount token/>, document.getElementById("add-product"));
    }

    const handleFadeSearch = (e) => {
        e.preventDefault();
        $(".filter-search").addClass("active");
        setTimeout(() => {
            $(".filter-content-fix").addClass("active")
        }, 100);
    }


    let dataFilter = [
        {
            id: "activeed",
            name: ' فعال ها'
        }, {
            id: 'deactivateded',
            name: 'غیر فعال ها'
        }, {
            id: 'expireded',
            name: 'منقضی ها'
        }
    ]


    const HandleSearchInput = e => {
        e.preventDefault();
        let sortings = {...sorting};
        sortings[e.target.name] = e.target.value;
        setSorting(sortings);
        pushSort(sortings);
    }

    const handleChangeDateStart = date => {
        let sortings = {...sorting};

        let timeEdns = date.timestamp.toString();
        let newDateEnd = timeEdns.split("");
        delete newDateEnd[newDateEnd.length - 1];
        delete newDateEnd[newDateEnd.length - 2];
        delete newDateEnd[newDateEnd.length - 3];
        sortings.start_date = newDateEnd.join("");
        pushSort(sortings)
    }
    const handleChangeDateEnd = date => {
        let sortings = {...sorting};
        let timeEdns = date.timestamp.toString();
        let newDateEnd = timeEdns.split("");
        delete newDateEnd[newDateEnd.length - 1];
        delete newDateEnd[newDateEnd.length - 2];
        delete newDateEnd[newDateEnd.length - 3];
        sortings.end_date = newDateEnd.join("");
        pushSort(sortings)
    }

    return (
        <div className={"container-fluid"} style={{padding: '0px 4px'}}>
            <div id={"shop_product_search"} style={{marginBottom: 20}}>

                <div className="users-list-filter col-12" style={{padding: '0px !important'}}>
                    <div className="row col-12" id={"header-card-custom"}>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="users-list-verified">جستجو</label>
                            <input type="text" className="form-control"
                                   id={"search_input"}
                                   onChange={e => HandleSearchInput(e)}
                                   placeholder="جستجو با کد تخفیف ..." name="code"/>

                        </div>
                        <div className="col-12 col-sm-6 col-lg-3">
                            <label
                                htmlFor="users-list-verified">از تاریخ</label>
                            <div style={{width: '100%', height: '50px', background: '#fff', borderRadius: 5}}>
                                <MainRate onChange={handleChangeDateStart}
                                          Icon={<i className="bx bx-calendar-alt"></i>}/>

                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <label htmlFor="users-list-status">تا تاریخ</label>

                            <div style={{width: '100%', height: '50px', background: '#fff', borderRadius: 5}}>
                                <MainRate onChange={handleChangeDateEnd}
                                          Icon={<i className="bx bx-calendar-alt"></i>}/>

                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <label
                                htmlFor="users-list-role">بر اساس وضعیت</label>
                            <MultiSelected data={dataFilter}
                                           handleSelecete={handleSelected}
                                           name={"option-searc"}
                                // selected={itemsSel => handleCategory(itemsSel)}

                            />
                        </div>

                        {/*<div className="col-6 col-sm-6 col-lg-2" style={{marginBlockStart: 'auto'}}>*/}
                        {/*    <button type="submit" className="btn btn-primary mr-1 mb-1" id={"search-btn"}>جستجو</button>*/}
                        {/*</div>*/}


                    </div>
                </div>
            </div>

            <div className={"filter-search"} onClick={e => handleFade(e)}>
            </div>
            <div className={"filter-content-fix"}>
                <div className="row col-12" id={"header-card-custom"}>

                    <div className="col-12 col-sm-6 col-lg-3" id={"filterPro"}>
                        <label
                            htmlFor="users-list-verified">از تاریخ</label>
                        <div style={{width: '100%', height: '50px', background: '#fff', borderRadius: 5}}>
                            <MainRate onChange={handleChangeDateStart}
                                      Icon={<i className="bx bx-calendar-alt"></i>}/>

                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3" id={"productsSort"}>
                        <label
                            htmlFor="users-list-verified">تا تاریخ</label>
                        <div style={{width: '100%', height: '50px', background: '#fff', borderRadius: 5}}>
                            <MainRate onChange={handleChangeDateStart}
                                      Icon={<i className="bx bx-calendar-alt"></i>}/>

                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">
                        <label
                            htmlFor="users-list-role">بر اساس وضعیت</label>
                        <MultiSelected let={"bottom"}
                                       handleSelecete={handleSelected}
                                       data={dataFilter}
                        />
                    </div>

                    {/*<div className="col-6 col-sm-6 col-lg-2" style={{marginBlockStart: 'auto'}}>*/}
                    {/*    <button type="submit" className="btn btn-primary mr-1 mb-1" id={"search-btn"}>جستجو</button>*/}
                    {/*</div>*/}


                </div>
            </div>


            <div className={"float-btn"}>
                <ul>

                    <li onClick={e => handleFadeSearch(e)} style={{background: '#424242'}}>
                        <i className={"bx bx-filter-alt"}></i>
                    </li>
                    <li style={{background: '#e65100'}}>
                        <i className={"bx bx-search-alt"} id={"search-float-icons"}
                           onClick={e => handleFadeSearchInput(e)}></i>
                        <div className={"search-input-float"}>
                            <input onChange={e => HandleSearchInput(e)}
                                   name="code"
                                   type={"text"} placeholder={"جستجو با کد تخفیف ..."}/>
                        </div>

                    </li>
                    <li onClick={e => HandleResponsiveAdd(e)} style={{background: '#0d47a1'}}>
                        <i className={"bx bx-plus"}></i>
                    </li>
                </ul>
            </div>


        </div>
    )


}

export default SearchComponent;
