"use client";

import { useState } from "react";
import ValidateEmail from "../components/ValidateEmail";
import ValidateOtp from "../components/Otp";
import ResetPassword from "../components/ResetPassword";

export type ForgetPasswordStep =
  | "emailValidation"
  | "otpValidation"
  | "changePassword";

const ForgetPasswordHOC = (WrappedComponent: any) => {
  const ForgetPasswordWrapper = (props: any) => {
    const [step, setStep] = useState<ForgetPasswordStep>("emailValidation");

    /**
     * Render ForgetPassword Form Elements as per step
     * @returns {JSX.Element | undefined}
     */
    const renderFormComponent = (): JSX.Element | undefined => {
      switch (step) {
        case "emailValidation":
          return <ValidateEmail validateEmail={validateEmail} />;
        case "otpValidation":
          return <ValidateOtp validateOtp={validateOtp} />;
        case "changePassword":
          return <ResetPassword changePassword={changePassword} />;
        default:
          break;
      }
    };

    /**
     * Validates Email and send OTP to email
     * @returns {void}
     */
    const validateEmail = (): void => {
      setStep("otpValidation");
    };

    /**
     * validates otp sent to email and the otp entered by user
     * @returns {void}
     */
    const validateOtp = (): void => {
      setStep("changePassword");
    };

    /**
     * Change User password
     * @returns {void}
     */
    const changePassword = (): void => {};

    const forgetPasswordHocValue: ForgetPasswordHOCValue = {
      step,
      validateEmail,
      validateOtp,
      changePassword,
      renderFormComponent: renderFormComponent,
    };

    return <WrappedComponent {...props} values={forgetPasswordHocValue} />;
  };
  return ForgetPasswordWrapper;
};

export interface ForgetPasswordHOCValue {
  step: ForgetPasswordStep;
  validateEmail: () => void;
  validateOtp: () => void;
  changePassword: () => void;
  renderFormComponent: () => any;
}

export default ForgetPasswordHOC;
