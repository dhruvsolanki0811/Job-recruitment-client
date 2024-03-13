import {
  FavSection,
  JobNav,
  Jobcard,
  Loader,
  Sidebar,
} from "../../components/components";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useUserAuthStore } from "../../store/store";
import { useFetchAppliedJob } from "../../hooks/useJobData";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";

function AppliedJob() {
  const { user } = useUserAuthStore();
  const username = user.userName ? user.userName : "";
  const { data: jobList, isLoading: loader } = useFetchAppliedJob(username);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // Handler for search input change
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const filteredJobs = jobList
    ? jobList.filter((job) => {
        return (
          job.role.toLowerCase().includes(search.toLowerCase()) ||
          job.employee_type.toLowerCase().includes(search.toLowerCase())
        );
      })
    : [];
  return (
    <>
      <>
        <div className="main-wrapper">
          <Sidebar></Sidebar>

          <div className="content-wrapper flex flex-col ">
            <div className="nav-section">
              <JobNav
                jobtype={{ type: "Applied", name: "Jobs you've applied" }}
              ></JobNav>
              <div className="search-section w-full h-19 ps-5 pt-3 pb-3 pe-5  ">
              <div className="input-search-container w-full flex justify-center items-center roundedfull ps-1 pe-1 ">
                <input
                  type="text"
                  placeholder="Search"
                  className="search-box"
                  value={search}
                  onChange={handleSearchInput}
                />
                <CiSearch className="cursor-pointer"></CiSearch>
              </div>
              </div>
              <div className="section-jobtype w-full h-9 ps-5 pe-5 flex">
                <div
                  onClick={() => navigate("/")}
                  className="jobtype-container  cursor-pointer primary-text flex justify-center h-full items-center "
                >
                  Jobs
                </div>
                <div
                  onClick={() => navigate("/applied")}
                  className="jobtype-container all-section cursor-pointer primary-text flex justify-center h-full items-center"
                >
                  {user.userType === "organization" ? "Job Posted" : "Applied"}
                </div>
              </div>
            </div>
            {loader ? (
              <Loader></Loader>
            ) : (
              <div className="job-list scrollable-content max-sm:mb-[3.9rem]  flex flex-col ">
                {jobList &&
                  filteredJobs.map((job, key) => (
                    <Jobcard key={key} job={job}></Jobcard>
                  ))}
              </div>
            )}
          </div>
          <FavSection page="Company"></FavSection>
        </div>
        <BottomBar></BottomBar>
      </>
    </>
  );
}

export { AppliedJob };
