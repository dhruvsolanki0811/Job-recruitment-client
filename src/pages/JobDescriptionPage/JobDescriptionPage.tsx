import React from "react";
import { FavSection, JobNav, Sidebar } from "../../components/components";
import unknown from "../../assets/placeholder-organization.png";

import "./JobDescriptionPage.css";
function JobDescriptionPage() {
  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="people-content-wrapper flex flex-col ">
          <div className="nav-section"></div>
          <JobNav jobtype={{ id: 1, type: "jobs" }}></JobNav>
          <div className="desc-section flex flex w-full flex-col">
            <div className="job-desc-section p-7 flex flex-col w-full ">
              <div className="intro-sec  flex justify-between w-full items-center ">
                <img
                  src={unknown}
                  className="rounded-full h-14 w-14 object-contain"
                />
                <div className="follow-btn text-xs cursor-pointer hover:bg-white ps-2 pe-2 border-[1px] rounded border-solid border-black">
                  Apply
                </div>
              </div>

              <div className="role-name mt-5 text-[1rem]">Software Dev</div>
              <div className="role-name mt-2 text-xs color-lgt-grey">
                At Linkedin • Full-time
              </div>

              <div className="basic-desc flex mt-4 gap-3">
                <div className="flex flex-col">
                  <div className="experience-sec">
                    <div className="primary-text color-lgt-grey">
                      Experience
                    </div>
                    <div className="text-xs">5 years</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="experience-sec">
                    <div className="primary-text color-lgt-grey">Salary</div>
                    <div className="text-xs">5 lpa</div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="experience-sec">
                    <div className="primary-text color-lgt-grey">Type</div>
                    <div className="text-xs">Full Time</div>
                  </div>
                </div>
              </div>
              <div className="time-posted text-xs color-lgt-grey mt-4">
                Posted on <span className="text-black">23rd December</span>
              </div>
            </div>
            <div className="skills-section p-7 flex flex-col w-full ">
              <div className="intro-sec  flex flex-col justify-between w-full  ">
                <div className="Skill-list text-xs">Skills</div>
                <div className="job-skills mt-2 flex flex-wrap items-center w-full gap-[9px] text-black">
                  {["Java", "Python", "JavaScript"].map((skill) => {
                    return (
                      <div className="skills text-[11px] font-light pe-2 ps-2  border-[0.1px]  border-solid rounded-[10px]">
                        {skill}
                      </div>
                    );
                  })}
                  <div className="skills text-[11px] font-light pe-2 ps-2  border-[0.1px]  border-solid rounded-[10px]">
                    +2
                  </div>
                </div>
              </div>
            </div>
            <div className="description-section ps-7 pe-7 pt-1 pb-2 flex flex-col">
              <div className="desc-header text-xs">
                About this Opportunity
              </div>
              <div className="desc-text pt-4 text text-xs text-justify">
              Rippling is the first way for businesses to manage all of their HR & IT—payroll, benefits, computers, apps, and more—in one unified workforce platform.

By connecting every business system to one source of truth for employee data, businesses can automate all of the manual work they normally need to do to make employee changes. Take onboarding, for example. With Rippling, you can just click a button and set up a new employees’ payroll, health insurance, work computer, and third-party apps—like Slack, Zoom, and Office 365—all within 90 seconds.

Based in San Francisco, CA, Rippling has raised $1.2 Bn from the world’s top investors—including Kleiner Perkins, Founders Fund, Sequoia, and Bedrock—and was named one of America’s best startup employers by Forbes (#12 out of 500).
Rippling is the first way for businesses to manage all of their HR & IT—payroll, benefits, computers, apps, and more—in one unified workforce platform.

By connecting every business system to one source of truth for employee data, businesses can automate all of the manual work they normally need to do to make employee changes. Take onboarding, for example. With Rippling, you can just click a button and set up a new employees’ payroll, health insurance, work computer, and third-party apps—like Slack, Zoom, and Office 365—all within 90 seconds.

Based in San Francisco, CA, Rippling has raised $1.2 Bn from the world’s top investors—including Kleiner Perkins, Founders Fund, Sequoia, and Bedrock—and was named one of America’s best startup employers by Forbes (#12 out of 500).
              </div>

            </div>
          </div>
        </div>
        <FavSection page="Company"></FavSection>
      </div>
    </>
  );
}

export { JobDescriptionPage };
