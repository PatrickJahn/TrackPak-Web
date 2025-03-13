import React, { createContext, PropsWithChildren, useContext } from "react";
import { AppRestServicesType, appServices } from "../services/appServices";

export const ServicesContext = createContext<AppRestServicesType | null>(null);

const ServicesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const services = appServices();
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = (): AppRestServicesType => {
  const services = useContext(ServicesContext);

  if (!services)
    throw new Error("useServices must be used within an ServicesContext");
  return services;
};

export default ServicesProvider;
