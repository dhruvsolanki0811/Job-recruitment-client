import {
  FavSection,
  JobNav,
  Loader,
  Sidebar,
} from "../../components/components";
import placeHolder from "../../assets/unknown.png";
import { useNavigate, useParams } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useFetchSingleJob } from "../../hooks/useJobData";
import { useFetchJobApplicantsForSingleJob } from "../../hooks/useJobseekerData";
import DevIcon from "../../components/Devicon/Devicon";

function ApplicantsList() {
  let { jobId } = useParams();
  const jobID = jobId ? jobId : "";
  const { data: jobPage, isLoading: jobLoader } = useFetchSingleJob(jobID);
  const { data: connections, isLoading: applicantLoader } =
    useFetchJobApplicantsForSingleJob(jobID);

  const navigate = useNavigate();

  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="content-wrapper flex flex-col ">
          <div className="nav-section">
            <JobNav
              jobtype={{
                type: "Applied",
                name:
                  jobPage?.role && jobPage.organization_name
                    ? `Applicants for ${jobPage?.role} at ${jobPage?.organization_name}`
                    : "",
              }}
            ></JobNav>
          </div>
          {applicantLoader && jobLoader ? (
            <Loader></Loader>
          ) : (
            <div className="people-grid scrollable-content max-sm:mb-[3.9rem]  flex p-3  w-full ">
              {connections?.map((user: any, key) => (
                <div key={key}>
                  <div
                    onClick={() => {
                      navigate(`${user.username}`);
                    }}
                    className="people-box cursor-pointer flex flex-col  ps-3 pe-3"
                  >
                    <div className="follow-container flex justify-between items-center">
                      <div className="profile-pic  h-[3rem] w-[3rem]  overflow-hidden border-[1px] rounded-full flex justify-center items-center">
                        {user.profile_pic == null ? (
                          <img
                            className=" object-contain  h-[70%] w-[70%]"
                            src={placeHolder}
                          ></img>
                        ) : (
                          <img
                            className="  object-fill h-full w-full "
                            src={user.profile_pic}
                          ></img>
                        )}
                      </div>

                      {/* <div className="follow-btn text-xs ps-2 pe-2 border-[1px] rounded border-solid border-black">
                Follow
              </div> */}
                    </div>

                    <div className="people-username text-[14px] mt-1 flex items-center gap-2">
                      {user.firstname} {user.lastname}
                      <div className="people-username  font-medium text-[14px]">
                        @{user.username}
                      </div>
                    </div>

                    <div className="people-card-desc color-lgt-grey w-full text-[12px] pe-2 text-three-line">
                      {user.description}
                    </div>
                    <div className="job-skills mt-2 flex gap-1  items-center w-full  text-black">
                      {(user.skills.length < 3
                        ? user.skills
                        : user.skills.slice(0, 3)
                      ).map((skill: string, i: number) => {
                        return (
                          <div
                            key={i}
                            className="skills flex gap-1 items-center text-[12px] font-light pe-2 ps-2  border-[0.1px] truncate  border-solid rounded-[10px]"
                          >
                            <DevIcon skillName={skill}></DevIcon>
                            {skill}
                          </div>
                        );
                      })}

                      {user.skills.length > 3 && (
                        <div className="skills text-[11px]  pe-2 ps-2  border-[0.1px]  border-solid rounded-[10px]">
                          +{user.skills.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <FavSection page="Connections"></FavSection>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { ApplicantsList };
