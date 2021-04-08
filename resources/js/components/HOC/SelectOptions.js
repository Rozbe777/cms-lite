import React , {useEffect} from 'react';
import $ from 'jquery';

export const SelectOptions = ({data, loading ,selection:pushSelectiong}) => {

    // let sizes = data.data.length;

    useEffect(()=>{
        $(function (){
            $("select.selectVal").change(function (){
                let sel = $(this).children("option:selected").val();
                pushSelectiong(sel)
            })
        })
    })



    const handleInput = (e) => {
        console.log("item " , e.target.value)
        // pushSelectiong.push(e.target.value);
    }
    if ((loading == false && data) || (loading == true && data)) {
        let dataFit = JSON.parse(data);


        if (dataFit.length) {
            return (
                <select className="form-control selectVal"  name={"parent_id"}
                        id="selectParent">
                    <option value={0}>خودش پدر میباشد</option>
                    {dataFit.map(item => {
                        return (
                            <option value={item.id}>{item.parent_id == 0 ? item.name : " > " + item.name }</option>
                        )
                    })}

                </select>
            )
        } else {
            return <span>wait</span>
        }

    } else {
        return <option value="">wait</option>
    }


    // return <option>vdfvdfv</option>
    // if (data.data){
    //     return (
    // )


}
