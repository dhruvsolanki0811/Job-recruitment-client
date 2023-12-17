import React, { ChangeEvent, EventHandler, KeyboardEventHandler, useState } from 'react'
import { JobNav, Sidebar } from '../../../../components/components'
import "./UserSignin.css"
import unknown from "../../../../assets/unknown.png"
function UserSignin() {
  const [selectedImage, setSelectedImage] = useState<String|null>(null)
  const [selectedImagePreview, setSelectedImagePreview] = useState<String|null>(null);

  const handleImageChange = (event:any) => {
    const file = event.target.files[0];

    // Check if the file is an image
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);

      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setSelectedImagePreview(previewUrl);
    } else {
      alert('Please select an image file.');
      // Clear the input field
      event.target.value = null;
    }
  };

  const handleRemoveImage = () => {
    // Clear the selected image and preview
    setSelectedImage(null);
    setSelectedImagePreview(null);
    // Clear the input field
    let imageInput=document.getElementById('imageInput')
    if (imageInput) {
        // Clear the input field
        imageInput.nodeValue = '';
      }
};

    const [selectedFile, setSelectedFile] = useState<null|any>(null);

    const handleFileChange = (event :any) => {
        const file = event.target.files[0];
    
        // Check if the file is a PDF
        if (file && file.type === 'application/pdf') {
          setSelectedFile(file);
        } else {
          alert('Please select a PDF file.');
          // Clear the input field
          event.target.value = null;
        }
      };

    const [inputListValue, setListValue] = useState<string>('');
  const [itemList, setItemList] = useState<string[]>([]);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListValue(e.target.value);

  };
  const handleEnter = (e:any) => {
    if (e.keyCode === 13 && inputListValue.trim() !== '') {
      // Update the list with a new item, and limit to 15 elements
      setItemList((prevList) => {
        const updatedList = [inputListValue, ...prevList.slice(0, 14)];
        setListValue(''); // Clear the input field after adding the item
        return updatedList;
      });
    }
  };
  const handleDelete = (index: number) => {
    // Remove the item at the specified index
    setItemList((prevList) => prevList.filter((_, i) => i !== index));
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
                  <div className={`header-org flex justify-center items-center cursor-pointer `}>Fill the below form to create a JobCom Profile</div>
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Grab a unique username !"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />  
                <div className="name-input flex w-full gap-2">
                <input
                  type="text"
                  name="username"
                  placeholder="Firstname"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />  <input
                type="text"
                name="username"
                placeholder="Lastname"
                // value={filters.role}
                // onChange={handleInputChange}
                className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
              />  
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
                <textarea
                  name="role"
                  placeholder="Description"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-20 border-[2px] p-2 rounded min-h-10 max-h-[7rem]"
                />
                <input
                type='number'
                  name="experience"
                  placeholder="No of year experience"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />
                <input
                type='tel'
                  name="Phone"
                  placeholder="Phone No"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded "
                />
                <div className='flex w-full gap-3 flex-wrap'>
                    {itemList.map((skill,index)=>{return <div className='flex gap-2 items-center primary-text ps-2 pe-2 border-[0.2px] border-solid border-[#888c91] rounded-[10px] hover:bg-[#13883e] hover:text-white' >{skill} 
                    <div className="cancel-button cursor-pointer" onClick={() => handleDelete(index)}>x</div>
                    </div>})}
                </div>
                <input
                type='text'
                  name="Phone"
                  value={inputListValue}
                  onChange={handleInputChange}
                  onKeyDown={handleEnter}
                  placeholder="only upto 15 Skills"
                  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />

                
    <div className='flex flex gap-2 justify-center items-center'>
    <div className="flex ">
          
          {selectedImagePreview===null ?  <img
            src={unknown}
            className="rounded-full border-grey border-[0.2px] border-solid h-20 w-20 object-contain"
          />:<> <img
          src={selectedImagePreview?.toString()}
          className="rounded-full h-20 w-20 object-contain"
        />
          <span
            onClick={handleRemoveImage}
            className="  px-1 py-1
            text-lg
            text-red-500
            text-white
            border-none
            rounded
            cursor-pointer
            "
          >
            x
          </span>
          </>}
        </div>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="imageInput" className=" h-8 text-xs text-[#22C55E] hover:bg-[#13883e] hover:text-white px-2 py-2 text-xs  text-white border-none rounded cursor-pointer select-none inline-block mt-4">
        Choose a profile picture
      </label>
      
        
      
    </div>

<div className='flex items-center justify-center flex-col'>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="fileInput" className=" h-8 text-xs text-[#22C55E] hover:bg-[#13883e] hover:text-white px-2 py-2 text-xs  text-white border-none rounded cursor-pointer select-none inline-block mt-4"> 
        Upload your resume
      </label>
      {selectedFile && (
        <div>
          Selected file: {selectedFile.name}
        </div>
      )}
    </div>


                <div className="login-btn-wrapper ">
                  <button className="submit-btn text-xs hover:bg-[#13883e]  ">SignUp</button>
                </div>

                {/* <div onClick={()=>{if(UserLogin){navigate("/signup/user")}else{navigate("/signup/organization")}}} className="signin-head text-xs cursor-pointer hover:text-[#13883e]">{UserLogin?"Don't have an user account? Join Now":"Hey! Join as a Organization!  "}</div> */}
              </div>
            </div>
            
          </div>
        </div>
      </div>
</>
    )
}

export {UserSignin}