import React from 'react';
import Pagination from '../Pagination/Pagination';
import { TableWrapper } from './TableStyles';

interface Props {
  itemsTotalPerPage: number;
  totalItems: number;
  paginate(num: number): void;
}

const Table: React.FC<Props> = ({
  children,
  itemsTotalPerPage,
  totalItems,
  paginate,
}) => {
  return (
    <>
      <TableWrapper>{children}</TableWrapper>
      {totalItems !== itemsTotalPerPage && (
        <Pagination
          itemsTotalPerPage={itemsTotalPerPage}
          totalItems={totalItems}
          paginate={paginate}
        />
      )}
    </>
  );
};

export default Table;
