import React, { useState, createContext } from "react";
const initContextVariables = {
  pets: [],
};

export const VariablesContext = createContext(initContextVariables);

export const VariablesContextProvider = ({ children }) => {
  const [pets, setPets] = useState(initContextVariables.pets);
  console.log("in context", pets);
  return (
    <VariablesContext.Provider
      value={{
        pets,
        setPets,
      }}
    >
      {children}
    </VariablesContext.Provider>
  );
};
