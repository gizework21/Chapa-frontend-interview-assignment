import { NextRequest, NextResponse } from "next/server"; // Remove 'type' from import
import users from "@/mocks/users.json";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({
    user,
    token: `mock-token-${user.id}`,
  });
}