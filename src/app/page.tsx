"use client";

import withAuth from "@/lib/withAuthleanq_support_coordinator";
import Image from "next/image";

function Home() {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="flex flex-col items-center gap-5 animate-pulse">
        <Image
          height={100}
          width={100}
          alt="Logo"
          className=""
          src="/images/logo.svg"
        />
        <span className="text-3xl font-semibold text-primary-title">
          Support Coordinator
        </span>
      </div>
    </div>
  );
}

export default withAuth(Home);
