import React, {useEffect} from 'react';

export const ChipsetHandler = ({onChange}) => {

    const HandleChipset = (e) => {
        let chips_input = $(".chips_input");
        if (e.charCode === 13) {
            onChange(e.target.value)
            chips_input.val('');
        }
    }


    return (
        <fieldset className="form-group" id={"form-group-chipset"}>
            <input type={"text"}
                   style={{marginTop : '0px !important'}}
                   onKeyPress={e => HandleChipset(e)}
                   name={"tags"} id={"title"}
                   placeholder={"تایپ کن و Enter بزن "}
                   className={"chips_input form-control connnn"}/>
        </fieldset>
    )
}
