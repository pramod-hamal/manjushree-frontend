import { FormField } from "@/hooks/formBuilder/interface/formBuilder.interfaceleanq_support_coordinator";
import { AddIndividualContactDTO } from "../interface/contact.interface";
import * as yup from 'yup';

export const initialValues: AddIndividualContactDTO = {
  name: "",
  email: "",
  isOrganization: false,
  note: "",
  occupationService: "",
  preferredContactMethod: "",
};

export const validationSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().required("Required"),
  phone: yup.string().required("Required"),
  note: yup.string().required("Required"),
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
    name: "email",
    label: "Email",
    placeHolder: "Email",
    type: "email",
    required: true,
  },
  {
    name: "occupationService",
    label: "Occupation",
    placeHolder: "Occupation",
    type: "text",
    required: true,
  },
];