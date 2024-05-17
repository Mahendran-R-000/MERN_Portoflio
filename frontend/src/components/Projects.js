// In your React component (Projects.js)

import React, { useState, useEffect } from "react";
import axios from 'axios';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://localhost:4000/projects'); // Assuming backend route is '/api/projects'
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section className="projects section" id="projects">
            <h2 className="section__title">Projects</h2>

            <div className="projects__container container grid">
                {projects.map((project, index) => (
                    <div key={index} className="projects__content">
                        <div className="projects-data">
                            <img src={project.imageurl} alt={project.title} className="projects__image" />
                            <h3 className="projects__title">{project.title}</h3>
                            <p className="projects__description">{project.description}</p>
                        </div>
                        <div className="demo-button">
                            <a href={project.link} className="button button--flex button--small project__button">
                                Demo
                                <i className="uil uil-arrow-right button__icon"></i>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Projects;
