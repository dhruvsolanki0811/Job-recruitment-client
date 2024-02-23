import { create } from "zustand"
import { Filter, Job } from "../types/types"

interface FilterState {
  filters: Filter
  setFilter: (filter: Filter) => void
  filteredJobs:Job[]|null
  setfilteredJobs:(jobs: Job[]) => void
  sortJob:(type:string,order:string)=>void,

}

export const useFilterStore = create<FilterState>()((set) => ({
filters: {},
setFilter: (filter:Filter) => set(() => ({ filters:filter })),
filteredJobs: null,
setfilteredJobs:(jobs:Job[] ) => set(() => ({ filteredJobs:jobs })),
sortJob: (type, order) => {
    set((state) => {
      // Check if state.filteredJobs is not null before attempting to sort
      if (state.filteredJobs) {
        return {
          ...state,
          filteredJobs: [...state.filteredJobs].sort((a, b) => {
            if (type === 'salary') {
              return order === 'asc' ? a.salary - b.salary : b.salary - a.salary;
            } else {
              return order === 'des'
                ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            }
          }),
        };
      } else {
        // Handle the case where state.filteredJobs is null
        return state;
      }
    })},
}))