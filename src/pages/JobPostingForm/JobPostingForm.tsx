import React, { ChangeEvent, useState } from "react";
import { FavSection, Sidebar } from "../../components/components";
import { BottomBar } from "../../components/BottomBar/BottomBar";

function JobPostingForm() {
  const [inputListValue, setListValue] = useState<string>("");
  const [itemList, setItemList] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListValue(e.target.value);
  };
  const handleEnter = (e: any) => {
    if (e.keyCode === 13 && inputListValue.trim() !== "") {
      // Update the list with a new item, and limit to 15 elements
      setItemList((prevList: any) => {
        const updatedList = [inputListValue, ...prevList.slice(0, 14)];
        setListValue(""); // Clear the input field after adding the item
        return updatedList;
      });
    }
  };
  const handleDelete = (index: number) => {
    // Remove the item at the specified index
    setItemList((prevList: any) =>
      prevList.filter((_: any, i: any) => i !== index)
    );
  };

  return (
    <>
      <div className="main-wrapper">
        <Sidebar></Sidebar>

        <div className="box-signin content-wrapper flex flex-col ">
          <div className="nav-section mt-6">
            {/* <JobNav jobtype="User Signin"></JobNav> */}
            <div className=" login-container flex flex-col items-center  h-full">
              <div className=" login-box flex flex-col items-center  w-[25rem]  ">
                <div className="slider-login flex justify-between w-full">
                  {/* <div className={`header-user w-[50%] flex justify-center cursor-pointer ${UserLogin?``:`hover:text-[#13883e]`}`} onClick={()=>SetUserLogin(true)} style={UserLogin?toggleStyle:{}}>User</div> */}
                  <div
                    className={`header-org flex justify-center items-center cursor-pointer `}
                  >
                    Fill the required Job Details
                  </div>
                </div>
                <input
                  type="text"
                  name="Role"
                  placeholder="Role"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />
              
                <textarea
                  name="role"
                  placeholder="Description"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-20 border-[2px] p-2 rounded min-h-10 max-h-[7rem]"
                />
                <input
                  type="number"
                  name="experience"
                  placeholder="No of year experience"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />
                <input
                  type="text"
                  name="experience"
                  placeholder="Type example-Full Time"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />
                <input
                  type="number"
                  name="experience"
                  placeholder="Salary In terms of lpa example- 5 (5lpa)"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />
                <div className="flex w-full gap-3 flex-wrap">
                  {itemList.map((skill, index) => {
                    return (
                      <div className="flex gap-2 items-center primary-text ps-2 pe-2 border-[0.2px] border-solid border-[#888c91] rounded-[10px] hover:bg-[#13883e] hover:text-white">
                        {skill}
                        <div
                          className="cancel-button cursor-pointer"
                          onClick={() => handleDelete(index)}
                        >
                          x
                        </div>
                      </div>
                    );
                  })}
                  <input
                type='text'
                  value={inputListValue}
                  onChange={handleInputChange}
                  onKeyDown={handleEnter}
                  placeholder="only upto 15 Skills"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />
                 
                </div>
                
                <div className="login-btn-wrapper ">
                    <button className="submit-btn text-xs hover:bg-[#13883e]  ">
                      SignUp
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <FavSection page="Company"></FavSection>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { JobPostingForm };
