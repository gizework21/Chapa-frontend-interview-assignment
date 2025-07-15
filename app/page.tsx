"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store";

export default function Home() {
  const router = useRouter();
  const { user } = useAuthStore();


  useEffect(() => {
    if (user) {
      router.push(`/dashboard/${user.role.toLowerCase()}`);
    } else {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Redirecting...</p>
    </div>
  );
}
