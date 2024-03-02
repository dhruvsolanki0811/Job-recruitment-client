import "./Sidebar.css";
import logo from "../../assets/logo.png";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { TbUserQuestion } from "react-icons/tb";

import {
  PiSuitcaseSimpleDuotone,
  PiHandshake,
} from "react-icons/pi";
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
        
          <div className="logo-container flex  h-[7rem] ob">
            <img
              className="logo object-cover overflow-hidden h-full"
              src={logo}
            ></img>
          
        </div>
        <div className="nav-items flex flex-col w-full">
          <div
            onClick={() => navigate("/")}
            className="nav-item hover:bg-[#22C55E] hover:text-white flex items-center gap-2 text-[16px]  font-medium	p-2 m-1"
          >
            <PiSuitcaseSimpleDuotone className="nav-items-logo"></PiSuitcaseSimpleDuotone>
            JobList
          </div>
          <div
            onClick={() => navigate("/users")}
            className="nav-item hover:bg-[#22C55E] hover:text-white flex items-center gap-2 text-[16px] font-medium p-2 m-1 "
          >
            <IoPeopleOutline className="nav-items-logo"></IoPeopleOutline>
            People
          </div>
          <div
            onClick={() => navigate("/company")}
            className="nav-item hover:bg-[#22C55E] hover:text-white flex items-center gap-2 text-[16px] font-medium p-2 m-1"
          >
            <HiOutlineBuildingOffice className="nav-items-logo"></HiOutlineBuildingOffice>
            Company
          </div>
          {user.userType == "jobseeker" ? (
            <div
              onClick={() => navigate("/connections/connections")}
              className="nav-item hover:bg-[#22C55E] hover:text-white flex items-center gap-2 text-[16px] font-medium p-2 m-1"
            >
              <PiHandshake className="nav-items-logo text-[22px]"></PiHandshake>
              Connections
            </div>
          ) : (
            <></>
          )}
          {user.userType == "organization" ? (
            <div
              onClick={() => navigate("/organization/jobposting")}
              className="nav-item hover:bg-[#22C55E] hover:text-white flex items-center gap-2 text-[16px] font-medium p-2 m-1"
            >
              <AiOutlineAppstoreAdd className="nav-items-logo"></AiOutlineAppstoreAdd>
              Post a Job
            </div>
          ) : (
            <></>
          )}
          <div
            onClick={() => {
              user.userType
                ? navigate(`/${user.userType}/us`)
                : navigate("/login");
            }}
            className="nav-item hover:bg-[#22C55E] hover:text-white flex items-center gap-2 text-[16px] font-medium p-2 m-1"
          >
            {user.userPic?<img
              className="cursor-pointer rounded-full w-[1.5rem] h-[1.4rem]"
              src={`${user.userPic}` }
            ></img>:
        <TbUserQuestion className="nav-items-logo"/>

            }
            <div className="username-sec text-[16px] cursor-pointer font-medium">
              {user.userName ? user.userName : "Login"}
            </div>
          </div>
          {user.userId ? (
            <div
              onClick={() => logout()}
              className="nav-item hover:bg-[#22C55E] hover:text-white flex items-center gap-2   text-[16px] font-medium p-2 m-1"
            >
              <IoIosLogOut className="nav-items-logo"></IoIosLogOut>
              Logout
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export { Sidebar };
