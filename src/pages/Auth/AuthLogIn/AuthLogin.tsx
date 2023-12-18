import React, { useState } from "react";
import { JobNav, Sidebar } from "../../../components/components";
import "./AuthLogin.css";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../../../components/BottomBar/BottomBar";
function AuthLogin() {
  const navigate = useNavigate();

  const [UserLogin,SetUserLogin]= useState(true)

  const toggleStyle={
    borderBottom: "3px solid black",

  }
  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>

        <div className="content-wrapper flex flex-col ">
          <div className="nav-section">
            <JobNav jobtype={{type:"Login",name:"Login"}}></JobNav>
            <div className="login-container flex flex-col items-center  h-full">
              <div className="login-box flex flex-col items-center  w-[20rem] mt-4 ">
                <div className="slider-login flex justify-between w-full">
                  <div className={`header-user w-[50%] flex justify-center cursor-pointer ${UserLogin?``:`hover:text-[#13883e]`}`} onClick={()=>SetUserLogin(true)} style={UserLogin?toggleStyle:{}}>User</div>
                  <div className={`header-org w-[50%] flex justify-center cursor-pointer ${UserLogin?`hover:text-[#13883e]`:``}`} onClick={()=>SetUserLogin(false)} style={UserLogin?{}:toggleStyle}>Organization</div>
                </div>
                <input
                  type="text"
                  name="role"
                  placeholder="Email"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />
                <input
                  type="password"
                  name="role"
                  placeholder="Password"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />

                <div className="login-btn-wrapper ">
                  <button className="submit-btn text-xs hover:bg-[#13883e]  ">Login</button>
                </div>

                <div onClick={()=>{if(UserLogin){navigate("/signup/user")}else{navigate("/signup/organization")}}} className="signin-head text-xs cursor-pointer hover:text-[#13883e]">{UserLogin?"Don't have an user account? Join Now":"Hey! Join as a Organization!  "}</div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { AuthLogin };
