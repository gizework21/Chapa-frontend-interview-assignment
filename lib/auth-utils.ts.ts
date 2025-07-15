// lib/auth-utils.ts

import { cookies } from "next/headers";

export async function getUserFromStore() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  if (!token) {
    return null;
  }

  return {
    id: "1",
    name: "John Doe",
    role: "User",
  };
}
