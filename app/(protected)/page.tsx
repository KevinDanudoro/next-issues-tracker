// import { auth } from "@/auth";
import IssueBarChart from "./IssueBarChart";
import IssueCard from "./IssueCard";
import { axiosInstance } from "@/lib/axios";

export default async function Home() {
  const session = true;

  const issues = await axiosInstance.get("/issues");
  console.log(issues);

  return (
    <div className="grid grid-cols-12 grid-rows-[repeat(8,5rem)] gap-4">
      {/* {session?.user.role === "USER" ? ( */}
      {true ? (
        <>
          <IssueCard className="col-span-4 row-span-2" status="OPEN">
            <div className="flex justify-center items-center h-full">{}</div>
          </IssueCard>
          <IssueCard className="col-span-4 row-span-2" status="IN_PROGRESS">
            <div className="flex justify-center items-center h-full">Issue</div>
          </IssueCard>
          <IssueCard className="col-span-4 row-span-2" status="CLOSED">
            <div className="flex justify-center items-center h-full">Issue</div>
          </IssueCard>
          <IssueBarChart className="row-start-3 col-span-full row-span-4 p-4" />
        </>
      ) : (
        "aa"
      )}
    </div>
  );
}
