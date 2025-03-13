"use client";
import { createContext, useState, useContext } from "react";

export const PreviewContext = createContext();

export const PreviewProvider = ({ children }) => {
  const [hasPreviewed, setHasPreviewed] = useState(false);

  return (
    <PreviewContext.Provider value={{ hasPreviewed, setHasPreviewed }}>
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreview = () => useContext(PreviewContext);
