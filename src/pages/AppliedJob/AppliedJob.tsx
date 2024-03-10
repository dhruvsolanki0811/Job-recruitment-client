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

function AppliedJob() {
  const { user } = useUserAuthStore();
  const username=user.userName?user.userName:""
  const {data:jobList,isLoading:loader}=useFetchAppliedJob(username)
  const navigate = useNavigate();
  
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
            {loader ?
          <Loader></Loader> :<div className="job-list scrollable-content mb-[3.9rem]  flex flex-col ">
              {jobList && jobList.map((job) => (
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
