import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Header} from "./Partials/Header";
import {ItemCheckOut} from './Partials/ItemCheckOut'
const Index = () => {
    useEffect(() => {
    }, [])
    // const {mini} = props;
    const [state, setState] = useState();
    return (
        <div classNme={"row"} style={{padding : '20px'}}>
            <Header selected={"payType"} />
            <div classNme={"container-fluid"}>
                <div classNme={"row"}>
                    <ItemCheckOut />
                </div>
            </div>
        </div>
    )
}
export default Index;


var element = document.getElementById("checkout");
if (element){
    ReactDOM.render(<Index /> , element)
}
