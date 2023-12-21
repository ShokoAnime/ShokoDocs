// Imports
import React from "react";

const Accordion = ({ title, children }) => {
  return (
    <details className="accordion-wrapper">
      <summary className="accordion-header">{title}</summary>
      <div className="accordion-body">{children}</div>
    </details>
  );
};

export default Accordion;
