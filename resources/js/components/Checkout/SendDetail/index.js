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


                    <div className={"col-4"} style={{padding : 5}}>
                        <div className={"cart"} style={{padding : '15px'}} >
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


                    <div className={"col-8"} style={{padding : 5}}>
                        <div className={"cart"} style={{boxShadow : '0 0 5px 2px rgba(0,0,0,0.1)' ,background : "#fff" , borderRadius : '5px' , padding : '15px'}} >
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
