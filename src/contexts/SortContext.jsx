import { createContext, useState } from "react";

export const SortContext = createContext();

export const SortProvider = ({ children }) => {
  const [SortOption, setSortOption] = useState("sender");

  const ChangeSortOption = (option) => {
    console.log("Context: 현재 변경 옵션", option);
    setSortOption(option);
  };

  return (
    <SortContext.Provider value={{ SortOption, ChangeSortOption }}>
      {children}
    </SortContext.Provider>
  );
};
