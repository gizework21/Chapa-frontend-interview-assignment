import { Role, User } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function login(
  username: string,
  password: string
): Promise<{ user: User; token: string } | null> {
  try {
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
    }
    const response = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error("Invalid credentials");
    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
}

export async function getUsers(): Promise<User[]> {
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
  }
  const response = await fetch(`${baseUrl}/api/users`);
  return response.json();
}

export async function toggleUserActive(id: string, isActive: boolean) {
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
  }
  const response = await fetch(`${baseUrl}/api/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isActive }),
  });
  return response.json();
}
