// JobNav.js
import { CiSearch } from "react-icons/ci";
import { GoSortDesc } from "react-icons/go";
import "../Nav.css";
import { useState, useRef, useEffect } from "react";
import unknown from "../../../assets/unknown.png";
import {JobSeeker} from "../../../store/JobSeekerStore"
import { useJobSeekerState } from "../../../store/store";
import { useParams } from "react-router-dom";


type PropType={
  name:string;
  type:string
}



function JobNav({ jobtype }: {jobtype:PropType}) {
  const {jobSeeker,fetchSingleJobSeeker}=useJobSeekerState()
  const {username}=useParams()

  useEffect(()=>{
    if(jobtype.type=="Single User"){
if(username!=null){
      fetchSingleJobSeeker(username)
}
    }  
  },[])
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
    {(jobtype.type === "Users" )&&<>
    <div className="filters-tab w-full flex justify-between items-center ps-5 pe-5 h-[3.3rem]">
            <div className="head-filter">{jobtype.name}</div>
          </div>
          <div className="search-section w-full h-19 ps-5 pt-3 pb-2 pe-5  ">
            <div className="input-search-container w-full flex justify-center items-center roundedfull ps-1 pe-1 ">
              <input type="text" placeholder="Search" className="search-box" />
              <CiSearch className="cursor-pointer"></CiSearch>
            </div>
          </div>
    </>}
      {( jobtype.type=="Company Description"||jobtype.type=="Company" || jobtype.type==="Login" || jobtype.type==="User Signin") && (
        <>
          <div className="filters-tab w-full flex justify-between items-center ps-5 pe-5 h-[5rem]">
            <div className="head-filter">{jobtype.name}</div>
          </div>
          {(jobtype.type!=="Login" && jobtype.type!=="User Signin" ) &&
          <div className="search-section w-full h-19 ps-5 pt-3 pb-2 pe-5  ">
            <div className="input-search-container w-full flex justify-center items-center roundedfull ps-1 pe-1 ">
              <input type="text" placeholder="Search" className="search-box" />
              <CiSearch className="cursor-pointer"></CiSearch>
            </div>
          </div>}
        </>
      )}
      {(jobtype.type === "All Jobs" ||
        jobtype.type === "Connections" ||
        jobtype.type === "Applied") && (
        <>
          <div className="filters-tab w-full flex justify-between items-center ps-5 pe-5 h-[3rem]">
            <div className="head-filter">{jobtype.name}</div>
            <div
              className="filter-btn flex  gap-1 items-center  p-1 rounded-xl cursor-pointer "
              onClick={toggleDropdown}
              ref={dropdownRef}
            >
              {(jobtype.type==="All Jobs" )&&<>
              
              <GoSortDesc className="cursor-pointer text-[20px]" />
              
              <div className="filter-btn-text text-[20px] text-xs flex-nowrap cursor-pointer">
                Sort
              
              </div>
              
  
              </>}
              { isOpen && (
                <div className="absolute  text-left">

 <div className="absolute right-[-4rem] z-10 mt-6 w-57   origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
 <div className="py-1" role="none">
   <a href="" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0">Recently Posted</a>
   <a href="" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"  id="menu-item-1">Salary Low-High</a>
   <a href="" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"  id="menu-item-2">Salary High-Low</a>

 </div>
</div>
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
        {(jobtype.type=="Jobs") && <>
          <div className="filters-tab w-full flex gap-4 items-center ps-5 pe-5 h-[4.7rem]">
            <div className="head-filter">{jobtype.name}</div>
          </div>
          
        </>}

        {(jobtype.type =="Single User") && <>
          <div className="filters-tab w-full flex gap-4 items-center ps-5 pe-5 h-[3.2rem]">
          <div className="username-container flex gap-3    items-center">
            <div className=" h-8 w-6">
              <img
                className=" object-cover overflow-hidden rounded-full h-full"
                src={(jobSeeker?.profile_pic==null)?unknown:`${jobSeeker.profile_pic}`}
              ></img>
            </div>
            {jobSeeker?.username}
          </div>
          </div>
          
        </>}
    </>
  );
}

export { JobNav };
