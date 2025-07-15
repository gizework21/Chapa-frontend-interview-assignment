"use client";

import { useAuthStore } from "@/lib/store";
import ProfileMenu from "@/components/ProfileMenu";

export default function ProfileMenuClient() {
  const { user } = useAuthStore();

  if (!user) return null;

  return <ProfileMenu user={user} />;
}
