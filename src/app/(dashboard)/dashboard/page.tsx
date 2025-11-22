import Btn from "@/components/button/btn";
import DashboardStats from "@/components/ui/dashboardStats";
import JobCard from "@/components/ui/jobCards";
import NotificationCard from "@/components/ui/notificationCard";
import Title from "@/components/ui/title";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  company: string;
  type: string;
  location: string;
  date: string;
  salary: string;
}
export default function Dashboard() {
  const jobs: Job[] = [
    {
      id: 1,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
    },
    {
      id: 2,
      title: "Surgeon",
      company: "Edoubleone Company",
      type: "Full-Time",
      location: "Remote, USA",
      date: "2 days ago",
      salary: "$50.00 – $70.00",
    },
  ];
  return (
    <div className="px-4 dm-font leading-[100%]">
      <Title text="DashBoard" />
      <div>
        <DashboardStats />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[10px] my-4">
        {/* Left Section */}
        <div className="lg:col-span-2 col-span-1 space-y-10 bg-white p-4 rounded-[16px] border-[1px] border-[var(--black-white-200)]">
          {/* Recommended Jobs */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-[600] text-[var(--black-white-1000)]">
                Recommended Jobs
              </h2>
              <button className="font-[500] text-[16px] text-[var(--primary-1200)]">
                See all
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  hideIcon={false}
                  icon={true}
                  hideText={true}
                />
              ))}
            </div>
          </div>

          {/* Saved Jobs */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-[600] text-[var(--black-white-1000)]">
                Saved Jobs
              </h2>
              <button className="font-[500] text-[16px] text-[var(--primary-1200)]">
                See all
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  hideIcon={false}
                  icon={true}
                  hideText={true}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 bg-white p-4 rounded-[16px] border-[1px] border-[var(--black-white-200)]">
          <h2 className="text-[18px] font-[600] text-[var(--black-white-1000)]">
            Notifications
          </h2>

          <div className="space-y-3">
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
          </div>

          {/* Help Card */}
          <div className="p-5 bg-[#f9f9f9] rounded-[16px] border-[1px] border-[var(--black-white-200)] mt-2">
            <h3 className="text-[var(--black-white-10000)] text-[16px] font-[700] mb-2">
              Do you need help in your job application?
            </h3>
            <p className="text-[var(--black-white-10000)] text-[16px] font-[400] ">
              Check out our YouTube videos for tips that would help you land
              your dream job today!
            </p>
            <div className="mt-3 space-y-2">
              <Btn
                className="h-[40px] w-full bg-[var(--primary-1200)] hover:bg-[#078e63] text-white rounded-[20px] text-[16px]"
                text="Yes,I do"
              />
              <Btn
                className="h-[40px] w-full bg-transparent text-[var(--primary-1200)] hover:text-[#078e63] border-[1px] border-[var(--primary-1200)] rounded-[20px] text-[16px]"
                text="No, I don’t"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
