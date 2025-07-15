import { http, HttpResponse } from "msw";
import users from "./users.json"; // Should be an array of User objects
import { User, Transaction } from "@/lib/types";


// Login Handler
export const handlers = [
  http.post(`${process.env.next_public_base_url || ''}/api/login`, async ({ request }) => {
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!user) {
      return HttpResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    return HttpResponse.json({
      user,
      token: `mock-token-${user.id}`,
    });
  }),

  // Users
  http.get(`${process.env.next_public_base_url || ''}/api/users`, () => {
    const res =HttpResponse.json(users);
    console.log("Users fetched:", res);
    return res;
  }),

  http.patch(`${process.env.next_public_base_url || ''}/api/users/:id`, async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as { isActive: boolean };
    const user = users.find((u) => Number(u.id) === Number(id));
    if (!user) {
      return new HttpResponse("User not found", { status: 404 });
    }
    user.isActive = body.isActive;
    return HttpResponse.json(user);
  }),

];
