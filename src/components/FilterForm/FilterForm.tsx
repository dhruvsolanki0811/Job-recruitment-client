import  { useState, ChangeEvent, FormEvent } from "react";
import "./FilterForm.css";
import { useJobStore } from "../../store/JobStore";

interface JobFiltersState {
  role: string;
  required_experience: [number, number];
  salary: [number, number];
  // location: string;
}

function FilterForm() {
  const [filters, setFilters] = useState<JobFiltersState>({
    role: "",
    required_experience: [0, 10],
    salary: [0, 100],
    // location: "",
  });
  const { fetchJobs } = useJobStore();
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
    const filterSent: {
      required_experience__lte?: number;
      salary__lte?: number;
      [key: string]: any; // This allows other properties with any value
    } = {
      required_experience__lte: filters.required_experience[1],
      salary__lte: filters.salary[1],
    };

    if (filters.role.length > 0) {
      filterSent["role"] = filters.role;
    }

    fetchJobs(filterSent);
    // Handle the submission of filters (e.g., send a request to the server with the filters)
  };

  return (
    <>
      <form className="p-4 flex flex-col gap-1">
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={filters.role}
          onChange={handleInputChange}
          className="w-full text-[12px] h-8 border-[2px] p-2 rounded"
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
            {filters.required_experience[1]} years
          </div>
        </label>

        <label className="block mb-2 text-xs mt-2">
          Salary:
          <div className="flex items-center mt-2">
            <input
              type="range"
              name="salary"
              min={0}
              max={100}
              value={filters.salary[1]}
              onChange={handleSalaryChange}
              className="w-full appearance-none h-1 rounded-full bg-gray-300 outline-none"
            />
          </div>
          <div className="ml-2 mt-2">${filters.salary[1]}Lpa</div>
        </label>

        <div className="btn-wrapper">
          <button className="submit-btn text-xs" onClick={handleSubmit}>
            Apply
          </button>
        </div>
      </form>
    </>
  );
}

export { FilterForm };
