import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Skills() {
    const [skills, setSkills] = useState([]);
    const [isEditing, setIsEditing] = useState({});
    const [updatedSkills, setUpdatedSkills] = useState([]);
    const [newSkill, setNewSkill] = useState({ name: '', imageurl: '' });
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/skills',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSkills(response.data);
            setUpdatedSkills(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data. Please try again.');
        }
    };

    const handleEdit = (index) => {
        setIsEditing({ ...isEditing, [index]: true });
    };

    const handleUpdate = async (skill, index) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:4000/api/skills/${skill._id}`, skill, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPopupMessage('Skill updated successfully');
            setIsEditing({ ...isEditing, [index]: false });
            fetchData(); // Fetch updated data
        } catch (error) {
            console.error('Error updating skill:', error);
            alert('An error occurred while updating skill. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:4000/api/skills/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPopupMessage('Skill deleted successfully');
            fetchData(); // Fetch updated data
        } catch (error) {
            console.error('Error deleting skill:', error);
            alert('An error occurred while deleting skill. Please try again.');
        }
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedSkill = [...updatedSkills];
        updatedSkill[index][name] = value;
        setUpdatedSkills(updatedSkill);
    };

    const handleCancel = (index) => {
        setIsEditing({ ...isEditing, [index]: false });
        setUpdatedSkills(skills);
    };

    const handleAddSkill = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(newSkill);
            await axios.post('http://localhost:4000/api/skills', newSkill, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPopupMessage('Skill added successfully');
            fetchData(); // Fetch updated data
            setNewSkill({ name: '', imageurl: '' });
        } catch (error) {
            console.error('Error adding skill:', error);
            alert('An error occurred while adding skill. Please try again.');
        }
    };

    const handleClosePopup = () => {
        setPopupMessage('');
    };

    return (
        <div className="container mt-5">
            <h2>Skills</h2>
            {popupMessage && (
                <div className="alert alert-success" role="alert">
                    {popupMessage}
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleClosePopup}></button>
                </div>
            )}
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {updatedSkills.map((skill, index) => (
                    <div className="col" key={skill._id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Skill Name</h5>
                                {isEditing[index] ? (
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        name="name"
                                        value={skill.name}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ) : (
                                    <p className="card-text">{skill.name}</p>
                                )}
                                <h5 className="card-title">Image URL</h5>
                                {isEditing[index] ? (
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        name="imageurl"
                                        value={skill.imageurl}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ) : (
                                    <p className="card-text">{skill.imageurl}</p>
                                )}
                                {isEditing[index] ? (
                                    <div>
                                        <button className="btn btn-primary" onClick={() => handleUpdate(skill, index)}>Update</button>
                                        <button className="btn btn-secondary ml-2" onClick={() => handleCancel(index)}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        <button className="btn btn-primary" onClick={() => handleEdit(index)}>Edit</button>
                                        <button className="btn btn-danger ml-2" onClick={() => handleDelete(skill._id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row mt-3">
                <div className="col">
                    <h5>Add New Skill</h5>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleAddSkill();
                    }}>
                        <div className="mb-3">
                            <label className="form-label">Skill Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={newSkill.name}
                                onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                name="imageurl"
                                value={newSkill.imageurl}
                                onChange={(e) => setNewSkill({...newSkill, imageurl: e.target.value})}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Skill</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Skills;
