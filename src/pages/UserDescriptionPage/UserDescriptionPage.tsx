import {
  FavSection,
  JobNav,
  Loader,
  Sidebar,
} from "../../components/components";
import unknown from "../../assets/unknown.png";

import "./UserDescriptionPage.css";

import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useParams } from "react-router-dom";
import { useUserAuthStore } from "../../store/store";
import { useFetchSingleJobSeeker } from "../../hooks/useJobseekerData";
import {
  useCreateConnection,
  useFetchConnectionStatus,
  useHandleRejection,
} from "../../hooks/useConnectionsData";
import DevIcon from "../../components/Devicon/Devicon";
import { CiMail } from "react-icons/ci";
import { useState } from "react";
import ProjectModal from "../../components/ProjectModal/ProjectModal";
import { useFetchProjectByUser } from "../../hooks/useProjectData";
import { Project } from "../../types/types";
import { useFetchExperienceByUser } from "../../hooks/useExperienceData";

function UserDescriptionPage() {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [currProject, setCurrProject] = useState<Project>({} as Project);

  const projectModalClose = () => {
    setCurrProject({} as Project);
    setProjectModalOpen(false);
  };
  const { username } = useParams();
  const { user } = useUserAuthStore();
  const userName = username ? username : "";
  const { data: jobSeeker, isLoading: loader } =
    useFetchSingleJobSeeker(userName);
  const { data: projects, isLoading: projectLoading } =
    useFetchProjectByUser(userName);
  const { data: experiences, isLoading: isExperienceLoading } =
    useFetchExperienceByUser(userName);
  const currUser = user.userName ? user.userName : "";

  const {
    data: status,
    isLoading: statusLoading,
    isFetching,
  } = useFetchConnectionStatus(currUser, userName);

  const { mutate: handleReject, isLoading: rejecting } =
    useHandleRejection(userName);
  const userID = jobSeeker?.id ? String(jobSeeker.id) : "";
  const { mutate: sendRequets, isLoading: sending } = useCreateConnection(
    userID,
    userName
  );

  const handleRequest = async (e: React.MouseEvent<HTMLDivElement>) => {
    let type = e.currentTarget.innerText; // Use 'currentTarget' instead of 'target
    if (type === "Follow") {
      sendRequets();
    } else if (type === "Requested" || type === "Connected") {
      handleReject(String(jobSeeker?.id));
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
                type: "Single User",
                name: jobSeeker?.username ? `${jobSeeker?.username}` : "",
              }}
            ></JobNav>
          </div>
          {loader ? (
            <Loader></Loader>
          ) : (
            <div className="people-grid scrollable-content mb-[3.9rem]  flex p-3  w-full ">
              <div className="intro-sec border-b-[1px] border-b-solid border-b-[#e1e4e8] flex flex-col  w-full justify-center mt-5 items-center">
                <div className="image-container flex justify-center items-center h-[5rem] w-[5rem] border-[2px] border-solid border-[#22C55E] p-[1px]">
                  <img
                    src={
                      jobSeeker?.profile_pic == null
                        ? unknown
                        : `${jobSeeker?.profile_pic}`
                    }
                    className="h-full w-full  object-cover "
                  />
                </div>
                <div className="follow-username-sec flex items-center justify-center gap-2 mt-2">
                  <div className="header-username  ">
                    @{jobSeeker?.username}
                  </div>
                  {user.userId && user.userType == "jobseeker" && (
                    <div
                      onClick={handleRequest}
                      className="follow-btn text-xs  ps-2 pe-2 border-[1px] rounded border-solid cursor-pointer hover:bg-[#22C55E] hover:text-[white]"
                    >
                      {rejecting || sending || statusLoading || isFetching
                        ? "Loading"
                        : status?.connection_status
                        ? status.connection_status == "accepted"
                          ? "Connected"
                          : status.connection_status == "pending"
                          ? "Pending"
                          : status.connection_status
                        : "Follow"}
                    </div>
                  )}
                </div>
                <div className="header-username font-medium text-[16px] mt-2">
                  {jobSeeker?.firstname} {jobSeeker?.lastname}
                </div>
                <div className="header-email text-[13px] mt-3 flex items-center gap-1 justify-center">
                  <CiMail />
                  {jobSeeker?.email}
                </div>
                <div className="header-email text-[13px] color-lgt-grey mt-3 flex items-center gap-1 justify-center">
                  Professional Experience :{" "}
                  {jobSeeker?.no_of_years_experience === 0
                    ? "Fresher"
                    : `of ${jobSeeker?.no_of_years_experience} years`}
                </div>
                <div className="job-skills mt-2 flex flex-wrap justify-center items-center w-[70%] mt-5 gap-[9px] text-black">
                  {jobSeeker?.skills.map((skill) => {
                    return (
                      <div className="skills flex items-center gap-1 text-[14px] font-light pe-2 ps-2  border-[0.1px]  border-solid rounded-[10px]">
                        <DevIcon skillName={skill}></DevIcon>
                        {skill}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="about-sec pb-3 border-b-[1px] border-b-solid border-b-[#e1e4e8] flex flex-col justify-center mt-2 items-center">
                <div className="header-about text-[14px]">
                  About {jobSeeker?.firstname} {jobSeeker?.lastname}
                </div>
                <div className="header-about-txt text-[13px] text-grey-100 text-justify ps-7 pe-7 pt-4 ">
                  {jobSeeker?.description}
                </div>
              </div>
              {projectLoading ? (
                <></>
              ) : (
                projects &&
                projects?.length > 0 && (
                  <div className="personal-projects w-full flex flex-col items-center  border-b-[1px] border-b-solid border-b-[#e1e4e8]">
                    <div className="header-experience w-[max-content] text-[14px]">
                      Projects
                    </div>
                    <div className="projetctcards-grid flex mt-4 mb-4 justify-center  flex-wrap w-full px-7 gap-4">
                      {projects?.map((project) => (
                        <div
                          onClick={() => {
                            setCurrProject(project);
                            setProjectModalOpen(true);
                          }}
                          className="project-card cursor-pointer border-[1px] overflow-hidden rounded-[10px] border-solid border-[#e1e4e8] w-[13.4rem] max-sm:w-full max-lg:w-full max-md:w-[13.4rem] h-[14rem] "
                        >
                          <div className="project-img h-[74%] border-b-[lgt-grey] border-b-solid border-b-[2px]">
                            <img
                              className="object-cover h-full w-full  "
                              src={project.image}
                              alt=""
                            />
                          </div>

                          <div className="project-overview px-3 py-1 flex flex-col h-[26%]">
                            <div className="project-title font-medium text-[15px]">
                              {project.name}
                            </div>
                            <div className="project-desc truncate text-[13px]">
                              {project.description}
                            </div>
                          </div>
                        </div>
                      ))}
                      {projectModalOpen && jobSeeker && (
                        <ProjectModal
                          close={projectModalClose}
                          project={currProject}
                        ></ProjectModal>
                      )}
                    </div>
                  </div>
                )
              )}
              {isExperienceLoading ? (
                <></>
              ) : (
                experiences &&
                experiences.length > 0 && (
                  <div className="experience-section pb-3 border-b-[1px] border-b-solid border-b-[#e1e4e8] flex flex-col w-full items-center">
                    <div className="header-experience w-[max-content] text-[14px]">
                      Experience
                    </div>
                    <div className="experience-list flex flex-col gap-2 w-full mt-1 px-7">
                      {experiences &&
                        experiences.map((experience) => (
                          <div className="card flex flex-col mt-4 ">
                            <div className="role font-medium text-[14px] w-full flex justify-between">
                              <span>{experience.role}</span>{" "}
                              <span>
                                {`${experience.start_month} ${experience.start_year}` +
                                  "-" +
                                  `${
                                    experience.end_month || experience.end_year
                                      ? `${experience.end_month} ${experience.end_year}`
                                      : `Present`
                                  }`}
                              </span>
                            </div>
                            <div className="company-name text-[13px]">
                              {experience.company}{" "}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
        <FavSection page="Company"></FavSection>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { UserDescriptionPage };
