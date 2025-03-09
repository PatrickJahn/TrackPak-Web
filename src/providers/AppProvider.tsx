import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default AppProvider;
