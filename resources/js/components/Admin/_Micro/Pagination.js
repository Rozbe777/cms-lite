import React from "react";
import $ from 'jquery'

export const Pagination = (props) => {


    const {
        firstPageUrl
        , lastPageUrl
        , currentPage
        , perPage
        , users
        , total
        , paginate
    } = props;

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(total / perPage); i++) {
        pageNumbers.push(i)
    }

    const handleNextPage = () => {
        let id = $("li.page-item.numberss.active").attr("data-tar");

        if (id == Math.ceil(total / perPage)) {
        } else {
            let num = parseInt(id) + 1;
            $("ul.pagination li.numberss").removeClass("active");
            $("ul.pagination li.numberss." + num).addClass("active");
            paginate(num);
        }
    }

    const handlePrevPage = () => {
        let id = $("li.page-item.numberss.active").attr("data-tar");
        if (id == 1) {

        } else {
            let num = parseInt(id) - 1;
            $("ul.pagination li.numberss").removeClass("active");
            $("ul.pagination li.numberss." + num).addClass("active");
            paginate(num);
        }
    }


    $("ul.pagination li.numberss").click(function () {
        $("ul.pagination li.numberss").removeClass("active");
        $(this).addClass("active");
    })

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination pagination-borderless justify-content-center mt-2">
                {
                    Math.ceil(total / perPage) == 1 ? (
                        <li className="page-item previous" style={{opacity: '0.4'}} ><a
                            className="page-link"
                            href="#">
                            <i className="bx bx-chevron-right"></i>
                        </a></li>
                    ):(
                        <li className="page-item previous" style={{opacity: '0.4'}} onClick={handlePrevPage}><a
                            className="page-link"
                            href="#">
                            <i className="bx bx-chevron-right"></i>
                        </a></li>
                    )
                }

                {pageNumbers.map((number, index) => number == 1 ? (
                    <li key={index} data-tar={number} className={"active page-item numberss " + number} onClick={() => paginate(number)}>
                        <a className="page-link">{number}</a>
                    </li>
                ) : <li data-tar={number} key={index} className={"page-item numberss " + number} onClick={() => paginate(number)}>
                    <a className="page-link">{number}</a>
                </li>)}
                {
                    Math.ceil(total / perPage) == 1 ? (
                        <li className={"page-item next opacity-mimi"}><a className="page-link"
                                                                                                                                                         href="#">
                            <i className="bx bx-chevron-left"></i>
                        </a></li>
                    ) : (
                        <li className={"page-item next"} onClick={handleNextPage}  ><a className="page-link"
                                                                                                                                                         href="#">
                            <i className="bx bx-chevron-left"></i>
                        </a></li>
                    )
                }

            </ul>
        </nav>

    )
}
