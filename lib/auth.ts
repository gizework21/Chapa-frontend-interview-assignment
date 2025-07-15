import { Role, User } from "@/types";

export async function login(
  username: string,
  password: string,
  role: Role
): Promise<{ user: User; token: string } | null> {
  try {
    console.log(username, password, role);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      }
    );
    console.log(response);
    if (!response.ok) throw new Error("Invalid credentials");
    return await response.json();
  } catch {
    return null;
  }
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
  return response.json();
}

export async function toggleUserActive(id: string, isActive: boolean) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive }),
    }
  );
  return response.json();
}
