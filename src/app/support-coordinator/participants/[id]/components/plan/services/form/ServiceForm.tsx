import React from "react";

import FlatButton, { CancelButton } from "@/components/buttons/Buttonleanq_support_coordinator";

import SelectedChargeList from "./SelectedChargeList";
import useServiceFormHook from "../hooks/useServiceForm";

export default function ServiceForm({ onClose }: { onClose: () => void }) {

  const { serviceFormik: { formik, renderFormFields } } = useServiceFormHook(onClose)
  console.log(formik.errors)
  return (
    <div className="space-y-5 relative h-full">
      <div className="grid grid-cols-2 gap-5">
        {renderFormFields()}
      </div>
      <div>
        <h3 className="text-xl font-semibold m-0 pb-5">Selected Charge List</h3>
        <SelectedChargeList formik={formik} data={formik.values.chargeItems} />
      </div>
      <div className="flex gap-5 flex-row-reverse absolute bottom-0 right-0">
        <FlatButton title="Submit" type="button" onClick={() => formik.handleSubmit()} />
        <CancelButton onClick={onClose} />
      </div>
    </div>
  );
}
