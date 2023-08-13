"use client";
import React from "react";
import ForgetPasswordHOC from "./hoc/forgetPasswordHOC";

function ForgetPasswordPage({ values }: any) {
  return (
    <section className="h-screen w-fit m-auto">
      {values.renderFormComponent()}
    </section>
  );
}

export default ForgetPasswordHOC(ForgetPasswordPage);
