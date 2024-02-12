// import { auth } from "@/auth";
import axios from "axios";
import { auth } from "@/auth";
import { getAuthCookies } from "@/lib/cookies";
import { issuesSumarizeSchema } from "@/schema/validationSchema";
import IssueDonutChart from "./IssueDonutChart";
import IssueCard from "./IssueCard";

export default async function Home() {
  const session = await auth();

  const issuesSumarize = await axios.get("/sumarize/issues", {
    baseURL: "http://localhost:3000/api",
    headers: {
      Cookie: getAuthCookies(),
    },
  });

  const validIssueSumarize = issuesSumarizeSchema.safeParse(
    issuesSumarize.data
  );
  if (!validIssueSumarize.success) throw validIssueSumarize.error.message;

  return (
    <div className="grid grid-cols-12 grid-rows-[repeat(8,4rem)] gap-4">
      {session?.user.role === "USER" ? (
        <>
          {validIssueSumarize.data.sumarize.map((issue) => (
            <IssueCard
              key={issue.name}
              className="col-span-4 row-span-2"
              status={issue.name}
            >
              <div className="flex justify-center items-center h-full">
                {issue._count._all}
              </div>
            </IssueCard>
          ))}

          <IssueCard className="row-start-3 col-span-full row-span-4 px-6 flex items-center justify-between space-x-8">
            <IssueDonutChart
              className="h-full"
              issues={validIssueSumarize.data}
            />
          </IssueCard>
        </>
      ) : (
        "aa"
      )}
    </div>
  );
}
