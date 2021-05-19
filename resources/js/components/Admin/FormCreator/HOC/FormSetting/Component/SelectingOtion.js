import React from 'react';

const SelectingOtion = ({data}) => {
    return(
        <div className={"col-12"} style={{marginTop : '10px'}}>
            <label>انتخاب دسته بندی</label>
            <fieldset className={"form-group"}>
                <select className={"form-control"} id={"baseSelect"} style={{fontSize : '13px' , border : '1px solid #eee' , height : '40px'}}>
                    {data.length > 0 ? data.map(item => (
                        <option value={item.id}>{item.name}</option>
                    )):(
                        <option>دسته بندی ثبت نکرده اید!</option>
                    )}

                </select>
            </fieldset>
        </div>
    )
}
export default SelectingOtion;
