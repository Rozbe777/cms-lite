import React , {useState} from "react";


export const HandleTimeCheck = () => {

    const [timeShow , setTimeShow] = useState([]);
    const [timeCheck , setTimeCheck] = useState([]);
    let i = 0;
    for (i; i < 24; i++) {
        if (i < 10) {

            timeCheck.push({
                h: "0" + i,
                m: '00'
            })
            let strs = "0" + i + " : 00"
            timeShow.push(({
                id: strs,
                name: strs
            }))

            timeCheck.push({
                h: "0" + i,
                m: '30'
            })

            let strs2 = "0" + i + " : 30"
            timeShow.push(({
                id: strs2,
                name: strs2
            }))

            setTimeShow(timeShow);
            setTimeCheck(timeCheck)
        } else {

            if (i !== 24) {


                timeCheck.push({
                    h: i,
                    m: '00'
                })

                let strs = i + " : 00"
                timeShow.push(({
                    id: strs,
                    name: strs
                }))

                timeCheck.push({
                    h: i,
                    m: '30'
                })

                let strs2 = i + " : 30"
                timeShow.push(({
                    id: strs2,
                    name: strs2
                }))

                setTimeShow(timeShow)
                setTimeCheck(timeCheck)
            } else {

                timeCheck.push({
                    h: "00",
                    m: '30'
                })

                let strs = "00 : 30"
                timeShow.push(({
                    id: strs,
                    name: strs
                }))


                timeCheck.push({
                    h: "00",
                    m: '00'
                })

                let strs2 = "00 : 30"
                timeShow.push(({
                    id: strs2,
                    name: strs2
                }))

                setTimeShow(timeShow)
                setTimeCheck(timeCheck)
            }


        }
    }

    return {timeCheck , timeShow};

}



