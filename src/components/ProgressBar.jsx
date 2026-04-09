import React from 'react';

const ProgressBar = ({ percentage, label }) => {
  return (
    <div className="progress-container">
      <div className="progress-label">
        {label}
        <span className="progress-percentage">{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
