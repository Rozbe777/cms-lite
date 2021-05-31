import React from "react";
import './styleAction.scss'

export const BreadCrumbs = ({data , floatBtn , titleBtn , icon , clicked : pushClick}) => {
    return (
        <div id={"breadCrumb"} style={{width: '100%'}}>
            <div className={"container-fluid"}>
                <div className={"row"}>
                    <div className={"col-12"} style={{marginBottom: 5, marginTop: 5, lineHeight: '2.3'}}>
                        <span id={"title"}>{data.title}</span>
                        <span id={"icon"}>
                        <a href="/dashboard"><i className={"bx bxs-home"}></i> <span>پیشخوان</span> </a>
                    </span>
                        <span id={"icon"}>
                        <a><i className={"bx bx-chevron-left"}></i></a>
                    </span>
                        <span id={"icon"}>
                        <a>{data.desc}</a>
                    </span>

                        {titleBtn ? (
                            <button id={"show-loader-selected"} style={{float : 'left'}} onClick={e => pushClick(e)} type={"button"} className={"btn btn-primary shadow mr-1 mb-1"}><i className={"bx "+icon}></i>&nbsp; {titleBtn}  &nbsp;</button>
                        ) : ''}
                    </div>
                </div>
            </div>
            {floatBtn ? (
                <button className={"btn btn-primary mr-1 mb-1"} id={floatBtn}>
                    {icon ? (
                        <i className={"bx "+icon}></i>
                    ) : ('')}
                    {titleBtn}
                </button>
            ) : ('')}
        </div>
    )
}
