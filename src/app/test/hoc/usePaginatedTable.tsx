"use client";

import { useState } from "react";
import { PaginationMetaDTO } from "@/store/features/auth/interface/api.responseleanq_support_coordinator";
import { Pagination } from "antd";

export const withPaginatedTable = (WrappedTableCompnent: any) => {
  const PaginatedTableWrapper = (props: any) => {
    const [paginationMeta, setPaginationMeta] = useState<PaginationMetaDTO>({
      limit: 1,
      page_total: 0,
      total: 0,
      total_pages: 0,
      next: null,
      previous: null,
      page: 1,
    });

    const paginatedTableValue = {
      paginationMeta,
      setPaginationMeta,
    };

    return (
      <>
        <WrappedTableCompnent {...props} value={paginatedTableValue} />;
        <Pagination
          defaultCurrent={1}
          total={paginationMeta.total}
          current={paginationMeta.page!}
          pageSizeOptions={[5, 10, 15, 25, 50, 100]}
          pageSize={paginationMeta.page_total}
          onChange={(page: number) => {
            setPaginationMeta({ ...paginationMeta, page });
          }}
        />
      </>
    );
  };

  return PaginatedTableWrapper;
};
