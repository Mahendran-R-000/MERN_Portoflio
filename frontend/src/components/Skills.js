import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Certifications from "./Certifications";
import axios from "axios";

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                    const response = await axios.get('http://localhost:4000/skills');
                    setSkills(response.data);
                    setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        arrows: false,
        appendDots: dots => (
            <div style={{ textAlign: 'center' }}>
                <ul style={{ margin: '0' }}> {dots} </ul>
            </div>
        )
    };

    const renderSkills = () => {
        const skillGroups = [];
        for (let i = 0; i < skills.length; i += 9) {
            skillGroups.push(skills.slice(i, i + 9));
        }

        return skillGroups.map((group, index) => (
            <div key={index}>
                <div className="skills__container container grid">
                    {group.map((skill, i) => (
                        <div key={i} className="skills__container-box">
                            <img
                                className="skills__container-img"
                                src={skill.imageurl}
                                alt={skill.name}
                            />
                            <div className="skills__container-name">{skill.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <section className="skills section" id="skills">
                <h2 className="section__title">Tech stack</h2>
                <Slider {...settings}>
                    {renderSkills()}
                </Slider>
            </section>
            <Certifications />
        </div>
    );
}

export default Skills;
