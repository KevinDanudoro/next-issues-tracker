import { auth } from "@/auth";
import Card from "./Card";
import IssueDashboard from "./IssueDashboard";

export default async function Home() {
  const session = await auth();
  return (
    <div className="grid grid-cols-12 grid-rows-[auto_repeat(6,4rem)_auto_repeat(4,4rem)] gap-4">
      <IssueDashboard />
      {session?.user.role === "ADMIN" && <UserDashboard />}
    </div>
  );
}

const UserDashboard = async () => {
  return (
    <>
      <h1 className="col-span-full text-2xl font-semibold">User Dashboard</h1>
      <Card className="col-span-3 row-span-2 bg-red-200">User user</Card>
      <Card className="col-span-3 row-span-2 bg-red-200">User admin</Card>
    </>
  );
};
