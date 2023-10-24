import { createContext } from "react";

const authContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => {},
});

export default authContext;
