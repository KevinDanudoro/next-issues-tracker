import { auth } from "@/auth";
import IssueDashboard from "./IssueDashboard";
import UserDashboard from "./UserDashboard";

export default async function Home() {
  const session = await auth();
  return (
    <div className="grid grid-cols-12 grid-rows-[auto_repeat(6,4rem)_auto_repeat(4,4rem)] gap-4 mb-8">
      <IssueDashboard />
      {session?.user.role === "ADMIN" && <UserDashboard />}
    </div>
  );
}
