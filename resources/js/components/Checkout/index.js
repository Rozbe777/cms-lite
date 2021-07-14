import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './_shared/style.scss'
import CheckBasket from './CheckBascket'
import SendDetail from './SendDetail'

const Index = (props) => {

    useEffect(() => {
        // setAttributes(props.checkoutData);
    }, [])
    const [state, setState] = useState();




    return (
        <div className={"row"} style={{padding: '20px', margin: '0px'}}>
            <div id={"mains-content"} style={{width: '100%'}}>
                <CheckBasket checkAuth={props.authchaek} attributes={props.checkoutdata}/>
            </div>
        </div>
    )
}
export default Index;


var element = document.getElementById("checkout");
if (element) {
    const props = Object.assign('', element.dataset);
    ReactDOM.render(<Index {...props} />, element)
}
