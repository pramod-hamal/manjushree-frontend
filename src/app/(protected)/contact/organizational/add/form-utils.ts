import * as yup from "yup";
import { OrganizationContactDTO } from "./interface/add-organization.interface";
import { FormField } from "@/hooks/formBuilder/interface/formBuilder.interfaceleanq_support_coordinator";

export const initialValues: OrganizationContactDTO = {
  name: "",
  email: "",
  occupationService: "",
  preferredContactMethod: "",
  isOrganization: true,
  phone: "",
  note: "Test Note",
  url: "",
  address: { name: "" },
  logo: null,
};

export const validationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().required("Required"),
  phone: yup.string().required("Required"),
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
  },
  {
    name: "phone",
    label: "Phone Number",
    placeHolder: "Phone Number",
    type: "text",
    required: true,
  },
  {
    name: "preferredContactMethod",
    label: "Prefered Contact",
    placeHolder: "Select contact method",
    type: "select",
    options: [
      { label: "Email", value: "Email" },
      { label: "Phone", value: "Phone" },
    ],
  },
  {
    name: "email",
    label: "Email",
    placeHolder: "Email",
    type: "email",
    required: true,
  },
];

