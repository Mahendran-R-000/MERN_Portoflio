import React, { useState, useEffect } from 'react';
import axios from 'axios';

function About() {
    const [aboutData, setAboutData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/about', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAboutData(response.data);
            setUpdatedData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data. Please try again.');
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:4000/api/about', updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPopupMessage('Data updated successfully');
            setIsEditing(false);
            fetchData(); // Fetch updated data
        } catch (error) {
            console.error('Error updating data:', error);
            alert('An error occurred while updating data. Please try again.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setUpdatedData(aboutData);
    };

    const handleClosePopup = () => {
        setPopupMessage('');
    };

    return (
        <div className="container mt-5">
            <h2>About</h2>
            {popupMessage && (
                <div className="alert alert-success" role="alert">
                    {popupMessage}
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleClosePopup}></button>
                </div>
            )}
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Description</h5>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    name="description"
                                    value={updatedData.description || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p className="card-text">{aboutData.description}</p>
                            )}
                            <h5 className="card-title">Resume</h5>
                            {isEditing ? (
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    name="resume"
                                    value={updatedData.resume || ''}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p className="card-text">{aboutData.resume}</p>
                            )}
                            {isEditing ? (
                                <div>
                                    <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
                                    <button className="btn btn-secondary ml-2" onClick={handleCancel}>Cancel</button>
                                </div>
                            ) : (
                                <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
