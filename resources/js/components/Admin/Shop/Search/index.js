import React from "react";
import ReactDOM from 'react-dom';

const SearchComponent = () => {
    return (
            <div className="users-list-filter px-1">
                <div className="row border rounded py-2 mb-2" id={"header-card-custom"}>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <label htmlFor="users-list-verified">جستجو</label>
                        <input type="text" className="form-control"
                               placeholder="جستجو با ایمیل و تلفن ..." name="search"/>

                    </div>

                    <div className="col-12 col-sm-6 col-lg-2">
                        <label htmlFor="users-list-verified">تایید شده</label>
                        <fieldset className="form-group">
                            <select className="form-control" id="users-list-verified" name="confirmed">
                                <option>همه</option>
                                <option value="1">بله</option>
                                <option value="0">خیر</option>
                            </select>
                        </fieldset>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-2">
                        <label htmlFor="users-list-role">نقش</label>
                        <fieldset className="form-group">
                            <select className="form-control" id="users-list-role" name="role">
                                <option>همه</option>
                                <option>مدیر</option>
                                <option>کاربر</option>
                            </select>
                        </fieldset>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-2">
                        <label htmlFor="users-list-status">وضعیت</label>
                        <fieldset className="form-group">
                            <select className="form-control" id="users-list-status" name="status">
                                <option>همه</option>
                                <option value="active">فعال</option>
                                <option value="deactivate">غیر فعال</option>
                            </select>
                        </fieldset>
                    </div>
                    <div className="col-6 col-sm-3 col-lg-1 " style={{marginBlockStart: 'auto'}}>
                        <button type="submit" className="btn btn-primary mr-1 mb-1">جستجو</button>
                    </div>
                    <div className="col-6 col-sm-3 col-lg-1 " style={{marginBlockStart: 'auto'}}>
                        <a className="btn btn-icon rounded-circle btn-warning mr-1 mb-1 tui-full-calendar-dayname-leftmargin"
                           style={{marginRight: '20px'}} title="خروجی اکسل">
                            <i className="bx bx-archive"></i></a>
                    </div>
                </div>
            </div>
    )
}

export default SearchComponent;

let element = document.getElementById("shop_product_search");
if (element)
{
    ReactDOM.render(<SearchComponent /> , element);
}
