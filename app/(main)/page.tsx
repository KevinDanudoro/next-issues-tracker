import { auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <form
      action={async () => {
        "use server";
        console.log("Logout");
        await signOut();
      }}
    >
      <button type="submit" className="bg-red-400 p-3">
        Logout
      </button>
      <p>{JSON.stringify(session)}</p>
    </form>
  );
}
