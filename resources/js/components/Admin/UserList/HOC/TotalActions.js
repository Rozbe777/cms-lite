import React, {useContext, useEffect} from "react";
import './styleAction.scss'
import {CHECK_BOX_CONTENT} from './../Helper/Context'

export const TotalActions = ({data, allData}) => {

    useEffect(() => {

    }, [])
    const {checkBox, setCheckBox} = useContext(CHECK_BOX_CONTENT);

    const checkAll = e => {
        e.preventDefault();
        let dataAlls = [...checkBox];
        allData.data.map(item => {
            var index = dataAlls.indexOf(item.id);
            if (index == -1) {
                dataAlls.push(item.id);
            }

        })
        setCheckBox(dataAlls);
    }

    const unCheckAll = e => {
        e.preventDefault();
        let dataAlls = [];
        setCheckBox(dataAlls);
    }


    return (
        <div id={"totalAction"} style={{width: '100%'}}>

            <div className={"row"} >
                <div className={"col-lg-6 col-md-3"} style={{marginBottom: 5, marginTop: 5, lineHeight: '2.3'}}>
                    {data.length} کاربر انتخاب شده است
                </div>
                <div className={"col-lg-2 col-md-3"} style={{marginBottom: 5, marginTop: 5}}>
                    <button style={{width: '100%'}} className={"btn btn-primary"} onClick={e => checkAll(e)}>انتخاب همه
                    </button>
                </div>
                <div className={"col-lg-2 col-md-3"} style={{marginBottom: 5, marginTop: 5}}>
                    <button style={{width: '100%'}} className={"btn btn-warning"} onClick={e => unCheckAll(e)}>لغو</button>
                </div>
                <div className={"col-lg-2 col-md-3"} style={{marginBottom: 5, marginTop: 5}}>
                    <button style={{width: '100%'}} className={"btn btn-danger"}>حذف</button>
                </div>
            </div>

        </div>
    )
}
