import React from 'react';

import { PaginationWrapper } from './PaginationStyles';

interface Props {
  totalItems: number;
  paginate(num: number): void;
  itemsTotalPerPage: number;
}

const Pagination: React.FC<Props> = ({
  totalItems,
  paginate,
  itemsTotalPerPage
}) => {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsTotalPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationWrapper>
      <ul className="pagination">
        {pageNumbers.map(num => (
          <li className="page-item" key={num}>
            <p onClick={() => paginate(num)} className="page-num">
              {num}
            </p>
          </li>
        ))}
      </ul>
    </PaginationWrapper>
  )
}

export default Pagination;