import {
  FavSection,
  JobNav,
  Loader,
  Sidebar,
} from "../../components/components";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useUserAuthStore } from "../../store/store";
import orgPlaceHolder from "../../assets/placeholder-organization.png";
import { formatTimestampToDDMonthYYYY } from "../../utils/dateutils";
import { useDeleteJob, useFetchOrganizationJobs } from "../../hooks/useJobData";
import DevIcon from "../../components/Devicon/Devicon";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

function OrganizationJobPosted() {
  const { user } = useUserAuthStore();
  const orgName = user.userName ? user.userName : "";
  const { data: jobList, isLoading: loader } =
    useFetchOrganizationJobs(orgName);
  const { mutate: deleteJob, isLoading: jobDeleteLoading } = useDeleteJob();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  // Handler for search input change
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const filteredJobs = jobList
    ? jobList.filter((job) => {
        return (
          job.role.toLowerCase().includes(search.toLowerCase()) ||
          job.employee_type.toLowerCase().includes(search.toLowerCase())
        );
      })
    : [];

  return (
    <>
      <>
        <div className="main-wrapper">
          <Sidebar></Sidebar>
          <div className="content-wrapper flex flex-col ">
            <div className="nav-section">
              <JobNav
                jobtype={{ type: "Applied", name: "Jobs you have posted " }}
              ></JobNav>
              <div className="search-section w-full h-19 ps-5 pt-3 pb-3 pe-5  ">
                <div className="input-search-container w-full flex justify-center items-center roundedfull ps-1 pe-1 ">
                  <input
                    type="text"
                    placeholder="Search"
                    className="search-box"
                    value={search}
                    onChange={handleSearchInput}
                    // onChange={handleSearchInput}
                    // onKeyDown={handleEnter}
                  />
                  <CiSearch className="cursor-pointer"></CiSearch>
                </div>
              </div>
            </div>
            {loader||jobDeleteLoading ? (
              <Loader></Loader>
            ) : (
              <div className="job-list scrollable-content max-sm:mb-[3.9rem]  flex flex-col ">
                {jobList &&
                  filteredJobs.map((job, key) => (
                    <div key={key}>
                      <div
                        onClick={() =>
                          navigate(
                            `/job/${job.organization_name
                              .replace(/\s/g, "")
                              .toLowerCase()}-${job.role
                              .replace(/\s/g, "")
                              .toLowerCase()}-${job.id}`
                          )
                        }
                        className="card-container w-full  h-[max-content] mt-2 flex flex-nowrap pt-2 pb-2 ps-1 pe-1  cursor-pointer  border-b-[1px] border-b-solid border-b-[lgt-grey] "
                      >
                        <div className="org-logo  h-full flex justify-center mt-2 ms-1 ">
                          <div className="logo-container h-[50px] w-[50px] overflow-hidden ">
                            {job.organization_profile_pic != null ? (
                              <img
                                src={
                                  "https://res.cloudinary.com/dlkqz4nqp/image/upload/v1/" +
                                  job.organization_profile_pic
                                }
                                className="h-full w-full rounded-full fill"
                                alt=""
                              />
                            ) : (
                              <img
                                src={orgPlaceHolder}
                                className="h-full w-full rounded-full fill"
                                alt=""
                              />
                            )}
                          </div>
                        </div>
                        <div className="job-desc flex flex-col h-full gap-[1px] ps-2 ">
                          <div className="title-sec flex flex-nowrap text-[14px] gap-1 items-center min-h-[3px]  overflow-none truncate">
                            <div className="title ">{job.role}</div>
                            <div className="org-name w- text-[14px] color-lgt-grey word-wrap-overflow w-24">
                              at {job.organization_name}
                            </div>
                          </div>
                          <div className="about-job flex wrap text-[13px] font-thin  gap-2 color-lgt-grey  ">
                            {job.employee_type} • ₹{job.salary}Lpa •{" "}
                            {job.required_experience}Y experience • posted{" "}
                            {formatTimestampToDDMonthYYYY(job.created_at)}
                          </div>

                          <div className="job-skills mt-2 flex items-center w-full gap-[9px] text-black">
                            {(job.skills_required.length < 3
                              ? job.skills_required
                              : job.skills_required.slice(0, 3)
                            ).map((skill, key) => {
                              return (
                                <div
                                  key={key}
                                  className="skills truncate flex gap-1 items-center text-[12px] font-light pe-2 ps-2  border-[0.1px]  border-solid rounded-[10px]"
                                >
                                  <DevIcon skillName={skill}></DevIcon>
                                  {skill}
                                </div>
                              );
                            })}

                            {job.skills_required.length > 3 && (
                              <div className="skills text-[12px] font-light pe-2 ps-2  border-[0.1px]  border-solid rounded-[10px]">
                                +{job.skills_required.length - 3}
                              </div>
                            )}
                          </div>
                          <div className="flex w-full mt-3 gap-3 ">
                            <div
                              onClick={(e) => {
                                e.stopPropagation()
                                navigate(`/applicantslist/${job.id}`);
                              }}
                              className="flex gap-2  items-center follow-btn text-[14px] ps-2 pe-2 border-[1px] rounded border-solid hover:border-black  cursor-pointer"
                            >
                              View Applicants <FaArrowRightLong />
                            </div>
                            <div 
                            onClick={(e)=>{
                              e.stopPropagation()
                              deleteJob(String(job.id))
                            }}
                            className="flex gap-2 items-center  follow-btn text-[14px] ps-2 pe-2 border-[1px] rounded border-solid hover:border-black hover:bg-[red] hover:text-white  cursor-pointer">
                              Delete <MdDelete />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <FavSection page="Company"></FavSection>
        </div>
        <BottomBar></BottomBar>
      </>
    </>
  );
}

export { OrganizationJobPosted };
