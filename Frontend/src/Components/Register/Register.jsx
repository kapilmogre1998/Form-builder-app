import React, { useState } from 'react';
import traingleShape from '../../assets/login-traingle-shape.png'
import semicircle from '../../assets/semi-circle.png'
import semicircle2 from '../../assets/semi-circle-2.png'
import { useNavigate } from 'react-router-dom';
import './Register.scss'; // Import the CSS file for styles

const Register = () => {
    const { formData, setFormData } = useState({ username: '', email: '', password: '', confirmPassword: '' })
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
        <div className="register-container">
            <div className='form-container' >
                <div className='back-button' >&larr;</div>
                <img className='img-1' src={traingleShape} alt="" />
                <img className='img-2' src={semicircle} alt="" />
                <img className='img-3' src={semicircle2} alt="" />
                <div className='form-fields' >
                    <form className='relative' onSubmit={handleSubmit}>
                        <div className="form-group email-field" >
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData?.username}
                                placeholder='Enter your email'
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group email-field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={formData?.email}
                                placeholder='Enter your email'
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group password">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData?.password}
                                placeholder='*******'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Confirm Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData?.confirmPassword}
                                placeholder='*******'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group btn" >
                            <button type="submit">Sign Up</button>
                        </div>
                        <div className='form-group register-btn' >Already have an account? <span onClick={() => navigate('/login')} >Login</span></div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
