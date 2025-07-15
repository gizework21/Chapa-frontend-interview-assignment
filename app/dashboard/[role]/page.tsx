"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import UserDashboard from "@/components/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import SuperAdminDashboard from "@/components/SuperAdminDashboard";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

export default function DashboardPage() {
  const params = useParams<{ role: string }>();

  const { user, logout } = useAuthStore();
  const router = useRouter();

  const renderDashboard = () => {
    switch (params.role.toLowerCase()) {
      case "user":
        return <UserDashboard />;
      case "admin":
        return <AdminDashboard />;
      case "superadmin":
        return <SuperAdminDashboard />;
      default:
        return <div>Invalid Role</div>;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-end p-4">
        <Button
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </div>
      {renderDashboard()}
    </div>
  );
}
