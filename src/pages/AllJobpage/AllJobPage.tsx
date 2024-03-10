import { BottomBar } from "../../components/BottomBar/BottomBar";
import {
  FavSection,
  JobNav,
  Jobcard,
  Sidebar,
  Loader,
} from "../../components/components";
import "./AllJobPage.css";
import { useNavigate } from "react-router-dom";
import {  useUserAuthStore } from "../../store/store";
import { useFetchAllJobs } from "../../hooks/useJobData";
import { isFilterApplied } from "../../utils/filterutils";
import { useFilterStore } from "../../store/FilterStore";
import { useEffect } from "react";

function AllJobPage() {
  const navigate = useNavigate();
  const {filters,setfilteredJobs,filteredJobs}=useFilterStore()
  const { data: jobLists, isLoading: jobloader } = useFetchAllJobs();
  useEffect(()=>{
    if(jobLists){
      setfilteredJobs(jobLists)
    }
    
  },[jobloader,isFilterApplied(filters)])
  const { user } = useUserAuthStore();
  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="content-wrapper flex flex-col ">
          <div className="nav-section">
            <JobNav jobtype={{ type: "All Jobs", name: "Jobs" }}></JobNav>
            <div className="section-jobtype w-full h-9 ps-5 pe-5 flex ">
              <div
                onClick={() => navigate("/")}
                className="jobtype-container cursor-pointer all-section primary-text flex justify-center items-center"
              >
                Jobs
              </div>
              <div
                onClick={() =>
                  navigate(
                    `${
                      user.userType === "organization"
                        ? "/jobposted"
                        : "/applied"
                    }`
                  )
                }
                className="jobtype-container cursor-pointer primary-text flex justify-center  items-center"
              >
                {user.userType === "organization" ? "Job Posted" : "Applied"}
              </div>
            </div>
          </div>
          { jobloader  ? (
            <Loader></Loader>
          ) : 
          filteredJobs ? (
            <div className="job-list scrollable-content flex flex-col ">
              {filteredJobs ?.map((elem) => (
                <Jobcard job={elem}></Jobcard>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
        <FavSection page="All Job"></FavSection>
      </div>
      <BottomBar />
    </>
  );
}

export { AllJobPage };
