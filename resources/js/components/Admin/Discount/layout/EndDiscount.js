import React, {useState, useEffect} from "react";
import ReactDOM from 'react-dom';
import moment from "jalali-moment";
import {Request} from "../../../../services/AdminService/Api";
import {MultiOption} from "./MultiOption";
import {MultiSelected} from "./MultiSelected";
// import Calender from "react-persian-calendar";
import {MainRate} from "@emran-rastadi/reactjs-persian-calender-beauty";
import $ from "jquery";


export const EndDiscount = ({dataOut, timeShows, timers, limit, out: setOut}) => {

    const [typeSel, setTypeSel] = useState({types: ''});
    const [time, setTime] = useState({
        h: '00',
        m: '00',
        s: '00'
    });

    let dateNow = {
        year : moment(new Date()).locale('fa').format('YYYY'),
        month : moment(new Date()).locale('fa').format('MMMM'),
        monthNum : moment(new Date()).locale('fa').format('M'),
        day : moment(new Date()).locale('fa').format('D')
    }
    let timestam = Date.parse(moment(new Date()).locale('fa'));
    const [date, setDate] = useState({
        date : dateNow,
        timestamp : timestam
    });
    const [timeShow, setTimeShow] = useState([]);

    const handleClose = e => {
        e.preventDefault();
        $("#back-loaderedss").removeClass("active");
        ReactDOM.render('', document.getElementById("back-loaderedss"));
    }

    const handleAdd = e => {
        e.preventDefault();
        dataOut({date , time})
        handleClose(e);
    }




    useEffect(() => {


        timers.map(item => {
            let strings = item.h + " : " + item.m;
            timeShow.push({
                id: strings,
                name: strings
            })
            setTimeShow(timeShow)
        })

    }, [])



    const handleChoiseTime = (e, index, name, id) => {

        let timmme = [];
        timmme = name.split(":");
        setTime({
            h : timmme[0],
            m : timmme[1],
            s : '00'
        })

    }


    function handleChangeDate(date){
        setDate(date);
    }

    return (
        <div className={"col-lg-4 col-sm-12 col-md-8 customPrice"} id={"prices"} style={{overflow: 'inherit'}}>

            <div className={"col-12"}>
                <div className={"row"} style={{marginTop: '15px'}}>


                    <div className={"col-md-6 col-sm-12"}>

                        <div className={"content-select firstes"}>

                            <p>تاریخ شروع</p>


                            {/*<Calender onChange={handleDate} Icon={<i className="bx bxs-calender"></i>} />*/}

                            {/*<mainRa onChange={handleChangeDate} displayed={false} newDisplay={false} />*/}

                            <div style={{width : '100%',height : '50px'}}>
                                <MainRate onChange={handleChangeDate} Icon={<i className="bx bx-calendar-alt"></i>} />

                            </div>
                            {/*<Calender onChange={e => handleChangeDate(e)} />*/}

                        </div>

                    </div>


                    <div className={"col-md-6 col-sm-12"}>

                        <div className={"content-select firstes"}>

                            <p>ساعت</p>

                            <MultiOption name={"time-roles"}

                                         handleChoise={handleChoiseTime}
                                         data={timeShows}
                                // selected={item => handleCloseFirst(item)}

                            />

                        </div>

                    </div>

                </div>
            </div>
            <div className={"bottom-btns"}>
                <div className={"row"}>
                    <div onClick={e => handleClose(e)} className={"col-6"} style={{borderLeft: '1px solid #ccc'}}
                         id={"btn-action"}>
                        انصراف
                    </div>
                    <div onClick={e => handleAdd(e)} className={"col-6"} id={"btn-action"}>
                        ذخیره
                    </div>
                </div>
            </div>
        </div>
    )
}
