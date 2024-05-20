import PageHeader from "@/components/headers/PageHeaderleanq_support_coordinator";
import AddClassForm from "./components/AddClassForm";

export default function AddUserPage() {
  return (
    <div className="w-full flex flex-col gap-5">
      <PageHeader title="Add Class" />
      <div className="bg-white p-5 shadow">
        <AddClassForm />
      </div>
    </div>
  );
}
