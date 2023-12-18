import { useEffect } from "react";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import {
  FavSection,
  JobNav,
  Jobcard,
  Sidebar,
  Loader
} from "../../components/components";
import "./AllJobPage.css";
import { useNavigate } from "react-router-dom";
import {useJobStore} from "../../store/store"

function AllJobPage() {
  const navigate = useNavigate();
  const {jobList,fetchJobs,loader} =useJobStore()
  useEffect(()=>{
    fetchJobs()
  },[])
  console.log(jobList)
  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="content-wrapper flex flex-col ">
          <div className="nav-section">
            <JobNav jobtype={{type:"All Jobs",name:"Jobs"}}></JobNav>
            <div className="section-jobtype w-full h-7 ps-5 pe-5 flex">
              <div
                onClick={() => navigate("/")}
                className="jobtype-container cursor-pointer all-section primary-text flex justify-center"
              >
                Jobs
              </div>
              <div
                onClick={() => navigate("/applied")}
                className="jobtype-container cursor-pointer primary-text flex justify-center"
              >
                Applied
              </div>
            </div>
          </div>
         {loader?
        <Loader></Loader>
         : <div className="job-list flex flex-col ">
            {jobList.map((elem) => (
              <Jobcard job={elem}></Jobcard>
            ))}
          </div>}
        </div>
        <FavSection page="All Job"></FavSection>
      </div>
      <BottomBar />
      
    </>
  );
}

export { AllJobPage };
