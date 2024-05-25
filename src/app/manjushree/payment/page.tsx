import { Metadata } from "next";

import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";
import PaymentList from "./components/PaymentList";
export const metadata: Metadata = {
  title: "Payments",
  description: "",
};

export default function Users() {
  return (
    <div className="flex flex-col w-full gap-5">
      <PageHeader title="Payments" />
      <div className="p-5 bg-white shadow">
      <PaymentList />
      </div>
    </div>
  );
}
