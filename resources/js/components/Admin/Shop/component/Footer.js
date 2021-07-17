import React , {useEffect} from "react";
import './../../../_shared/style.scss'

export const Footer = ({actionType, editStatus, onClicked , onCancel}) => {

    const handleActionType = (actionType) =>  {
        switch (actionType) {
            case 'edit' :
                return _renderEdit();
            case 'duplicate' :
                return _renderDuplicate();
            case 'save' :
                return _renderSave();
            default :
                return actionType;
        }
    }



    const _renderDuplicate = () =>  {
        return (
            <div
                onClick={e => onClicked(e)}
                className={"col-6 submit-form"}>
                <span>ذخیره کپی</span>
            </div>
        )
    }

    const _renderSave = () => {
        return (
            <div
                onClick={e => onClicked(e)}
                className={"col-6 submit-form"}>
                <span>ذخیره</span>
            </div>
        )
    }

    const  _renderEdit = () => {
        if (editStatus) {
            return (
                <div
                    onClick={(e) => onClicked(e)}
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



    return (
        <div className={"row"}>
            {_cancel()}
            {handleActionType(actionType)}
        </div>
    );



}
