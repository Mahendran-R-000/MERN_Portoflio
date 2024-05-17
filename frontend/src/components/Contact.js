import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        project: '',
        message: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if all fields are filled
        const { name, email, project, message } = formData;
        if (!name || !email || !project || !message) {
            alert('Please fill in all fields');
            return;
        }
        try {
            // Send form data to backend API
            const response = await axios.post('http://localhost:4000/send-email', formData);
            // Reset form data after successful submission
            setFormData({
                name: '',
                email: '',
                project: '',
                message: ''
            });
            // Display success message to the user
            alert('Message sent successfully!');
        } catch (error) {
            console.error('Error sending email:', error);
            // Display error message to the user
            alert('An error occurred while sending the message. Please try again later.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <section className="contact section" id="contact">
            <h2 className="section__title">Get in touch</h2>
            <span className="section__subtitle"></span>

            <div className="contact__container container grid">
                <div>
                    <div className="contact__information">
                        <i className="uil uil-envelope contact__icon"></i>

                        <div>
                            <h3 className="contact__title">Email</h3>
                            <span className="contact__subtitle">mahendran.06335@gmail.com</span>
                        </div>
                    </div>
                    <div className="contact__information">

                        <i className="uil uil-phone contact__icon"></i>

                        <div>
                            <h3 className="contact__title">Call Me</h3>
                            <span className="contact__subtitle">+91 6381855223</span>
                        </div>
                    </div>


                    <div className="contact__information">
                        <i className="uil uil-map-marker contact__icon"></i>

                        <div>
                            <h3 className="contact__title">Location</h3>
                            <span className="contact__subtitle">Coimbatore, India</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="contact__form grid">
                    <div className="contact__inputs grid">
                        <div className="contact__content">
                            <label htmlFor="name" className="contact__label">Name</label>
                            <input
                                type="text"
                                className="contact__input"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="contact__content">
                            <label htmlFor="email" className="contact__label">Email</label>
                            <input
                                type="email"
                                className="contact__input"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="contact__content">
                        <label htmlFor="project" className="contact__label">Project</label>
                        <input
                            type="text"
                            className="contact__input"
                            id="project"
                            name="project"
                            value={formData.project}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="contact__content">
                        <label htmlFor="message" className="contact__label">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            cols="0"
                            rows="7"
                            className="contact__input"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div>
                        <a  className="button button--flex" onClick={handleSubmit}>
                            Send Now
                            <i className="uil uil-message button__icon"></i>
                        </a>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Contact;
