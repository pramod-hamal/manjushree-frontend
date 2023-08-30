import React from "react";
import dayjs from "dayjs";
import { FormikHelpers, useFormik } from "formik";
import type { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, TimeRangePickerProps } from "antd";

import FlatButton, {
  CancelButton,
} from "@/components/buttons/Buttonleanq_support_coordinator";

import { useCreatePlanMutation } from "@/store/features/participants/plan/apiSliceleanq_support_coordinator";
import { CreatePlanDTO } from "@/store/features/participants/plan/interface/plan.interfaceleanq_support_coordinator";
import { useAppSelector } from "@/store/hooksleanq_support_coordinator";
import { participantDetailState } from "@/store/features/participants/detail/participantDetailSliceleanq_support_coordinator";

import { useToast } from "@/core/lib/toast/useToastleanq_support_coordinator";

const dateFormat = "DD/MM/YYYY";

const { RangePicker } = DatePicker;

dayjs.extend(customParseFormat);

export default function CreatePlan({ onClose }: { onClose: () => void }) {
  const { participantDetail } = useAppSelector(participantDetailState);
  const [createPlan] = useCreatePlanMutation();
  const showToast = useToast();

  const rangePresets: TimeRangePickerProps["presets"] = [
    { label: "Next 30 Days", value: [dayjs().add(30, "d"), dayjs()] },
    { label: "Next 60 Days", value: [dayjs().add(60, "d"), dayjs()] },
    { label: "Next 90 Days", value: [dayjs().add(90, "d"), dayjs()] },
  ];

  const initialValues: CreatePlanDTO = {
    startDate: Date.now(),
    endDate: Date.now(),
    participantId: participantDetail?.id!,
  };

  const handleCreatePlan = async (
    values: CreatePlanDTO,
    { setSubmitting }: FormikHelpers<CreatePlanDTO>
  ) => {
    await createPlan(values)
      .unwrap()
      .then((data) => {
        showToast({ title: "Plan Updated", type: "success" });
        setSubmitting(false);
        onClose();
      })
      .catch((error) => {
        showToast({ title: error.message, type: "error" });
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleCreatePlan,
  });

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates && dateStrings) {
      const startDate: Date | null = dates[0] && dayjs(dates[0]).toDate();
      const endDate: Date | null = dates[1] && dayjs(dates[1]).toDate();
      formik.setFieldValue("startDate", startDate);
      formik.setFieldValue("endDate", endDate);
    } else {
      console.log("Clear");
    }
  };

  return (
    <form className="flex flex-col gap-4 p-5" onSubmit={formik.handleSubmit}>
      <h3 className="text-2xl font-semibold m-0">Create Plan</h3>
      <RangePicker
        presets={[...rangePresets]}
        value={[
          dayjs(formik.values.startDate ?? Date.now()),
          dayjs(formik.values.endDate ?? Date.now()),
        ]}
        format={dateFormat}
        onChange={onRangeChange}
      />
      <div className="flex gap-10 items-center">
        <FlatButton
          title={"Create"}
          type="submit"
          loading={formik.isSubmitting}
        />
        <CancelButton onClick={() => onClose()} />
      </div>
    </form>
  );
}
