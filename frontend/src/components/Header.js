import React, { useState, useEffect } from 'react';
import { Link } from "react-scroll";

const Header = ({ setActiveSection }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('home');
    useEffect(() => {
        const handleScroll = () => {
            // Calculate the top offset of the header
            const headerOffset = document.getElementById('header').offsetHeight;

            // Add the header offset to the scroll position
            const scrollPosition = window.scrollY + headerOffset;

            // Get all sections with their corresponding links
            const sections = document.querySelectorAll('section[id]');

            // Initialize a variable to track the active link
            let activeSection = '';

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                // Check if the scroll position is within the range of each section
                if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                    activeSection = section.getAttribute('id');
                }
            });

            // Update the activeLink state based on the active section
            setActiveLink(activeSection);
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        return () => {
            // Remove scroll event listener on cleanup
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    const handleNavigation = (section) => {
        setActiveSection(section);
        setIsMenuOpen(false);
    };

    return (
        <header className="header" id="header">
            <nav className="nav container">
                <a href="#" className="nav__logo noSelect">Mahendran R</a>

                <div className={`nav__menu ${isMenuOpen ? 'show-menu' : ''}`} id="nav-menu">
                    <ul className="nav__list grid">
                        <li className="nav__item">
                            <Link to="home" spy={true} smooth={true} duration={500}
                                  className={`nav__link noSelect ${activeLink === 'home' ? 'active-link' : ''}`}
                                  activeClass="active-link"
                                  onClick={() => handleNavigation('home')}>
                                <i className="uil uil-estate nav__icon"></i> Home
                            </Link>



                        </li>
                        <li className="nav__item">
                            <Link to="about" spy={true} smooth={true} duration={500} className={`nav__link noSelect ${activeLink === 'about' ? 'active-link' : ''}`} onClick={() => handleNavigation('about')}>
                                <i className="uil uil-user nav__icon"></i> About
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="skills" spy={true} smooth={true} duration={500} className={`nav__link noSelect ${activeLink === 'skills' ? 'active-link' : ''}`} onClick={() => handleNavigation('skills')}>
                                <i className="uil uil-file-alt nav__icon"></i> Skills
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="projects" spy={true} smooth={true} duration={500} className={`nav__link noSelect ${activeLink === 'projects' ? 'active-link' : ''}`} onClick={() => handleNavigation('projects')}>
                                <i className="uil uil-scenery nav__icon"></i> Projects
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="contact" spy={true} smooth={true} duration={500} className={`nav__link noSelect ${activeLink === 'contact' ? 'active-link' : ''}`} onClick={() => handleNavigation('contact')}>
                                <i className="uil uil-message nav__icon"></i> Contact Me
                            </Link>
                        </li>
                    </ul>
                    <i className="uil uil-times nav__close noSelect" onClick={handleMenuClose}></i>
                </div>

                <div className="nav__btns">
                    <div className="nav__toggle noSelect" id="nav-toggle" onClick={handleMenuToggle}>
                        <i className="uil uil-apps"></i>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
