import React, {useState} from 'react';
import {BsChevronRight, BsChevronLeft} from 'react-icons/bs';
import {TableWrapper, PaginationWrapper} from './TableStyles';

interface Props {
  itemsTotalPerPage: number;
  totalItems: number;
  currentPage: number;
  nextPage(): void;
  prevPage(): void;
  paginate(num: number): void;
}

const Table: React.FC<Props> = ({
  children,
  itemsTotalPerPage,
  totalItems,
  paginate,
  nextPage,
  prevPage,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsTotalPerPage); i++) {
    pageNumbers.push(i);
  }

  const pageNum = Math.ceil(totalItems / itemsTotalPerPage);

  return (
    <>
      <TableWrapper>{children}</TableWrapper>
      {totalItems !== itemsTotalPerPage && (
        <PaginationWrapper>
          <ul className="pagination">
            {currentPage === pageNum && totalItems >= itemsTotalPerPage && (
              <li className="page-item">
                <p onClick={() => prevPage()}>
                  <BsChevronLeft />
                </p>
              </li>
            )}
            {pageNumbers.map(num => (
              <li className="page-item" key={num}>
                <p onClick={() => paginate(num)} className="page-num">
                  {num}
                </p>
              </li>
            ))}
            {currentPage <= pageNum - 1 && (
              <li className="page-item">
                <p onClick={() => nextPage()}>
                  <BsChevronRight />
                </p>
              </li>
            )}
          </ul>
        </PaginationWrapper>
      )}
    </>
  );
};

export default Table;
