import React from "react";

export const Pagination = ({perPage, users, paginate}) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users / perPage); i++) {
        pageNumbers.push(i)
    }

    const handleNextPage = () => {

        let id = $("li.page-item.active").attr("id");
        if (id == Math.ceil(users / perPage))
        {

        }else{
            let num = parseInt(id) + 1 ;
            paginate(num);
        }

    }


    const handlePrevPage = () => {

        let id = $("li.page-item.active").attr("id");
        if (id == 1)
        {

        }else{
            let num = parseInt(id) - 1 ;
            paginate(num);
        }

    }

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination pagination-borderless justify-content-center mt-2">
                <li className="page-item previous" onClick={handlePrevPage}><a className="page-link"
                                                      href="#">
                    <i className="bx bx-chevron-right"></i>
                </a></li>
                {pageNumbers.map(number => number == 1 ? (
                    <li key={number} id={number} className="active page-item" onClick={() => paginate(number)}>
                        <a className="page-link">{number}</a>
                    </li>
                ) : <li key={number} id={number} className="page-item" onClick={() => paginate(number)}>
                    <a className="page-link">{number}</a>
                </li>)}
                <li className="page-item next"  onClick={handleNextPage}><a className="page-link"
                                                  href="#">
                    <i className="bx bx-chevron-left"></i>
                </a></li>
            </ul>
        </nav>

    )
}
