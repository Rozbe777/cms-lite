import React from "react";


const YesNo = ({label, placeHolder, name, required}) => {
    const min = 1;
    const max = 100;
    const random = min + Math.random() * (max - min);
    return (
        <>
            <p id={"form-creator-p"}>چند انتخابیییییی</p>
            <ul className={"list-unstyled"} style={{padding : 15 , background : '#eee' , borderRadius : 5 , margin : 8}}>

                <li className={"d-inline-block mr-2 mb-1"}>
                    <fieldset>
                        <div className={"radio radio-success"}>
                            <input type={"radio"} name={"yesno"} id={"yes"}/>
                            <label htmlFor={"yes"}>
                                بله
                            </label>
                        </div>
                    </fieldset>
                </li>
                <li className={"d-inline-block mr-2 mb-1"}>
                    <fieldset>
                        <div className={"radio radio-secondary"}>
                            <input type={"radio"} name={"yesno"} id={"no"}/>
                            <label htmlFor={"no"}>
                                خیر
                            </label>
                        </div>
                    </fieldset>
                </li>
            </ul>
        </>

    )
}

export default YesNo;
