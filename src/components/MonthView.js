import React, { useEffect, useState, createRef } from 'react';
import Modal from './Modal';
import DisplayModal from './DisplayModal';
import '../styles/monthView.css';

const MonthView = ({ moveLeftRight, teacher, showAddModal }) => {

  const [eventDate, setEventDate] = useState(null);
  const [allBatchesData, setAllBatchesData] = useState([]);
  const [batchesData, setBatchesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDisplayModal, setShowDisplaymodal] = useState(false);

  useEffect(() => {
    if(showAddModal)
    setShowModal(true);
  }, [showAddModal]);


  const calendar = createRef();

  let month;
  let year;

  let paddingDaysOfMonth;
  let daysInMonth;

  const CalendarUtil = () => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const date = new Date();

    if (moveLeftRight !== 0) {
      date.setMonth(new Date().getMonth() + moveLeftRight);
    }

    month = date.getMonth();
    year = date.getFullYear();

    const startingDateOfMonth = new Date(year, month, 1);
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
    console.log(paddingDaysOfMonth);
  }

  const displayModal = async (date) => {
    setEventDate(date);
    
    let offsetDate = parseInt(date.substring(8, 10));
    let newDate = date.substring(0, 8) + `${offsetDate}`;


    const response = await fetch(`http://localhost:5000/getRecords?date=${newDate}`);
    const data = await response.json();
    setBatchesData(data);

    if (data.length > 0) {
      setShowDisplaymodal(true);
    } else {
      setShowModal(true);
    }
  }

  const handleClose = () => {
    setShowModal(false);
  }

  const handleCloseDisplayModal = () => {
    setShowDisplaymodal(false);
  }

  async function fetchAllRecords() {
    let response = await fetch('http://localhost:5000/getAllRecords')
    let data = await response.json()
    setAllBatchesData(data);
  }

  useEffect(() => {
    fetchAllRecords();
  }, []);

  useEffect(() => {
    CalendarUtil();
    printCalendar();
  }, [moveLeftRight, teacher, allBatchesData, setAllBatchesData]);

  const printCalendar = () => {
    CalendarUtil();
    const padding = paddingDaysOfMonth;
    const days = daysInMonth;

    let previousMonthDayInMonths = new Date(year, month, 0).getDate();

    calendar.current.innerHTML = '';

    for (let i = 1; i <= padding + days; i++) {
      const daysSquare = document.createElement('div');
      daysSquare.classList.add('month-view--calendar');
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
        if(i - padding === new Date().getDate() && currentMonth === new Date().getMonth() + 1){
          console.log(i, new Date().getDate())
          daysSquare.classList.add('selected');
        }
        daysSquare.innerText = i - padding;

        if (allBatchesData.length > 0) {
          allBatchesData.map((data, index) => {
            let dt = parseInt(data.Date.substring(8, 10));
            let month = parseInt(data.Date.substring(6, 7));
            let year = parseInt(data.Date.substring(0, 4));
            let Name = data.Name;
            if (teacher === 'All') {
              if (dt + 1 === i - padding && currentMonth === month && currentYear === year) {
                const batchDiv = document.createElement('div');
                batchDiv.classList.add('batch');
                batchDiv.innerText = data.Name;
                daysSquare.appendChild(batchDiv);
              }
            } else {
              if (dt + 1 === i - padding && currentMonth === month && currentYear === year && teacher === Name) {
                const batchDiv = document.createElement('div');
                batchDiv.classList.add('batch');
                batchDiv.innerText = data.Name;
                daysSquare.appendChild(batchDiv);
              }
            }
          })
        }

        daysSquare.addEventListener('click', () => displayModal(clickedDate));
      } else {
        console.log(previousMonthDayInMonths);
        daysSquare.innerText = previousMonthDayInMonths + i - padding;
        daysSquare.classList.add('faded');
      }

      calendar.current.appendChild(daysSquare);
    }
  }

  return (
    <div className="month-view">
      <div className="month-view--weekdays">
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </div>

      <div className="month-view--container" ref={calendar}>
      </div>

      {showModal && <Modal
        eventDate={eventDate}
        handleClose={handleClose} />}
      {showDisplayModal && <DisplayModal
        batchesData={batchesData}
        fetchAllRecords={fetchAllRecords}
        handleClose={handleCloseDisplayModal}
        setShowModal={setShowModal} />}
    </div>
  )
}

export default MonthView;
