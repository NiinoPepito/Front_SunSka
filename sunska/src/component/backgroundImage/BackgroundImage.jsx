import React from 'react';
import './BackgroundImage.css';

const BackgroundImage = ({ children }) => {
  return (
    <div className="bg-image flex items-center justify-center min-h-screen bg-cover bg-center">
      {children}
    </div>
  );
};

export default BackgroundImage;
