import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <p>{JSON.stringify(session)}</p>
    </div>
  );
}
