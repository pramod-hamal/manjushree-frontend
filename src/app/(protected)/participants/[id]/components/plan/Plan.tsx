import React from "react";
import Summary from "./Summary";
import Documents from "./Documents";
import ServiceList from "./services/ServiceList";
// import Budget from "./budget/Budget";
// import Implementations from "./ImplementationChart";

export default function Plan() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-8 gap-5">
        <div className="col-span-2">
          <Summary />
        </div>
        <div className="col-span-6">
          <Documents />
        </div>
      </div>
      <ServiceList />
      {/* <div className="grid grid-cols-2 gap-8">
        <Budget />
        <Implementations />
      </div> */}
    </div>
  );
}
