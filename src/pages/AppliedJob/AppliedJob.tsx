import React from "react";
import {
  FavSection,
  JobNav,
  Jobcard,
  Sidebar,
} from "../../components/components";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";

function AppliedJob() {
  const navigate = useNavigate();

  return (
    <>
      <>
        <div className="main-wrapper">
          <Sidebar></Sidebar>
          <div className="content-wrapper flex flex-col ">
            <div className="nav-section">
              <JobNav jobtype={{type:"Applied",name:"Jobs you've applied"}}></JobNav>
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
                  Applied
                </div>
              </div>
            </div>
            <div className="job-list flex flex-col ">
              {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
                <Jobcard job={{id:id}}></Jobcard>
              ))} */}
            </div>
          </div>
          <FavSection page="Company"></FavSection>
        </div>
        <BottomBar></BottomBar>
      </>
    </>
  );
}

export { AppliedJob };
