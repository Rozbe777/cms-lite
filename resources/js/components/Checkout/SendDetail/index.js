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
            <div classNme={"container-fluid"}>
                <div className={"row"}>
                    <div classNme={"col-8"}>
                       <div className ={"cart"}>
                           <div className={"cart-content"}>
                               cvsdvsdvsdv
                           </div>
                       </div>
                    </div>
                    <div classNme={"col-4"}>
                        <div className ={"cart"}>
                            <div className={"cart-content"}>
                                cvsdvsdvsdv
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default index;
