import { auth } from "@/auth";
import IssueDashboard from "./IssueDashboard";
import UserDashboard from "./UserDashboard";

export const revalidate = 0;

export default async function Home() {
  const session = await auth();
  return (
    <div className="mb-8 space-y-4">
      <IssueDashboard />
      {session?.user.role === "ADMIN" && <UserDashboard />}
    </div>
  );
}
