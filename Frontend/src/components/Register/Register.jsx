import React, { useEffect, useState } from 'react';
import traingleShape from '../../assets/login-traingle-shape.png'
import semicircle from '../../assets/semi-circle.png'
import semicircle2 from '../../assets/semi-circle-2.png'
import { useNavigate } from 'react-router-dom';
import { registerAPI } from './api';

import './Register.scss';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' })
    const [userNameError, setUserNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const submitHandler = async (data) => {
        setIsLoading(true);
        try {
            const res = await registerAPI(data);
            if (res.data) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user_data", JSON.stringify(res.data.userData))
                navigate('/form-dashboard')
            }
        } catch (error) {
            alert(error.response.data.msg);
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let isError = false;
        const { username, email, password, confirmPassword } = formData;

        if (!username.length) {
            setUserNameError('Please ')
        }

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            isError = true
        }

        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
            isError = true;
        }

        if (confirmPassword.length !== password.length || confirmPassword !== password) {
            setConfirmPassword('confirm password does not match with password.')
            isError = true;
        }

        if (isError) {
            return;
        }
        const data = {
            username,
            email,
            password
        }
        submitHandler(data);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleOnChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))

        setEmailError('')
        setUserNameError('')
        setPasswordError('')
        setConfirmPassword('')
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            navigate('/form-dashboard')
        }
    }, [])

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
                                value={formData.username}
                                placeholder='Enter your email'
                                onChange={handleOnChange}
                                required
                            />
                            <div className='error-msg' >{userNameError.length ? userNameError : ''}</div>
                        </div>
                        <div className="form-group email-field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={formData.email}
                                placeholder='Enter your email'
                                onChange={handleOnChange}
                                required
                            />
                            <div className='error-msg' >{emailError.length ? emailError : ''}</div>
                        </div>
                        <div className="form-group password">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                placeholder='*******'
                                onChange={handleOnChange}
                                required
                            />
                            <div className='error-msg' >{passwordError.length ? passwordError : ''}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                placeholder='*******'
                                onChange={handleOnChange}
                                required
                            />
                            <div className='error-msg' >{confirmPassword.length ? confirmPassword : ''}</div>
                        </div>
                        <div className="form-group btn" >
                            <button type="submit">{isLoading ? 'Loading...' : 'Sign Up'}</button>
                        </div>
                        <div className='form-group register-btn' >Already have an account? <span onClick={() => navigate('/login')} >Login</span></div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
