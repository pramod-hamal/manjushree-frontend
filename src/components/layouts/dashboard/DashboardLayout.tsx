"use client";

import React, { memo, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function DashboardLayoutComponent({ children }: { children: React.ReactNode }) {
  const [minimize, setMinize] = useState<boolean>(false);
  const handleToogle = () => setMinize(!minimize);

  return (
    <div className="flex transition-all">
      <Sidebar minimize={minimize} handleToogle={handleToogle} />
      <main
        className={`transition-all flex flex-col ${
          minimize ? "pl-[55px] w-[97%]" : "pl-[13%] w-[87%]"
        } `}
      >
        <Header />
        <section className="p-5">{children}</section>
      </main>
    </div>
  );
}

export default memo(DashboardLayoutComponent);
