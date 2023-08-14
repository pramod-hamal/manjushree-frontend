"use client"

import { useSession } from "@/hooks/useSessionleanq_support_coordinator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (!session) {
      router.replace("/auth/login")
    } else {
      router.replace("/app")
    }
  }, [session]);
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
