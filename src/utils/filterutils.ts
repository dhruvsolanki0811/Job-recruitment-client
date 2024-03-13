import { Filter } from "../types/types";

export function isFilterApplied(filter:Filter) {
    // Check if the object is empty or if the search property is an empty string
    
    if (Object.keys(filter).length === 0 ){
        
        return false
    }
    if (filter.search && filter.search === "") {
        return false;
    }
    if (filter.role && filter.role === "") {
        return false;
    }
  
    return true;
}