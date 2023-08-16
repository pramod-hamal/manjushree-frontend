import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import ServiceForm from "./form/ServiceForm";
import CusDrawer from "@/components/drawer/Drawerleanq_support_coordinator";

export default function ServiceList() {
  const [show, setShow] = useState<boolean>(false);

  const columns: any[] = [
    { title: "Service Name", dataIndex: "name" },
    { title: "Service Coordinator", dataIndex: "coordinator" },
    { title: "Category", dataIndex: "category" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Management Type", dataIndex: "managementType" },
  ];

  return (
    <div className="flex flex-col bg-white gap-5 p-5">
      <div className="flex justify-between">
        <span className="text-lg font-semibold">Services</span>
        <FlatButton
          icon={<PlusOutlined />}
          title="Add Service"
          onClick={() => setShow(true)}
        />
      </div>
      <div>
        <CusTable columns={columns} dataSource={[]} loading={false} />
      </div>
      <CusDrawer open={show} handleDrawerToogle={() => setShow(false)}>
        <ServiceForm />
      </CusDrawer>
      {/* <CusModal
        width={1000}
        show={show}
        onClose={() => setShow(false)}
      ></CusModal> */}
    </div>
  );
}
