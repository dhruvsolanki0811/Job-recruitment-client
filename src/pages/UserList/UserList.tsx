import React, { useEffect } from "react";
import {
  FavSection,
  JobNav,
  Jobcard,
  Sidebar,
  Loader
} from "../../components/components";
import placeHolder from "../../assets/unknown.png";
import "./UserList.css";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";
import {useJobSeekerState} from "../../store/store"
function UserList() {
  const navigate=useNavigate()
  const {jobSeekerList,fetchJobseekers,loader}= useJobSeekerState()
  useEffect(()=>{
    fetchJobseekers()
  },[])
  return (
    <>

      <div className="main-wrapper flex-1">
        <Sidebar></Sidebar>
        <div className="people-content-wrapper flex flex-col ">
          <div className="nav-section"></div>

          <JobNav jobtype={{type:"Users",name:"User"}}></JobNav>
          {loader?
          <Loader></Loader>
          :<div className="people-grid flex p-3  w-full ">
            {jobSeekerList.map((user) => (
              <>
                <div onClick={()=>{navigate(`${user.username}`)}} className="people-box cursor-pointer flex flex-col  ps-3 pe-3">
                  <div className="follow-container flex justify-between items-center">
                    <div className="profile-pic  h-8 w-8 mt-2 overflow-hidden border-[1px] rounded-full">
                      {user.profile_pic==null?
                      <img
                        className=" object-cover  h-8 "
                        src={placeHolder}
                      ></img>:
                      <img
                        className=" object-cover  h-8 "
                        src={user.profile_pic}
                      ></img>
                      }
                    </div>

                    {/* <div className="follow-btn text-xs ps-2 pe-2 border-[1px] rounded border-solid border-black">
                      Follow
                    </div> */}
                  </div>

                  <div className="people-username text-xs mt-1">
                    {user.firstname} {user.lastname}
                  </div>
                  <div className="people-desc color-lgt-grey w-full text-[10px] pe-4 mb-1">
                   {user.description}
                  </div>
                </div>
              </>
            ))}
          </div>}
        </div>
        <FavSection page="Users"></FavSection>
      </div>
      <BottomBar></BottomBar>

    </>
  );
}

export { UserList };
