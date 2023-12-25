import React, { useEffect } from "react";
import { FavSection, JobNav, Sidebar,Loader } from "../../components/components";
import unknown from "../../assets/placeholder-organization.png";

import "./JobDescriptionPage.css";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useParams } from "react-router-dom";
import { useJobStore, useUserAuthStore } from "../../store/store";
import { formatTimestampToDDMonthYYYY } from "../../utils.ts/dateutils";

function JobDescriptionPage() {
  const { id } = useParams();
  const {user} =useUserAuthStore()
  const { jobPage, fetchSingleJob, loader ,applied, applyJob} = useJobStore();
  useEffect(() => {
    if (id != null) {
      fetchSingleJob(id);
    }
  }, []);
  const handleStatus=()=>{
    if(!applied){
      applyJob(user.userId,jobPage?.id)
    
    }
    fetchSingleJob(id)
  }
  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="people-content-wrapper flex flex-col ">
          <div className="nav-section"></div>
          <JobNav jobtype={{type:"Jobs",name:`Jobs at ${jobPage?.organization_name}`} }></JobNav>
          {loader ? (
            <Loader></Loader>
          ) : (
            <div className="desc-section flex flex w-full flex-col">
              <div className="job-desc-section p-7 flex flex-col w-full ">
                <div className="intro-sec  flex justify-between w-full items-center ">
                  {jobPage?.organization_profile_pic == "" ? (
                    <img
                      src={unknown}
                      className="rounded-full h-14 w-14 object-contain"
                    />
                  ) : (
                    <img
                      src={`https://jobcom-media-1.s3.amazonaws.com/${jobPage?.organization_profile_pic}`}
                      className="rounded-full h-14 w-14 object-contain"
                    />
                  )}
                  {user.userType==='jobseeker'&&<div onClick={handleStatus} className="follow-btn text-xs cursor-pointer hover:bg-[#22C35E] hover:text-[white] ps-2 pe-2 border-[1px] rounded border-solid border-black">
                    {applied?"Applied":"Apply"}
                  </div>}
                </div>

                <div className="role-name mt-5 text-[1rem]">{jobPage?.role}</div>
                <div className="role-name mt-2 text-xs color-lgt-grey">
                  At {jobPage?.organization_name} • {jobPage?.employee_type}
                </div>

                <div className="basic-desc flex mt-4 gap-3">
                  <div className="flex flex-col">
                    <div className="experience-sec">
                      <div className="primary-text color-lgt-grey">
                        Experience
                      </div>
                      <div className="text-xs">{jobPage?.required_experience} years</div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="experience-sec">
                      <div className="primary-text color-lgt-grey">Salary</div>
                      <div className="text-xs">{jobPage?.salary} lpa</div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="experience-sec">
                      <div className="primary-text color-lgt-grey">Type</div>
                      <div className="text-xs">{jobPage?.employee_type}</div>
                    </div>
                  </div>
                </div>
                <div className="time-posted text-xs color-lgt-grey mt-4">
                  Posted on <span className="text-black">{formatTimestampToDDMonthYYYY(jobPage?.created_at)}</span>
                </div>
              </div>
              <div className="skills-section p-7 flex flex-col w-full ">
                <div className="intro-sec  flex flex-col justify-between w-full  ">
                  <div className="Skill-list text-xs">Skills</div>
                  <div className="job-skills mt-2 flex flex-wrap items-center w-full gap-[9px] text-black">
                    {jobPage?.skills_required.map((skill) => {
                      return (
                        <div className="skills text-[11px] font-light pe-2 ps-2  border-[0.1px]  border-solid rounded-[10px]">
                          {skill}
                        </div>
                      );
                    })}
                    
                  </div>
                </div>
              </div>
              <div className="description-section ps-7 pe-7 pt-1 pb-2 flex flex-col">
                <div className="desc-header text-xs">
                  About this Opportunity
                </div>
                <div className="desc-text pt-4 text text-xs text-justify">
                  {jobPage?.job_description}
                </div>
              </div>
            </div>
          )}
        </div>
        <FavSection page="Company"></FavSection>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { JobDescriptionPage };
