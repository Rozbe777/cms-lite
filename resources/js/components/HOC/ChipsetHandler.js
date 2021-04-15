import React from 'react';

export const ChipsetHandler = ({callback : pushCallBack}) => {

    const HandleChipset = (e) => {
        let chips_input = $(".chips_input");
        if (e.charCode === 13) {
            pushCallBack(e.target.value)
            chips_input.val('');
        }
    }
    return (
        <fieldset className="form-group" id={"form-group-chipset"}>
            <input type={"text"}
                   onKeyPress={e => HandleChipset(e)}
                   name={"tags"} id={"title"}
                   placeholder={"تایپ کن و Enter بزن "}
                   className={"chips_input form-control"}/>
        </fieldset>
    )
}
