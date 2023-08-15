import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";

import { healthData } from "@/constants/data/healthleanq_support_coordinator";
import CusModal from "@/components/modals/Modalleanq_support_coordinator";
import HealthConditionForm from "./HealthConditionForm";

export default function HealthList() {
  const [show, setShow] = useState<boolean>(false);

  const columns: any[] = [
    { title: "Title", dataIndex: "title", width: 250 },
    { title: "Description", dataIndex: "description" },
    { title: "Type", dataIndex: "type", width: 200 },
  ];

  return (
    <div className="flex flex-col bg-white gap-5 p-5">
      <div className="flex flex-row-reverse">
        <FlatButton
          icon={<PlusOutlined />}
          title="Add Condition"
          onClick={() => setShow(true)}
        />
      </div>
      <div>
        <CusTable columns={columns} dataSource={healthData} loading={false} />
      </div>
      <CusModal
        show={show}
        // title="Health Condition"
        // style={{ right: "-34%", top: "34%", borderRadius: 0 }}
        onClose={() => {
          setShow(false);
        }}
      >
        <HealthConditionForm />
      </CusModal>
    </div>
  );
}
