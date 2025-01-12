import React, { useState, useMemo } from "react";

export const Info = React.memo(
  function Info(props) {
    const [exapnded, setExpanded] = useState(false);
    const Stars = Object.values(props.Stars);
    const distances = useMemo(() => {
      const distancesCalc = { max: 0, min: 1000 };
      Stars.forEach((currentStar) => {
        //heavy operation
        //every time info component re-render this operation calculated
        Stars.forEach((compareStar) => {
          if (compareStar === currentStar) {
            return;
          }

          distancesCalc.max = Math.max(
            distancesCalc.max,
            Math.max(Number(currentStar.age), Number(compareStar.age))
          );
          distancesCalc.min = Math.min(
            distancesCalc.min,
            Math.min(Number(currentStar.age), Number(compareStar.age))
          );
        });
      });
      return distancesCalc;
    }, [Object.keys(Stars).length]);

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
    // .we pass a state value form App.js as prop .in info.js we use React.memo and include the component in first param
    // 	and on second param we compare the prop we passed from App.js and compare with previous state, if there is differene we re-render info component else we don't

    return (
      Object.keys(prevProps.Stars).length ===
      Object.keys(nextProps.Stars).length
    );
  }
);
