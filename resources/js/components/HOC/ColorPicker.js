import React, {useState} from 'react';
import {SketchPicker} from 'react-color';
import ReactDOM from 'react-dom'

const ColorPicker = ({dataOut : pushDataOut}) => {
    const [state, setState] = useState({
        background: '#fff',
        float : 'right'
    })


    const handleChangeComplete = (color) => {
        setState({background: color.hex});
        pushDataOut(color.hex)
    };

    const closeColorPicker = (e) => {
        e.preventDefault();
        $("#back-loadered").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loadered"));
    }
    return (
        <div className={"col-lg-4 col-sm-12 col-md-8"} style={{background : '#fff' , borderRadius : '5px' , overflow : 'hidden' , padding : 0}}>
            <SketchPicker
                color={state.background}
                onChangeComplete={handleChangeComplete}
            />
            <div id={"btn-color-picker"}>
                <div className={"row"}>

                    <div onClick={e => closeColorPicker(e)}
                         className={"col-6"}>
                        <span>انصراف</span>
                    </div>

                    <div className={"col-6"}>
                        <span>ذخیره</span>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ColorPicker;
