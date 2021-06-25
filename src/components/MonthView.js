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
  const individualBatch = createRef();

  let paddingDaysOfMonth;
  let daysInMonth;

  const CalendarUtil = () => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const date = new Date();

    if (moveLeftRight !== 0) {
      date.setMonth(new Date().getMonth() + moveLeftRight);
    }

    // const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    const startingDateOfMonth = new Date(year, month, 1);
    daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateInStringFormat = startingDateOfMonth.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });

    paddingDaysOfMonth = weekdays.indexOf(dateInStringFormat.split(", ")[0]);
  }

  const displayModal = async (date) => {
    setEventDate(date);
    console.log(date);


    const response = await fetch(`http://localhost:5000/getRecords?date=${date}`);
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
    CalendarUtil();
    printCalendar();
  }, [moveLeftRight, teacher]);

  const printCalendar = () => {
    CalendarUtil();
    const padding = paddingDaysOfMonth;
    const days = daysInMonth;

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
        } else {
          console.log('before')
        }

        daysSquare.addEventListener('click', () => displayModal(clickedDate));
      } else {
        // daysSquare.innerText = days;
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

      <div className="indibatch" ref={individualBatch}></div>

      {showModal && <Modal
        eventDate={eventDate}
        handleClose={handleClose} />}
      {showDisplayModal && <DisplayModal
        batchesData={batchesData}
        handleClose={handleCloseDisplayModal}
        setShowModal={setShowModal} />}
    </div>
  )
}

export default MonthView;
