import React, { useState, useEffect, createRef } from 'react';
import moment, { months } from 'moment';
import '../styles/WeekView.css';

const WeekView = ({ moveLeftRight }) => {

  const [startDate, setStartDate] = useState(moment());
  const [moveVal, setMoveVal] = useState(0);
  const [allbatchesData, setAllBatchesData] = useState([]);


  const calendar = createRef();
  const boxes = createRef();
  let daysInMonth;
  let paddingDaysOfMonth;
  let startDateOfWeek;

  useEffect(() => {
    console.log("first");
    async function fetchAllRecords() {
      let response = await fetch('http://localhost:5000/getAllRecords')
      let data = await response.json()
      setAllBatchesData(data);
    }

    fetchAllRecords();
  }, []);

  useEffect(() => {
    drawBoxes();
  }, []);

  useEffect(() => {
    CalendarUtil();
    printCalendar();
  }, [moveLeftRight]);

  const CalendarUtil = () => {
    // //to get start date of week
    // function getSunday(d) {
    //   d = new Date(d);
    //   let day = d.getDay(),
    //     diff = d.getDate() - day + (day === 0 ? -6 : 0); // adjust when day is sunday
    //   return new Date(d.setDate(diff));
    // }

    // startDateOfWeek = parseInt(getSunday(new Date()).toString().substring(8, 10));

    if (moveLeftRight !== 0) {
      console.log("moveLR :" + moveLeftRight);
      console.log("MoveVal : ", moveVal);
      if (moveLeftRight > moveVal) {
        setMoveVal(moveLeftRight);
        setStartDate(moment(startDate).add(7, 'days'));
        startDateOfWeek = +moment(startDate).add(7, 'days').format('DD');
        daysInMonth = moment(startDate.add(7, 'days').format('YYYY-MM'), 'YYYY-MM').daysInMonth();
        console.log("startDateOfWeek" + startDateOfWeek);
      } else {
        setMoveVal(moveLeftRight);
        setStartDate(moment(startDate).subtract(7, 'days'));
        startDateOfWeek = +moment(startDate).subtract(7, 'days').format('DD');
        daysInMonth = moment(startDate.subtract(7, 'days').format('YYYY-MM'), 'YYYY-MM').daysInMonth();
        console.log("startDateOfWeek" + startDateOfWeek);
      }

    } else {
      setStartDate(moment().startOf('week'));
      console.log.apply(startDate);
      startDateOfWeek = +moment().startOf('week').format("DD");
      daysInMonth = moment(startDate.format('YYYY-MM'), 'YYYY-MM').daysInMonth();
      console.log(startDateOfWeek);
    }

    console.log(startDate);
    daysInMonth = moment(startDate.format('YYYY-MM'), 'YYYY-MM').daysInMonth();
    console.log(daysInMonth);
  }

  const printCalendar = () => {

    calendar.current.innerHTML = '';
    paddingDaysOfMonth = daysInMonth - startDateOfWeek;
    console.log(paddingDaysOfMonth);

    for (let i = startDateOfWeek; i < startDateOfWeek + 7; i++) {
      const daysSquare = document.createElement('div');
      daysSquare.classList.add('week-view--calendar');
      // let date = new Date();
      // let currentMonth = date.getMonth() + 1 + moveLeftRight % 12;
      // let currentYear;
      // if (new Date().getMonth() - 1 + moveLeftRight >= 11) {
      //   currentYear = date.getFullYear() + 1;
      // } else {
      //   currentYear = date.getFullYear();
      // }

      // const clickedDate = `${currentYear}-${('0' + currentMonth).slice(-2)}-${('0' + (i - padding)).slice(-2)}`;
      console.log(+startDate.format('M') + "," + (+moment().month() + 1))

      if (i > daysInMonth) {
        daysSquare.innerText = i - daysInMonth;
      } else if (i > 0 && i !== new Date().getDate()) {
        daysSquare.innerText = i;

        // daysSquare.addEventListener('click', () => displayModal(clickedDate));
      } else if (i === new Date().getDate()) {
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
        numberDiv.innerText = i + 'PM';
      } else {
        if(i === 0) numberDiv.innerText = i + 12 + 'AM';
        else numberDiv.innerText = i + 'AM';
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
