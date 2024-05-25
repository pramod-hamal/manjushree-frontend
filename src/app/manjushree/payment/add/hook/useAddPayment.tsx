import { FormikHelpers, useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as yup from "yup";

import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";

import { useAddMutation } from "@/store/features/payment/apiSliceleanq_support_coordinator";

const useAddPayment = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const showToast = useToast();
  const router = useRouter();
  const [addPayment] = useAddMutation();

  const initialValues: any = {
    PaymentId: "",
    MemberId: "",
    PaymentMethod: "",
    Amount: 0,
  };

  const validationSchema = yup.object().shape({
    PaymentId: yup.string().required("Required"),
    MemberId: yup.string().required("Required"),
    PaymentMethod: yup.string().required("Required"),
    Amount: yup.string().required("Required"),
  });

  const handleAddPayment = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>
  ) => {
    await addPayment({ ...values, PaymentDate: new Date(), Status: true })
      .unwrap()
      .then(() => {
        setShowModal(true);
        showToast({ title: "Payment Added", type: "success" });
        router.back();
      })
      .catch((error: any) => {
        formik.setErrors(error?.data?.error);
        showToast({ title: error.data.message, type: "error" });
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleAddPayment,
    validationSchema,
    validateOnMount: false,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
  });

  return { formik, showModal, setShowModal };
};

export default useAddPayment;
