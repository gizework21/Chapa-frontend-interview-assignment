import { redirect } from "next/navigation";
import UserDashboard from "@/components/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import SuperAdminDashboard from "@/components/SuperAdminDashboard";
import ProfileMenuClient from "@/components/ProfileMenuClient";

interface Props {
  params: { role: string };
}

export default function DashboardPage({ params }: Props) {
  let DashboardComponent;

  switch (params.role?.toLowerCase()) {
    case "user":
      DashboardComponent = UserDashboard;
      break;
    case "admin":
      DashboardComponent = AdminDashboard;
      break;
    case "superadmin":
      DashboardComponent = SuperAdminDashboard;
      break;
    default:
      redirect("/"); // or return error UI
  }

  return (
    <div className="min-h-screen">
      <div className="flex justify-end p-4">
        <ProfileMenuClient />
      </div>
      <DashboardComponent />
    </div>
  );
}
