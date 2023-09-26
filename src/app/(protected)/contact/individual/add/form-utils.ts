import * as yup from 'yup';
import { FormField } from "@/core/hooks/formBuilder/interface/formBuilder.interfaceleanq_support_coordinator";
import { AddIndividualContactDTO } from "../interface/contact.interface";

export const initialValues: AddIndividualContactDTO = {
  name: "",
  email: "",
  note: "",
  isOrganization: false,
  occupationService: "",
  preferredContactMethod: "",
};

export const validationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  occupationService: yup.string().required("Required"),
  preferredContactMethod: yup.string().required("Required"),
});

export const formFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeHolder: "Name",
    required: true,
    copy: true
  },
  {
    name: "phone",
    label: "Phone Number",
    placeHolder: "Phone Number",
    type: "text",
    copy: true
  },
  {
    name: "email",
    label: "Email",
    placeHolder: "Email",
    type: "email",
    copy: true
  },
  {
    name: "occupationService",
    label: "Occupation",
    placeHolder: "Select Occupation",
    type: "select",
    options: [{ label: "Support Coordinator", value: "Support Coordinator" }],
    required: true,
  },
];