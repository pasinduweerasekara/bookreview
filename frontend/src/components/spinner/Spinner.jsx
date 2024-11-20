import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import './spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-container">
      <FaSpinner className="spinner" />
    </div>
  );
};

export default Spinner;
