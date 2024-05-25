import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";
import AddPaymentForm from "./components/AddPaymentForm";

export default function AddUserPage() {
  return (
    <div className="w-full flex flex-col gap-5">
      <PageHeader title="Add Payment" />
      <div className="bg-white p-5 shadow">
        <AddPaymentForm />
      </div>
    </div>
  );
}
