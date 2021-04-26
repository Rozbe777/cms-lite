import React, {useEffect , useState} from "react";
import {MultiSelected} from "./../ProductManager/HOC/MultiSelected";
import {MultiOption} from "./../ProductManager/HOC/MultiOption";
import {MultiSelectedFilter} from "../ProductManager/HOC/MultiSelectedFilter";
// import {MultiOption} from '../../../';
const SearchComponent = ({category : pushCategory}) => {

    const [size , setSize] = useState(0);
    const [sizeCategory , setSizeCategory] = useState(0);
    useEffect(() => {

    })

    const handleSelected = (select) => {
        console.log("ssss " , select)
        setSize(select.length)
    }

    const handleCategory = (item) => {
        console.log("++++" , item)
        pushCategory(item);
        setSizeCategory(item.length)
    }

    return (
        <>
            <div className="col-12 col-sm-6 col-lg-3">
                <label htmlFor="users-list-verified">جستجو</label>
                <input type="text" className="form-control"
                       id={"search_input"}
                       placeholder="جستجو با ایمیل و تلفن ..." name="search"/>

            </div>
            <div className="col-12 col-sm-6 col-lg-3">
                <label htmlFor="users-list-verified">{size > 0 ? "( "+size+" ) فیلتر اعمال شده " : 'فیلتر'}</label>
                <MultiSelectedFilter selected={sel => handleSelected(sel)} />
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
                <label htmlFor="users-list-status">مرتب سازی</label>
                <MultiOption />
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
                <label htmlFor="users-list-role">{sizeCategory > 0 ? "( "+sizeCategory+" ) دسته بندی انتخاب شده " : 'دسته بندی'}</label>
                <MultiSelected selected={itemsSel => handleCategory(itemsSel)}/>
            </div>

            {/*<div className="col-6 col-sm-6 col-lg-2" style={{marginBlockStart: 'auto'}}>*/}
            {/*    <button type="submit" className="btn btn-primary mr-1 mb-1" id={"search-btn"}>جستجو</button>*/}
            {/*</div>*/}
        </>
    )


}

export default SearchComponent;
