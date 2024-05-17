import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [isEditing, setIsEditing] = useState({});
    const [updatedProjects, setUpdatedProjects] = useState([]);
    const [newProject, setNewProject] = useState({ title: '', description: '', imageurl: '', link: '' });
    const [popupMessage, setPopupMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/api/projects', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            setProjects(response.data);
            setUpdatedProjects(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching data. Please try again.');
        }
    };

    const handleEdit = (index) => {
        setIsEditing({ ...isEditing, [index]: true });
    };

    const handleUpdate = async (project, index) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:4000/api/projects/${project._id}`, project, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPopupMessage('Project updated successfully');
            setIsEditing({ ...isEditing, [index]: false });
            fetchData(); // Fetch updated data
        } catch (error) {
            console.error('Error updating project:', error);
            alert('An error occurred while updating project. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:4000/api/projects/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPopupMessage('Project deleted successfully');
            fetchData(); // Fetch updated data
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('An error occurred while deleting project. Please try again.');
        }
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedProject = [...updatedProjects];
        updatedProject[index][name] = value;
        setUpdatedProjects(updatedProject);
    };

    const handleCancel = (index) => {
        setIsEditing({ ...isEditing, [index]: false });
        setUpdatedProjects(projects);
    };

    const handleAddProject = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:4000/api/projects', newProject, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPopupMessage('Project added successfully');
            setNewProject({ title: '', description: '', imageurl: '', link: '' }); // Clear the form
            fetchData(); // Fetch updated data
        } catch (error) {
            console.error('Error adding project:', error);
            alert('An error occurred while adding project. Please try again.');
        }
    };

    const handleClosePopup = () => {
        setPopupMessage('');
    };

    return (
        <div className="container mt-5">
            <h2>Projects</h2>
            {popupMessage && (
                <div className="alert alert-success" role="alert">
                    {popupMessage}
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleClosePopup}></button>
                </div>
            )}
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {updatedProjects.map((project, index) => (
                    <div className="col" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Title</h5>
                                {isEditing[index] ? (
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        name="title"
                                        value={project.title}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ) : (
                                    <p className="card-text">{project.title}</p>
                                )}
                                <h5 className="card-title">Description</h5>
                                {isEditing[index] ? (
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        name="description"
                                        value={project.description}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ) : (
                                    <p className="card-text">{project.description}</p>
                                )}
                                <h5 className="card-title">Image URL</h5>
                                {isEditing[index] ? (
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        name="imageurl"
                                        value={project.imageurl}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ) : (
                                    <p className="card-text">{project.imageurl}</p>
                                )}
                                <h5 className="card-title">Link</h5>
                                {isEditing[index] ? (
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        name="link"
                                        value={project.link}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ) : (
                                    <p className="card-text">{project.link}</p>
                                )}
                                {isEditing[index] ? (
                                    <div>
                                        <button className="btn btn-primary" onClick={() => handleUpdate(project, index)}>Update</button>
                                        <button className="btn btn-secondary ml-2" onClick={() => handleCancel(index)}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        <button className="btn btn-primary" onClick={() => handleEdit(index)}>Edit</button>
                                        <button className="btn btn-danger ml-2" onClick={() => handleDelete(project._id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row mt-3">
                <div className="col">
                    <h5>Add New Project</h5>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleAddProject();
                    }}
                    >
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={newProject.title}
                                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                value={newProject.description}
                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                name="imageurl"
                                value={newProject.imageurl}
                                onChange={(e) => setNewProject({ ...newProject, imageurl: e.target.value })}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Link</label>
                            <input
                                type="text"
                                className="form-control"
                                name="link"
                                value={newProject.link}
                                onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Add Project</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Projects;
