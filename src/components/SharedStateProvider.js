import React, { createContext, useState, useContext } from 'react';

const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
  const [highlightedInput, setHighlightedInput] = useState(false);

  const updateHighlightedInput = (value) => {
    setHighlightedInput(value);
  };

  return (
    <SharedStateContext.Provider value={{ highlightedInput, updateHighlightedInput }}>
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return context;
};
