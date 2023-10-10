import React from "react";

import useFormBuilder from "@/core/hooks/formBuilder/useFormBuilderleanq_support_coordinator";
import { FormField } from "@/core/hooks/formBuilder/interface/formBuilder.interfaceleanq_support_coordinator";
import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";

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
import SelectedChargeList from "./SelectedChargeList";

export default function ServiceForm({ onClose }: { onClose: () => void }) {
  const showToast = useToast();
  const { participantDetail } = useAppSelector(participantDetailState);
  const { data } = useParticipantPlanQuery(participantDetail?.id!);

  const planData: PlanResponse | undefined = data?.data;
  const plan: PlanInterface | null = planData && planData.length > 0 ? planData[0] : null;

  const { data: serviceCoOrdinatorData, error } = useServiceCoordinatorsQuery("");

  const [add] = useAddPlanServiceMutation();

  const initialValues = {
    name: "",
    managementType: "",
    budget: 0,
    participantId: participantDetail?.id,
    planId: plan?.id,
    scRate: 0,
    serviceCoordinatorId: null,
    chargeItems: [],
  }

  const onSubmit = async (values: any) => {
    const serviceValue = {
      ...values,
      budget: Number(values.budget),
      scRate: Number(values.scRate),
      chargeItems: values.chargeItems.map((item: any) => { return { id: item.id, rate: item.rate }; }),
    };
    return await add(serviceValue).unwrap()
      .then((data) => {
        showToast({ title: "Service Added", type: "success" });
        formik.resetForm();
        onClose();
      })
      .catch((err: any) => {
        formik.setErrors(err?.data?.error);
      })
      .finally(() => { });
  }

  const { formik, renderFormFields } = useFormBuilder({ initialValues, onSubmit, formFields });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-5">
        {renderFormFields()}
      </div>
      <div>
        <h3 className="text-xl font-semibold m-0 pb-5">Selected Charge List</h3>
        <SelectedChargeList />
      </div>
    </div>
  );
}


const formFields: FormField[] = [
  {
    name: "name",
    label: "Support Type",
    placeHolder: "Select Support Type",
    required: true,
    type: "select",
    options: [
      { label: "NDIA Managed", value: "NDIA Managed" },
      { label: "Plan Managed", value: "Plan Managed" },
      { label: "Self Managed", value: "Self Managed" },
    ],
  },
  {
    name: "serviceName",
    label: "Service Name",
    placeHolder: "Budget Amount",
    required: true,
    type: "select",
    options: [
      { label: "NDIA Managed", value: "NDIA Managed" },
      { label: "Plan Managed", value: "Plan Managed" },
      { label: "Self Managed", value: "Self Managed" },
    ],
  },
  {
    name: "chargeItems",
    label: "Charge Items",
    placeHolder: "Select Charge Items",
    required: true,
    type: "select",
    options: [
      { label: "NDIA Managed", value: "NDIA Managed" },
      { label: "Plan Managed", value: "Plan Managed" },
      { label: "Self Managed", value: "Self Managed" },
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
    label: "Employee",
    placeHolder: "Select Employeer",
    required: true,
    type: "select",
    options: [
      { label: "NDIA Managed", value: "NDIA Managed" },
      { label: "Plan Managed", value: "Plan Managed" },
      { label: "Self Managed", value: "Self Managed" },
    ]
  },
  {
    name: "scRate",
    label: "SC Rate",
    placeHolder: "SC Rate",
    required: true,
    type: "text",
  },
];
