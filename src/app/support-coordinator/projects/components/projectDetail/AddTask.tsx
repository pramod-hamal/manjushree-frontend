import React from "react";

import { Dropdown } from "@/core/interface/dropdown.interfaceleanq_support_coordinator";

import FlatButton from "@/components/buttons/Buttonleanq_support_coordinator";
import useAddProjectTask from "../../hook/useAddProjectTask";

export interface AddTaskDto {
  title: string;
  description: string;
  participantId: number | string;
  supportCoordinatorId: number | null;
  projectId: number | string;
}

export interface AddTaskProps { sc: Dropdown[], participant: Dropdown[], onClose: () => void }

export default function AddTask({ sc, participant, onClose }: AddTaskProps) {

  const { formik, renderFormFields } = useAddProjectTask({ sc, participant, onClose })

  return (
    <form className="grid grid-cols-1 gap-5" onSubmit={formik.handleSubmit}>
      {renderFormFields()}
      <div>
        <FlatButton loading={formik.isSubmitting} title="Submit" type="submit" />
      </div>
    </form>
  );
}
