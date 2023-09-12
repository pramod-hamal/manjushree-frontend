import * as yup from "yup"
import { ParticipantAddDTO } from "@/store/features/participants/interface/addPrticipantDTOleanq_support_coordinator";

export const initialValues: ParticipantAddDTO = {
  firstName: "",
  middleName: "",
  lastName: "",
  phone: "",
  email: "",
  gender: "",
  dateOfBirth: "",
  preferredLanguage: "",
  pronouns: "",
  ndisNumber: "",
  references: [],
};

export const validationSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  phone: yup.string().min(10,"Phone number must be minimum 10 digit").required("Required"),
  email: yup.string().required("Required"),
  gender: yup.string().required("Required"),
  dateOfBirth: yup.date().required("Required"),
  preferredLanguage: yup.string().required("Required"),
  pronouns: yup.string().required("Required"),
  ndisNumber: yup.number().required("Required"),
});
