import { getUserDetails } from "./getuserdetail";
import { getOrgId } from "./getorgid";  // Assuming this is a function that retrieves the active org ID

// A utility function that fetches the user details (ID) and fetches the organizations
export const currentOrg = async (): Promise<any | null> => {
  // Get user details from localStorage
  const userDetails = getUserDetails();
  
  if (userDetails && userDetails.id) {
    try {
      // Fetch organizations for the user
      const response = await fetch(`/api/orgstore`);
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error("Failed to fetch organizations.");
      }
  
      // Parse the response to get organizations
      const result = await response.json();
  
      // Get the active organization ID (assuming it's available)
      const activeOrgId = getOrgId(); // The active organization ID, assuming you have this function
      if(!activeOrgId){
        window.location.href = "/organization";
      }
      // Find the organization that matches the activeOrgId
      const matchedOrg = result.organizations.find((org: { id: string }) => org.id === activeOrgId);

      // Return the matched organization or null if not found
      return matchedOrg || null;
    } catch (err) {
      console.error("Error fetching organizations:", err);
      return null; // Return null if there is an error
    }
  } else {
    console.error("User ID is missing in localStorage.");
    return null; // Return null if user details are not found
  }
};
