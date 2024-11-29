import React from "react";

import { AuthProvider } from "./AuthContext";

type PropsGlobalContext = {
  children: React.ReactNode;
};
const GlobalContext: React.FC<PropsGlobalContext> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default GlobalContext;