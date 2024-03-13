import {
  FavSection,
  JobNav,
  Sidebar,
  Loader,
} from "../../components/components";
import unknown from "../../assets/placeholder-organization.png";

import "./JobDescriptionPage.css";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useParams } from "react-router-dom";
import { useUserAuthStore } from "../../store/store";
import { formatTimestampToDDMonthYYYY } from "../../utils/dateutils";
import {
  useApplyJob,
  useFetchSingleJob,
  useFetchStatusOfApplication,
} from "../../hooks/useJobData";
import DevIcon from "../../components/Devicon/Devicon";

function JobDescriptionPage() {
  const { id } = useParams();
  const { user } = useUserAuthStore();
  const jobId = id ? id : "";
  const authUser = user.userName ? user.userName : "";
  const { mutate: applyJob,isLoading } = useApplyJob(jobId);
  const { data: applied, isLoading: applyLoading } =
    useFetchStatusOfApplication(jobId, authUser);
  const { data: jobPage, isLoading: jobloader } = useFetchSingleJob(jobId);

  const handleStatus = () => {
    if (!applied["has_applied"] && jobPage?.id) {
      applyJob(String(jobPage?.id));
    }
  };
  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="people-content-wrapper flex flex-col ">
          <div className="nav-section">
            <JobNav
              jobtype={{
                type: "Jobs",
                name: jobPage?.organization_name
                  ? `Jobs at ${jobPage?.organization_name}`
                  : "",
              }}
            ></JobNav>
          </div>
          {jobloader || applyLoading ? (
            <Loader message=""></Loader>
          ) : (
            <div className="desc-section scrollable-content max-sm:mb-[3.9rem]  flex flex w-full flex-col">
              <div className="job-desc-section p-7 flex flex-col w-full ">
                <div className="intro-sec  flex justify-between w-full items-center ">
                  {jobPage?.organization_profile_pic == "" 
                  ? (
                    <img
                      src={unknown}
                      className="rounded-full h-16 w-16 object-contain"
                    />
                  ) : (
                    <img
                      src={`https://res.cloudinary.com/dlkqz4nqp/image/upload/v1/${jobPage?.organization_profile_pic}`}
                      className="rounded-full h-16 w-16 object-contain"
                    />
                  )}
                  {user.userType === "jobseeker" && (
                    <div
                      onClick={handleStatus}
                      className="follow-btn text-[14px] cursor-pointer hover:bg-[#22C35E] hover:text-[white] ps-2 pe-2 border-[1px] rounded border-solid border-black"
                    >
                      {isLoading?"Loading":applied['has_applied'] ? "Applied" : "Apply"}
                    </div>
                  )}
                </div>

                <div className="role-name mt-5 text-[18px]">
                  {jobPage?.role}
                </div>
                <div className="role-name mt-2 text-[14px] color-lgt-grey">
                  At {jobPage?.organization_name} • {jobPage?.employee_type}
                </div>

                <div className="basic-desc flex mt-4 gap-3 ">
                  <div className="flex flex-col">
                    <div className="experience-sec">
                      <div className="primary-text color-lgt-grey ">
                        Experience
                      </div>
                      <div className="text-[14px]">
                        {jobPage?.required_experience} years
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="experience-sec">
                      <div className="primary-text text-[14px] color-lgt-grey">Salary</div>
                      <div className="text-[14px]">{jobPage?.salary} lpa</div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="experience-sec">
                      <div className="primary-text color-lgt-grey">Type</div>
                      <div className="text-[14px]">{jobPage?.employee_type}</div>
                    </div>
                  </div>
                </div>
                <div className="time-posted text-[14px] color-lgt-grey mt-4">
                  Posted on{" "}
                  <span className="text-black">
                    {formatTimestampToDDMonthYYYY(jobPage?.created_at)}
                  </span>
                </div>
              </div>
              <div className="skills-section p-7 flex flex-col w-full ">
                <div className="intro-sec  flex flex-col justify-between w-full  ">
                  <div className="Skill-list text-[14px]">Skills</div>
                  <div className="job-skills mt-2 flex flex-wrap items-center w-full gap-[9px] text-black">
                    {jobPage?.skills_required.map((skill) => {
                      return (
                        <div className="skills cursor-default flex items-center gap-1 pt-1 pb-1 text-[14px] font-light pe-2 ps-2  border-[0.1px]  border-solid rounded-[10px]">
                          <DevIcon skillName={skill}></DevIcon>
                          {skill}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="description-section ps-7 pe-7 pt-1 pb-2 flex flex-col">
                <div className="desc-header text-[14px]">
                  About this Opportunity
                </div>
                <div className="desc-text pt-4 text text-[13px] text-justify">
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
