import { redirect } from "next/navigation";
import { getUserFromStore } from "@/lib/auth-utils.ts";

export default async function Home() {
  const user = await getUserFromStore();

  if (user) {
    redirect(`/dashboard/${user.role.toLowerCase()}`);
  } else {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Redirecting...</p>
    </div>
  );
}
