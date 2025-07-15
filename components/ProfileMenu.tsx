"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { User as UserIcon } from "lucide-react";
import { User } from "@/types";
import { useAuthStore } from "@/lib/store";

interface ProfileMenuProps {
  user: User;
}

export default function ProfileMenu({ user }: ProfileMenuProps) {
  const router = useRouter();
  const { logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => setOpen((prev) => !prev)}
      >
     {user.username}   <UserIcon className="h-5 w-5" />
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg border p-4 z-50">
          <p className="font-medium">username: {user.username}</p>
          <p className="text-sm text-gray-500 mb-3 capitalize">Role: {user.role}</p>
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
