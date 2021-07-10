import React, {Component} from "react";
import {MAX_LEVEL} from "./Category";

export default class CategoryItem extends Component {
    render() {
        let {id = 1, name = 'شسیسشی', currentLevel = 1, status = 'active'} = this.props;
        return (
            <li key={id} id={"li-back-item"}>


                <div className={"branch-top"}>
                </div>
                <div id={"li-div"} className={"mini"}>
                    <div className={"row"} style={{padding: '0 20px', position: 'relative'}}>
                        <div className={"col-md-6 col-sm-8"} style={{padding: 13}}>
                            <fieldset style={{float: "right"}}>
                                <div className="checkbox">
                                    {/*   <input type="checkbox" name={"checkbox_" + id} onChange={e => HandlePushCheck(e, id)}
                                       className="checkbox-input"
                                       id={id}/>*/}
                                    <label htmlFor={id}></label>
                                </div>
                            </fieldset>
                            <span id={"item-tree-show"}>{name}</span>
                            {/*     <div id={"sub-menu-custom"} onClick={handleDataRes} attr-ids={id}>
                            <i className={"bx bx-chevron-down"}></i>
                        </div>*/}
                            {/*   <div className={"col-12 " + id} id={"moreOpp"}>
                            <i className={"bx bx-show"} onClick={e => show(e, url)}></i>
                            <i className={"bx bx-trash-alt"} onClick={e => HandleDel(e, id)}></i>
                            <i className={"bx bx-edit"} onClick={e => HandleEdit(e, "edit")}></i>
                            <i className={"bx bx-duplicate"} onClick={e => HandleEdit(e, "dup")}></i>

                            {level == 3 ? (<i style={{opacity: '0.3'}} className={"bx bx-plus"}></i>) : (
                                <i className={"bx bx-plus"} onClick={e => handleAdding(e)}></i>)}

                            {status == "active" ? (
                                <span className={"badge badge-success badge-pill ml-50"}>فعال</span>
                            ) : (
                                <span className={"badge badge-warning badge-pill ml-50"}>غیرفعال</span>
                            )}
                        </div>*/}
                        </div>


                        <div className={"col-md-6 col-sm-4"} style={{padding: 13}} id={"icon-item-list"}>
                            <div className={"form-check"}>
                                {this._renderAddButton(currentLevel)}
                                <i className={"bx bx-show"}/>
                                <i className={"bx bx-trash-alt"}/>
                                <i className={"bx bx-edit"}/>
                                <i className={"bx bx-duplicate"}/>
                                {this._renderStatusBadge(status)}
                            </div>
                        </div>


                    </div>

                </div>
            </li>
        );
    }


    _renderAddButton(currentLevel) {
        if (currentLevel === MAX_LEVEL) {
            return <i style={{opacity: '0.3'}} className={"bx bx-plus"}/>
        }
        return <i className={"bx bx-plus"}/>;
    }


    _renderStatusBadge(status) {
        if (status === "active") {
            return <span className={"badge badge-success badge-pill ml-50"}>فعال</span>;
        } else {
            return <span className={"badge badge-warning badge-pill ml-50"}>غیرفعال</span>;
        }
    }
}
