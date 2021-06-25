import React, { useEffect, createRef } from 'react';
import '../styles/WeekView.css';

const WeekView = ({ moveLeftRight }) => {

  const calendar = createRef();
  const boxes = createRef();
  let daysInMonth;
  let paddingDaysOfMonth;
  let todayDate;

  useEffect(() => {
    drawBoxes();
  }, []);

  useEffect(() => {
    CalendarUtil();
    printCalendar();
  }, [moveLeftRight]);

  const CalendarUtil = () => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const date = new Date();

    if (moveLeftRight !== 0) {
      date.setDate(new Date().getDate());
      todayDate = new Date().getDate() + moveLeftRight * 7;
    }else{
      todayDate = new Date().getDate();
    }

    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    const startingDateOfMonth = new Date(year, month, date);
    daysInMonth = new Date(year, month + 1, 0).getDate();

    console.log(startingDateOfMonth);
    const dateInStringFormat = startingDateOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
    console.log(dateInStringFormat);

    paddingDaysOfMonth = weekdays.indexOf(dateInStringFormat.split(", ")[0]);
    console.log(paddingDaysOfMonth)
  }

  const printCalendar = () => {
    CalendarUtil();
    const padding = paddingDaysOfMonth;
    const days = daysInMonth;

    calendar.current.innerHTML = '';

    console.log(padding, days);
    for (let i = 1; i <= days + moveLeftRight * 6; i++) {
      const daysSquare = document.createElement('div');
      daysSquare.classList.add('week-view--calendar');
      let date = new Date();
      let currentMonth = date.getMonth() + 1 + moveLeftRight % 12;
      let currentYear;
      if (new Date().getMonth() - 1 + moveLeftRight >= 11) {
        currentYear = date.getFullYear() + 1;
      } else {
        currentYear = date.getFullYear();
      }

      const clickedDate = `${currentYear}-${('0' + currentMonth).slice(-2)}-${('0' + (i - padding)).slice(-2)}`;

      if (i > padding) {
        daysSquare.innerText = i - padding;

        // daysSquare.addEventListener('click', () => displayModal(clickedDate));
      } else {
        // daysSquare.innerText = days;
      }

      calendar.current.appendChild(daysSquare);
    }
  }

  const drawBoxes = () => {
    let boxesDesign = document.querySelector('.week-view--time');
    boxesDesign.innerHTML = '';
    for (let i = 0; i < 24; i++) {
      let parentDiv = document.createElement('div');
      parentDiv.classList.add('week-view--time-container');
      let numberDiv = document.createElement('p');
      if (i >= 12) {
        numberDiv.innerText = i + ' PM';
      } else {
        numberDiv.innerText = i + ' AM';
      }
      parentDiv.appendChild(numberDiv);
      for (let j = 0; j < 7; j++) {
        var boxDiv = document.createElement('div');
        boxDiv.classList.add('week-view-box');
        parentDiv.append(boxDiv);
        boxesDesign.appendChild(parentDiv);
      }
    }
  }

  return (
    <div className="week-view">
      <div className="week-view--top">
        {/* <button>Next</button>
        <button>Prev</button> */}

        <div className="week-view--weekdays">
          <div>Sunday</div>
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div>Saturday</div>
        </div>
        <div className="week-view--container" ref={calendar}>
        </div>
      </div>

      <div className="week-view--bottom">
        <div className="week-view--time" ref={boxes}>
        </div>

      </div>
    </div>
  )
}

export default WeekView;
