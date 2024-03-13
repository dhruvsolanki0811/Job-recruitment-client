import {
  FavSection,
  JobNav,
  Loader,
  Sidebar,
} from "../../components/components";
import { CiMail } from "react-icons/ci";
import unknown from "../../assets/placeholder-organization.png";
import { useNavigate, useParams } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { formatTimestampToDDMonthYYYY } from "../../utils/dateutils";
import { useFetchOrganizationJobs } from "../../hooks/useJobData";
import { useFetchSingleOrganization } from "../../hooks/useOrganizationData";

function CompanyDescription() {
  const navigate = useNavigate();
  const { username } = useParams();
  const organizationName = username ? username : "";
  const { data: organizationPage, isLoading: organizationLoading } =
    useFetchSingleOrganization(organizationName);
    const OrgName=organizationPage?.name?organizationPage?.name:""
  const { data: jobList, isLoading: jobsLoading } =
    useFetchOrganizationJobs(OrgName);

  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="people-content-wrapper flex flex-col ">
          <div className="nav-section">
            <JobNav
              jobtype={{
                type: "Company Description",
                name: organizationPage?.name ? organizationPage?.name : "",
              }}
            ></JobNav>
          </div>
          {organizationLoading || jobsLoading ? (
            <Loader message=""></Loader>
          ) : (
            <div className="people-grid flex  p-3  w-full ">
              <div className="intro-sec flex flex-col  w-full  mt-5 items-center border-b-[1px] border-b-solid border-b-[#e1e4e8] ">
                <img
                  src={
                    organizationPage?.profile_pic == null
                      ? unknown
                      : organizationPage.profile_pic
                  }
                  className="rounded-full h-[5rem] w-[5rem] object-contain"
                />
                <div className="header-username font-medium text-[16px] mt-2">
                  {organizationPage?.name}
                </div>
                <div className="header-username font-medium text-[14px] mt-2">
                  {organizationPage?.location}
                </div>

                <div className="header-email text-[14px] mt-3 flex items-center gap-1 justify-center">
                  <CiMail />
                  {organizationPage?.website}
                </div>
                <div className="header-email text-[14px] color-lgt-grey mt-3 flex items-center gap-1 justify-center">
                  Established in {organizationPage?.founded_at}
                </div>
              </div>
              <div className="about-sec flex flex-col items-center justify-center mt-2 border-b-[1px] border-b-solid border-b-[#e1e4e8] ">
                <div className=" text-[14px]">
                  About {organizationPage?.name.slice(0, 10)}
                </div>
                <div className="header-about-txt text-[14px] text-grey-100 text-justify ps-7 pe-7 py-4 ">
                  {organizationPage?.overview}
                </div>
              </div>
              <div className="about-sec flex flex-col justify-center mt-2 items-center">
                <div className="header-about text-[14px]">
                  {jobList &&
                  jobList &&
                  organizationPage &&
                  jobList.filter(
                    (job) => job.organization_name == organizationPage.name
                  ).length > 0
                    ? "Jobs"
                    : ""}
                </div>
                <div className="people-grid flex p-3  w-full ">
                  {jobList &&
                    organizationPage &&
                    jobList
                      .filter(
                        (job) => job.organization_name == organizationPage.name
                      )
                      .slice(0, 3)
                      .map((job,key) => (
                        <div key={key}>
                          <div
                            onClick={() => {
                              navigate(`/job/${job.id.toString()}`);
                            }}
                            className="job-box  w-[17rem] cursor-pointer flex flex-col  ps-3 pe-3  border-[1px]  border-solid border-[#c7c8c9] rounded-[10px]"
                          >
                            <div className="follow-container flex justify-between items-center ">
                              <div className="profile-pic  h-[2.7rem] w-[2.7rem] mt-2 overflow-hidden  rounded-full">
                                <img
                                  className=" object-cover  h-full w-full"
                                  src={
                                    job.organization_profile_pic === null
                                      ? unknown
                                      : `https://res.cloudinary.com/dlkqz4nqp/image/upload/v1/${job.organization_profile_pic}`
                                  }
                                ></img>
                              </div>
                            </div>

                            <div className="people-username text-[14px] mt-1">
                              {job.role}
                            </div>
                            <div className="people-desc color-lgt-grey w-full text-[12px] pe-4 mb-1">
                              {job.employee_type} • ₹{job.salary}L •{" "}
                              {job.required_experience}Y experience • posted on{" "}
                              {formatTimestampToDDMonthYYYY(job.created_at)}
                            </div>
                          </div>
                        </div>
                      ))}
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

export { CompanyDescription };
