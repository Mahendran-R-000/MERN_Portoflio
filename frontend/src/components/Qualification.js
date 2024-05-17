import React, {useEffect, useState} from "react";
import axios from "axios";

/*
const workExperiences = [
    {
        title: "Full Stack Developer",
        company: "Freelancer",
        duration: "2022-Current"
    },
    {
        title: "ReactJS  Developer",
        company: "Self",
        duration: "2022-2023"
    }, {
        title: "Django Developer",
        company: "Self",
        duration: "2020-2022"
    }
];*/
const educationalQualifications = [
    {
        title: "M.Tech CSE",
        institution: "Sri Krishna College of Engineering and Technology",
        duration: "2020-2025"
    },
    {
        title: "HSC",
        institution: "K.S.R Matriculation Higher Secondary School",
        duration: "2018-2020"
    },
    {
        title: "SSLC",
        institution: "K.S.R Matriculation Higher Secondary School",
        duration: "2017-2018"
    }
];


const Qualification=()=> {
    const [activeTab, setActiveTab] = useState("work"); // Default tab is Education
    const [workExperiences, setWorkExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkExperiences = async () => {
            try {
                const response = await axios.get('http://localhost:4000/qualifications');
                setWorkExperiences(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchWorkExperiences();
    }, []);
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    const formatDuration = (from, to) => {
        const fromYear = new Date(from).getFullYear();
        const toYear = to ? new Date(to).getFullYear() : 'Current';
        return `${fromYear}-${toYear}`;
    };

    return (
        <section className="qualification section">
            <h2 className="section__title">Personal Journey</h2>
            <div className="qualification__container container">
                <div className="qualification__tabs">
                    <div className={`qualification__button ${activeTab === "work" ? "qualification__active" : ""}`}
                         onClick={() => handleTabChange("work")}>
                        <i className="uil uil-briefcase-alt qualification__icon"></i> Work
                    </div>
                    <div
                        className={`qualification__button ${activeTab === "education" ? "qualification__active" : ""}`}
                        onClick={() => handleTabChange("education")}>
                        <i className="uil uil-graduation-cap qualification__icon"></i> Education
                    </div>
                </div>
                <div className="qualification__sections">
                    <div className={`qualification__content ${activeTab === "work" ? "qualification__active" : ""}`}
                         data-content id="work">
                        {workExperiences.map((experience, index) => (
                            <div key={index} className="qualification__data">
                                {index % 2 === 0 && (
                                    <>
                                        <div></div>
                                        <div>
                                            <span className="qualification__rounder"></span>
                                            {index !== workExperiences.length - 1 && (
                                                <span className="qualification__line"></span>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="qualification__title">{experience.role}</h3>
                                            <span className="qualification__subtitle">{experience.company}</span>
                                            <div className="qualification__calender">
                                                <i className="uil uil-calendar-alt"></i>{formatDuration(experience.from, experience.to)}
                                            </div>
                                        </div>
                                    </>
                                )}
                                {index % 2 === 1 && (
                                    <>
                                        <div>
                                            <h3 className="qualification__title">{experience.role}</h3>
                                            <span className="qualification__subtitle">{experience.company}</span>
                                            <div className="qualification__calender">
                                                <i className="uil uil-calendar-alt"></i> {formatDuration(experience.from, experience.to)}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="qualification__rounder"></span>
                                            {index !== workExperiences.length - 1 && (
                                                <span className="qualification__line"></span>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}

                    </div>
                    <div
                        className={`qualification__content ${activeTab === "education" ? "qualification__active" : ""}`}
                        data-content id="work">
                        {educationalQualifications.map((education, index) => (
                            <div key={index} className="qualification__data">
                                {index % 2 === 0 && (
                                    <>
                                        <div></div>
                                        <div>
                                            <span className="qualification__rounder"></span>
                                            {index !== educationalQualifications.length - 1 && (
                                                <span className="qualification__line"></span>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="qualification__title">{education.title}</h3>
                                            <span className="qualification__subtitle">{education.institution}</span>
                                            <div className="qualification__calender">
                                                <i className="uil uil-calendar-alt"></i> {education.duration}
                                            </div>
                                        </div>
                                    </>
                                )}
                                {index % 2 === 1 && (
                                    <>
                                        <div>
                                            <h3 className="qualification__title">{education.title}</h3>
                                            <span className="qualification__subtitle">{education.institution}</span>
                                            <div className="qualification__calender">
                                                <i className="uil uil-calendar-alt"></i> {education.duration}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="qualification__rounder"></span>
                                            {index !== educationalQualifications.length - 1 && (
                                                <span className="qualification__line"></span>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    )
}
export default Qualification;