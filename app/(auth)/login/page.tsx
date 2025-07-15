"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/lib/store";
import { login } from "@/lib/auth";
import Cookies from "js-cookie";
import Spinner from "@/components/Spinner";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const { login: setLogin } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);

    const result = await login(values.username, values.password);
    console.log(result);

    if (result) {
      setLogin(result.user, result.token);

      Cookies.set(
        "token",
        `${result.token}-${result.user.id}-${result.user.role}`
      );
      const role = result.user.role.toLowerCase();
      router.push(`/dashboard/${role}`);
    } else {
      setError("Invalid credentials");
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Login</h1>

        {/* Example user credentials */}
        <div className="mb-6 rounded-md bg-gray-50 p-4 text-sm text-gray-700 border">
          <p className="font-semibold mb-2">
            Example credentials: username\password
          </p>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              <span className="font-medium">User</span> — <b>user1</b> /{" "}
              <b>1</b>
            </li>
            <li>
              <span className="font-medium">Admin</span> — <b>admin1</b> /{" "}
              <b>admin123</b>
            </li>
            <li>
              <span className="font-medium">SuperAdmin</span> —{" "}
              <b>superadmin1</b> / <b>super123</b>
            </li>
          </ul>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner />
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
