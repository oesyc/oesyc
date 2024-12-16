export const getOrgId = (): string | null => {
    if (typeof window !== "undefined") {
      const storedOrgId = localStorage.getItem("orgdetails");
      return storedOrgId ? JSON.parse(storedOrgId) : null;
    }
    return null;
  };