import { createContext, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ data, children }) => (
    <DataContext.Provider value={data}>{children}</DataContext.Provider>
);

export const useData = () => useContext(DataContext);
