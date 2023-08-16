import React from "react";
import { Table, Skeleton } from "antd";

const SkeletonTable = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const dataSource: any[] = [];

  // Generate skeleton rows for placeholder data
  const skeletonRows = Array.from({ length: 5 }).map((_, index) => ({
    key: index,
  }));

  return (
    <Skeleton active loading={true}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
      />
    </Skeleton>
  );
};

export default SkeletonTable;
