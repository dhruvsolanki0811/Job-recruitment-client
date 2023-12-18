// import React from 'react'
import "./Sidebar.css";
import logo from "../../assets/logo.png";
import unknown from "../../assets/unknown.png";

import { PiSuitcaseSimpleDuotone, PiHandshakeDuotone } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="side-section ">
        <div className="logo flex flex-nowrap  w-full">
          <div className="logo-container h-24 ob">
            <img
              className="logo object-cover overflow-hidden h-full"
              src={logo}
            ></img>
          </div>
        </div>
        <div className="nav-items flex flex-col w-full">
          <div
            onClick={() => navigate("/")}
            className="nav-item btn-joblist flex items-center gap-1 text-[14px]  font-medium	m-3"
          >
            <PiSuitcaseSimpleDuotone className="nav-items-logo"></PiSuitcaseSimpleDuotone>
            JobList
          </div>
          <div
            onClick={() => navigate("/users")}
            className="nav-item btn-joblist flex items-center gap-1 text-[14px] font-medium m-3 "
          >
            <IoPeopleOutline className="nav-items-logo"></IoPeopleOutline>
            People
          </div>
          <div
            onClick={() => navigate("/company")}
            className="nav-item btn-joblist flex items-center gap-1 text-[14px] font-medium m-3"
          >
            <HiOutlineBuildingOffice className="nav-items-logo"></HiOutlineBuildingOffice>
            Company
          </div>
          <div
            onClick={() => navigate("/followers")}
            className="nav-item btn-joblist flex items-center gap-1 text-[14px] font-medium m-3"
          >
            <PiHandshakeDuotone className="nav-items-logo"></PiHandshakeDuotone>
            Connections
          </div>
        </div>

        <div className="profile-name  flex  gap-1 items-center  justify-space-between me-5 ms-1 mt-2  flex-wrap   ">
          <img className="profile-icon cursor-pointer ms-1 " src={unknown}></img>
          <div className="username-sec text-sm cursor-pointer font-medium">
            Username
          </div>
          {/* <div className="about-circle cursor-pointer text-[8px] bg-green-500 rounded-full ps-1 pe-1">
            About
          </div> */}
        </div>
      </div>
    </>
  );
}

export { Sidebar };
