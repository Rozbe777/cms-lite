import React, {useState, useEffect} from 'react';
import {Header} from "../Partials/Header";
import './../_shared/style.scss'

const index = (props) => {
    useEffect(() => {
    }, [])
    // const {mini} = props;
    const [state, setState] = useState();
    return (
        <>
            <Header selected={"sendDetail"}/>
            <div className={"container-fluid"}>
                <div className={"row"}>


                    <div className={"col-4"}>
                        <div className={"cart"}>
                            <div className={"cart-content"}>
                                cvsdvsdvsdv
                            </div>
                        </div>
                    </div>


                    <div className={"col-8"} style={{padding : 0}}>
                        <div className={"cart"} style={{background : '#fff' , borderRadius : '15px' , padding : '10px'}} >
                            <div className={"cart-content"}>
                                <div className={"row"}>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="first-name-vertical">نام</label>
                                            <input type="text" id="first-name-vertical" className="form-control"
                                                   name="fname"
                                                   placeholder="نام"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="form-group">
                                            <label htmlFor="first-name-vertical">نام خانوادگی</label>
                                            <input type="text" id="first-name-vertical" className="form-control"
                                                   name="fname"
                                                   placeholder="نام"/>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default index;
