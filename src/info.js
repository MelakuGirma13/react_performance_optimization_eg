import React, { useState } from "react";

export const Info = React.memo(
  function Info(props) {
    const [exapnded, setExpanded] = useState(false);
    const Stars = Object.values(props.Stars);

    const distances = { max: 0, min: 1000 };
    Stars.forEach((currentStar) => {
      Stars.forEach((compareStar) => {
        if (compareStar === currentStar) {
          return;
        }

        distances.max = Math.max(
          distances.max,
          Math.max(Number(currentStar.age), Number(compareStar.age))
        );
        distances.min = Math.min(
          distances.min,
          Math.min(Number(currentStar.age), Number(compareStar.age))
        );
      });
    });

    const expandHandler = () => setExpanded(!exapnded);

    return (
      <div className={exapnded ? "bar" : "board"}>
        <div>You have {Object.keys(props.Stars).length} stars!</div>
        <div>Age of the oldest star: {distances.max}</div>
        <div>Age of the youngest star: {distances.min}</div>
        <span className="expand" onClick={expandHandler}>
          ◤ ◥
        </span>
      </div>
    );
  },
  
  (prevProps, nextProps) => {
    return (
      Object.keys(prevProps.Stars).length ===
      Object.keys(nextProps.Stars).length
    );
  }
);
