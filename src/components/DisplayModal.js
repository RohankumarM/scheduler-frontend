import React from 'react';
import '../styles/DisplayModal.css';

const DisplayModal = ({ batchesData, handleClose, setShowModal, fetchAllRecords }) => {
  console.log(batchesData);
  const handleAddBatch = () => {
    handleClose();
    setShowModal(true);
  }

  const handleDelete = async (id) => {
    console.log(id);
    const response = await fetch(`http://localhost:5000/deleteBatch/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });
    if(response.status === '200'){
      alert('Successfully deleted!');
    }
    console.log(response);
    fetchAllRecords();
    handleClose();

    // const data = await response.json();
  }

  return (
    <div className="displayModal">
      <div className="displayModal--container">
        <div className="displayModal--header">
          <h1>Batches</h1>
        </div>
        <div className="displayModal--info-section">
          <div className="displayModal--info">
            <table>
              <tr>
                <th>Name</th>
                <th>Topic</th>
                <th>Batch</th>
                <th>Date</th>
                <th>StartTime</th>
                <th>EndTime</th>
              </tr>
              {batchesData === null ? <div>NO DATA FOUND</div> : batchesData.map((data, key) => {
                return (<tr key={data.TID}>
                  <td>{data.Name}</td>
                  <td>{data.Topic}</td>
                  <td>{data.Batch}</td>
                  <td>{new Date(data.Date).toDateString()}</td>
                  <td>{data.StartTime}</td>
                  <td>{data.EndTime}</td>
                  <td><button className="displayModal-delete-btn" onClick={() => handleDelete(data.TID)}>Delete</button></td>
                </tr>);
              })}
            </table>
          </div>
          <div className="displayModal--actions">
            <button className="displayModal-btn" onClick={handleAddBatch}>Add Batch</button>
            <button className="displayModal-btn" onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default DisplayModal;
