// Imports
import React, { createContext, useState } from "react";

export const CurrentAccordionContext = createContext({});

const Accordion = (props) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <CurrentAccordionContext.Provider value={{ isActive, setIsActive }}>
      {props.children}
    </CurrentAccordionContext.Provider>
  );
};

export default Accordion;
