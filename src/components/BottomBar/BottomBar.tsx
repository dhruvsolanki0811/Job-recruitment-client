import  { useState } from "react";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { IoPeopleOutline } from "react-icons/io5";
import { PiHandshakeDuotone, PiSuitcaseDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { LuUser2 } from "react-icons/lu";
import { useUserAuthStore } from "../../store/store";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import "./BottomBar.css"

function BottomBar() {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user, logout } = useUserAuthStore();
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };
  return (
    <>
      <footer className="footer-bar border-t-[1px] border-t-[lgt-grey] border-t-solid fixed h-[3.8rem] bottom-[0] shadow-2xl  w-full bg-white ">
          <div className="flex  justify-center gap-1">
            <div
              onClick={() => navigate("/")}
              className="nav-item btn-joblist flex flex-col items-center gap-1 text-[12px]  font-medium	m-3"
            >
              <PiSuitcaseDuotone className="nav-items-logo"></PiSuitcaseDuotone>
              JobList
            </div>
            <div
              onClick={() => navigate("/users")}
              className="nav-item btn-joblist flex flex-col items-center gap-1 text-[12px] font-medium m-3 "
            >
              <IoPeopleOutline className="nav-items-logo"></IoPeopleOutline>
              People
            </div>
            <div
              onClick={() => navigate("/company")}
              className="nav-item btn-joblist flex flex-col items-center gap-1 text-[12px] font-medium m-3"
            >
              <HiOutlineBuildingOffice className="nav-items-logo"></HiOutlineBuildingOffice>
              Company
            </div>
            {user.userType==='jobseeker'&&<div
              onClick={() => navigate("/connections/connections")}
              className="nav-item btn-joblist flex flex-col items-center gap-1 text-[12px] font-medium m-3"
            >
              <PiHandshakeDuotone className="nav-items-logo"></PiHandshakeDuotone>
              Connects
            </div>}
            {user.userType==='organization'&&<div
              onClick={() => navigate("/organization/jobposting")}
              className="nav-item btn-joblist flex flex-col items-center gap-1 text-[12px] font-medium m-3"
            >
              <AiOutlineAppstoreAdd className="nav-items-logo"></AiOutlineAppstoreAdd>
              PostJob
            </div>}
            <div
              // onClick={() => navigate("/login")}
              onClick={toggleProfileDropdown}
              className="nav-item btn-joblist flex flex-col items-center gap-1 text-[12px] font-medium m-3"
            >
              <LuUser2 className="nav-items-logo"></LuUser2>
              Profile
              {showProfileDropdown && (
                <div className="dropdown-menu  absolute mt-[-3rem]  bg-white text-xs border rounded-md p-2 w-15  flex flex-col justify-center text-[12px]">
                  {user.userId == null ? (
                    <>
                      <p onClick={() => navigate("/login")}>Login</p>
                      <p onClick={() => navigate("/signup/user")}>Signin</p>
                    </>
                  ) : (
                    <>
                      <p onClick={() => navigate(`/${user.userType}/us`)}>
                        Profile
                      </p>
                      <p onClick={() => logout()}>Logout</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
      </footer>
    </>
  );
}

export { BottomBar };
