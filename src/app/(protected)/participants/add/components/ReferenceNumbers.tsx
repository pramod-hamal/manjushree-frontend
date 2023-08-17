import React from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import FormInput from "@/components/form/FormInputleanq_support_coordinator";

export default function ReferenceNumbers({ formik }: any) {
  const addNewreferenceElement = () =>
    formik.setFieldValue("referenceNo", [
      ...formik.values.referenceNo,
      {
        value: 0,
        title: "",
      },
    ]);

  const handleElementChange = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const handleElementDelete = (index: number) => {
    let newReferenceNumbers = formik.values.referenceNo;
    newReferenceNumbers.splice(index, 1);
    formik.setFieldValue("referenceNo", newReferenceNumbers);
  };

  return (
    <div className="flex flex-col gap-5">
      <span className="text-2xl font-semibold ">Reference Numbers</span>
      <div className="w-full flex gap-5 gap-x-8 flex-col">
        {formik.values.referenceNo.map((references: any, index: number) => {
          return (
            <div className="grid grid-cols-2 gap-8" key={index}>
              <FormInput
                value={references.title}
                name="title"
                placeHolder="Text Here"
                required={true}
                errors={null}
                onChange={(e: any) =>
                  handleElementChange(
                    `referenceNo[${index}].title`,
                    e.target.value
                  )
                }
                label="Reference Number Title"
              />
              <div className="flex gap-3 items-center w-full">
                <div className="w-full">
                  <FormInput
                    label="Reference Number"
                    value={references.value}
                    required={true}
                    placeHolder="Text Here"
                    name="value"
                    type="number"
                    errors={null}
                    onChange={(e: any) => {
                      handleElementChange(
                        `referenceNo[${index}].value`,
                        e.target.value
                      );
                    }}
                  />
                </div>
                <DeleteOutlined
                  className="text-primary-danger pt-6"
                  onClick={() => handleElementDelete(index)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div
        className="flex text-primary-title gap-2 bg-white"
        onClick={addNewreferenceElement}
      >
        <PlusOutlined />
        <span>Add Reference</span>
      </div>
    </div>
  );
}
