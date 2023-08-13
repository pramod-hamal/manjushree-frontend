import React, { useEffect, useRef, useState } from "react";

import FlatButton, { CancelButton } from "@/components/buttons/Buttonleanq_support_coordinator";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routesleanq_support_coordinator";

import GoBack from "@/components/buttons/GoBackleanq_support_coordinator";

export default function ValidateOtp({ validateOtp }: any) {
  const router = useRouter();

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [fieldValues, setFieldValues] = useState<string[]>(["", "", "", ""]);

  /**
   * Function to handle input change and focus on the next input field
   * @param {any} index:number
   * @param {any} value:string
   * @returns {void}
   */
  const handleChange = (index: number, value: string): void => {
    // Allow only one character for each input
    const truncatedValue = value.slice(0, 1);

    // Update the input field's value
    const newFieldValues = [...fieldValues];
    newFieldValues[index] = truncatedValue;
    setFieldValues(newFieldValues);

    // Move focus to the next input field
    const nextIndex = index + 1;
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex]?.focus();
    }
  };

  /**
   * Function to handle the focus on the previous input field
   * @param {any} currentIndex:number
   * @returns {void}
   */
  const focusPreviousInput = (currentIndex: number): void => {
    const prevIndex = currentIndex - 1;
    if (inputRefs.current[prevIndex]) {
      inputRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-left justify-center h-screen  gap-5">
      <GoBack route={routes.login} />
      <h2 className="text-4xl mb-2 mt-0">Enter OTP</h2>
      <div className="flex gap-5 ">
        {fieldValues.map((value: any, index: number) => (
          <input
            className="h-10 focus:outline-blue-500 outline-gray-300 outline outline-1 w-10 border-none flex items-center justify-center text-center"
            key={index}
            type="text"
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !value) {
                focusPreviousInput(index);
              }
            }}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <FlatButton title="Submit" onClick={validateOtp} />
        <CancelButton />
      </div>
      <ResendOtp />
    </div>
  );
}

const ResendOtp = () => {
  const [time, setTime] = useState(60);
  const [isOtpFieldEnabled, setIsOtpFieldEnabled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    if (time === 0) {
      setIsOtpFieldEnabled(true);
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [time]);

  const handleResendOTP = () => {
    setTime(60);
    setIsOtpFieldEnabled(false);
  };
  return (
    <div className="w-full flex justify-center items-center mt-5">
      {time > 0 ? (
        <p className="text-paragraph ">
          Time Remaining:{" "}
          <span className="font-normal text-blue-600">
            {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
          </span>
        </p>
      ) : (
        <p
          onClick={handleResendOTP}
          className="text-paragraph text-blue-600 cursor-pointer"
        >
          Resend OTP
        </p>
      )}
    </div>
  );
};
