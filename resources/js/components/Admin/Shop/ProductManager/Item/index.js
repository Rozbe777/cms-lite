import React from 'react';
import './_Shared/style.scss'
const Index = () => {
    return(
    <div className={"col-lg-3 col-md-4 col-sm-12"}>
        <div className={"item-product"}>
            <div className={"image"}>
                <img className={"default"} src="/images/avatar.jpg" alt=""/>
            </div>
            <ul>
                <li>
                    <p id={"title"}>محصول شماره یثکسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسسس</p>
                </li>
                <li>
                    <span>0 فروش</span>
                    <span>0 تومان</span>
                </li>
            </ul>

            <div className={"back-show-detail-pro"}>

                <div className={"header-box-pro"}>
                    <fieldset>
                        <div className={"checkbox"}>
                            <input type={"checkbox"} className={"checkbox-input"} id={"checkbox2"} />
                            <label htmlFor="checkbox2"></label>
                        </div>
                    </fieldset>
                </div>

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
