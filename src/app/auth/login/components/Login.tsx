import React from "react";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className=" m-auto">
      <div className="h-[97vh] flex flex-col items-center gap-4 justify-center">
        <h2 className="text-6xl text-primary-title mb-0">Manjushree</h2>
        <span className="pb-14">Gym Management</span>
        <div className="w-[360px]">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
