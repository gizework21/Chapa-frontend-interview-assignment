import { NextRequest, NextResponse } from "next/server";
import users from "@/mocks/users.json";

export async function GET(req: NextRequest) {
  return NextResponse.json(users);
}
