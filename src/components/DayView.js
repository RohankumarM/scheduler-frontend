import React, { useEffect, createRef } from 'react';
import '../styles/DayView.css';

const DayView = () => {

  const boxes = createRef();

  useEffect(() => {
    drawBoxes();
  }, []);

  const drawBoxes = () => {
    let boxesDesign = document.querySelector('.day-view--time');
    for (let i = 0; i < 24; i++) {
      let parentDiv = document.createElement('div');
      parentDiv.classList.add('day-view--time-container');
      let numberDiv = document.createElement('p');
      if (i >= 12) {
        numberDiv.innerText = i + ' PM';
      } else {
        numberDiv.innerText = i + ' AM';
      }
      parentDiv.appendChild(numberDiv);
      for (let j = 0; j < 7; j++) {
        var boxDiv = document.createElement('div');
        boxDiv.classList.add('day-view-box');
        parentDiv.append(boxDiv);
        boxesDesign.appendChild(parentDiv);
      }
    }
  }

  return (
    <div className="day-view">
      <div className="day-view--top">
        <div className="day-view--weekdays">
          <div>Sunday</div>
        </div>
        <div className="day-view--container">
        </div>
      </div>

      <div className="day-view--bottom">
        <div className="day-view--time" ref={boxes}>
        </div>

      </div>
    </div>
  )
}

export default DayView;