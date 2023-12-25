import { useEffect } from "react";
import { FavSection, JobNav, Sidebar } from "../../components/components";
import { CiMail } from "react-icons/ci";
import unknown from "../../assets/placeholder-organization.png";
import { useNavigate, useParams } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useOrganizationStore } from "../../store/OrganizationStore";
import { useJobStore } from "../../store/JobStore";
import { formatTimestampToDDMonthYYYY } from "../../utils.ts/dateutils";

function CompanyDescription() {
  const { organizationPage, fetchSingleOrganization } = useOrganizationStore();
  const { fetchJobs, jobList } = useJobStore();
  const navigate = useNavigate();
  const { username } = useParams();
  useEffect(() => {
    if (username != null) {
      fetchSingleOrganization(username).then((response:any)=>{
        fetchJobs({ organization__name: response.name})
      });
      
    }
  }, [username]);
  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="people-content-wrapper flex flex-col ">
          <div className="nav-section"></div>

          <JobNav
            jobtype={{ type: "Company Description", name: "Linkedin" }}
          ></JobNav>
          <div className="people-grid flex  p-3  w-full ">
            <div className="intro-sec flex flex-col  w-full  mt-5 items-center">
              <img
                src={
                  organizationPage?.profile_pic == null
                    ? unknown
                    : organizationPage.profile_pic
                }
                className="rounded-full h-[5rem] w-[5rem] object-contain"
              />
              <div className="header-username font-medium">
                {organizationPage?.name}
              </div>
              <div className="header-username font-medium text-xs mt-2">
                {organizationPage?.location}
              </div>

              <div  className="header-email text-xs mt-3 flex items-center gap-1 justify-center">
                <CiMail />
                {organizationPage?.website}
              </div>
              <div className="header-email text-xs color-lgt-grey mt-3 flex items-center gap-1 justify-center">
                Established in {organizationPage?.founded_at}
              </div>
            </div>
            <div className="about-sec flex flex-col items-center justify-center mt-2 ">
              <div className="header-about text-xs">
                About {organizationPage?.name.slice(0,10)}
              </div>
              <div className="header-about-txt text-xs text-grey-100 text-justify ps-10 pe-10 pt-5 ">
                {organizationPage?.overview}
              </div>
            </div>
            <div className="about-sec flex flex-col justify-center mt-2 items-center">
              <div className="header-about text-xs">{jobList.length>0?"Jobs":""}</div>
              <div className="people-grid flex p-3  w-full ">
                {jobList.slice(0, 3).map((job) => (
                  <>
                    <div
                      onClick={() => {
                        navigate(`/job/${job.id.toString()}`);
                      }}
                      className="job-box  min-w-10 max-w-11  w-[10.5rem] cursor-pointer flex flex-col  ps-3 pe-3  border-[1px]  border-solid border-[#c7c8c9] rounded-[10px]"
                    >
                      <div className="follow-container flex justify-between items-center ">
                        <div className="profile-pic  h-8 w-8 mt-2 overflow-hidden  rounded-full">
                          <img
                            className=" object-cover  h-8 "
                            src={
                              job.organization_profile_pic === null
                                ? unknown
                                : `https://jobcom-media-1.s3.amazonaws.com/${job.organization_profile_pic}`
                            }
                          ></img>
                        </div>
                      </div>

                      <div className="people-username text-xs mt-1">
                        {job.role}
                      </div>
                      <div className="people-desc color-lgt-grey w-full text-[10px] pe-4 mb-1">
                        {job.employee_type} • ₹{job.salary}L •{" "}
                        {job.required_experience}Y experience • posted on{" "}
                        {formatTimestampToDDMonthYYYY(job.created_at)}
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
      <BottomBar></BottomBar>
    </>
  );
}

export { CompanyDescription };
