import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './_Shared/style.scss';
import './_Shared/Responsive.scss';
import ProductAdd from './../ProductAdd';
import SearchComponent from "../Search";
import $ from 'jquery';
import Item from './Item';
import DataInitial from '../InitialData.js';
import GroupAction from "../GroupAction";

const Index = () => {
    const [checked, setChecked] = useState([]);
    const [chipset, setChipset] = useState([]);
    const [stateOf, setStateOf] = useState();
    const [contentNew, setContentNew] = useState();
    const [edit, setEdit] = useState(false);
    useEffect(() => {
    } , [])

// for show component action or search element by animate
    $(function (){
        var element = $("#actionGroup");
        if (checked.length > 0) {
            element.addClass("actived")
        } else {
            element.removeClass("actived")
        }
    })


    // jquery code
    $("#add-product-selected").click(function () {
        ReactDOM.render(<ProductAdd/>, document.getElementById("add-product"));
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
        let chipsets = [...chipset];
        chipsets.push(item);
        setChipset(chipsets);
    }

    const RemoveChipset = (name) => {
        var chipsetArr = [...chipset];
        var index = chipsetArr.indexOf(name);
        if (index !== -1) {
            chipsetArr.splice(index, 1);
            setChipset(chipsetArr);
        }
    }
    let dataUpdateParse = useState({
        status: true
    });


    // search by element
    const HandleSearchCategory = (input) => {

    }


    const handleCheckAll = (idArray) => {

        setChecked(idArray);
    }



    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
            $("#actionGroup").addClass("scrolls");
        } else {
            $("#actionGroup").removeClass("scrolls");

        }
    }


    return (
        <>
            <div id={"actionGroup"} className={"actived"}>
                <GroupAction data={checked} allProduct={DataInitial.Products} newCheck={item => handleCheckAll(item)}/>
            </div>


            <SearchComponent category={itemCat => HandleSearchCategory(itemCat)}/>

            <div className={"container"} style={{marginTop: '20px'}}>
                <div className={"row"}>
                    {DataInitial.Products.map(item => {
                        return (
                            <Item data={item} checkStateOfOut={checked} sizeOf={DataInitial.Products.length}
                                  selected={response => HandleChecked(response)}/>
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
