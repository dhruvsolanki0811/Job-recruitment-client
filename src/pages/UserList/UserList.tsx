import {
  FavSection,
  JobNav,
  Sidebar,
  Loader,
} from "../../components/components";
import placeHolder from "../../assets/unknown.png";
import "./UserList.css";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import { useUserAuthStore } from "../../store/store";
import { useFetchAllJobseeker } from "../../hooks/useJobseekerData";
import DevIcon from "../../components/Devicon/Devicon";
function UserList() {
  const navigate = useNavigate();
  const { user } = useUserAuthStore();
  const { data: jobseekers, isLoading: jsloader } = useFetchAllJobseeker();

  return (
    <>
      <div className="main-wrapper scrollable-content flex-1">
        <Sidebar></Sidebar>
        <div className="people-content-wrapper flex flex-col ">
          <div className="nav-section">
            <JobNav jobtype={{ type: "Users", name: "User" }}></JobNav>
          </div>

          {jsloader ? (
            <Loader></Loader>
          ) : jobseekers ? (
            <div className="people-grid flex p-3  w-full ">
              {jobseekers
                .filter((i) => {
                  return user.userName == null
                    ? true
                    : i.username != user.userName;
                })
                .map((user) => (
                  <>
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
                        ).map((skill, i) => {
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
                  </>
                ))}
            </div>
          ) : (
            <></>
          )}
        </div>
        <FavSection page="Users"></FavSection>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { UserList };
