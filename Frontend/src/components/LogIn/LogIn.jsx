import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import traingleShape from '../../assets/login-traingle-shape.png'
import semicircle from '../../assets/semi-circle.png'
import semicircle2 from '../../assets/semi-circle-2.png'
import { ToastContainer, toast } from 'react-toastify';
import { loginAPI } from './api';

import './LogIn.scss';

const LogIn = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        setIsLoading(true);
        let res;
        try {
            res = await loginAPI(data);

            if (res?.data) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user_data", JSON.stringify(res.data.userData))
                navigate('/form-dashboard')
            } else {
                throw new Error(res.data.msg)
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg)
        } finally {
            setIsLoading(false);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = formData;

        if (!validateEmail(email)) {
            setEmailError('please enter a valid email address.');
            return;
        }

        if (password.length < 6) {
            setPasswordError('please enter a password with at least 6 characters.');
            return;
        }


        submitHandler({ email, password })
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleOnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        if (emailError.length) {
            setEmailError('')
        }
        if (passwordError.length) {
            setPasswordError('')
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/form-dashboard')
        }
    }, [])

    return (
        <div className="login-container">
            <div className='form-container' >
                <div className='back-button' onClick={() => navigate('/')} >&larr;</div>
                <img className='img-1' src={traingleShape} alt="" />
                <img className='img-2' src={semicircle} alt="" />
                <img className='img-3' src={semicircle2} alt="" />
                <div className='form-fields' >
                    <form className='login-form-container' onSubmit={handleSubmit}>
                        <div className='form-group email-field'>
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
                            <div className='err-msg' >{emailError.length ? emailError : ''}</div>
                        </div>
                        <div className='form-group'>
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
                            <div className='err-msg' >{passwordError.length ? passwordError : ''}</div>
                        </div>
                        <div className="form-group btn" >
                            <button type="submit">{isLoading ? 'Loading...' : 'Log In'}</button>
                        </div>
                        <div className='form-group register-btn' >Don’t have an account? <span onClick={() => navigate('/register')} >Register now</span></div>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnHover={false}
                theme={'dark'}
            />
        </div>
    );
};

export default LogIn;
