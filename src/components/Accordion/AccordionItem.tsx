// Imports
import React, { useContext } from 'react'
import { CurrentAccordionContext } from './Accordion'

const AccordionItem = (props) => {

  type activeProps = {
    isActive?: string,
    setIsActive?: Function
  }

  const { isActive, setIsActive } = useContext<activeProps>(CurrentAccordionContext)
  const activeTitle = isActive === props.title

  return (
    <div className='accordion-wrapper'>
      <div
        className={`accordion-header ${activeTitle ? 'accordion-header-open' : ''}`}
        onClick={() => setIsActive(activeTitle ? '' : props.title)}>
        <div>{props.title}</div>
        <div>{activeTitle ? '-' : '+'}</div>
      </div>
      {
        <div className={`accordion-body ${activeTitle ? 'accordion-body-open' : 'accordion-body-close'}`}
             id='accordion-content'>
          {activeTitle && <div>{props.children}</div>}
        </div>
      }
    </div>
  )

}

export default AccordionItem