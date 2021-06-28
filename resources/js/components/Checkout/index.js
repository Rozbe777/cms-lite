import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './_shared/style.scss'
import CheckBasket from './CheckBascket'
import SendDetail from './SendDetail'

const Index = () => {

    useEffect(() => {
    }, [])
    // const {mini} = props;
    const [state, setState] = useState();




    return (
        <div className={"row"} style={{padding: '20px' , margin : '0px'}}>
            <div id={"mains-content"} style={{width : '100%'}}>
                <CheckBasket />
            </div>
        </div>
    )
}
export default Index;


var element = document.getElementById("checkout");
if (element) {
    ReactDOM.render(<Index/>, element)
}
