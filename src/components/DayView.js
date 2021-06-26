import React, { useState, useEffect, createRef } from 'react';
import '../styles/DayView.css';

const DayView = ({ moveLeftRight }) => {

  let dt = new Date();
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [todayDate, setTodayDate] = useState(dt.getDate());
  const [todayDay, setTodayDay] = useState(dt.getDay());

  const boxes = createRef();

  useEffect(() => {
  }, []);

  useEffect(() => {
    drawBoxes();
    if(moveLeftRight !== 0){
      dt.setDate(dt.getDate() + moveLeftRight);
      setTodayDate(dt.getDate());
      setTodayDay(dt.getDay());
    }else{
      setTodayDate(dt.getDate());
      setTodayDay(dt.getDay());
    }
    
  }, [moveLeftRight]);

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
      for (let j = 0; j < 1; j++) {
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
          <div>{todayDate}</div>
          <div>{days[todayDay]}</div>
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