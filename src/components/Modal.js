import React, { useState } from 'react';
import '../styles/Modal.css';

const Modal = ({ eventDate, handleClose }) => {

  const [teacher, setTeacher] = useState("");
  const [topic, setTopic] = useState("");
  const [batch, setBatch] = useState("");
  const [date, setDate] = useState(eventDate);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleAddBatch = async () => {
    let batchData = {
      name: teacher,
      topic: topic,
      batch: batch,
      date: date,
      startTime: startTime,
      endTime: endTime
    };

    const response = await fetch("https://scheduler-server-pepcoding.herokuapp.com/addBatch", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(batchData)
    });

    const data = await response.json();
    if(data.message === 'Batch collision occurred!'){
      alert('Batch collision occurred');
    }else{
      alert(data.message);
    }
    handleClose();
  }

  const handleCloseModal = () => {
    handleClose();
  }

  const handleDeleteBatch = () => {

  }

  return (
    <div className="modal">
      <h1>Add Batch</h1>
      <form className="addBatches">
        <div>
          <select className="teacher-selection" required onChange={(e) => setTeacher(e.target.value)}>
            <option value="none" defaultValue="Select A Teacher" selected disabled hidden>Select A Teacher</option>
            <option value="Teacher A">Teacher A</option>
            <option value="Teacher B">Teacher B</option>
            <option value="Teacher C">Teacher C</option>
          </select>
        </div>
        <input type="text" required placeholder="Enter Batch" onChange={(e) => setBatch(e.target.value)} />
        <input type="text" required placeholder="Enter Topic" onChange={(e) => setTopic(e.target.value)} />
        <input type="date" defaultValue={eventDate} required onChange={(e) => setDate(e.target.value)} />
        <input type="time" required onChange={(e) => setStartTime(e.target.value)} />
        <input type="time" required onChange={(e) => setEndTime(e.target.value)} />
        <button onClick={handleAddBatch}>Save</button>
        <button onClick={handleDeleteBatch}>Delete</button>
        <button onClick={handleCloseModal}>Close</button>
      </form>
    </div>
  )
};

export default Modal;
