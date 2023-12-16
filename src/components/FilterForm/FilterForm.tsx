import React, { useState, ChangeEvent, FormEvent } from "react";
import "./FilterForm.css";
interface JobFiltersState {
  role: string;
  required_experience: [number, number];
  salary: [number, number];
  location: string;
}

function FilterForm() {
  const [filters, setFilters] = useState<JobFiltersState>({
    role: "",
    required_experience: [0, 10],
    salary: [0, 100000],
    location: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleExperienceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      required_experience: [0, value],
    }));
  };

  const handleSalaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFilters((prevFilters) => ({ ...prevFilters, salary: [0, value] }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle the submission of filters (e.g., send a request to the server with the filters)
    console.log("Filters submitted:", filters);
  };
  return (
    <>
      <form className="p-4 flex flex-col gap-1 ">
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={filters.role}
          onChange={handleInputChange}
          className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleInputChange}
          className="w-full text-[12px] h-8 border-[2px] p-2 rounded mt-3"
        />

        <label className="block mb-2 text-xs mt-2">
          Required Experience:
          <div className="flex items-center mt-2">
            <input
              type="range"
              name="required_experience"
              min={0}
              max={10}
              value={filters.required_experience[1]}
              onChange={handleExperienceChange}
              className="w-full appearance-none h-1  rounded-full bg-gray-300 outline-none"
            />
          </div>
          <div className="ml-2 text-xs mt-2">
            ${filters.required_experience[1]} years
          </div>
        </label>

        <label className="block mb-2 text-xs mt-2">
          Salary:
          <div className="flex items-center mt-2">
            <input
              type="range"
              name="salary"
              min={0}
              max={100000}
              value={filters.salary[1]}
              onChange={handleSalaryChange}
              className="w-full appearance-none h-1 rounded-full bg-gray-300 outline-none"
            />
            {/* <span className="ml-2">${filters.salary[1]}</span> */}
          </div>
          <div className="ml-2 mt-2">${filters.salary[1]}</div>
        </label>
        <div className="btn-wrapper">
          <button className="submit-btn text-xs " onClick={handleSubmit}>
            Apply
          </button>
        </div>
      </form>
    </>
  );
}

export { FilterForm };
