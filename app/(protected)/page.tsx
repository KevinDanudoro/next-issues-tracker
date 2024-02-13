import axios from "axios";
import { auth } from "@/auth";
import { getAuthCookies } from "@/lib/cookies";
import { issuesSumarizeSchema } from "@/schema/validationSchema";
import IssueDonutChart from "./IssueDonutChart";
import IssueCard from "./IssueCard";
import IssueCardBadge from "./IssueCardBadge";
import LatestIssueTable from "./LatestIssueTable";

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
    <div className="grid grid-cols-12 grid-rows-[auto_repeat(7,4rem)] gap-4">
      <h1 className="col-span-full row-start-1 text-2xl font-semibold">
        Issue Dashboard
      </h1>
      {session?.user.role === "USER" ? (
        <>
          {validIssueSumarize.data.sumarize.map((issue) => (
            <IssueCard
              key={issue.name}
              className="col-span-4 row-span-2 flex flex-col gap-y-2 md:flex-row md:gap-x-4 md:px-4"
            >
              <IssueCardBadge
                status={issue.name}
                className="min-w-16 min-h-16 text-lg"
              >
                {issue._count._all}
              </IssueCardBadge>
              <p className="capitalize text-sm w-fit text-center md:text-left">
                <span className="font-semibold text-base md:text-lg block">
                  Issues{" "}
                </span>
                {issue._count._all > 1 ? "are " : "is "}
                {issue.name.toLowerCase().replaceAll("_", " ")}
              </p>
            </IssueCard>
          ))}

          <IssueCard className="col-span-6 row-span-3 p-6">
            <IssueDonutChart
              className="h-full"
              issues={validIssueSumarize.data}
            />
          </IssueCard>

          <IssueCard className="col-span-6 row-span-3 block pb-4 overflow-hidden">
            <div className="px-6 border-b-2 border-gray-400 pt-4 pb-2">
              <h2 className="font-medium text-base">Latest Issues</h2>
            </div>
            <LatestIssueTable className="px-4 h-36 overflow-auto" />
          </IssueCard>
        </>
      ) : (
        "aa"
      )}
    </div>
  );
}
