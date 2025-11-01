import React, { useContext, useEffect } from 'react';
import { ecommerceCntx } from '../../utils/ecommerceCntx/ecommerceCntx';
import './Feedback.css';

function Feedback() {
  const { feedback, setFeedback } = useContext(ecommerceCntx);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        setFeedback(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback, setFeedback]);

  if (!feedback) {
    return null;
  }

  return (
    <div className={`feedback-toast ${feedback.type}`}>
      {feedback.message}
    </div>
  );
}

export default Feedback;