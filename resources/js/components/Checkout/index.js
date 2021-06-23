import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
const Index = () => {
    useEffect(() => {
    }, [])
    // const {mini} = props;
    const [state, setState] = useState();
    return (
        <div>hi emran</div>
    )
}

export default Index;


var element = document.getElementById("checkout");
if (element){
    ReactDOM.render(<Index /> , element)
}
