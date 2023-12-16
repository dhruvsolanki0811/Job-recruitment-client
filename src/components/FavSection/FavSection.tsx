import "./FavSection.css";
import { IoIosNotificationsOutline } from "react-icons/io";
import logo from "../../assets/unknown.png";
import placeHolder from "../../assets/placeholder-organization.png";

import { FaArrowRightLong } from "react-icons/fa6";
import { FilterForm } from "../components";
type pageType = {
  page: "Users" | "All Job" | "Company" | "Connections";
};
function FavSection({ page }: pageType) {
  return (
    <>
      <div className="fav-section ps-1 pe-1">
        <div className="top-section h-9 text-xs flex justify-between  items-center ps-4 pe-4 gap-5">
          <div className="username-container flex gap-1    items-center">
            <div className=" h-8 w-6">
              <img
                className=" object-cover overflow-hidden h-full"
                src={logo}
              ></img>
            </div>
            UserName
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
          <div className="text-holder flex justify-between items-center text-xs font-medium ms-3 me-3">
            People on JobCom
            <FaArrowRightLong />
          </div>
          <div className="user-desc flex flex-col gap-[2px] w-full ps-2 pe-2">
            {[1, 2, 3].map(() => {
              return (
                <>
                  <div className="profile-pic-follow flex flex-between items-center">
                    <div className="profile-pic  flex flex-between items-center h-8 w-8 mt-2 overflow-hidden border-[1px] rounded-full">
                      <img className=" object-cover  h-8 " src={logo}></img>
                    </div>
                    <div className="people-username text-xs mt-3 ms-2">
                      Anurag Kumar
                    </div>
                  </div>
                  <div className="people-desc color-lgt-grey w-full text-[10px] ps-2 pe-2 mb-1">
                    First-year undergrad at Indian Institute of Informationz
                    Technology Technology.
                  </div>
                </>
              );
            })}
          </div>
        </div>
        {(page === "Users" || page === "Company" || page === "Connections") && (
          <div className="people-rec-section w-full flex flex-col mt-6 ">
            <div className="text-holder flex mb-2 justify-between items-center text-xs font-medium ms-3 me-3">
              Organizations on JobCom
              <FaArrowRightLong />
            </div>
            <div className="user-desc flex flex-col gap-[2px] w-full ps-2 pe-2">
              {[1, 2, 3].map(() => {
                return (
                  <>
                    <div className="profile-pic-follow mt-1 flex flex-between items-center">
                      <div className="profile-pic  flex flex-between items-center h-8 w-8 mt-2 overflow-hidden border-[1px] rounded-full">
                        <img
                          className=" object-contain  h-8 "
                          src={placeHolder}
                        ></img>
                      </div>
                      <div className="people-username text-xs mt-3 ms-2">
                        Linkedin
                      </div>
                    </div>
                    <div className="people-desc color-lgt-grey w-full text-[10px] ps-2 pe-2 mb-1">
                      First-year undergrad at Indian Institute of Informationz
                      Technology Technology.
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export { FavSection };
