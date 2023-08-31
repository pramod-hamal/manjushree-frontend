"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Pagination from "antd/es/pagination";
import { PaginationMetaDTO } from "../interface/pagination.meta";

export interface PaginatedTableValue {
  paginationMeta: PaginationMetaDTO;
  setPaginationMeta: Dispatch<SetStateAction<PaginationMetaDTO>>;
}

export const withPaginatedTable = (WrappedTableCompnent: any) => {
  const PaginatedTableWrapper = (props: any) => {
    const [paginationMeta, setPaginationMeta] = useState<PaginationMetaDTO>({
      limit: 5,
      page_total: 0,
      total: 0,
      total_pages: 0,
      next: null,
      previous: null,
      page: 1,
    });

    const paginatedTableValue: PaginatedTableValue = {
      paginationMeta,
      setPaginationMeta,
    };

    return (
      <>
        <WrappedTableCompnent {...props} value={paginatedTableValue} />
        <div className="flex flex-row-reverse mt-4">
          <Pagination
            defaultCurrent={1}
            total={paginationMeta.total ?? 1}
            current={paginationMeta.page!}
            pageSize={paginationMeta.limit}
            onChange={(page: number) => {
              setPaginationMeta({ ...paginationMeta, page });
            }}
          />
        </div>
      </>
    );
  };

  return PaginatedTableWrapper;
};
