import React, {useEffect} from 'react';
import $ from 'jquery';
import './_Shared/style.scss'

export const SelectOptions = ({parents, data, loading, selection: pushSelectiong}) => {

    useEffect(() => {
        $(function () {
            $("select.selectVal").change(function () {
                let sel = $(this).children("option:selected").val();
                pushSelectiong(sel)
            })
        })
    })


    if ((loading == false && data) || (loading == true && data)) {
        let dataFit = JSON.parse(data);

        return (
            <select defaultValue={parents} className="form-control selectVal" name={"parent_id"}
                    id="selectParent">

                <option id={"optionss"} value={0}>ندارد</option>

                {dataFit.map(item => (
                    <>
                        <option style={{height: '50px'}} value={item.id}>{item.name}</option>
                        {item.childern.length > 0 ? item.childern.map(itemTow => (
                            <option style={{height: '50px'}}
                                    value={itemTow.id}>&nbsp;&nbsp;{" > " + itemTow.name}&nbsp;</option>
                        )) : (
                            ''
                        )
                        }
                    </>


                ))}


            </select>
        )

    } else {
        return <option value="">wait</option>
    }

}
