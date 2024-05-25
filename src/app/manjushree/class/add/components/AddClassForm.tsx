"use client";

import { useRouter } from "next/navigation";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import FormInput from "@/components/form/FormInputleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";

import useAddClass from "../hook/useAddClass";
import SuccessModal from "./SuccessModal";
import { useGetAllQuery } from "@/store/features/users/apiSliceleanq_support_coordinator";

export default function AddClassForm() {
  const router = useRouter();
  const { isLoading, isFetching, error, data }: any = useGetAllQuery({
    limit: 1000,
    page:  1,
    searchText:"",  
  });
  const { formik, showModal, setShowModal } = useAddClass();

  return (
    <div className="p-5 flex flex-col gap-5">
      <span className="text-2xl font-semibold">Class details</span>
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-5 gap-x-10">
          <FormInput
            value={formik.values.name}
            name="name"
            label="Class Name"
            required={true}
            placeHolder="Eg: 1"
            onChange={formik.handleChange}
            errors={formik.errors?.name}
          />
          <FormInput
            value={formik.values.instructor}
            name="instructor"
            label="Instructor"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors?.instructor}
          />
          <FormInput
            value={formik.values.capacity}
            name="capacity"
            label="Capacity"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors?.capacity}
          />
          <FormInput
            value={formik.values.schedule.dayOfWeek}
            name="schedule.dayOfWeek"
            label="Day"
            required={true}
            placeHolder="Eg: Monday"
            onChange={formik.handleChange}
            errors={formik.errors?.schedule?.dayOfWeek}
          />
          <FormInput
            type="text"
            value={formik.values.schedule.startTime}
            name="schedule.startTime"
            label="StartTime"
            required={true}
            placeHolder="9:00 AM"
            onChange={formik.handleChange}
            errors={formik.errors?.schedule?.startTime}
          />
          <FormInput
            type="text"
            value={formik.values.schedule.endTime}
            name="schedule.endTime"
            label="EndTime"
            required={true}
            placeHolder="10:00 PM"
            onChange={formik.handleChange}
            errors={formik.errors?.schedule?.endTime}
          />
          <FormInput
            type="text"
            value={formik.values.description}
            name="description"
            label="Description"
            required={true}
            placeHolder="Text Here"
            onChange={formik.handleChange}
            errors={formik.errors?.description}
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
            onChange={(value: any) => formik.setFieldValue("enrolledMembers", value)}
            required={true}
            value={formik.values.enrolledMembers}
            errors={formik.errors.enrolledMembers}
            mode="multiple"
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
