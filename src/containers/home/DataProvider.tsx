import React, { createContext, useContext, useState } from "react";

const initialValues = {
  requisitionDetails: {
    gender: "",
    noOfOpenings: 0,
    requisitionTitle: "",
    urgency: "",
    isComplete: false,
  },
  jobDetails: {
    jobDetails: "",
    jobLocation: "",
    jobTitle: "",
    isComplete: false,
  },
  interviewSettings: {
    interviewDuration: "",
    interviewLanguage: "",
    interviewMode: "",
    isComplete: false,
  },
};

const DataContext = createContext<{
  state: typeof initialValues;
  setState: React.Dispatch<React.SetStateAction<typeof initialValues>>;
} | null>(null);

const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState(initialValues);

  return (
    <DataContext.Provider value={{ state, setState }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};

export default DataProvider;
