import * as yup from "yup";
import { FormField } from "@/hooks/formBuilder/interface/formBuilder.interfaceleanq_support_coordinator";

export const validationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  file: yup.object().required("Required"),
});

export const formFields: FormField[] = [
  {
    name: "name",
    placeHolder: "File Name",
    label: "File Name",
    type: "text",
    required: true,
    disabled: true,
  },
  {
    name: "category",
    label: "Select Category",
    type: "select",
    placeHolder: "Select Category",
    required: true,
    options: [{ value: "Default Category", labeel: "Default Category" }],
  },
];
