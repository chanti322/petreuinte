import React, { useState, createContext } from "react";
const initContextVariables = {
  pets: [],
  markers:[],
};

export const VariablesContext = createContext(initContextVariables);

export const VariablesContextProvider = ({ children }) => {
  const [pets, setPets] = useState(initContextVariables.pets);
    const [markers, setMarkers] = useState(initContextVariables.markers);
  console.log("in context", markers);
  return (
    <VariablesContext.Provider
      value={{
        pets,
        setPets,
        markers,
        setMarkers,
      }}
    >
      {children}
    </VariablesContext.Provider>
  );
};
