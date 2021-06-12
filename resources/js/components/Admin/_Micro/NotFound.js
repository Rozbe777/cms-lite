import React, {Component} from 'react';
class NotFound extends Component {
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
                <img src={"/images/notfound.gif"} style={{width : '320px'}} />
                <p style={{width : '100%' , textAlign : 'center' , height : '40px' , marginTop : '-70px'}}>موردی یافت نشد</p>
            </div>
        );
    }
}

export default NotFound;
