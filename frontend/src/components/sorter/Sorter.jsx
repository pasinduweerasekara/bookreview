import React, { useState } from "react";
import "./sorter.css";

const Sorter = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select an option");

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsHovered(false);
  };

  return (
    <div id="sorter">
      <div
        className="sorter-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="sorter-selected">
          {selectedOption}
          <span className="sorter-arrow">&#9662;</span>
        </div>
        {isHovered && (
          <div className="sorter-options">
            <div onClick={() => handleOptionClick("Sort by Name")}>
              Sort by Name
            </div>
            <div onClick={() => handleOptionClick("Sort by Date")}>
              Sort by Date
            </div>
            <div onClick={() => handleOptionClick("Sort by Popularity")}>
              Sort by Popularity
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sorter;
