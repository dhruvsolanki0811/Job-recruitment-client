import "./Sidebar.css";
import logo from "../../assets/logo.png";
import unknown from "../../assets/unknown.png";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

import { PiSuitcaseSimpleDuotone, PiHandshakeDuotone } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useUserAuthStore } from "../../store/AuthStore";
import { IoIosLogOut } from "react-icons/io";

function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useUserAuthStore();
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
          {user.userType == "jobseeker" ? (
            <div
              onClick={() => navigate("/connections/connections")}
              className="nav-item btn-joblist flex items-center gap-1 text-[14px] font-medium m-3"
            >
              <PiHandshakeDuotone className="nav-items-logo"></PiHandshakeDuotone>
              Connections
            </div>
          ) : (
            <></>
          )}
          {user.userType == "organization" ? (
            <div
              onClick={() => navigate("/organization/jobposting")}
              className="nav-item btn-joblist flex items-center gap-1 text-[14px] font-medium m-3"
            >
              <AiOutlineAppstoreAdd className="nav-items-logo"></AiOutlineAppstoreAdd>
              Post a Job
            </div>
          ) : (
            <></>
          )}
        </div>

        <div
          onClick={() => {
            user.userType
              ? navigate(`/${user.userType}/us`)
              : navigate("/login");
          }}
          className="profile-name  flex  gap-1 items-center  justify-space-between me-5 ms-1 mt-2  flex-wrap   "
        >
          <img
            className="profile-icon cursor-pointer ms-1 h-[10px]"
            src={
              user.userPic
                ? `${user.userPic}`
                : unknown
            }
          ></img>
          <div className="username-sec text-sm cursor-pointer font-medium">
            {user.userName ? user.userName : "Login"}
          </div>
        </div>

        {user.userId ? (
          <div
            onClick={() => logout()}
            className="nav-item btn-joblist flex items-center gap-1  mt-4 text-[14px] font-medium m-3"
          >
            <IoIosLogOut className="nav-items-logo"></IoIosLogOut>
            Logout
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export { Sidebar };
