import "./FavSection.css";
import { IoIosNotificationsOutline } from "react-icons/io";
import logo from "../../assets/unknown.png";
import placeHolder from "../../assets/placeholder-organization.png";

import { FaArrowRightLong } from "react-icons/fa6";
import { FilterForm } from "../components";
import { useUserAuthStore } from "../../store/AuthStore";
import { useFetcher, useNavigate } from "react-router-dom";
import { useJobSeekerState } from "../../store/JobSeekerStore";
import { useEffect, useState } from "react";
import { useOrganizationStore } from "../../store/OrganizationStore";
type pageType = {
  page: "Users" | "All Job" | "Company" | "Connections";
};
function FavSection({ page }: pageType) {
  const {jobSeekerList,fetchJobseekers}=useJobSeekerState()
  const {organizationList,fetchOrganizations}=useOrganizationStore()
  const [suggestionUser,setSuggestionUser]=useState<any>([]);
  const [suggestionOrg,setSuggestionOrg]=useState<any>([]);

  const [fill,setFill]=useState<boolean>(false);

  const navigate=useNavigate()
  const {user}=useUserAuthStore()
  useEffect(()=>{
    fetchOrganizations()
    fetchJobseekers().then(()=>{
      setFill(true)})
  },[])
  useEffect(()=>{
    let suggestionSeekerList=jobSeekerList;
    let suggestionOrgList=organizationList
    if(user.userId!=null){
      suggestionSeekerList=jobSeekerList.filter((a)=>a.id!=user.userId)
      suggestionOrgList=organizationList.filter((a)=>a.id!=user.userId)

    }

    suggestionSeekerList=suggestionSeekerList?.slice(0,3)
    
    setSuggestionUser(suggestionSeekerList)
    setSuggestionOrg(suggestionOrgList.slice(0,3))
  },[fill])
  return (
    <>
      <div className="fav-section ps-1 pe-1">
        <div className="top-section h-12 text-xs flex justify-between  items-center ps-4 pe-4 gap-5">
          <div onClick={()=>{(user.userType)?navigate(`/${user.userType}/us`):navigate('/login')}} className="username-container cursor-pointer flex gap-1    items-center">
            <div  className=" h-8 w-6">
              <img
                className=" object-cover overflow-hidden h-full"
                src={user.userName==null?logo:`http://127.0.0.1:8000/${user.userPic}`}
              ></img>
            </div>
            {user.userName?user.userName:"login"}
          </div>
          <IoIosNotificationsOutline className="text-[20px] "></IoIosNotificationsOutline>
        </div>
        {page === "All Job" && (
          <div className="filter-section w-full flex flex-col  mt-1">
            <div className="text-holder  text-xs font-medium ms-3 me-3">
              Filters
            </div>
            <FilterForm></FilterForm>
          </div>
        )}

        <div className="people-rec-section w-full flex flex-col  ">
          <div className="text-holder flex justify-between items-center text-xs font-medium ms-3 me-3">
            People on JobCom
            <FaArrowRightLong />
          </div>
          <div className="user-desc flex flex-col gap-[2px] w-full ps-2 pe-2">
            {suggestionUser.map((seeker:any) => {
              return (
                <>
                  <div className="profile-pic-follow flex flex-between items-center">
                    <div className="profile-pic  flex flex-between items-center h-8 w-8 mt-2 overflow-hidden border-[1px] rounded-full">
                      <img className=" object-cover  h-8 " src={seeker.profile_pic==null?logo:`http://127.0.0.1:8000/${seeker.profile_pic}`}></img>
                    </div>
                    <div className="people-username text-xs mt-3 ms-2">
                    {seeker.username}
                    </div>
                  </div>
                  <div className="people-desc color-lgt-grey w-full text-[10px] ps-2 pe-2 mb-1">
                    {seeker.description}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        {(page === "Users" || page === "Company" || page === "Connections") && (
          <div className="people-rec-section w-full flex flex-col mt-6 ">
            <div className="text-holder flex mb-2 justify-between items-center text-xs font-medium ms-3 me-3">
              Organizations on JobCom
              <FaArrowRightLong />
            </div>
            <div className="user-desc flex flex-col gap-[2px] w-full ps-2 pe-2">
              {suggestionOrg.map((org:any) => {
                return (
                  <>
                    <div className="profile-pic-follow mt-1 flex flex-between items-center">
                      <div className="profile-pic  flex flex-between items-center h-8 w-8 mt-2 overflow-hidden border-[1px] rounded-full">
                        <img
                          className=" object-contain  h-8 "
                          src={org.profile_pic==null?placeHolder:`${org.profile_pic}`}
                        ></img>
                      </div>
                      <div className="people-username text-xs mt-3 ms-2">
                        {org.name}
                      </div>
                    </div>
                    <div className="people-desc color-lgt-grey w-full text-[10px] ps-2 pe-2 mb-1">
                      {org.overview}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export { FavSection };
