import React, { useEffect } from "react";
import { FavSection, JobNav, Loader, Sidebar } from "../../components/components";
import unknown from "../../assets/unknown.png";
import { CiMail } from "react-icons/ci";

import "./UserDescriptionPage.css";

import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useParams } from "react-router-dom";
import { useJobSeekerState } from "../../store/JobSeekerStore";
function UserDescriptionPage() {
    const {username }=useParams()
  
    const {fetchSingleJobSeeker,jobSeeker,loader}=useJobSeekerState()
    useEffect(()=>{
      if(username!=null){fetchSingleJobSeeker(username)}
    },[])
    console.log(jobSeeker)
  return (
    <>
  
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="people-content-wrapper flex flex-col ">
          <div className="nav-section"></div>

          <JobNav jobtype={{type:"Single User",name:`${jobSeeker?.username}`}}></JobNav>
          {loader?
          <Loader></Loader>
          :<div className="people-grid flex p-3  w-full ">
            <div className="intro-sec flex flex-col  w-full justify-center mt-5x items-center">
              <img
                src={(jobSeeker?.profile_pic==null)?unknown:`${jobSeeker?.profile_pic}/`}
                className="rounded-full h-[5rem] w-[5rem] object-contain"
              />
              <div className="follow-username-sec flex items-center gap-5 ">
              <div className="header-username font-medium ">{jobSeeker?.username}</div>
              <div className="follow-btn text-xs  ps-2 pe-2 border-[1px] rounded border-solid cursor-pointer">
                      Follow
                    </div>
              </div>
              <div className="header-username font-medium text-xs mt-2">
                {jobSeeker?.firstname} {jobSeeker?.lastname}
              </div>

              <div className="header-email text-xs mt-3 flex items-center gap-1 justify-center">
                <CiMail />
                {jobSeeker?.email}
              </div>
              <div className="header-email text-xs color-lgt-grey mt-3 flex items-center gap-1 justify-center">
                Professional Experience of {jobSeeker?.no_of_years_experience} years
              </div>
              <div className="job-skills mt-2 flex flex-wrap justify-center items-center w-[70%] mt-5 gap-[9px] text-black">
                {jobSeeker?.skills.map((skill) => {
                  return (
                    <div className="skills text-[11px] font-light pe-2 ps-2  border-[0.1px]  border-solid rounded-[10px]">
                      {skill}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="about-sec flex flex-col justify-center mt-6 items-center">
              <div className="header-about text-xs">About Username</div>
              <div className="header-about-txt text-xs text-grey-100 text-justify ps-10 pe-10 pt-5 ">
              {jobSeeker?.description}
              </div>
            </div>
          </div>}
        </div>
        <FavSection page="Company"></FavSection>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { UserDescriptionPage };
