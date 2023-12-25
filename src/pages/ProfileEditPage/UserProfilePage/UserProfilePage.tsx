import  { useEffect } from 'react';
import { BottomBar, FavSection, JobNav, Loader, Sidebar } from '../../../components/components';
import { useJobSeekerState, useUserAuthStore } from '../../../store/store';
import unknown from "../../../assets/placeholder-organization.png";
import { CiMail } from 'react-icons/ci';

function UserProfilePage() {
  const { jobSeeker, fetchSingleJobSeeker,loader } = useJobSeekerState();
  const { user, accessToken } = useUserAuthStore();

  useEffect(() => {
    if (user.userName != null && accessToken != null) {
      fetchSingleJobSeeker(user.userName); // Assuming accessToken is the correct parameter
    }
  }, [user.userName]);
  

  return (
    <>
     <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="people-content-wrapper flex flex-col ">
          <div className="nav-section"></div>

          <JobNav jobtype={{type:"Single User",name:`${jobSeeker?.username}`}}></JobNav>
          {loader?
          <Loader></Loader>
          :<div className="people-grid flex p-3  w-full ">
            <div className="intro-sec flex flex-col  w-full justify-center mt-5x items-center">
              <img
                src={(jobSeeker?.profile_pic==null)?unknown:`${jobSeeker?.profile_pic}`}
                className="rounded-full h-[5rem] w-[5rem] object-contain"
              />
              <div className="follow-username-sec flex items-center gap-5 ">
              <div className="header-username font-medium ">{jobSeeker?.username}</div>
              
              </div>
              <div className="header-username font-medium text-xs mt-2">
                {jobSeeker?.firstname} {jobSeeker?.lastname}
              </div>

              <div className="header-email text-xs mt-3 flex items-center gap-1 justify-center">
                <CiMail />
                {jobSeeker?.email}
              </div>
              <div className="header-email text-xs color-lgt-grey mt-3 flex items-center gap-1 justify-center">
                Professional Experience {jobSeeker?.no_of_years_experience===0?'Fresher':`of ${jobSeeker?.no_of_years_experience} years`}
              </div>
              <div className="job-skills mt-2 flex flex-wrap justify-center items-center w-[70%] mt-5 gap-[9px] text-black">
                {jobSeeker?.skills.map((skill) => {
                  return (
                    <div className="skills text-[11px] font-light pe-2 ps-2  border-[0.1px]  border-solid rounded-[10px]">
                      {skill}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="about-sec flex flex-col justify-center mt-6 items-center">
              <div className="header-about text-xs">About {jobSeeker?.username}</div>
              <div className="header-about-txt text-xs text-grey-100 text-justify ps-10 pe-10 pt-5 ">
              {jobSeeker?.description}
              </div>
            </div>
          </div>}
        </div>
        <FavSection page="Company"></FavSection>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { UserProfilePage };
