import React, {useEffect} from 'react';
import $ from 'jquery';
import './_Shared/style.scss'

export const SelectOptions = ({data, loading, selection: pushSelectiong}) => {


    console.log("cat data : ", JSON.parse(data), loading);
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

        console.log("data upppppp : ", dataFit)

        return (
            <select className="form-control selectVal" name={"parent_id"}
                    id="selectParent">

                <option id={"optionss"} value={0}>ندارد</option>


                {dataFit.map(item => (
                    <>
                        <option style={{height: '50px'}} value={item.id}>{item.name}</option>
                        {item.childern.length > 0 ? item.childern.map(itemTow => (
                            <option style={{height: '50px'}} value={itemTow.id}>&nbsp;&nbsp;{" > " + itemTow.name}&nbsp;</option>
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
