import React from "react";
import { FavSection, JobNav, Sidebar } from "../../components/components";
import placeHolder from "../../assets/unknown.png";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../../components/BottomBar/BottomBar";

function FollowersList() {
  const navigate = useNavigate();

  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>
        <div className="content-wrapper flex flex-col ">
          <div className="nav-section">
            <JobNav jobtype={{type:"Connections",name:"Connections"}}></JobNav>
            <div className="section-jobtype w-full h-7 ps-5 pe-5 flex">
              <div
                onClick={() => navigate("/followers")}
                className="jobtype-container cursor-pointer all-section primary-text flex justify-center"
              >
                Followers
              </div>
              <div
                onClick={() => navigate("/following")}
                className="jobtype-container cursor-pointer primary-text flex justify-center"
              >
                Following
              </div>
            </div>
          </div>
          <div className="people-grid flex p-3  w-full ">
            {[2, 3, 4, 5, 7, 8, 9, 2.2, 23, 2, 32].map(() => (
              <>
                <div className="people-box flex flex-col  ps-3 pe-3">
                  <div className="follow-container flex justify-between items-center">
                    <div className="profile-pic  h-8 w-8 mt-2 overflow-hidden border-[1px] rounded-full">
                      <img
                        className=" object-cover  h-8 "
                        src={placeHolder}
                      ></img>
                    </div>

                    {/* <div className="follow-btn text-xs ps-2 pe-2 border-[1px] rounded border-solid border-black">Followed</div> */}
                  </div>

                  <div className="people-username text-xs mt-1">
                    Anurag Kumar
                  </div>
                  <div className="people-desc color-lgt-grey w-full text-[10px] pe-4 mb-1">
                    First-year undergrad at Indian Institute of Informationz
                    Technology Technology.
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <FavSection page="Connections"></FavSection>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { FollowersList };
