import React from "react";
import Summary from "./Summary";
import ServiceList from "./services/ServiceList";
import DocumentsList from "./document/DocumentsList";

export default function Plan() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-8 gap-5">
        <div className="col-span-2">
          <Summary />
        </div>
        <div className="col-span-6">
          <DocumentsList />
        </div>
      </div>
     <ServiceList /> 
    </div>
  );
}
