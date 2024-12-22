import React, { useState } from 'react';
import traingleShape from '../../assets/login-traingle-shape.png'
import semicircle from '../../assets/semi-circle.png'
import semicircle2 from '../../assets/semi-circle-2.png'
import './LogIn.scss'; // Import the CSS file for styles
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate email format
        if (!validateEmail(username)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        // Here you can handle further validations like password length, etc.
        // For simplicity, let's assume password should be at least 6 characters
        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return;
        }

        // If validations pass, you can proceed with form submission
        console.log('Form submitted:', { username, password });
        setErrorMessage('');

        // Reset fields after submission (if needed)
        setUsername('');
        setPassword('');
    };

    const validateEmail = (email) => {
        // Basic email format validation using regex
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    return (
        <div className="login-container">
            <div className='back-button' onClick={() => navigate('/')} >&larr;</div>

            <img className='img-1' src={traingleShape} alt="" />
            <img className='img-2' src={semicircle} alt="" />
            <img className='img-3' src={semicircle2} alt="" />
            <form className='login-form-container' onSubmit={handleSubmit}>
                <div className="form-group email-field">
                    <label htmlFor="username">Email</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        placeholder='Enter your email'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder='*******'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group btn" >
                    <button type="submit">Log In</button>
                </div>
                <div className='form-group register-btn' >Don’t have an account? <span onClick={() => navigate('/register')} >Register now</span></div>
            </form>
        </div>
    );
};

export default LogIn;
