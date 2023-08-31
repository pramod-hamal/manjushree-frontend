import React, { useState } from "react";
import { Collapse, Skeleton } from "antd";
import {
  FileImageFilled,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";

import { useGetAllDocumentsQuery } from "@/store/features/participants/plan/apiSliceleanq_support_coordinator";
import CollapsePanel from "antd/es/collapse/CollapsePanel";

export default function DocumentsList() {
  const { data, isLoading, isFetching, error } = useGetAllDocumentsQuery({
    plan: 1,
  });
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleCollapse = (key: string | string[]): void => {
    if (key.length > 0) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  const collapsableIcon = collapsed ? (
    <CaretUpOutlined className="text-primary-title" />
  ) : (
    <CaretDownOutlined className="text-primary-title" />
  );

  if (isLoading) {
    return <Skeleton />;
  }

  const PlanDocumentHeader = () => {
    return (
      <div className="flex justify-between items-center w-full">
        <h3 className="text-2xl font-semibold m-0 pb-5">Plan Documents</h3>
        <div>{collapsableIcon}</div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded p-5 flex flex-col gap-5 ">
      <Collapse
        className="w-full bg-white p-0 alert-tag"
        defaultActiveKey={["1"]}
        bordered={false}
        onChange={handleCollapse}
        size="large"
      >
        <CollapsePanel
          className="bg-white"
          showArrow={false}
          header={<PlanDocumentHeader />}
          key="1"
        >
          <div className="grid grid-cols-5 gap-5">
            {data?.data.map((document: any, index: number) => {
              return (
                <div
                  className="flex flex-col hover:shadow-lg cursor-pointer p-3 text-center gap-3 border-1 rounded-xl"
                  key={index}
                >
                  <FileImageFilled className="text-primary-button text-3xl" />
                  <span className="text-xs truncate">
                    {document?.document.metaData.fileName}
                  </span>
                  <span className="text-xs font-bold">
                    {document?.document.metaData.mimetype}
                  </span>
                </div>
              );
            })}
          </div>
        </CollapsePanel>
      </Collapse>
    </div>
  );
}
