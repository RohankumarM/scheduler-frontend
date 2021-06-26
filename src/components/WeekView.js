import React, { useEffect, createRef } from 'react';
import '../styles/WeekView.css';

const WeekView = ({ moveLeftRight }) => {

  const calendar = createRef();
  const boxes = createRef();
  let daysInMonth;
  let paddingDaysOfMonth;
  let startDateOfWeek;

  useEffect(() => {
    drawBoxes();
  }, []);

  useEffect(() => {
    CalendarUtil();
    printCalendar();
  }, [moveLeftRight]);

  console.log(startDateOfWeek);

  const CalendarUtil = () => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const date = new Date();

    //to get start date of week
    function getSunday(d) {
      d = new Date(d);
      let day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 0); // adjust when day is sunday
      return new Date(d.setDate(diff));
    }
    startDateOfWeek = parseInt(getSunday(new Date()).toString().substring(8, 10));

    if (moveLeftRight !== 0) {
      date.setDate(date.getDate() + 7);
      getSunday(new Date(date));
    }
    getSunday(new Date());
  }

  const printCalendar = () => {
    CalendarUtil();
    const padding = paddingDaysOfMonth;
    const days = daysInMonth;

    calendar.current.innerHTML = '';

    for (let i = startDateOfWeek; i < startDateOfWeek + 7; i++) {
      console.log(i, startDateOfWeek, new Date().getDate());
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

      if (i > 0 && i !== new Date().getDate()) {
        daysSquare.innerText = i;

        // daysSquare.addEventListener('click', () => displayModal(clickedDate));
      } else if(i === new Date().getDate()) {
        daysSquare.innerText = i;
        console.log("Enter")
        daysSquare.classList.add('selected');
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
