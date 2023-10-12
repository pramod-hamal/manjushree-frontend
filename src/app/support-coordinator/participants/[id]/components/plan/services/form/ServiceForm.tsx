import React from "react";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";

import SelectedChargeList from "./SelectedChargeList";
import useServiceFormHook from "../hooks/useServiceForm";

export default function ServiceForm({ onClose }: { onClose: () => void }) {

  const { serviceFormik: { formik, renderFormFields } } = useServiceFormHook(onClose)

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-5">
        {renderFormFields()}
      </div>
      <div>
        <h3 className="text-xl font-semibold m-0 pb-5">Selected Charge List</h3>
        <SelectedChargeList formik={formik} data={formik.values.chargeItems} />
      </div>
      <FlatButton title="Add" type="button" onClick={() => formik.handleSubmit()} />
    </div>
  );
}
