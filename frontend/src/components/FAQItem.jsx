import { useState } from "react";
import '../styles/components/FAQitem.css';

function FAQItem({ question, answer }) {
  
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(prev => !prev);
  };

  return (
    <div className="faq-item">
      <button
        onClick={handleClick}
        aria-expanded={expanded}  
        className="faq-question"
      >
        {question}
      </button>

      <div className={`faq-answer ${expanded ? "open" : ""}`}>
        {answer}
      </div>
    </div>
  );
}

export default FAQItem;
