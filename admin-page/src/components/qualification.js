import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Qualifications() {
    const [qualifications, setQualifications] = useState([]);
    const [isEditing, setIsEditing] = useState({});
    const [updatedQualifications, setUpdatedQualifications] = useState([]);
    const [newQualification, setNewQualification] = useState({ role: '', company: '', from: '', to: '' });
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/qualifications', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setQualifications(response.data);
            setUpdatedQualifications(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data. Please try again.');
        }
    };

    const handleEdit = (index) => {
        setIsEditing({ ...isEditing, [index]: true });
        // Populate newQualification with the values of the qualification being edited


    };



    const handleUpdate = async (qualification, index) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:4000/api/qualifications/${qualification._id}`, qualification, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPopupMessage('Qualification updated successfully');
            setIsEditing({ ...isEditing, [index]: false });
            fetchData(); // Fetch updated data

        } catch (error) {
            console.error('Error updating qualification:', error);
            alert('An error occurred while updating qualification. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:4000/api/qualifications/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPopupMessage('Qualification deleted successfully');
            fetchData(); // Fetch updated data
        } catch (error) {
            console.error('Error deleting qualification:', error);
            alert('An error occurred while deleting qualification. Please try again.');
        }
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedQualification = [...updatedQualifications];
        updatedQualification[index][name] = value;
        setUpdatedQualifications(updatedQualification);
    };

    const handleCancel = (index) => {
        setIsEditing({ ...isEditing, [index]: false });
        setUpdatedQualifications(qualifications);
    };

    const handleAddQualification = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:4000/api/qualifications', newQualification, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPopupMessage('Qualification added successfully');

            setNewQualification({ role: '', company: '', from: '', to: '' }); // Clear the form
            fetchData(); // Fetch updated data
        } catch (error) {
            console.error('Error adding qualification:', error);
            alert('An error occurred while adding qualification. Please try again.');
        }
    };

    const handleClosePopup = () => {
        setPopupMessage('');
    };

    return (
        <div className="container mt-5">
            <h2>Qualifications</h2>
            {popupMessage && (
                <div className="alert alert-success" role="alert">
                    {popupMessage}
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleClosePopup}></button>
                </div>
            )}
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {updatedQualifications.map((qualification, index) => (
                    <div className="col" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Role</h5>
                                {isEditing[index] ? (
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        name="role"
                                        value={qualification.role}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ) : (
                                    <p className="card-text">{qualification.role}</p>
                                )}
                                <h5 className="card-title">Company</h5>
                                {isEditing[index] ? (
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        name="company"
                                        value={qualification.company}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ) : (
                                    <p className="card-text">{qualification.company}</p>
                                )}
                                <h5 className="card-title">From</h5>
                                {isEditing[index] ? (
                                    <input
                                        type="date"
                                        className="form-control mb-2"
                                        name="from"
                                        value={qualification.from}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ) : (
                                    <p className="card-text">{qualification.from}</p>
                                )}
                                <h5 className="card-title">To</h5>
                                {isEditing[index] ? (
                                    <input
                                        type="date"
                                        className="form-control mb-2"
                                        name="to"
                                        value={qualification.to}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ) : (
                                    <p className="card-text">{qualification.to}</p>
                                )}
                                {isEditing[index] ? (
                                    <div>
                                        <button className="btn btn-primary" onClick={() => handleUpdate(qualification, index)}>Update</button>
                                        <button className="btn btn-secondary ml-2" onClick={() => handleCancel(index)}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        <button className="btn btn-primary" onClick={() => handleEdit(index)}>Edit</button>
                                        <button className="btn btn-danger ml-2" onClick={() => handleDelete(qualification._id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row mt-3">
                <div className="col">
                    <h5>Add New Qualification</h5>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleAddQualification();
                    }}
                    >
                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <input
                                type="text"
                                className="form-control"
                                name="role"
                                value={newQualification.role}
                                onChange={(e) => setNewQualification({ ...newQualification, role: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Company</label>
                            <input
                                type="text"
                                className="form-control"
                                name="company"
                                value={newQualification.company}
                                onChange={(e) => setNewQualification({ ...newQualification, company: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">From</label>
                            <input
                                type="date"
                                className="form-control"
                                name="from"
                                value={newQualification.from}
                                onChange={(e) => setNewQualification({ ...newQualification, from: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">To</label>
                            <input
                                type="date"
                                className="form-control"
                                name="to"
                                value={newQualification.to}
                                onChange={(e) => setNewQualification({ ...newQualification, to: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Qualification</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Qualifications;
