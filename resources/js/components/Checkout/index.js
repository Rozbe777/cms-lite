import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Header} from "./Partials/Header";

const Index = () => {
    useEffect(() => {
    }, [])
    // const {mini} = props;
    const [state, setState] = useState();
    return (
        <>
            <Header selected={"payType"} />
        </>
    )
}
export default Index;


var element = document.getElementById("checkout");
if (element){
    ReactDOM.render(<Index /> , element)
}
