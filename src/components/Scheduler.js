import React, { useEffect, useState } from 'react';
import MonthView from './MonthView';
import DayView from './DayView';
import WeekView from './WeekView';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import '../styles/scheduler.css';

const Scheduler = () => {

  const [moveLeftRight, setMoveLeftRight] = useState(0);
  const [currentMonth, setCurrentMonth] = useState();
  const [currentYear, setCurrentYear] = useState();
  const [teacher, setTeacher] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [view, setView] = useState("Month");

  const handleBottomAddBatch = () => {
    if (showAddModal) {
      setShowAddModal(false);
    } else {
      setShowAddModal(true);
    }
  }

  useEffect(() => {
    console.log(moveLeftRight);
    let monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (view === 'Month') {
      const newMonth = (new Date().getMonth() + moveLeftRight) % 12;
      setCurrentMonth(monthArr[newMonth]);
      if (new Date().getMonth() - 1 + moveLeftRight >= 11) {
        setCurrentYear(new Date().getFullYear() + 1);
      } else {
        setCurrentYear(new Date().getFullYear());
      }
    } else if (view === 'Day') {
      let dt = new Date();
      if (moveLeftRight !== 0) {
        dt.setDate(dt.getDate() + moveLeftRight);
        setCurrentMonth(monthArr[dt.getMonth()]);
        setCurrentYear(dt.getFullYear());
      }
      else {
        setCurrentMonth(monthArr[dt.getMonth()]);
        setCurrentYear(dt.getFullYear());
      }
    } else if (view === 'Month') {
      let dt = new Date();
      if (moveLeftRight !== 0) {
        dt.setDate(dt.getDate() + moveLeftRight);
        setCurrentMonth(monthArr[dt.getMonth()]);
        setCurrentYear(dt.getFullYear());
      }
      else {
        setCurrentMonth(monthArr[dt.getMonth()]);
        setCurrentYear(dt.getFullYear());
      }
    }
  }, [moveLeftRight]);

  return (
    <div className="scheduler">
      <div className="scheduler--top-section">
        <div className="carrousel--change">
          <button
            className="carrousel--change--btn left"
            onClick={() => setMoveLeftRight(moveLeftRight - 1)}>
            <ArrowLeftIcon fontSize="large" />
          </button>
          <button
            className="carrousel--change--btn right"
            onClick={() => setMoveLeftRight(moveLeftRight + 1)} >
            <ArrowRightIcon fontSize="large" />
          </button>

          <div className="month-display">
            <span>{currentMonth}</span>
            <span>{currentYear}</span>
          </div>
        </div>
        <div>
          <select className="teacher-selection" onChange={(e) => setTeacher(e.target.value)}>
            <option value="All">All</option>
            <option value="Teacher A">Teacher A</option>
            <option value="Teacher B">Teacher B</option>
            <option value="Teacher C">Teacher C</option>
          </select>
        </div>

        <div className="view--change">
          <div>
            <select className="view--change-selection" onChange={(e) => setView(e.target.value)}>
              <option value="Day">Day</option>
              <option value="Week">Week</option>
              <option value="Month" selected>Month</option>
            </select>
          </div>
        </div>
      </div>

      <div className="scheduler--bottom-section">
        {view === 'Month' && <div className="scheduler--view">
          <MonthView
            moveLeftRight={moveLeftRight}
            teacher={teacher}
            showAddModal={showAddModal} />
        </div>}

        {view === 'Week' && <div className="scheduler--view">
          <WeekView moveLeftRight={moveLeftRight} />
        </div>}

        {view === 'Day' && <div className="scheduler--view">
          <DayView moveLeftRight={moveLeftRight} />
        </div>}
      </div>

      <div>
        <button className="add-batch-btn--bottom" onClick={handleBottomAddBatch}><AddCircleIcon fontSize="large" /></button>
      </div>
    </div>
  )
};

export default Scheduler;
