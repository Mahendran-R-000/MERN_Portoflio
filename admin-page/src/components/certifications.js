import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Certifications() {
    const [certifications, setCertifications] = useState([]);
    const [isEditing, setIsEditing] = useState({});
    const [updatedCertifications, setUpdatedCertifications] = useState([]);
    const [newCertification, setNewCertification] = useState({ title: '', imageurl: '' });
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/certifications', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCertifications(response.data);
            setUpdatedCertifications(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data. Please try again.');
        }
    };

    const handleEdit = (index) => {
        setIsEditing({ ...isEditing, [index]: true });
    };

    const handleUpdate = async (certification, index) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:4000/api/certifications/${certification._id}`, certification, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPopupMessage('Certification updated successfully');
            setIsEditing({ ...isEditing, [index]: false });
            fetchData(); // Fetch updated data
        } catch (error) {
            console.error('Error updating certification:', error);
            alert('An error occurred while updating certification. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:4000/api/certifications/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPopupMessage('Certification deleted successfully');
            fetchData(); // Fetch updated data
        } catch (error) {
            console.error('Error deleting certification:', error);
            alert('An error occurred while deleting certification. Please try again.');
        }
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedCertification = [...updatedCertifications];
        updatedCertification[index][name] = value;
        setUpdatedCertifications(updatedCertification);
    };

    const handleCancel = (index) => {
        setIsEditing({ ...isEditing, [index]: false });
        setUpdatedCertifications(certifications);
    };

    const handleAddCertification = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:4000/api/certifications', newCertification, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPopupMessage('Certification added successfully');
            fetchData(); // Fetch updated data
            setNewCertification({ title: '', imageurl: '' });
        } catch (error) {
            console.error('Error adding certification:', error);
            alert('An error occurred while adding certification. Please try again.');
        }
    };

    const handleClosePopup = () => {
        setPopupMessage('');
    };

    return (
        <div className="container mt-5">
            <h2>Certifications</h2>
            {popupMessage && (
                <div className="alert alert-success" role="alert">
                    {popupMessage}
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleClosePopup}></button>
                </div>
            )}
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {updatedCertifications.map((certification, index) => (
                    <div className="col" key={certification._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Certification Name</h5>
                                {isEditing[index] ? (
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        name="title"
                                        value={certification.title}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ) : (
                                    <p className="card-text">{certification.title}</p>
                                )}
                                <h5 className="card-title">Image URL</h5>
                                {isEditing[index] ? (
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        name="imageurl"
                                        value={certification.imageurl}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ) : (
                                    <p className="card-text">{certification.imageurl}</p>
                                )}
                                {isEditing[index] ? (
                                    <div>
                                        <button className="btn btn-primary" onClick={() => handleUpdate(certification, index)}>Update</button>
                                        <button className="btn btn-secondary ml-2" onClick={() => handleCancel(index)}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        <button className="btn btn-primary" onClick={() => handleEdit(index)}>Edit</button>
                                        <button className="btn btn-danger ml-2" onClick={() => handleDelete(certification._id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row mt-3">
                <div className="col">
                    <h5>Add New Certification</h5>
                    <form onSubmit={handleAddCertification}>
                        <div className="mb-3">
                            <label className="form-label">Certification Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={newCertification.title}
                                onChange={(e) => setNewCertification({ ...newCertification, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                name="imageurl"
                                value={newCertification.imageurl}
                                onChange={(e) => setNewCertification({ ...newCertification, imageurl: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Certification</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Certifications;
