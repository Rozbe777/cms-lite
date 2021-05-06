import React, {useEffect} from "react";
import $ from 'jquery';

const VerifyPhone = ({time}) => {

    useEffect(() => {
        $("input[name=code_1]").focus();
        Timer();
    }, [])
    const Timer = () => {
        var min = Math.floor(time / 60);
        var sec = Math.floor(time - (min * 60));
        setInterval(function () {
            if (min == 0 && sec == 0) {
                // time expired
                document.getElementById("timersPop").innerHTML = "";
            } else {
                if (sec == 0) {
                    min--;
                    sec = 60;
                }
                sec--;
            }

            document.getElementById("timersPop").innerHTML = "0" + min + ":" + sec + " تا انقضای کد ارسالی";
        }, 1000)
    }


    var body = $("#wrapper input");

    // check kardan daryaft number dar inputhai verify code , paresh be input badi
    function goToNextInput(e) {
        var key = e.which,
            t = $(e.target),
            sib = t.next("input");
        if (key != 9 && (key < 48 || key > 57)) {
            e.preventDefault();
            return false;
        }
        if (key === 9) {
            return true;
        }
        if (!sib || !sib.length) {
            sib = body.find("input").eq(0);
        }
        sib.select().focus();
    }

    // check kardan vard shodan number baray raftan be input badi
    function onKeyDown(e) {
        var key = e.which;

        if (key === 9 || (key >= 48 && key <= 57)) {
            return true;
        }

        e.preventDefault();
        return false;
    }

    // check kardan focus in input
    function onFocus(e) {
        $(e.target).select();
    }

    // transaction hai input
    body.on("keyup", goToNextInput);
    body.on("keydown", onKeyDown);
    body.on("click", onFocus);


    const verifyCodeGet = (e) => {

    }


    return (
        <div className={"container-loader"}>
            <div className={"container"}>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-4 col-sm-10">
                        <div className={"verifyForm"}>
                            <p>کد تایید را وارد کنید</p>

                            <div id={"wrapper"}>
                                <div id="wrapper">
                                    <input
                                        type="text"
                                        placeholder="--"
                                        maxLength="1"
                                        size="1"
                                        name="code_1"
                                        onChange={(e) => verifyCodeGet(e)}
                                        min="0"
                                        max="9"
                                        pattern="[0-9]{1}"
                                    />
                                    <input
                                        type="text"
                                        placeholder="--"
                                        maxLength="1"
                                        size="1"
                                        onChange={(e) => verifyCodeGet(e)}
                                        name="code_2"
                                        min="0"
                                        max="9"
                                        pattern="[0-9]{1}"
                                    />
                                    <input
                                        type="text"
                                        placeholder="--"
                                        maxLength="1"
                                        size="1"
                                        onChange={(e) => verifyCodeGet(e)}
                                        name="code_3"
                                        min="0"
                                        max="9"
                                        pattern="[0-9]{1}"
                                    />
                                    <input
                                        type="text"
                                        placeholder="--"
                                        maxLength="1"
                                        size="1"
                                        name="code_4"
                                        min="0"
                                        max="9"
                                        onChange={(e) => verifyCodeGet(e)}
                                        pattern="[0-9]{1}"
                                    />
                                </div>
                            </div>


                            <div id={"timersPop"}></div>
                            <div id={"retryCode"}>
                                <span style={{borderBottom : '1px dashed'}}>دریافت مجدد کد</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyPhone;
