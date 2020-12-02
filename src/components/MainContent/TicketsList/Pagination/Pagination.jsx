import React from 'react'
import style from './pagination.module.css'

export const Pagination = ({ dataPerPage, totalData, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={style.paginationContainer}>
            {pageNumbers.map(
                (pageNumber) => {
                    return (
                        <span key={pageNumber}
                         onClick={() => paginate(pageNumber)} className={style.pageNumber}>{pageNumber}</span>
                    )
                }
            )
            }
        </div>
    )
}

export default (Pagination);