import React from "react";
import { useFormik } from "formik";
import { PlusOutlined } from "@ant-design/icons";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";
import { SearchInput } from "@/components/form/FormInputleanq_support_coordinator";
import CusSelect from "@/components/form/Selectleanq_support_coordinator";
import { useAddMutation } from "@/store/features/participants/contact/apiSliceleanq_support_coordinator";
import { APIBaseResponse } from "@/store/features/auth/interface/api.responseleanq_support_coordinator";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooksleanq_support_coordinator";
import { participantDetailState } from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";
import { toogleModal } from "@/store/features/participants/contact/contactDetailSliceleanq_support_coordinator";
import { useToast } from "@/lib/toast/useToastleanq_support_coordinator";

export interface ParticipantContactDTO {
  relation: string;
  participantId?: number;
  contactId: number;
}

export default function ContactForm() {
  const [addContact] = useAddMutation();
  const { participantDetail } = useAppSelector(participantDetailState);
  const dispatch = useAppDispatch();

  const showToast = useToast();

  const initialValues: ParticipantContactDTO = {
    relation: "",
    participantId: participantDetail?.id,
    contactId: 0,
  };

  const handleSubmit = async (
    values: ParticipantContactDTO,
    { setSubmitting }: { setSubmitting: any }
  ) => {
    try {
      const { data, error }: any = await addContact(values);
      if (data) {
        dispatch(toogleModal(false));
        showToast({ title: "Contact Added", type: "success" });
      } else {
        const errorData: APIBaseResponse<any, null> = error;
        showToast({ title: errorData?.data?.message, type: "error" });
      }
    } catch (error: any) {
      showToast({ title: error.message, type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <form className="p-5 gap-5 flex flex-col" onSubmit={formik.handleSubmit}>
      <h3 className="text-2xl font-semibold m-0">Add Contact</h3>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <div className="w-[366px]">
            <SearchInput />
          </div>
          <FlatButton
            icon={<PlusOutlined />}
            title="Create New"
            type="button"
            onClick={() => {}}
            color="text-black bg-white border border-solid text-xs shadow  border-[#1890FF] text-primary-title"
          />
        </div>
        <div className="w-[366px]">
          <CusSelect
            placeHolder="Relationship"
            onChange={(selectedData: any) => {
              formik.setFieldValue("relation", selectedData);
            }}
            options={[
              { value: "Team Partner", label: "Team Partner" },
              { value: "Co ordinator", label: "Co ordinator" },
              { value: "Family Member", label: "Family Member" },
            ]}
            value={formik.values.relation}
          />
        </div>
      </div>
      <div className="flex gap-10 items-center">
        <FlatButton
          title="Submit"
          type="submit"
          loading={formik.isSubmitting}
        />
        <CancelButton />
      </div>
    </form>
  );
}
