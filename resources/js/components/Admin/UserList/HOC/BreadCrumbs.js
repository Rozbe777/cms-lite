import React from "react";
import './styleAction.scss'

export const BreadCrumbs = ({data}) => {
    return (
        <div id={"breadCrumb"} style={{width: '100%'}}>
            <div className={"container-fluid"}>
                <div className={"row"}>
                    <div className={"col-12"} style={{marginBottom: 5, marginTop: 5, lineHeight: '2.3'}}>
                        <span id={"title"}>{data.title}</span>
                        <span id={"icon"}>
                        <a href="/admin"><i className={"bx bxs-home"}></i> <span>داشبورد</span> </a>
                    </span>
                        <span id={"icon"}>
                        <a><i className={"bx bx-chevron-left"}></i></a>
                    </span>
                        <span id={"icon"}>
                        <a>{data.desc}</a>
                    </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
