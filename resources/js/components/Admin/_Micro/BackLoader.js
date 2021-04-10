import React from 'react'
export const BackLoader = ({states : pushStates}) => {
    const handleAdding = (type) => {
        let states = {};
        states.display = true;
        states.type = type;
        pushStates(JSON.stringify(states))
    }
    return (
        <div className={"back-loader"}>
            <div id={"close-select"} onClick={() => {
                $(".back-loader").fadeOut();
            }}>
            </div>
            <div className={"box-selected"}>
                <ul>
                    <li id={"first"}>لطفا نوع صفحه را انتخاب کنید</li>
                    <li id={"last"} onClick={e =>handleAdding("category")}>
                        <div id={"icon"}>
                            <i className={"bx bxs-categories align-middle"}></i>
                        </div>
                        <div id={"desc"}>
                            <p id={"first"} style={{marginTop: '5px !important'}}>دسته بندی</p>
                            <p id={"last"} style={{marginTop: '-10px !important'}}>صفحه ای که مجموعه ای از محصولات
                                را نشان میدهد.</p>
                        </div>
                    </li>

                    <li id={"last"} onClick={e =>handleAdding("page")}>
                        <div id={"icon"}>
                            <i className={"bx bxs-layer align-middle"}></i>
                        </div>
                        <div id={"desc"}>
                            <p id={"first"} style={{marginTop: '5px !important'}}>صفحات داخلی</p>
                            <p id={"last"} style={{marginTop: '-10px !important'}}>صفحه ای با محتوای متنی ، مثل
                                درباره ما یا تماس با ما</p>
                        </div>
                    </li>

                </ul>
            </div>
        </div>

    )
}
