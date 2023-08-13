import React from "react";
import Image from "next/image";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className=" m-auto">
      {/* Form Section */}
      <div className="h-[97vh] flex flex-col items-center gap-4 justify-center">
        <h2 className="text-6xl text-primary-title mb-0">Appulse</h2>
        <span className="pb-14">Appulse coordinator app</span>
        <div className="w-[360px]">
          <LoginForm />
        </div>
      </div>
      {/* <div /> */}
      {/* Banner Section */}
      {/* <div className="col-span-2">
        <Image
          className="w-full h-screen"
          src="/images/login-bg.svg"
          height={1000}
          width={100}
          alt="Login Image"
        />
      </div> */}
    </div>
  );
}
