import {
  BottomBar,
  FavSection,
  JobNav,
  Loader,
  Sidebar,
} from "../../../components/components";
import { useUserAuthStore } from "../../../store/store";
import unknown from "../../../assets/unknown.png";
import unknownProject from "../../../assets/project-placeholder.png";

import { CiMail } from "react-icons/ci";
import { useFetchSingleJobSeeker } from "../../../hooks/useJobseekerData";
import DevIcon from "../../../components/Devicon/Devicon";
import { useState } from "react";
import ProjectModal from "../../../components/ProjectModal/ProjectModal";
import { Experience, Project } from "../../../types/types";
import {
  useDeleteProject,
  useFetchProjectByUser,
} from "../../../hooks/useProjectData";
import { useDeleteExperience, useFetchExperienceByUser } from "../../../hooks/useExperienceData";
import { IoAddCircleSharp } from "react-icons/io5";
import ProjectFormModal from "../../../components/ProjectFormModal/ProjectFormModal";
import ExperienceFormData from "../../../components/ExperienceFormData/ExperienceFormData";

function UserProfilePage() {
  const { user } = useUserAuthStore();
  const { mutate: deleteProject, isLoading } = useDeleteProject();
  const {mutate:deleteExperience,isLoading:isExperienceDeleteLoading}=useDeleteExperience()
  const [isExperienceFormOpen, setIsExperienceFormOpen] = useState(false);
  const experienceFormModalClose = () => {
    setIsExperienceFormOpen(false);
  };
  const [currExperience, setCurrExperience] = useState<Experience>({} as Experience);

  const [isExperienceEditFormOpen, setIsExperienceEditFormOpen] = useState(false);
  const experienceEditFormModalClose = () => {
    setCurrExperience({} as Experience)
    setIsExperienceEditFormOpen(false);
  };
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const projectFormModalClose = () => {
    setIsProjectFormOpen(false);
  };
  const [isProjectEditFormOpen, setIsProjectEditFormOpen] = useState(false);
  const projectEditFormModalClose = () => {
    setCurrProject({} as Project);
    setIsProjectEditFormOpen(false);
  };

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [currProject, setCurrProject] = useState<Project>({} as Project);
  const projectModalClose = () => {
    setCurrProject({} as Project);
    setProjectModalOpen(false);
  };
  const userName = user.userName ? user.userName : "";

  const { data: projects, isLoading: projectLoading } =
    useFetchProjectByUser(userName);
  const { data: experiences, isLoading: isExperienceLoading } =
    useFetchExperienceByUser(userName);

  const { data: jobSeeker, isLoading: loader } =
    useFetchSingleJobSeeker(userName);

  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="people-content-wrapper flex flex-col ">
          <div className="nav-section">
            <JobNav
              jobtype={{
                type: "User Profile",
                name: jobSeeker?.username ? `@${jobSeeker?.username}` : "",
              }}
            ></JobNav>
          </div>
          {loader ? (
            <Loader></Loader>
          ) : (
            <div className="people-grid scrollable-content max-sm:mb-[3.9rem]  flex p-3  w-full   ">
              <div className="intro-sec flex flex-col  w-full justify-center mt-5 items-center border-b-[1px] border-b-solid border-b-[#e1e4e8]">
                <div className="image-container flex justify-center items-center h-[5rem] w-[5rem] border-[2px] border-solid border-[#22C55E] p-[1px]">
                  <img
                    src={
                      jobSeeker?.profile_pic == null
                        ? unknown
                        : `${jobSeeker?.profile_pic}`
                    }
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="follow-username-sec flex items-center mt-2 ">
                  <div className="header-username  ">
                    @{jobSeeker?.username}
                  </div>
                </div>
                <div className="header-username font-medium text-[16px] mt-2">
                  {jobSeeker?.firstname} {jobSeeker?.lastname}
                </div>

                <div className="header-email text-[13px] mt-3 flex items-center gap-1 justify-center">
                  <CiMail />
                  {jobSeeker?.email}
                </div>
                <div className="header-email text-[13px] color-lgt-grey mt-3 flex items-center gap-1 justify-center">
                  Professional Experience{" "}
                  {jobSeeker?.no_of_years_experience === 0
                    ? "Fresher"
                    : `of ${jobSeeker?.no_of_years_experience} years`}
                </div>
                <div className="job-skills mt-2 flex flex-wrap justify-center items-center w-[70%] mt-5 gap-[9px] text-black">
                  {jobSeeker?.skills.map((skill,key) => {
                    return (
                      <div key={key} className="skills flex items-center gap-1 text-[14px] font-light pe-2 ps-2  border-[0.1px]  border-solid rounded-[10px]">
                        <DevIcon skillName={skill}></DevIcon>
                        {skill}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="about-sec flex flex-col justify-center  w-full  items-center border-b-[1px] pb-3">
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
                <div className="personal-projects w-full flex flex-col items-center  border-b-[1px] border-b-solid border-b-[#e1e4e8]">
                  <div className="header-experience w-[max-content] text-[14px]">
                    Projects
                  </div>
                  <div
                    onClick={() => setIsProjectFormOpen(true)}
                    className="header-experience cursor-pointer flex gap-2 items-center mt-3 rounded-[10px] border-solid border-[1px] border-[lgt-grey] px-2 py-1  w-[max-content] text-[14px]"
                  >
                    Add Project <IoAddCircleSharp className="text-[20px]" />
                  </div>
                  {isProjectFormOpen && (
                    <ProjectFormModal
                      type="ADD"
                      close={projectFormModalClose}
                    ></ProjectFormModal>
                  )}
                  <div className="projetctcards-grid flex mt-4 mb-4 justify-center  flex-wrap w-full px-7 gap-4">
                    {isLoading ? (
                      <div className="loader-container h-[13rem]">
                        <Loader message=""></Loader>
                      </div>
                    ) : (
                      projects &&
                      projects.map((project,key) => (
                        <div
                        key={key}
                          onClick={() => {
                            setCurrProject(project);
                            setProjectModalOpen(true);
                          }}
                          className="project-card cursor-pointer border-[1px] overflow-hidden rounded-[10px] border-solid border-[#e1e4e8] w-[13.4rem] max-sm:w-full max-lg:w-full max-md:w-[13.4rem] h-[13rem] "
                        >
                          <div className="project-img h-[74%] border-b-[1px] border-b-solid border-b-[lgt-grey]">
                            {project.image ? (
                              <img
                                className="object-cover h-full w-full  "
                                src={project.image}
                                alt=""
                              />
                            ) : (
                              <img
                                className="object-fill h-full w-full  "
                                src={unknownProject}
                                alt=""
                              />
                            )}
                          </div>

                          <div className="project-overview px-3 py-1 flex flex-col h-[26%]">
                            <div className="flex w-full justify-between items-center mt-1">
                              <div className="project-title font-medium text-[15px]">
                                {project.name}
                              </div>
                              <div className="flex gap-1">
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteProject(String(project.id));
                                  }}
                                  className="edit-btn text-[14px] border-[1px] border-solid border-[lgt-grey] px-2 hover:bg-[red] hover:text-white rounded-full"
                                >
                                  Delete
                                </div>
                                <div
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrProject(project);
                                    setIsProjectEditFormOpen(true);
                                  }}
                                  className="edit-btn text-[14px] border-[1px] border-solid border-[lgt-grey] px-2 hover:bg-[#22C55E] hover:text-white rounded-full"
                                >
                                  Edit
                                </div>
                              </div>
                            </div>
                            <div className="project-desc truncate text-[13px]">
                              {project.description}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    {isProjectEditFormOpen && (
                      <ProjectFormModal
                        type={"EDIT"}
                        close={projectEditFormModalClose}
                        updateData={{
                          id: String(currProject.id),
                          name: currProject.name,
                          deployedLink: currProject.deployed_link,
                          project_pic: currProject.image,
                          description: currProject.description,
                          skills: currProject.tech_stack,
                        }}
                      ></ProjectFormModal>
                    )}

                    {projectModalOpen && jobSeeker && (
                      <ProjectModal
                        close={projectModalClose}
                        project={currProject}
                      ></ProjectModal>
                    )}
                  </div>
                </div>
              )}
              {isExperienceLoading ? (
                <>
                
                </>
              ) : (
                <div className="experience-section pb-3 border-b-[1px] border-b-solid border-b-[#e1e4e8] flex flex-col w-full items-center">
                  <div  className="header-experience w-[max-content] text-[14px]">
                    Experience
                  </div>
                  <div onClick={()=>setIsExperienceFormOpen(true)} className="header-experience  cursor-pointer flex gap-2 items-center mt-3 rounded-[10px] border-solid border-[1px] border-[lgt-grey] px-2 py-1  w-[max-content] text-[14px]">
                    Add Experience <IoAddCircleSharp className="text-[20px]" />
                  </div>
                  <div className="experience-list flex flex-col gap-2 w-full mt-1 px-7">
                    {isExperienceDeleteLoading?<>
                      <div className="loader-container h-[5rem] ">
                        <Loader message=""></Loader>
                      </div>
                    </>:experiences &&
                      experiences.map((experience,key) => (
                        <div key={key} className="card flex flex-col mt-4 ">
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
                          <div className="flex justify-between items-center ">
                            <div className="company-name text-[13px]">
                              {experience.company}
                            </div>
                            <div className="flex gap-2">
                              <div
                                onClick={()=>{
                                  console.log("asas")
                                  deleteExperience(String(experience.id))
                                }}
                                className="edit-btn cursor-pointer text-[14px] border-[1px] border-solid border-[lgt-grey] px-2 hover:bg-[red] hover:text-white rounded-full"
                              >
                                Delete
                              </div>
                              <div
                                onClick={()=>{
                                  setCurrExperience(experience)
                                  setIsExperienceEditFormOpen(true)
                                }}
                                className="edit-btn cursor-pointer text-[14px] border-[1px] border-solid border-[lgt-grey] px-2 hover:bg-[#22C55E] hover:text-white rounded-full"
                              >
                                Edit
                              </div>
                            </div>
                          </div>
                        </div>
                        ))}
                        {isExperienceEditFormOpen&& <ExperienceFormData type="EDIT" close={experienceEditFormModalClose} updateData={{id:String(currExperience.id),role:currExperience.role,company:currExperience.company,start_month:currExperience.start_month,start_year:String(currExperience.start_year),end_month:currExperience.end_month||"",end_year:currExperience.end_year?String(currExperience.end_year):""}}></ExperienceFormData>}
                        {isExperienceFormOpen&& <ExperienceFormData type="ADD" close={experienceFormModalClose} ></ExperienceFormData>}
                  </div>
                </div>
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

export { UserProfilePage };
