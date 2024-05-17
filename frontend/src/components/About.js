import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image from '../Image/dummyporfile.jpg'; // Default image
import Qualification from "./Qualification";

const About = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/about');
                setAboutData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchAboutData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <section className="about section" id="about">
                <div className="about__container container">
                    <div className="social-media">
                        <img src={aboutData.imageurl || null} alt="" className="about__image"/>
                        <h3 className="about__subtitle">Full Stack Developer</h3>

                        <div className="about__social">
                            <a
                                className="about__social-icon"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open("https://www.linkedin.com/in/mahendran-0-r/", '_blank');
                                }}
                            >
                                <i className="uil uil-linkedin-alt"></i>
                            </a>
                            <a
                                className="about__social-icon"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open("https://github.com/Mahendran-R-000", '_blank');
                                }}
                            >
                                <i className="uil uil-github-alt"></i>
                            </a>
                            <a
                                className="about__social-icon"
                                onClick={(e) => {
                                    e.preventDefault();
                                    window.open("", '_blank');
                                }}
                            >
                                <i className="uil uil-telegram-alt"></i>
                            </a>
                        </div>
                    </div>

                    <div className="about_content">
                        <h1 className="about__title">Mahendran R</h1>
                        <p className="about__description">
                            {aboutData.description}
                        </p>
                        <div className="about__buttons">
                            <a
                                download="Mahendran_R.pdf"
                                href={aboutData.resume}
                                className="button button--flex  bg-dark bg-gradient"
                            >
                                My Resume
                                <i className="uil uil-download-alt button__icon"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <div><Qualification/></div>
        </div>
    );
}

export default About;
