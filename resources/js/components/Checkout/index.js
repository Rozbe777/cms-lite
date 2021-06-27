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
        <div classNme={"row"} style={{padding: '20px'}}>
            <SendDetail />
            <div className={"col-12"} style={{marginTop : '30px' , padding : 0}}>
                <button style={{float : 'left' , fontSize : '16px' , fontWeight : 100}} className={"btn btn-primary"}> ثبت سفارش  <i className={"bx bx-chevron-left"}></i>  </button>
                <button  style={{float : 'right' , background : '#fff' ,  fontSize : '16px' , fontWeight : 100}} className={"btn"}><i className={"bx bx-chevron-right"}></i> بازگشت  </button>
            </div>
        </div>
    )
}
export default Index;


var element = document.getElementById("checkout");
if (element) {
    ReactDOM.render(<Index/>, element)
}
