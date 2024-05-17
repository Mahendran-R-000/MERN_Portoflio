import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Skills from "./skills";
import About from "./about";
import Certifications from "./certifications";
import Qualifications from "./qualification";
import Projects from "./projects";
import axios from "axios";

function Dashboard() {
    const navigate = useNavigate();
    const logout = () => {
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('startTime'); // Remove start time from localStorage upon logout
        // Redirect to login page
        navigate('/', { replace: true });
    };
    const storedStartTime = localStorage.getItem('startTime');
    if (storedStartTime && (Date.now() - parseInt(storedStartTime)) > 15 * 60 * 1000) {
        // Redirect to login page
        logout();
        //navigate('/', { replace: true });
    }
    if (!storedStartTime) {
        localStorage.setItem('startTime', Date.now());
    }
    const [startTime, setStartTime] = useState(parseInt(storedStartTime) || Date.now());

    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    const initialTimer = Math.max(0, 15 * 60 - elapsedSeconds);
    const [timer, setTimer] = useState(initialTimer);
    const [promptLogout, setPromptLogout] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer === 60 * 3) { // Prompt for logout when 3 minutes left
                    setPromptLogout(true);
                }
                if (prevTimer === 0) { // Auto logout when timer reaches 0
                    logout();
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const continueSession = async () => {
        setPromptLogout(false);
        try {
            // Make a request to the backend to get the new token
            const token=localStorage.getItem('token');
             const response = await axios.get('http://localhost:4000/api/refresh-token',{
                 headers:{
                     Authorization: `Bearer ${token}`
                 }
             });
             const newToken = response.data.token;
            //const newToken = "newToken";
            localStorage.setItem('token', newToken);
            setStartTime(Date.now()); // Update start time in localStorage
            setTimer(15 * 60); // Reset timer to 15 minutes
        } catch (error) {
            console.error('Error refreshing token:', error);
            // Handle error
        }
    };



    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                    <h2>Dashboard</h2>
                    <p>Session Timer: {formatTime(timer)}</p>
                    {promptLogout && (
                        <div className="modal" tabIndex="-1" role="dialog" style={{display: "block"}}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Session Expiring</h5>
                                        <button type="button" className="close" aria-label="Close"
                                                onClick={() => setPromptLogout(false)}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        Your session will end in 2 minutes. Do you want to continue?
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary"
                                                onClick={continueSession}>Continue
                                        </button>
                                        <button type="button" className="btn btn-secondary"
                                                onClick={() => setPromptLogout(false)}>Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <button className="btn btn-danger" onClick={logout}>Logout</button>
                </div>
            </div>
            <About/>
            <Skills/>
            <Certifications/>
            <Qualifications/>
            <Projects/>
        </div>
    );
}

export default Dashboard;
