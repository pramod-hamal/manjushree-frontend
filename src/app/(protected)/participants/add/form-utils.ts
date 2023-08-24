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
  ndisNumber: 0,
  referenceNo: [],
};

export const validationSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  phone: yup.number().required("Required"),
  email: yup.string().required("Required"),
  gender: yup.string().required("Required"),
  dateOfBirth: yup.number().required("Required"),
  preferredLanguage: yup.string().required("Required"),
  pronouns: yup.string().required("Required"),
  ndisNumber: yup.number().required("Required"),
});
