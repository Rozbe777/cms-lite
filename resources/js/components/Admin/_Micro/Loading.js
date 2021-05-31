import React, {Component} from 'react';
class Loading extends Component {
    render() {
        return (
            <div style={{
                width : '100%',
                height : 210,
                display : 'flex',
                alignItem : 'center',
                justifyContent : 'center',
                flexDirection : 'column',
                alignItems : 'center'
            }}>
                <img src={"/images/loading.gif"} style={{width : '163px'}} />
                <p style={{width : '100%' , textAlign : 'center' , height : '40px'}}>در حال پردازش ...</p>
            </div>
        );
    }
}

export default Loading;
