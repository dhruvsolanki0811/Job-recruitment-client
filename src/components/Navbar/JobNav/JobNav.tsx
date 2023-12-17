// JobNav.js
import { CiSearch } from "react-icons/ci";
import { GoSortDesc } from "react-icons/go";
import "../Nav.css";
import { useState, useRef, useEffect } from "react";
import unknown from "../../../assets/unknown.png";

type Job={
  id:number;
  type:string
}

type User={
  id:number;
  type:string

}
type JobNavProps = {
  jobtype: "All Jobs" | "Applied" | "Users" | "Company" | "Connections"|"Login"| "User Signin"|User|Job;
};

function JobNav({ jobtype }: JobNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <>
      {(jobtype === "Users" || jobtype === "Company" || jobtype==="Login" || jobtype==="User Signin") && (
        <>
          <div className="filters-tab w-full flex justify-between items-center ps-5 pe-5 h-[4.7rem]">
            <div className="head-filter">{jobtype}</div>
          </div>
          {(jobtype!=="Login" && jobtype!=="User Signin" ) &&
          <div className="search-section w-full h-19 ps-5 pt-3 pb-2 pe-5  ">
            <div className="input-search-container w-full flex justify-center items-center roundedfull ps-1 pe-1 ">
              <input type="text" placeholder="Search" className="search-box" />
              <CiSearch className="cursor-pointer"></CiSearch>
            </div>
          </div>}
        </>
      )}
      {(jobtype === "All Jobs" ||
        jobtype === "Connections" ||
        jobtype === "Applied") && (
        <>
          <div className="filters-tab w-full flex justify-between items-center ps-5 pe-5 h-[3rem]">
            <div className="head-filter">{jobtype}</div>
            <div
              className="filter-btn flex gap-2 items-center  p-1 rounded-xl cursor-pointer "
              onClick={toggleDropdown}
              ref={dropdownRef}
            >
              {(jobtype==="All Jobs" )&&<>
              <GoSortDesc className="cursor-pointer text-[20px]" />
              
              <div className="filter-btn-text text-xs flex-nowrap cursor-pointer">
                Sort
              </div></>}
              {(isOpen && jobtype==="All Jobs" )&& (
                <div className="absolute flex flex-col justify-center align-items-center top-[1.5rem] mt-2 space-y-2 bg-white border border-gray-300 rounded-md shadow-md">
                  <a
                    href="#"
                    className="block px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-100"
                  >
                    Recently Posted
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-100"
                  >
                    Salary Low-High
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-[13px] text-gray-700 hover:bg-gray-100"
                  >
                    Salary High-Low
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="search-section w-full h-19 ps-5 pt-1 pb-2 pe-5  ">
            <div className="input-search-container w-full flex justify-center items-center roundedfull ps-1 pe-1 ">
              <input type="text" placeholder="Search" className="search-box" />
              <CiSearch className="cursor-pointer"></CiSearch>
            </div>
          </div>
        </>
      )}
        {(typeof jobtype === 'object' && 'id' in jobtype && jobtype.type=="jobs") && <>
          <div className="filters-tab w-full flex gap-4 items-center ps-5 pe-5 h-[4.7rem]">
            <div className="head-filter">Jobs at Linkedin</div>
          </div>
          
        </>}

        {(typeof jobtype === 'object' && 'id' in jobtype && jobtype.type=="user") && <>
          <div className="filters-tab w-full flex gap-4 items-center ps-5 pe-5 h-[3.2rem]">
          <div className="username-container flex gap-3    items-center">
            <div className=" h-8 w-6">
              <img
                className=" object-cover overflow-hidden h-full"
                src={unknown}
              ></img>
            </div>
            UserName
          </div>
          </div>
          
        </>}
    </>
  );
}

export { JobNav };
