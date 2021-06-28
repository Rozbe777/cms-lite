import React, {useState, useEffect} from 'react';
import './../_shared/style.scss'
export const ItemCheckOutAll = (props) => {
    useEffect(() => {
    }, [])
    // const {mini} = props;
    const [state, setState] = useState();
    return (
       <div className={"item-checkAll"}>
           <div className={"image"}>
               <img src={"/images/avatar.jpg"} />

               <span className={"count"}>255</span>
           </div>
           <div id={"titles"}>
               <p >ssssssssssssssssssssssssssssssssssssssssssss</p>
               <div id={"main"}>
                   <span>vsdvsdv</span>
                   <span>vsdvsdv</span>
                   <span>vsdvsdv</span>
                   <span>vsdvsdv</span>
               </div>

           </div>

           <span id={"price"}>
               125555555 تومان
           </span>

       </div>
    )
}

