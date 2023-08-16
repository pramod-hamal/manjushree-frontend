import React, { useState } from "react";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  CloseCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusModal from "@/components/modals/Modalleanq_support_coordinator";

import AlertForm from "./AlertForm";
import { Collapse, Alert } from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import { alerts } from "@/constants/data/alertsleanq_support_coordinator";

export default function ProfileAlerts() {
  const [show, setShow] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex py-2">
      <Collapse
        defaultActiveKey={"1"}
        className="w-full p-0 bg-white  alert-tag"
        bordered={false}
        onChange={(key: string | string[]) => {
          if (key.length > 0) {
            setCollapsed(true);
          } else {
            setCollapsed(false);
          }
        }}
        size="large"
      >

        <CollapsePanel
          showArrow={false}
          forceRender={collapsed}
          className="bg-white"
          header={
            <>
              <div className="flex cursor-pointer justify-between bg-white items-center w-full pb-5">
                <span className="text-xl font-semibold">Alert Detail</span>
                <div>
                  {collapsed ? (
                    <CaretUpOutlined className="text-primary-title" />
                  ) : (
                    <CaretDownOutlined className="text-primary-title" />
                  )}
                </div>
              </div>
              <div>
                <FlatButton
                  icon={<PlusOutlined />}
                  title="Add Alert"
                  onClick={() => setShow(true)}
                  color="text-black bg-white border border-solid text-xs shadow  border-[#1890FF] text-primary-title"
                />
              </div></>
          }
          key="1"
        >
          <div className="py-5 flex-col flex gap-5">
            <div className="grid grid-cols-2 gap-5">
              {alerts.map((alert: any, index: number) => {
                return (
                  <div key={index} className="relative hover:scale-95 transition-all cursor-pointer">
                    <Alert
                      onClose={(e: any) => {
                        console.log(e);
                      }}
                      closeIcon={
                        <CloseCircleFilled className="text-primary-danger" />
                      }
                      message={alert.message}
                      description={alert.description}
                      type={alert.type}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </CollapsePanel>
      </Collapse>
      <CusModal width={800} show={show} onClose={() => setShow(false)}>
        <AlertForm />
      </CusModal>
    </div>
  );
}
