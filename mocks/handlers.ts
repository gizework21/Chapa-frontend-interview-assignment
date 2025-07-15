import { http, HttpResponse } from "msw";
import users from "./users.json"; // Should be an array of User objects
import { User, Transaction } from "@/lib/types";

// In-memory store for demo purposes
const transactions: Transaction[] = [
  { id: 1, recipient: "Alice", amount: 100, date: "2025-07-01" },
  { id: 2, recipient: "Bob", amount: 200, date: "2025-07-02" },
];

// Login Handler
export const handlers = [
  http.post("/api/login", async ({ request }) => {
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };
    console.log(username, password);
    console.log(users);
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
  http.get("/api/users", () => {
    const res =  HttpResponse.json(users);
    console.log("Users fetched:", res);
    return res;
  }),
   http.get('/api/userdata', () => {
    return HttpResponse.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  }),

  http.patch("/api/users/:id", async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as { isActive: boolean };
    const user = users.find((u) => Number(u.id) === Number(id));
    if (!user) {
      return new HttpResponse("User not found", { status: 404 });
    }
    user.isActive = body.isActive;
    return HttpResponse.json(user);
  }),

  // Transactions
  http.get("/api/transactions", () => {
    return HttpResponse.json(transactions);
  }),

  http.post("/api/transactions", async ({ request }) => {
    const data = await request.json();
    const transaction = {
      id: transactions.length + 1,
      ...(typeof data === "object" && data !== null ? data : {}),
      date: new Date().toISOString().split("T")[0],
    };
    transactions.push(transaction as Transaction);
    return HttpResponse.json(transaction);
  }),

  // Admin Creation (mock)
  // http.post('/api/admins', async ({ request }) => {
  //   const data = await request.json();
  //   if (typeof data !== 'object' || data === null) {
  //     return HttpResponse.json({ error: 'Invalid request body' }, { status: 400 });
  //   }
  //   const admin: User = {
  //     id: users.length + 1,
  //     username: (data as Record<string, any>).username ?? '',
  //     password: (data as Record<string, any>).password ?? '',
  //     role: (data as Record<string, any>).role ?? 'admin',
  //     active: true,
  //     // Add any other required User properties here
  //   };
  //   users.push(admin);
  //   return HttpResponse.json(admin);
  // }),

  // Statistics
  http.get("/api/stats", () => {
    return HttpResponse.json({
      totalPayments: transactions.reduce((sum, t) => sum + t.amount, 0),
      activeUsers: users.filter((u) => u.isActive).length,
    });
  }),
];
