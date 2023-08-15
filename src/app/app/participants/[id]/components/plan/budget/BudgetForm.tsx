import React from "react";
import { useFormik } from "formik";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";

import CapitalSupport from "./forms/CapitalSupport";
import CapacitySupport from "./forms/CapacitySupport";
import CoreSupport from "./forms/CoreSupport";

export default function BudgetForm() {
  const formik = useFormik({
    initialValues: {
      core: [],
      capital: [],
      capacity: [],
    },
    onSubmit: (values: any) => {},
  });
  return (
    <form className=" gap-5 flex flex-col" onSubmit={formik.handleSubmit}>
      <h3 className="text-2xl font-semibold m-0">Funded Support</h3>
      <div className="flex flex-col gap-5">
        <CoreSupport formik={formik} />
        <CapacitySupport />
        <CapitalSupport />
      </div>
      <div className="flex gap-5 items-center">
        <FlatButton title="Submit" onClick={() => {}} />
        <CancelButton />
      </div>
    </form>
  );
}
