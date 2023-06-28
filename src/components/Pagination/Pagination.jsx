import React from 'react'
import style from './Pagination.module.css'

function Pagination({ currentPage, totalPages, handlePageChange }) {

  return (
    <div className={style.pageNavigation}>
        <button className={style.navigationButton} disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>
            Previous
        </button>
        <span style={{color:"#fff", userSelect:"none"}}>{`Page ${currentPage + 1} ${
            totalPages === 1 ? "of 1" : `of ${totalPages}`
        }`}</span>
        <button className={style.navigationButton} disabled={currentPage === totalPages - 1} onClick={() => handlePageChange(currentPage + 1)}>
            Next
        </button>
    </div>
  )
}

export default Pagination