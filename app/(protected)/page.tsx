import axios from "axios";
import { auth } from "@/auth";
import { getAuthCookies } from "@/lib/cookies";
import {
  issuesSumarizeSchema,
  readIssueSchema,
} from "@/schema/validationSchema";
import IssueDonutChart from "./IssueDonutChart";
import IssueCard from "./IssueCard";
import LatestIssueTable from "./LatestIssueTable";
import IssueSumarize from "./IssueSumarize";

export default async function Home() {
  const session = await auth();

  const endpoints = ["/issues?latest=1", "/sumarize/issues"];
  const config = {
    baseURL: "http://localhost:3000/api",
    headers: {
      Cookie: getAuthCookies(),
    },
  };
  const [issues, issuesSumarize] = await axios.all(
    endpoints.map((endpoint) => axios.get(endpoint, config))
  );

  const validIssueSumarize = issuesSumarizeSchema.safeParse(
    issuesSumarize.data
  );
  if (!validIssueSumarize.success) throw validIssueSumarize.error.message;

  const validIssues = readIssueSchema.array().safeParse(issues.data);
  if (!validIssues.success) throw validIssues.error.message;

  return (
    <div className="grid grid-cols-12 grid-rows-[auto_repeat(6,4rem)] gap-4">
      <h1 className="col-span-full row-start-1 text-2xl font-semibold">
        Issue Dashboard
      </h1>
      {session?.user.role === "USER" ? (
        <>
          <IssueSumarize initialIssues={validIssueSumarize.data} />

          <IssueCard className="col-span-full row-span-3 p-6 sm:col-span-6 md:row-span-4">
            <IssueDonutChart
              className="h-full"
              initialIssues={validIssueSumarize.data}
            />
          </IssueCard>

          <IssueCard className="col-span-full row-span-3 block pb-4 overflow-hidden sm:col-span-6 md:row-span-4">
            <div className="px-6 border-b-2 border-gray-400 pt-4 pb-2">
              <h2 className="font-medium text-base">Latest Issues</h2>
            </div>
            <LatestIssueTable
              className="px-4 h-36 overflow-auto md:h-56"
              initialIssues={validIssues.data}
            />
          </IssueCard>
        </>
      ) : (
        "aa"
      )}
    </div>
  );
}
