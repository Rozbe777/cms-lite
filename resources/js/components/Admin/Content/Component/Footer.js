import React from "react";


export const Footer = ({onSubmit , onUpdate,onDuplicate , onCancel}) => {
    return (
        <div className={"row"}>

            <div className={"col-6"} onClick={e => onClickType(e , 'cancel')}>
                <button type={"reset"} id={"clear"}>
                    انصراف
                </button>
            </div>

            {type ? type == 'edit' ? edit ? (
                    <div
                        onClick={(e) => onUpdate(e)}
                        className={"col-6"}
                        style={{textAlign: 'center', cursor: 'pointer', background: "#5a8dee", color: '#fff'}}>
                        <span>ویرایش</span>
                    </div>
                )
                : (
                    <div
                        id={"disable-div"}
                        className={"col-6"}
                        style={{
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: "#5a8dee",
                            color: '#fff'
                        }}>
                        <span style={{color: '#fff !important'}}>ویرایش</span>
                    </div>
                )
                : (
                    <div
                        onClick={e => formHandler.HandleDuplicate(e, contentForm, slugManage, file, imageGet, metaData, dataUpdateParse, editorContent, categoryOldSelected, chipset, checkResult)}
                        className={"col-6"}
                        style={{
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: "#5a8dee",
                            color: '#fff'
                        }}>
                        <span style={{color: '#fff !important'}}>ذخیره کپی</span>
                    </div>
                ) :

                (
                    <div
                        // onClick={e => formHandler.HandleForm(e, contentForm, file, editorContent, metaData, categoryOldSelected, chipsetChange, chipset, slugManage, checkResult)}
                        onClick={e => onSubmit()}
                        className={"col-6"}
                        style={{
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: "#5a8dee",
                            color: '#fff'
                        }}>
                        <span style={{color: '#fff !important'}}>ذخیره</span>
                    </div>
                )}
        </div>
    )
}
