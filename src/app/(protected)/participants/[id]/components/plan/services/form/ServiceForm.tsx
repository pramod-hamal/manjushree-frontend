import React, { useState } from "react";
import { Collapse } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import CollapsePanel from "antd/es/collapse/CollapsePanel";

import useFormBuilder from "@/core/hooks/formBuilder/useFormBuilderleanq_support_coordinator";
import { FormField } from "@/core/hooks/formBuilder/interface/formBuilder.interfaceleanq_support_coordinator";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";

import ChargeItemList from "./ChargeItemList";
import SelectedChargeItemList from "./SelectedChargeItemList";

import { useServiceCoordinatorsQuery } from "@/store/features/dropdown/apiSliceleanq_support_coordinator";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";
import { participantDetailState } from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import {
  PlanInterface,
  PlanResponse,
} from "@/store/features/participants/plan/interface/plan.interfaceleanq_support_coordinator";
import {
  useAddPlanServiceMutation,
  useParticipantPlanQuery,
} from "@/store/features/participants/plan/apiSliceleanq_support_coordinator";
import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";

export default function ServiceForm() {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const showToast = useToast();
  const { participantDetail } = useAppSelector(participantDetailState);
  const { data } = useParticipantPlanQuery(participantDetail?.id!);

  const planData: PlanResponse | undefined = data?.data;
  const plan: PlanInterface | null =
    planData && planData.length > 0 ? planData[0] : null;

  const { data: serviceCoOrdinatorData, error } =
    useServiceCoordinatorsQuery("");

  const [add] = useAddPlanServiceMutation();

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
      options: [
        { label: "Admin", value: "admin" },
        { label: "Coordinator", value: "coordinator" },
      ],
    },
    {
      name: "budget",
      label: "Service Budget Amount",
      placeHolder: "Budget Amount",
      required: true,
      type: "text",
    },
    {
      name: "serviceCoordinatorId",
      label: "Service Coordinator",
      placeHolder: "Select Service Coordinator",
      required: true,
      type: "select",
      options: serviceCoOrdinatorData?.data ?? [],
    },
    {
      name: "scRate",
      label: "SC Rate",
      placeHolder: "SC Rate",
      required: true,
      type: "text",
    },
  ];

  const { formik, renderFormFields } = useFormBuilder({
    initialValues: {
      name: "",
      managementType: "",
      budget: null,
      participantId: participantDetail?.id,
      planId: plan?.id,
      scRate: 0,
      serviceCoordinatorId: null,
      chargeItems: [],
    },
    onSubmit: async (values: any) => {
      const serviceValue = {
        ...values,
        budget: Number(values.budget),
        scRate: Number(values.scRate),
        chargeItems: values.chargeItems.map((item: any) => {
          return { id: item.id, rate: item.rate };
        }),
      };
      await add(serviceValue)
        .unwrap()
        .then((data) => {
          showToast({ title: "Service Added", type: "success" });
          formik.resetForm();
        })
        .catch((err) => {
          showToast({ title: err.data?.message, type: "error" });
        })
        .finally(() => {});
    },
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
      <h3 className="text-2xl font-semibold m-0 pb-5">Charge List</h3>
      <ChargeItemList formik={formik} />
      <h3 className="text-2xl font-semibold m-0 pb-5">Selected Charge List</h3>
      <SelectedChargeItemList formik={formik} />
      <div className="flex gap-5 items-center">
        <FlatButton
          title="Submit"
          onClick={() => formik.handleSubmit()}
          loading={formik.isSubmitting}
        />
        <CancelButton />
      </div>
    </div>
  );
}
