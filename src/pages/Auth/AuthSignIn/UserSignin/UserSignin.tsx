import React, { ChangeEvent, useState } from 'react';
import { JobNav, Loader, Sidebar } from '../../../../components/components';
import unknown from '../../../../assets/unknown.png';
import { BottomBar } from '../../../../components/BottomBar/BottomBar';
import './UserSignin.css';
import { useJobSeekerState } from '../../../../store/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface FormData {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  description: string;
  no_of_years_experience: number|string;
  phone_number: string;
  skills: string[];
  profile_picture: File | null;
  resume: File | null;
}

function UserSignin() {
  const {createUser,loader}=useJobSeekerState()
  const [inputListValue, setListValue] = useState<string>('');
  const [Success, setSuccess] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    description: '',
    no_of_years_experience: '',
    phone_number: '',
    skills: [],
    profile_picture: null,
    resume: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleListInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListValue(e.target.value);

  };
  const handleEnter = (e:any) => {
    if (e.keyCode === 13 && inputListValue.trim() !== '') {
      // Update the list with a new item, and limit to 15 elements
      e.preventDefault(); // Prevent the default form submission behavior

      setFormData((prev) => {
        const updatedList = [inputListValue, ...prev.skills.slice(0, 14)];
        setListValue(''); // Clear the input field after adding the item
        return {...prev,skills:updatedList};
      });
    }
  };
  const handleRemoveImage = () => {
    // Clear the selected image and preview
    setFormData((prev)=>{return {...prev,profile_picture:null}});
    // Clear the input field
    let imageInput=document.getElementById('imageInput')
    if (imageInput) {
        // Clear the input field
        imageInput.nodeValue = '';
      }
};
  const handleDelete = (index: number) => {
    setFormData(prevData => ({
      ...prevData,
      skills: prevData.skills.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith('image/')) {
      setFormData(prevData => ({
        ...prevData,
        profile_picture: file,
      }));
    } else {
      toast.error('Please select an image file.');
      event.target.value = ""; // Clear the input field
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type === 'application/pdf') {
      setFormData(prevData => ({
        ...prevData,
        resume: file,
      }));
    } else {
      toast.error('Please select a PDF file.');
      event.target.value = ""; // Clear the input field
    }
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement|HTMLButtonElement>) => {
    
    e.preventDefault(); // Prevent
    if (!formData.profile_picture || !formData.resume) {
      toast.error('Please upload both a profile picture and a resume.');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Invalid email format.');
      return;
    }

    // Validate password length (you can adjust the minimum length)
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    // Check if profile picture and resume are present
    if (!formData.profile_picture || !formData.resume) {
      toast.error('Please upload both a profile picture and a resume.');
      return;
    }

    createUser(formData);
    setFormData({
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      description: '',
      no_of_years_experience: '',
      phone_number: '',
      skills: [],
      profile_picture: null,
      resume: null,
    })
    
  };

  return (
    <>
              {/* <ToastContainer /> */}


      <div className="main-wrapper">
        <Sidebar></Sidebar>

        <div className="box-signin content-wrapper flex flex-col ">
          <div className="nav-section mt-6">
            <JobNav jobtype={{ type: 'User Signin', name: 'User Signin' }}></JobNav>
            {loader?
            <Loader></Loader>
            :<form method='POST' onSubmit={handleSubmit} className="login-box flex flex-col items-center  w-[25rem]  ">
              <input
                type="text"
                name="username"
                placeholder="Grab a unique username !"
                value={formData.username}
                required
                onChange={handleInputChange}
                className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
              />
              <div className="name-input flex w-full gap-2">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  required
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  required
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
                />
              </div>
              <input
                type="text"
                name="email"
                required 
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
              />
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
              />
              <textarea
                name="description"
                required
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full text-[12px] h-20 border-[2px] p-2 rounded min-h-10 max-h-[7rem]"
              />
              <input
                type='number'
                name="no_of_years_experience"
                required
                placeholder="No of year of Experience"
                value={formData.no_of_years_experience}
                min={0}
                max={20}
                onChange={handleInputChange}
                className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
              />
              <input
                type='tel'
                name="phone_number"
                required
                placeholder="Phone No"
                maxLength={10}
                min={10}
                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                value={formData.phone_number}
                onChange={handleInputChange}
                className="w-full text-[12px] h-8 border-[2px] p-2 rounded "
              />
              <div className='flex w-full gap-3 flex-wrap'>
                {formData.skills.map((skill, index) => (
                  <div className='flex gap-2 items-center primary-text ps-2 pe-2 border-[0.2px] border-solid border-[#888c91] rounded-[10px] hover:bg-[#13883e] hover:text-white' key={index}>
                    {skill}
                    <div className="cancel-button cursor-pointer" onClick={() => handleDelete(index)}>x</div>
                  </div>
                ))}
              </div>
              <input
                type='text'
                name="skills"
                
                value={inputListValue}
                onChange={handleListInputChange}
                onKeyDown={handleEnter}
                placeholder="only up to 15 Skills"
                className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
              />

              <div className='flex flex gap-2 justify-center items-center'>
                <div className="flex ">
                  {formData.profile_picture === null ? <img
                    src={unknown}
                    className="rounded-full border-grey border-[0.2px] border-solid h-20 w-20 object-contain"
                  /> : <> <img
                      src={URL.createObjectURL(formData.profile_picture)}
                      className="rounded-full h-20 w-20 object-contain"
                    />
                    <span onClick={handleRemoveImage}
                      className="  px-1 py-1
                    text-lg
                    text-red-500

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
                <label htmlFor="imageInput" className=" h-8 text-xs text-[#22C55E] hover:bg-[#13883e] hover:text-white px-2 py-2 text-xs   border-none rounded cursor-pointer select-none inline-block mt-4">
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
                <label htmlFor="fileInput" className=" h-8 text-xs text-[#22C55E] hover:bg-[#13883e] hover:text-white px-2 py-2 text-xs   border-none rounded cursor-pointer select-none inline-block mt-4">
                  Upload your resume
                </label>
                {formData.resume && (
                  <div>
                    Selected file: {formData.resume.name}
                  </div>
                )}
              </div>

              <div className="login-btn-wrapper ">
                <button type='submit'  className="submit-btn text-xs hover:bg-[#13883e]  ">SignUp</button>
              </div>
            </form>}
          </div>
        </div>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export { UserSignin };