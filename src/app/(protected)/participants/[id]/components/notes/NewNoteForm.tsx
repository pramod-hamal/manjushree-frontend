import React from "react";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import { TextAreaInput } from "@/components/form/FormInputleanq_support_coordinator";

export default function NewNoteForm() {
  return (
    <form className="p-5 gap-5 flex flex-col">
      <h3 className="text-2xl font-semibold m-0">Memo</h3>
      <div>
        <TextAreaInput
          label="Note"
          required={true}
          errors={""}
          name=""
          onChange={() => {}}
          value={""}
        />
      </div>
      <div className="flex gap-5 items-center">
        <FlatButton title="Create" onClick={() => {}} />
        <CancelButton />
      </div>
    </form>
  );
}
