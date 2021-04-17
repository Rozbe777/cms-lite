import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './_Shared/style.scss'
import Item from './Item';
import ProductAdd from './../ProductAdd';
import $ from 'jquery'
const Index = () => {

    const [chipset, setChipset] = useState([]);
    const [contentNew, setContentNew] = useState();
    const [edit, setEdit] = useState(false);

    useEffect(() => {

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
    return (
        <>
            <div className={"container"}>
                <div className={"row"}>
                    <Item/>


                    <Item/>


                    <Item/>

                    <Item/>

                    <Item/>

                    <Item/>

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
