"use client";

import { useRouter } from "next/navigation";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import FormInput from "@/components/form/FormInputleanq_support_coordinator";

import CusSelect from "@/components/form/Selectleanq_support_coordinator";
import { useGetAllQuery } from "@/store/features/users/apiSliceleanq_support_coordinator";
import useAddPayment from "../hook/useAddPayment";
import SuccessModal from "./SuccessModal";
export default function AddPaymentForm() {
  const router = useRouter(); 

  const { formik, showModal, setShowModal } = useAddPayment();
  
  const { isLoading, isFetching, error, data }: any = useGetAllQuery({
    limit: 1000,
    page:  1,
    searchText:"",  
  });

  return (
    <div className="p-5 flex flex-col gap-5">
      <span className="text-2xl font-semibold">Payment details</span>
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-5 gap-x-10">
          <FormInput
            value={formik.values.PaymentId}
            name="PaymentId"
            label="Payment Id"
            required={true}
            placeHolder="Eg: 1"
            onChange={formik.handleChange}
            errors={formik.errors?.PaymentId}
          />
          <FormInput
            value={formik.values.PaymentMethod}
            name="PaymentMethod"
            label="Payment Method"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors?.PaymentMethod}
          />
          <FormInput
            value={formik.values.Amount}
            name="Amount"
            label="Amount"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors?.Amount}
          />

          <CusSelect
            options={
              data?.map((item: any) => {
                return {
                  value: item._id,
                  label: item.Name,
                };
              }) ?? []
            }
            placeHolder="Select Class"
            label="Member"
            onChange={(value: any) => formik.setFieldValue("MemberId", value)}
            required={true}
            value={formik.values.MemberId}
            errors={formik.errors.MemberId}
          />
        </div>
        <div className="flex gap-10 items-center">
          <FlatButton
            title="Submit"
            type="submit"
            loading={formik.isSubmitting}
            // onClick={() => formik.handleSubmit()}
          />
          <CancelButton onClick={() => router.back()} />
        </div>
      </form>
      <SuccessModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
