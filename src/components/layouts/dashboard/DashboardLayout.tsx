"use client";

import React, { memo, useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSession } from "@/hooks/useSessionleanq_support_coordinator";
import { useRouter } from "next/navigation";

function DashboardLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  const [minimize, setMinize] = useState<boolean>(false);
  const handleToogle = () => setMinize(!minimize);
  const session = useSession();

  useEffect(() => {
    if (session === null) {
      console.log("no session")
      // router.replace("/auth/login")
    }
  }, [])

  return (
    <div className="flex transition-all">
      <Sidebar minimize={minimize} handleToogle={handleToogle} />
      <main
        className={`transition-all flex flex-col ${minimize ? "pl-[55px] w-[97%]" : "pl-[13%] w-[87%]"
          } `}
      >
        <Header />
        <section className="p-5">{children}</section>
      </main>
    </div>
  );
}

export default memo(DashboardLayoutComponent);
