import '../css/SuccessMessage.css';
import React, { useState, useEffect } from 'react';

import { IconCircleDashedCheck } from '@tabler/icons-react';

const PopUpMessage = ({ message, duration = 3000, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible&&message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer); // Cleanup on unmount or message change
    }
  }, [isVisible, message, duration]);

  return (
    <div className={`success-message ${isVisible ? 'show' : ''}`}>
      <IconCircleDashedCheck stroke={2} size={24}/>
      {message}
    </div>
  );
};

export default PopUpMessage;