import React, { useState } from 'react';
import { Link } from 'react-scroll';
import Typewriter from 'typewriter-effect';

const FrontPage = () => {
    const name = 'Mahendran R';
    const titles = ['Full Stack Developer', 'Django Developer', 'Python Expert','Tech Enthusiast','Adoptable Learner'];
    const quote = 'Have a Great Day';
    /*const [typedQuote, setTypedQuote] = useState('');

    // Function to type out the quote
    const typeQuote = () => {
        let index = 0;
        const interval = setInterval(() => {
            setTypedQuote(prev => {
                if (index < quote.length) {
                    index++;
                    return quote.slice(0, index);
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 70);

        // Clear the interval after typing the entire quote
        setTimeout(() => clearInterval(interval), quote.length * 70 + 100);
    };

    // Trigger typing effect when component mounts
    useState(() => {
        typeQuote();
    }, []);*/

    return (

        <div className=" container" id="home ">
            <div className=" Home-data" style={{minHeight:"100vh"}}>
                <h2>{name}</h2>
                <h2>
                    <Typewriter
                        options={{
                            strings: titles,
                            autoStart: true,
                            loop: true,
                            delay: 50,
                            deleteSpeed:2,
                        }}
                    />
                </h2>
                <p>{quote}</p>
                <Link to="about" spy={true}  smooth={true} duration={800} className="button button--small">Get started</Link>
            </div>
        </div>
    );
};

export default FrontPage;
