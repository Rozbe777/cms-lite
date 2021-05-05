import React, {useEffect} from 'react';
import './_Shared/style.scss'
import $ from 'jquery';

const Index = ({data, checkStateOfOut, sizeOf, selected: pushSelected}) => {
    useEffect(() => {
        checkTest();
    })
    console.log(checkStateOfOut.length," //////// " , data);

    function checkTest() {
        if (checkStateOfOut.length == sizeOf) {
            checkStateOfOut.map(item => {
                $(".item-product#" + item).addClass("activeCheck");
                $("input[name=product_" + item + "]").prop("checked", true);
            })
        } else if (checkStateOfOut.length == 0) {
            // barrasi shavad
            $(".item-product").removeClass("activeCheck");
            $("input[type=checkbox]").prop("checked", false);

        }
    }

    const HandleChange = (e, id) => {
        if (e.target.checked) {
            $("html, body").animate({scrollTop : 0},700);
            $(".item-product#" + id).addClass("activeCheck");
            pushSelected({type: "added", id});
        } else {
            $(".item-product#" + id).removeClass("activeCheck");
            pushSelected({type: "removed", id});
        }
    }


    return (
        <div className={"col-lg-3 col-md-4 col-sm-12"}>
            <div className={"item-product"} id={data.id}>
                <div className={"header-box-pro"}>
                    <fieldset>
                        <div className={"checkbox"}>
                            <input type={"checkbox"} className={"checkbox-input"} name={"product_"+data.id} id={"checkbox_"+data.id} onChange={e => HandleChange(e , data.id)} />
                            <label htmlFor={"checkbox_"+data.id}></label>
                        </div>
                    </fieldset>
                </div>


                {data.image ? (
                    <div className={"image-src"}>
                        <img className={"default"} src={data.image} alt=""/>
                    </div>
                ) : (
                    <div className={"image"}>
                        <img className={"default"} src="/images/avatar.jpg" alt=""/>
                    </div>
                )}
                <ul>
                    <li>
                        <p id={"title"}>{data.title}</p>
                    </li>
                    <li>
                        <span>{data.buy + " فروش "}</span>
                        <span>{data.price !== 0 ? data.price + " تومان " : 'رایگان'}</span>
                    </li>
                </ul>

            <div className={"back-show-detail-pro"}>

                <div className={"manage-pro"}>
                    <a className={"btn"}>ویرایش</a>
                    <a className={"btn btn-primary"}>طراحی صفحه</a>
                </div>

                <div className={"footer-manage-pro"}>
                    <i className={"bx bx-trash-alt"}></i>
                    <i className={"bx bx-duplicate"}></i>
                    <i className={"bx bx-link-alt"} id={"right"}></i>
                </div>
            </div>
        </div>

    </div>
    )
}
export default Index;