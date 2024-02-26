import "./FavSection.css";
import { IoIosNotificationsOutline } from "react-icons/io";
import logo from "../../assets/unknown.png";
import placeHolder from "../../assets/placeholder-organization.png";

import { FaArrowRightLong } from "react-icons/fa6";
import { FilterForm } from "../components";
import { useUserAuthStore } from "../../store/AuthStore";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import { useFetchAllJobseeker } from "../../hooks/useJobseekerData";
import { useFetchAllOrganizations } from "../../hooks/useOrganizationData";
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
        <div className="top-section h-12 text-xs flex justify-between  items-center ps-4 pe-4 gap-5">
          <div
            onClick={() => {
              user.userType
                ? navigate(`/${user.userType}/us`)
                : navigate("/login");
            }}
            className="username-container cursor-pointer flex gap-1    items-center"
          >
            <div className=" h-8 w-6">
              <img
                className=" object-cover overflow-hidden h-full"
                src={user.userName == null ? logo : `${user.userPic}`}
              ></img>
            </div>
            {user.userName ? user.userName : "login"}
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
          <div
            onClick={() => {
              navigate("/");
            }}
            className="text-holder cursor-pointer flex justify-between items-center text-xs font-medium ms-3 me-3"
          >
            People on JobCom
            <FaArrowRightLong />
          </div>
          <div className="user-desc flex flex-col gap-[2px] w-full ps-2 pe-2">
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
                .map((seeker: any,i) => {
                  return (
                    <div key={i}>
                      <div
                        onClick={() => {
                          navigate(`/users/${seeker.username}`);
                        }}
                        className="profile-pic-follow cursor-pointer flex flex-between items-center"
                      >
                        <div className="profile-pic  flex flex-between justify-center items-center h-8 w-8 mt-2 overflow-hidden border-[1px] rounded-full">
                          <img
                            className="   h-8 "
                            src={
                              seeker.profile_pic == null
                                ? logo
                                : `${seeker.profile_pic}`
                            }
                          ></img>
                        </div>
                        <div className="people-username text-xs mt-3 ms-2">
                          {seeker.username}
                        </div>
                      </div>
                      <div className="people-desc color-lgt-grey w-full text-[10px] mt-2 pe-2 mb-1">
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
              className="text-holder cursor-pointer flex mb-2 justify-between items-center text-xs font-medium ms-3 me-3"
            >
              Organizations on JobCom
              <FaArrowRightLong />
            </div>
            <div className="user-desc flex flex-col gap-[2px] w-full ps-2 pe-2">
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
                      <div className="profile-pic  flex flex-between justify-center items-center h-8 w-8 mt-2 overflow-hidden border-[1px] rounded-full">
                        <img
                          className=" object-contain  h-8 "
                          src={
                            org.profile_pic == null
                              ? placeHolder
                              : `${org.profile_pic}`
                          }
                        ></img>
                      </div>
                      <div className="people-username text-xs mt-3 ms-2">
                        {org.name}
                      </div>
                    </div>
                    <div className="people-desc color-lgt-grey w-full text-[10px] mt-2 pe-2 mb-1">
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
