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

    console.log(date);

    const response = await fetch("http://localhost:5000/addBatch", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(batchData)
    });

    const data = await response.json();
    if (data.message === 'Batch collision occurred!') {
      alert('Batch collision occurred, try adding again!');
    } else {
      alert("Successfully added!");
    }
    handleClose();
  }

  const handleCloseModal = () => {
    handleClose();
  }

  return (
    <div className="modal">
      <h1>Add Batch</h1>
      <div className="modal-container">
        <form className="addBatches">
          <div>
            <select className="teacher-selection" required onChange={(e) => setTeacher(e.target.value)}>
              <option value="none" defaultValue="Select A Teacher" selected disabled hidden>Select A Teacher</option>
              <option value="Teacher A">Teacher A</option>
              <option value="Teacher B">Teacher B</option>
              <option value="Teacher C">Teacher C</option>
            </select>
          </div>
          <div className="modal-elements">
            <label>Add Topic:</label>
            <input type="text" required placeholder="Enter Topic" onChange={(e) => setTopic(e.target.value)} />
          </div>
          <div className="modal-elements">
            <label>Add Batch Number:</label>
            <input type="text" required placeholder="Enter Batch" onChange={(e) => setBatch(e.target.value)} />
          </div>
          <div className="modal-elements">
            <label>Select Date:</label>
            <input type="date" defaultValue={eventDate} required onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="modal-elements">
            <label>Select Start Time:</label>
            <input type="time" required onChange={(e) => setStartTime(e.target.value)} />
          </div>
          <div className="modal-elements">
            <label>Select End Time:</label>
            <input type="time" required onChange={(e) => setEndTime(e.target.value)} />
          </div>
          

          <button className="form-button" onClick={handleAddBatch}>Save</button>
          <button className="form-button" onClick={handleCloseModal}>Close</button>
        </form>
      </div>
    </div>
  )
};

export default Modal;
