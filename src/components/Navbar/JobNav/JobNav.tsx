// JobNav.js
import { CiSearch } from "react-icons/ci";
import { GoSortDesc } from "react-icons/go";
import "../Nav.css";
import { useState, useRef, useEffect } from "react";
import unknown from "../../../assets/unknown.png";
import { useParams } from "react-router-dom";
import { MdOutlineFilterAlt } from "react-icons/md";
import { FilterForm } from "../../components";
import { useFilterStore } from "../../../store/FilterStore";
import { useFetchFilteredJobs } from "../../../hooks/useJobData";
import { useFetchSingleJobSeeker } from "../../../hooks/useJobseekerData";

type PropType = {
  name: string;
  type: string;
};

function JobNav({ jobtype }: { jobtype: PropType }) {
  const [Search, setSearch] = useState<string>("");
  const { username } = useParams();
  const { filters, setFilter, setfilteredJobs, sortJob } = useFilterStore();
  const { refetch } = useFetchFilteredJobs();
  const userName = username ? username : "";
  const { data: jobSeeker } = useFetchSingleJobSeeker(userName,jobtype.type);

  const handleSearchInput = (e: any) => {
    const { value } = e.target;
    setSearch(() => {
      return value;
    });

    setFilter({ ...filters, search: value });
    if (value == "") {
      const newFilter = { ...filters };
      delete newFilter.search;
      setFilter({ ...newFilter });
      setfilteredJobs([]);
    }
  };
  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      refetch();
    }
  };

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {(jobtype.type === "Users" || jobtype.type === "Applied") && (
        <>
          <div className="filters-tab w-full flex justify-between items-center ps-5 pe-5 p-5">
            <div className="head-filter">{jobtype.name}</div>
          </div>
        </>
      )}
      {(jobtype.type === "Login" || jobtype.type === "User Signin") && (
        <>
          <div className="filters-tab w-full flex justify-between items-center ps-5 pe-5 p-4">
            <div className="head-filter">{jobtype.name}</div>
          </div>
        </>
      )}
      {jobtype.type === "All Jobs" && (
        <>
          <div className="filters-tab w-full flex justify-between items-center ps-5 pe-5 h-[3rem]">
            <div className="head-filter text-[16px]">{jobtype.name}</div>
            <div className="flex  gap-3">
              {/* Modal Trigger Button */}
              <div
                onClick={openModal}
                className="nav-filter hidden gap-1 flex   justify-center items-center"
              >
                <MdOutlineFilterAlt className="cursor-pointer text-[20px]" />
                <div className="filter-btn-text text-[20px] text-xs flex-nowrap cursor-pointer">
                  Filter
                </div>
              </div>
              {/* Modal */}
              {isModalOpen && (
                <>
                  <div className="modal-bg backdrop  hidden fixed top-0 left-0 w-full h-full bg-gray-500 opacity-40 z-10 display-none"></div>

                  <div className=" modal-content hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-lg shadow-md z-30">
                    <ModalContent closeModal={closeModal} />
                  </div>
                </>
              )}
              <div
                className="filter-btn flex  gap-1 items-center  p-1 rounded-xl cursor-pointer "
                onClick={toggleDropdown}
                ref={dropdownRef}
              >
                {jobtype.type === "All Jobs" && (
                  <>
                    <GoSortDesc className="cursor-pointer text-[20px]" />

                    <div className="filter-btn-text text-[20px] text-xs flex-nowrap cursor-pointer">
                      Sort
                    </div>
                  </>
                )}
                {isOpen && (
                  <div className="absolute  text-left">
                    <div
                      className="absolute right-[-4rem] z-10 mt-6 w-60   origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                    >
                      <div className="py-1" role="none">
                        <div
                          onClick={() => {
                            sortJob("posted", "asc");
                          }}
                          className="text-gray-700  block px-4 py-2 text-[12px]"
                          role="menuitem"
                          id="menu-item-0"
                        >
                          Recently Posted
                        </div>
                        <div
                          onClick={() => {
                            sortJob("salary", "asc");
                          }}
                          className="text-gray-700 block px-4 py-2 text-[12px]"
                          role="menuitem"
                          id="menu-item-1"
                        >
                          Salary Low-High
                        </div>
                        <div
                          onClick={() => {
                            sortJob("salary", "des");
                          }}
                          className="text-gray-700 block px-4 py-2 text-[12px]"
                          role="menuitem"
                          id="menu-item-2"
                        >
                          Salary High-Low
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {jobtype.type === "All Jobs" && (
            <div className="search-section w-full h-19 ps-5 pt-3 pb-3 pe-5  ">
              <div className="input-search-container w-full flex justify-center items-center roundedfull ps-1 pe-1 ">
                <input
                  type="text"
                  placeholder="Search"
                  className="search-box"
                  value={Search}
                  onChange={handleSearchInput}
                  onKeyDown={handleEnter}
                />
                <CiSearch className="cursor-pointer"></CiSearch>
              </div>
            </div>
          )}
        </>
      )}
      {(jobtype.type == "Jobs" ||
        jobtype.type == "Company Description" ||
        jobtype.type == "Company" ||
        jobtype.type == "Connections") && (
        <>
          <div className="filters-tab w-full flex gap-4 items-center ps-5 pe-5 p-5">
            <div className="head-filter">{jobtype.name}</div>
          </div>
        </>
      )}

      {jobtype.type == "Single User" && (
        <>
          <div className="filters-tab w-full flex gap-4 items-center ps-5 pe-5 p-5">
            <div className="username-container flex gap-3    items-center">
              <div className=" h-8 w-8">
                <img
                  className=" object-cover overflow-hidden rounded-full h-full"
                  src={
                    jobSeeker?.profile_pic == null
                      ? unknown
                      : `${jobSeeker.profile_pic}`
                  }
                ></img>
              </div>
              {jobSeeker?.username}
            </div>
          </div>
        </>
      )}

      {jobtype.type == "User Profile" && (
        <>
          <div className="filters-tab w-full flex gap-4 items-center ps-5 pe-5 p-5">
            <div className="username-container flex gap-3    items-center">
              {jobtype?.name}
            </div>
          </div>
        </>
      )}
    </>
  );
}

function ModalContent({ closeModal }: { closeModal: () => void }) {
  // Add your modal content here
  return (
    <div className="modal-content p-2">
      <div className="w-full flex justify-end">
        <span className="cursor-pointer" onClick={closeModal}>
          X
        </span>
      </div>
      <h5>Filter</h5>
      <FilterForm></FilterForm>
      {/* <button
        onClick={closeModal}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Close Modal
      </button> */}
    </div>
  );
}
export { JobNav };
