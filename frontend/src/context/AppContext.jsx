import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [carToken, setCarToken] = useState(() => localStorage.getItem('carToken') || '');

  const value = {
    carToken,
    setCarToken,
  };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
