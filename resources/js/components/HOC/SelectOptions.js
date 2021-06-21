import React, {useEffect} from 'react';
import $ from 'jquery';
import './_Shared/style.scss'
import {Request} from './../../services/AdminService/Api';
export const SelectOptions = ({parents,dataAllCat ,  data, selection: pushSelectiong}) => {
    useEffect(() => {
        $(function () {
            $("select.selectVal").change(function () {
                let sel = $(this).children("option:selected").val();
                pushSelectiong(sel)
            })
        })
    } , [])



        return (
            <select defaultValue={parents} className="form-control selectVal" name={"parent_id"}
                    id="selectParent">

                <option id={"optionss"} value={0}>ندارد</option>

                {JSON.parse(dataAllCat) ? JSON.parse(dataAllCat).map((item , index) => (
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
