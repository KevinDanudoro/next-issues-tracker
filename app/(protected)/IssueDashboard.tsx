import IssueSumarize from "./IssueSumarize";
import IssueDonutChart from "./IssueDonutChart";
import axios from "axios";
import {
  issuesSumarizeSchema,
  readIssueSchema,
} from "@/schema/validationSchema";
import LatestIssueTable from "./LatestIssueTable";
import axiosServer from "@/lib/axios-server";
import React from "react";
import Card from "./Card";

interface IssueDashboardProps {}

const IssueDashboard: React.FC<IssueDashboardProps> = async ({}) => {
  const endpoints = ["/issues?latest=1", "/issues/sumarize"];
  const [issues, issuesSumarize] = await axios.all(
    endpoints.map((endpoint) => axiosServer.get(endpoint))
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
      <IssueSumarize initialIssues={validIssueSumarize.data} />

      <Card className="col-span-full row-span-3 p-6 sm:col-span-6 md:row-span-4">
        <IssueDonutChart
          className="h-full flex flex-col items-center justify-between lg:flex-row lg:justify-center"
          initialIssues={validIssueSumarize.data}
        />
      </Card>

      <Card className="col-span-full row-span-3 block pb-4 overflow-hidden sm:col-span-6 md:row-span-4">
        <div className="px-6 border-b-2 border-gray-400 pt-4 pb-2">
          <h2 className="font-medium text-base">Latest Issues</h2>
        </div>
        <LatestIssueTable
          className="px-4 h-auto overflow-auto md:h-56"
          initialIssues={validIssues.data}
        />
      </Card>
    </div>
  );
};

export default IssueDashboard;
