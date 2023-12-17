import React from 'react'
import { FavSection, JobNav, Sidebar } from '../../components/components';
import { CiMail } from 'react-icons/ci';
import unknown from "../../assets/placeholder-organization.png"
import { useNavigate } from 'react-router-dom';


function CompanyDescription() {
const navigate=useNavigate()
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
              <div className="header-username font-medium">Linkedin</div>
              <div className="header-username font-medium text-xs mt-2">
                Mumbai
              </div>

              <div className="header-email text-xs mt-3 flex items-center gap-1 justify-center">
                <CiMail />
                www.website.com
              </div>
              <div className="header-email text-xs color-lgt-grey mt-3 flex items-center gap-1 justify-center">
              Established in 1999
              </div>
              
            </div>
            <div className="about-sec flex flex-col justify-center mt-2 items-center">
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
                Forbes (#12 out of 500). 
              </div>
            </div>
            <div className="about-sec flex flex-col justify-center mt-2 items-center">
              <div className="header-about text-xs">Jobs</div>
              <div className="people-grid flex p-3  w-full ">
            {[2, 3, 4, 5, 7, 8, 9, 2.2, 23, 2, 32].slice(0,3).map((id) => (
              <>
                <div onClick={()=>{navigate(`/job/${id.toString()}`)}} className="job-box  min-w-10 max-w-11  w-[10.5rem] cursor-pointer flex flex-col  ps-3 pe-3  border-[1px]  border-solid border-[#c7c8c9] rounded-[10px]">
                  <div className="follow-container flex justify-between items-center ">
                    <div className="profile-pic  h-8 w-8 mt-2 overflow-hidden  rounded-full">
                      <img
                        className=" object-cover  h-8 "
                        src={unknown}
                      ></img>
                    </div>

                    
                  </div>

                  <div className="people-username text-xs mt-1">
                    Software dev
                  </div>
                  <div className="people-desc color-lgt-grey w-full text-[10px] pe-4 mb-1">
                  Full-time • ₹20L • 5Y experience • posted about 20hr ago
                  </div>
                </div>
              </>
            ))}
          </div>
            </div>
          </div>
        </div>
        <FavSection page="Company"></FavSection>
      </div>
        </>
    )
}

export {CompanyDescription}