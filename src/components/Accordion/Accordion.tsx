import type { ReactNode } from 'react';

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion = ({ title, children }: AccordionProps) => {
  return (
    <details className="accordion-wrapper">
      <summary className="accordion-header">{title}</summary>
      <div className="accordion-body">{children}</div>
    </details>
  );
};

export default Accordion;
