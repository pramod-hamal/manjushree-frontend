import React, { useState } from "react";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import CusTable from "@/components/tables/Tableleanq_support_coordinator";
import { budgets } from "@/constants/data/budgetleanq_support_coordinator";
import CusModal from "@/components/modals/Modalleanq_support_coordinator";
import BudgetForm from "./BudgetForm";

export default function Budget() {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="bg-white flex flex-col gap-5 p-5">
      <div className="flex  w-full items-center justify-between">
        <span className="text-lg font-semibold">Budget</span>
        <div>
          <FlatButton title="update" onClick={() => setShow(true)} />
        </div>
      </div>
      <BudgetList />
      <CusModal
        show={show}
        width={1183}
        style={{ borderRadius: 0 }}
        onClose={() => {
          setShow(false);
        }}
      >
        <BudgetForm />
      </CusModal>
    </div>
  );
}

const BudgetList = () => {
  const columns: any[] = [
    { title: "Group", dataIndex: "group" },
    { title: "Amount", dataIndex: "amount", float: "right" },
  ];
  return (
    <div>
      <CusTable
        columns={columns}
        renderFooter={() => {
          // <div className="flex justify-between">
          //   <span className="border-t text-lg font-semibold">Total</span>
          <span>4200</span>;
          // </div>;
        }}
        pagination={false}
        dataSource={budgets}
        loading={false}
      />
    </div>
  );
};
