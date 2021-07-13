import React, {useEffect} from 'react';
import $ from 'jquery';
import './_Shared/style.scss'
export const SelectOptions = ({parents, data, onChange}) => {
    useEffect(() => {
        $(function () {
            $("select.selectVal").change(function () {
                let sel = $(this).children("option:selected").val();
                onChange(sel)
            })
        })
    } , [])


    console.log("_____" , data)


        return (
            <select defaultValue={parents} className="form-control selectVal" name={"parent_id"}
                    id="selectParent">

                <option id={"optionss"} value={0}>ندارد</option>

                {data.data ? data.data.map((item , index) => (
                    <React.Fragment key={index}>
                        <option key={index} style={{height: '50px'}} value={item.id}>{item.name}</option>
                        {item.childern.length > 0 ? item.childern.map((itemTow , indexed) => (
                            <option key={indexed} style={{height: '50px'}}
                                    value={itemTow.id}>&nbsp;&nbsp;{" > " + itemTow.name}&nbsp;</option>
                        )) : (
                            ''
                        )
                        }
                    </React.Fragment>

                )) : ''}
            </select>
        )
}
