import "./FavSection.css";
import logo from "../../assets/unknown.png";
import placeHolder from "../../assets/placeholder-organization.png";

import { FaArrowRightLong } from "react-icons/fa6";
import { FilterForm } from "../components";
import { useUserAuthStore } from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import { useFetchAllJobseeker } from "../../hooks/useJobseekerData";
import { useFetchAllOrganizations } from "../../hooks/useOrganizationData";
import { JobSeeker } from "../../types/types";
type pageType = {
  page: "Users" | "All Job" | "Company" | "Connections";
};
function FavSection({ page }: pageType) {

  const [randNum] = useState<number>(Math.random);

  const navigate = useNavigate();

  const { user } = useUserAuthStore();

  const { data: jobseekers } =useFetchAllJobseeker();
  const {data:organizations}=useFetchAllOrganizations()
  
  return (
    <>
      <div className="fav-section ps-1 pe-1">
        <div className="top-section  flex justify-between  items-center p-5 gap-5">
          <div
            onClick={() => {
              user.userType
                ? navigate(`/${user.userType}/us`)
                : navigate("/login");
            }}
            className=" cursor-pointer flex gap-1    items-center"
          >
           
            <div className="text-[14px] ">
            {user.userName ? user.userName.toLocaleUpperCase() : "Login"}
            </div>
          </div>
          {/* <IoIosNotificationsOutline className="text-[20px] "></IoIosNotificationsOutline> */}
        </div>
        {page === "All Job" && (
          <div className="filter-section w-full flex flex-col  mt-3">
            <div className="text-holder  text-[14px] font-medium ms-3 me-3">
              Filters
            </div>
            <FilterForm></FilterForm>
          </div>
        )}

        <div className="people-rec-section w-full flex flex-col  ">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="text-holder cursor-pointer flex justify-between items-center text-[14px] font-medium ms-3 me-3 "
          >
            People on JobCom
            <FaArrowRightLong />
          </div>
          <div className="user-desc flex flex-col gap-[2px] w-full ps-2 pe-2 mt-1">
            {jobseekers ? (
              jobseekers
                .filter((seeker) => {
                  if (user.userId == seeker.id) {
                    return false;
                  } else {
                    return true;
                  }
                })
                .sort(function () {
                  return 0.5 - randNum;
                })
                .slice(0, 3)
                .map((seeker: JobSeeker,i) => {
                  return (
                    <div key={i} >
                      <div
                        onClick={() => {
                          navigate(`/users/${seeker.username}`);
                        }}
                        className="profile-pic-follow cursor-pointer flex flex-between items-center"
                      >
                        <div className="profile-pic  flex flex-between justify-center items-center h-[2.1rem] w-[2.1rem] mt-2 overflow-hidden border-[1px] rounded-full">
                          {seeker.profile_pic == null?<img
                            className="object-contain  h-full w-full"
                            src= {logo}
                          ></img>:
                          <img
                            className="object-fill  h-full w-full"
                            src={`${seeker.profile_pic}`}
            
                          ></img>}
                        </div>
                        <div className="people-username text-[12px] mt-2 ms-[4px]">
                          {seeker.firstname} {seeker.lastname} 
                        </div>
                      </div>
                      <div className="people-desc color-lgt-grey w-full text-[11px] mt-2 pe-2 mb-1">
                        {seeker.description}
                      </div>
                    </div>
                  );
                })
            ) : (
              <></>
            )}
          </div>
        </div>
        {(page === "Users" || page === "Company" || page === "Connections") && (
          <div className="people-rec-section  w-full flex flex-col mt-6 ">
            <div
              onClick={() => {
                navigate(`/company`);
              }}
              className="text-holder cursor-pointer flex justify-between items-center text-[14px] font-medium ms-3 me-3"
            >
              Organizations on JobCom
              <FaArrowRightLong />
            </div>
            <div className="user-desc flex flex-col gap-[2px] w-full ps-2 pe-2 mt-1 ps-3">
              {organizations?organizations.filter((seeker) => {
                  if (user.userId == seeker.id) {
                    return false;
                  } else {
                    return true;
                  }
                })
                .sort(function () {
                  return 0.5 - randNum;
                })
                .slice(0, 3)
              
              .map((org: any,i) => {
                return (
                  <div key={i}>
                    <div
                      onClick={() => {
                        navigate(`/company/${org.username}`);
                      }}
                      className="profile-pic-follow cursor-pointer mt-1 flex flex-between items-center"
                    >
                      <div className="profile-pic h-[2.1rem] w-[2.1rem] flex flex-between justify-center items-center  mt-2 overflow-hidden border-[1px] rounded-full">
                        <img
                          className=" object-contain  h-full w-full"
                          src={
                            org.profile_pic == null
                              ? placeHolder
                              : `${org.profile_pic}`
                          }
                        ></img>
                      </div>
                      <div className="people-username text-[12px] mt-2 ms-2">
                        {org.name}
                      </div>
                    </div>
                    <div className="people-desc color-lgt-grey w-full text-[11px] mt-2 pe-2 mb-1">
                      {org.overview}
                    </div>
                    </div>
                );
              }):<></>}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export { FavSection };
