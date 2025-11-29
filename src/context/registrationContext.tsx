"use client";
import React, { createContext, ReactNode, useState, useContext } from "react";


// Registration form
export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Initial values for registration data
const initialRegistrationData: RegistrationData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

// Context type
interface RegistrationContextType {
  registrationData: RegistrationData;
  setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
}

// Create the context
const RegistrationContext = createContext<RegistrationContextType | undefined>(
  undefined
);

// Provider component
export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>(
    initialRegistrationData
  );

  return (
    <RegistrationContext.Provider
      value={{ registrationData, setRegistrationData }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

// Custom hook to use the registration context
export function useRegistration(): RegistrationContextType {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error(
      "useRegistration must be used within a RegistrationProvider"
    );
  }
  return context;
}
