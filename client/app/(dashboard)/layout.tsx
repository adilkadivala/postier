import DashNavbar from "@/components/dashboard-nav";
import Theme from "@/components/theme";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      {/* <DashNavbar />    */}
      <div className="w-100 h-100 flex">
        <aside className="border-r border-slate-400 w-1/6 h-[92vh]">
          <div className="flex flex-col items-center border-b border-slate-400 h-3/5">
            <Link href="/history">History</Link>
            <Link href="/schedule">Schedule</Link>
          </div>
          <div className="flex flex-col items-center h-2/5">
            <Theme />
          </div>
        </aside>
        <main className="w-5/6 p-5 h-[92vh] overflow-y-auto">{children}</main>
      </div>
    </>
  );
};

export default DashboardLayout;
