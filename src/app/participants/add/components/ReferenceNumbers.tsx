import React from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import FormInput from "@/components/form/FormInputleanq_support_coordinator";

export interface ReferenceNumbers {
  referenceNumber: string;
  numberTitle: string;
}

export default function ReferenceNumbers({ formik }: any) {
  const addNewreferenceElement = () =>
    formik.setFieldValue("referenceNumbers", [
      ...formik.values.referenceNumbers,
      {
        referenceNumber: "",
        numberTitle: "",
      },
    ]);

  const handleElementChange = (name: string, value: any) => {
    formik.setFieldValue(name, value);
  };

  const handleElementDelete = (index: number) => {
    let newReferenceNumbers = formik.values.referenceNumbers;
    newReferenceNumbers.splice(index, 1);
    formik.setFieldValue("referenceNumbers", newReferenceNumbers);
  };

  return (
    <div className="flex flex-col gap-5">
      <span className="text-2xl font-semibold ">Reference Numbers</span>
      <div className="w-full flex gap-5 gap-x-8 flex-col">
        {formik.values.referenceNumbers.map(
          (references: any, index: number) => {
            return (
              <div className="grid grid-cols-2 gap-8" key={index}>
                <FormInput
                  value={references.numberTitle}
                  name="numberTitle"
                  placeHolder="Text Here"
                  required={true}
                  errors={null}
                  onChange={(e: any) =>
                    handleElementChange(
                      `referenceNumbers[${index}].numberTitle`,
                      e.target.value
                    )
                  }
                  label="Reference Number Title"
                />
                <div className="flex gap-3 items-center w-full">
                  <div className="w-full">
                    <FormInput
                      label="Reference Number"
                      value={references.referenceNumber}
                      required={true}
                      placeHolder="Text Here"
                      name="referenceNumber"
                      errors={null}
                      onChange={(e: any) => {
                        handleElementChange(
                          `referenceNumbers[${index}].referenceNumber`,
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
          }
        )}
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
