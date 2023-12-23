import React, { useState } from "react";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { IoPeopleOutline } from "react-icons/io5";
import { PiHandshakeDuotone, PiSuitcaseDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { LuUser2 } from "react-icons/lu";
import { useUserAuthStore } from "../../store/store";

function BottomBar() {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user,logout } = useUserAuthStore();
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };
  return (
    <>
      <footer className="footer-bar  fixed bottom-0 w-full bg-white  p-2">
        {/* Your navigation links go here */}
        <nav>
          <ul className="flex  justify-center space-x-4">
            <div
              onClick={() => navigate("/")}
              className="nav-item btn-joblist flex flex-col items-center gap-1 text-[10px]  font-medium	m-3"
            >
              <PiSuitcaseDuotone className="nav-items-logo"></PiSuitcaseDuotone>
              JobList
            </div>
            <div
              onClick={() => navigate("/users")}
              className="nav-item btn-joblist flex flex-col items-center gap-1 text-[10px] font-medium m-3 "
            >
              <IoPeopleOutline className="nav-items-logo"></IoPeopleOutline>
              People
            </div>
            <div
              onClick={() => navigate("/company")}
              className="nav-item btn-joblist flex flex-col items-center gap-1 text-[10px] font-medium m-3"
            >
              <HiOutlineBuildingOffice className="nav-items-logo"></HiOutlineBuildingOffice>
              Company
            </div>
            <div
              onClick={() => navigate("/followers")}
              className="nav-item btn-joblist flex flex-col items-center gap-1 text-[10px] font-medium m-3"
            >
              <PiHandshakeDuotone className="nav-items-logo"></PiHandshakeDuotone>
              Connections
            </div>
            <div
              // onClick={() => navigate("/login")}
              onClick={toggleProfileDropdown}
              className="nav-item btn-joblist flex flex-col items-center gap-1 text-[10px] font-medium m-3"
            >
              <LuUser2 className="nav-items-logo"></LuUser2>
              Profile
              {showProfileDropdown && (
                <div className="dropdown-menu  absolute mt-[-3rem]  bg-white text-xs border rounded-md p-2 w-15  flex flex-col justify-center">
                  {user.userId==null?
                    <>
                      <p onClick={()=>navigate('/login')}>Login</p>
                      <p onClick={()=>navigate('/signup/user')}>Signin</p>
                    </>:<>
                    <p onClick={()=>navigate(`/${user.userType}/us`)}>Profile</p>
                    <p onClick={()=>logout()}>Logout</p>
                    </>
                  }
                </div>
              )}
            </div>
          </ul>
        </nav>
      </footer>
    </>
  );
}

export { BottomBar };
