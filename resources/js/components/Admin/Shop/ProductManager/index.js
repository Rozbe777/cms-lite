import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './_Shared/style.scss'
import ProductAdd from './../ProductAdd';
import SearchComponent from "../Search";
import $ from 'jquery'
import Item from './Item'
import DataInitial from '../InitialData.js';
import GroupAction from "../GroupAction";

const Index = () => {

    console.log("data : ", DataInitial);

    const [checked, setChecked] = useState([]);
    const [chipset, setChipset] = useState([]);
    const [stateOf , setStateOf] = useState();
    const [contentNew, setContentNew] = useState();
    const [edit, setEdit] = useState(false);

    useEffect(() => {
    } , [])

// for show component action or search element by animate
    $(function (){
        var element = $("#actionGroup");
        if (checked.length > 0)
        {
            element.addClass("actived")
        }else{
            element.removeClass("actived")
        }
    })


    // jquery code
    $("#add-product-selected").click(function (){
        ReactDOM.render(<ProductAdd /> , document.getElementById("add-product"));
    })

    const HandleMakeName = () => {

    }

    const handleInput = (e) => {

    }

    const handleSwitchStatus = () => {

    }


    const HandleChecked = (data) => {
        let checkedNew = [...checked];
        if (data.type == "added") {
            checkedNew.push(data.id);

        } else {
            var index = checkedNew.indexOf(data.id);
            checkedNew.splice(index, 1);
        }

        setChecked(checkedNew);

    }

    const handleAddChip = (item) => {
        // let metaDatas = {...metaData};
        let chipsets = [...chipset];
        console.log(chipset);

        chipsets.push(item);
        setChipset(chipsets);
        // metaDatas.tags = chipsets;
        // setMetaData(metaDatas);
        // console.log("meta dataaaaaa : ", metaDatas)
    }

    const RemoveChipset = (name) => {
        // let metaData = {...metaData};
        var chipsetArr = [...chipset];
        var index = chipsetArr.indexOf(name);
        if (index !== -1) {
            chipsetArr.splice(index, 1);
            setChipset(chipsetArr);
            // metaData.tags = chipsetArr;
            // setMetaData(metaData)
        }
    }
    let dataUpdateParse = useState({
        status: true
    });


    // search by element
    const HandleSearchCategory = (input) => {

    }


    const handleCheckAll = (item) => {
        if (item.type =="checkAll")
        {
            setChecked(item.idArray)
            setStateOf("checkAll")
        }else{
            setStateOf("cancelAll")
            setChecked([]);
        }
    }

    return (
        <>
            <div id={"actionGroup"} className={"actived"}>
                <GroupAction data={checked} allProduct={DataInitial.Products} newCheck={item =>handleCheckAll(item)} />
            </div>

            <div id={"shop_product_search"} style={{marginBottom: 20}}>

                <div className="users-list-filter col-12" style={{padding : '0px !important'}}>
                    <div className="row col-12" id={"header-card-custom"}>
                            <SearchComponent category={itemCat => HandleSearchCategory(itemCat)}/>
                    </div>
                </div>
            </div>

            <div className={"container"}>
                <div className={"row"}>
                    {DataInitial.Products.map(item => {
                        return (
                            <Item data={item} checkStateOfOut={checked} stateOf={stateOf} selected={response => HandleChecked(response)}/>
                        )
                    })}

                </div>

            </div>
            <div id={"add-product"}></div>
        </>
    )
}

export default Index;

let eleman = document.getElementById("shop_product_manager");
if (eleman) {
    ReactDOM.render(<Index/>, eleman)
}
