import React from "react";
import { FavSection, JobNav, Sidebar } from "../../components/components";
import unknown from "../../assets/unknown.png";
import { CiMail } from "react-icons/ci";

import "./UserDescriptionPage.css";
function UserDescriptionPage() {
  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="people-content-wrapper flex flex-col ">
          <div className="nav-section"></div>

          <JobNav jobtype={{ id: 1, type: "user" }}></JobNav>
          <div className="people-grid flex p-3  w-full ">
            <div className="intro-sec flex flex-col  w-full justify-center mt-5x items-center">
              <img
                src={unknown}
                className="rounded-full h-[5rem] w-[5rem] object-contain"
              />
              <div className="header-username font-medium">Username</div>
              <div className="header-username font-medium text-xs mt-2">
                FirstName LastName
              </div>

              <div className="header-email text-xs mt-3 flex items-center gap-1 justify-center">
                <CiMail />
                username@gmail.com
              </div>
              <div className="header-email text-xs color-lgt-grey mt-3 flex items-center gap-1 justify-center">
                Professional Experience of 5 years
              </div>
              <div className="job-skills mt-2 flex flex-wrap justify-center items-center w-[70%] mt-5 gap-[9px] text-black">
                {["Java", "Python", "JavaScript"].map((skill) => {
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
              Rippling is the first way for businesses to manage all of their
                HR & IT—payroll, benefits, computers, apps, and more—in one
                unified workforce platform. By connecting every business system
                to one source of truth for employee data, businesses can
                automate all of the manual work they normally need to do to make
                employee changes. Take onboarding, for example. With Rippling,
                you can just click a button and set up a new employees’ payroll,
                health insurance, work computer, and third-party apps—like
                Slack, Zoom, and Office 365—all within 90 seconds. Based in San
                Francisco, CA, Rippling has raised $1.2 Bn from the world’s top
                investors—including Kleiner Perkins, Founders Fund, Sequoia, and
                Bedrock—and was named one of America’s best startup employers by
                Forbes (#12 out of 500). Rippling is the first way for
                businesses to manage all of their HR & IT—payroll, benefits,
                computers, apps, and more—in one unified workforce platform. By
                connecting every business system to one source of truth for
                employee data, businesses can automate all of the manual work
                they normally need to do to make employee changes. Take
                onboarding, for example. With Rippling, you can just click a
                button and set up a new employees’ payroll, health insurance,
                work computer, and third-party apps—like Slack, Zoom, and Office
                365—all within 90 seconds. Based in San Francisco, CA, Rippling
                has raised $1.2 Bn from the world’s top investors—including
                Kleiner Perkins, Founders Fund, Sequoia, and Bedrock—and was
                named one of America’s best startup employers by Forbes (#12 out
                of 500).
              </div>
            </div>
          </div>
        </div>
        <FavSection page="Company"></FavSection>
      </div>
    </>
  );
}

export { UserDescriptionPage };
