import React, { useState } from "react";
import { Collapse } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import CollapsePanel from "antd/es/collapse/CollapsePanel";

import useFormBuilder, {
  FormField,
} from "@/hooks/useFormBuilderleanq_support_coordinator";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";

import ChargeItemList from "./ChargeItemList";
import SelectedChargeItemList from "./SelectedChargeItemList";

export default function ServiceForm() {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const { formik, renderFormFields } = useFormBuilder({
    initialValues: {},
    onSubmit: (values: any) => {},
    formFields,
  });

  /**
   * handle open and close collapse panel
   * @param {string | string[]} key:string|string[]
   * @returns {void}
   */
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

  const PanelHeader = () => {
    return (
      <div className="flex justify-between items-center w-full">
        <h3 className="text-2xl font-semibold m-0 pb-5">Services</h3>
        <div>{collapsableIcon}</div>
      </div>
    );
  };

  return (
    <div className="p-5 gap-5 flex flex-col">
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
          header={<PanelHeader />}
          key="1"
        >
          <div className="grid grid-cols-2 gap-5">{renderFormFields()}</div>
        </CollapsePanel>
      </Collapse>
      {/* Charge Item Table */}
      <ChargeItemList />
      {/* Selected Charge Item Table */}
      <SelectedChargeItemList />
      <div className="flex gap-5 items-center">
        <FlatButton title="Submit" onClick={() => formik.handleSubmit()} />
        <FlatButton
          title="Cancel"
          onClick={() => {}}
          color="text-black bg-white shadow border"
        />
      </div>
    </div>
  );
}

const formFields: FormField[] = [
  {
    name: "name",
    label: "Service Name",
    placeHolder: "Service Name",
    required: true,
    type: "text",
  },
  {
    name: "managementType",
    label: "Management Type",
    placeHolder: "Select Management Type",
    required: true,
    type: "select",
    options: [],
  },
  {
    name: "budgetAmount",
    label: "Service Budget Amount",
    placeHolder: "Service Budger Amount",
    required: true,
    type: "text",
  },
  {
    name: "coordinator",
    label: "Service Coordinator",
    placeHolder: "Select Service Coordinator",
    required: true,
    type: "select",
    options: [],
  },
  {
    name: "coordinatorScl2",
    label: "Service Coordinator SCL 2",
    placeHolder: "Select Service Coordinator SCL 2",
    required: true,
    type: "select",
    options: [],
  },
];
