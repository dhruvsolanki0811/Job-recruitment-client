import React, { useState } from 'react'
import { Sidebar } from '../../../../components/components'
import unknow from "../../../../assets/placeholder-organization.png"
function OrganizationSignin() {
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
                  name="role"
                  placeholder="Name of the Organization"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Grab a unique username for your Company !"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />  
                


                <input
                  type="email"
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
                  placeholder="Overview about your Company"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-20 border-[2px] p-2 rounded min-h-10 max-h-[7rem]"
                />
                <input
                  type="text"
                  name="role"
                  placeholder="Location"
                  // value={filters.role}
                  // onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />
                <input
                type='number'
                name="yearInput"
                placeholder="Enter the year of  foundation"
                min="1900"
                max="2100"              
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />
                <input
                  name="website"
                  placeholder="Website"
                  type="url"

            
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded "
                />
               
               <div className='flex flex gap-2 justify-center items-center'>
    <div className="flex ">
          
          {selectedImagePreview===null ?  <img
            src={unknow}
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

export {OrganizationSignin}