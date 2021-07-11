import React from "react";
import './../../../_shared/style.scss'

export const Footer = ({actionType, editStatus, onSubmit, onUpdate, onDuplicate, onCancel}) => {
    return (
        <div className={"row"}>
            {_cancel()}
            {handleActionType(actionType)}
        </div>
    );


    function handleActionType(actionType) {
        switch (actionType) {
            case 'edit' :
                _edit();
            case 'duplicate' :
                _duplicate();
            case 'save' :
                _save();
            default :
                return _save();
        }
    }


    function _duplicate() {
        return (
            <div
                onClick={e => onDuplicate(e)}
                className={"col-6 submit-form"}>
                <span>ذخیره کپی</span>
            </div>
        )
    }

    function _save() {
        return (
            <div
                onClick={e => onSubmit()}
                className={"col-6 submit-form"}>
                <span>ذخیره</span>
            </div>
        )
    }

    function _edit() {
        if (editStatus) {
            return (
                <div
                    onClick={(e) => onUpdate(e)}
                    className={"col-6 submit-form"}>
                    <span>ویرایش</span>
                </div>
            )
        } else {
            return (
                <div
                    id={"disable-div"}
                    className={"col-6 submit-form submit-none-select"}>
                    <span>ویرایش</span>
                </div>
            )
        }

    }

    function _cancel() {
        return (
            <div className={"col-6 cancel"} onClick={e => onCancel(e)}>
                    انصراف
            </div>
        )
    }
}
