import React, { useEffect } from "react";
import {
  FavSection,
  JobNav,
  Jobcard,
  Loader,
  Sidebar,
} from "../../components/components";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useUserAuthStore, useJobStore } from "../../store/store";

function AppliedJob() {
  const { user } = useUserAuthStore();
  const { jobList, fetchAppliedJob, jobPostedbyOrg, loader } = useJobStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.userType == "jobseeker") {
      fetchAppliedJob(user.userName);
    } else {
      jobPostedbyOrg(user.userName);
    }
  }, []);
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
              <div className="section-jobtype w-full h-7 ps-5 pe-5 flex">
                <div
                  onClick={() => navigate("/")}
                  className="jobtype-container  cursor-pointer primary-text flex justify-center"
                >
                  Jobs
                </div>
                <div
                  onClick={() => navigate("/applied")}
                  className="jobtype-container all-section cursor-pointer primary-text flex justify-center"
                >
                  {user.userType === "organization" ? "Job Posted" : "Applied"}
                </div>
              </div>
            </div>
            {loader ?
          <Loader></Loader> :<div className="job-list flex flex-col ">
              {jobList.map((job) => (
                <Jobcard job={job}></Jobcard>
              ))}
            </div>}
          </div>
          <FavSection page="Company"></FavSection>
        </div>
        <BottomBar></BottomBar>
      </>
    </>
  );
}

export { AppliedJob };
