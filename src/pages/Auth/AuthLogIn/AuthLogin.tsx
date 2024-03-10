import React, { useState } from "react";
import { JobNav, Loader, Sidebar } from "../../../components/components";
import "./AuthLogin.css";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../../../components/BottomBar/BottomBar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginHook } from "../../../hooks/useAuthData";

function AuthLogin() {
  const { mutate: login, isLoading: loader } = useLoginHook();
  const navigate = useNavigate();

  const [isUserLogin, setIsUserLogin] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgPassword, setOrgPassword] = useState("");

  const toggleStyle = {
    borderBottom: "3px solid black",
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the state based on the login type
    if (isUserLogin) {
      if (name === "email") {
        setUserEmail(value);
      } else if (name === "password") {
        setUserPassword(value);
      }
    } else {
      if (name === "email") {
        setOrgEmail(value);
      } else if (name === "password") {
        setOrgPassword(value);
      }
    }
  };

  const handleLogin = () => {
    // Implement your login logic here
    // You can use user and org email/password for authentication
    if (
      (isUserLogin && (!userEmail || !userPassword)) ||
      (!isUserLogin && (!orgEmail || !orgPassword))
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (isUserLogin) {
      login({ email: userEmail, password: userPassword, type: "jobseeker" });
      setUserEmail("");
      setUserPassword("");
    } else {
      login({ email: orgEmail, password: orgPassword, type: "organization" });

      setOrgEmail("");
      setOrgPassword("");
    }
  };

  return (
    <>
      {/* <ToastContainer></ToastContainer> */}
      <div className="main-wrapper">
        <Sidebar></Sidebar>

        <div className="content-wrapper flex flex-col ">
          <div className="nav-section">
            <JobNav jobtype={{ type: "Login", name: "Login" }}></JobNav>
          </div>

          {loader ? (
            <Loader></Loader>
          ) : (
            <div className=" scrollable-content flex  justify-center  ">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
                className="login-box flex flex-col items-center  w-[20rem] h-[max-content] mt-4 "
              >
                <div className="slider-login flex justify-between w-full">
                  <div
                    className={`header-user w-[50%] flex justify-center cursor-pointer ${
                      isUserLogin ? "" : "hover:text-[#13883e]"
                    }`}
                    onClick={() => setIsUserLogin(true)}
                    style={isUserLogin ? toggleStyle : {}}
                  >
                    User
                  </div>
                  <div
                    className={`header-org w-[50%] flex justify-center cursor-pointer ${
                      isUserLogin ? "hover:text-[#13883e]" : ""
                    }`}
                    onClick={() => setIsUserLogin(false)}
                    style={isUserLogin ? {} : toggleStyle}
                  >
                    Organization
                  </div>
                </div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={isUserLogin ? userEmail : orgEmail}
                  onChange={handleInputChange}
                  className="w-full text-[13px] h-10 border-[2px] p-2 rounded"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={isUserLogin ? userPassword : orgPassword}
                  onChange={handleInputChange}
                  className="w-full text-[13px] h-10 border-[2px] p-2 rounded"
                />

                <div className="login-btn-wrapper ">
                  <button
                    onClick={handleLogin}
                    className="submit-btn text-[14px] font-medium hover:bg-[#13883e]  "
                  >
                    Login
                  </button>
                </div>

                <div
                  onClick={() => {
                    if (isUserLogin) {
                      navigate("/signup/user");
                    } else {
                      navigate("/signup/organization");
                    }
                  }}
                  className="signin-head text-[13px] cursor-pointer hover:text-[#13883e]"
                >
                  {isUserLogin
                    ? "Don't have a user account? Join Now"
                    : "Hey! Join as an Organization!  "}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { AuthLogin };
