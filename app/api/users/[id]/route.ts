import { NextRequest, NextResponse } from "next/server";
import users from "@/mocks/users.json";

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await req.json();

  const user = users.find((u) => Number(u.id) === Number(id));

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  user.isActive = body.isActive;
  return NextResponse.json(user);
}

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  const user = users.find((u) => Number(u.id) === Number(id));

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
