import React, { useState } from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { BiHide } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

import './Settings.scss';

const Settings = () => {
    const [formData, setFormData] = useState({ userName: '', email: '', oldPassword: '', newPassword: '' })
    const [hide, setHide] = useState({ emailHide: true, oldPasswordHide: true, newPasswordHide: true })
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className='settings-container' >
            <h3 className='title' >Settings</h3>
            <div className='form-fields' >
                <form className='login-form-container' onSubmit={() => { }}>
                    <div className='form-group' >
                        <FaRegUser style={{ color: '#828282', width: '22px', height: '22px', paddingLeft: '4px' }} />
                        <input
                            type="text"
                            id="username"
                            name="userName"
                            value={formData.userName}
                            placeholder='Name'
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    <div className='form-group' >
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.0513 14.165V10.0304V10.0304C11.0513 6.98593 13.5196 4.51758 16.5641 4.51758V4.51758C19.6085 4.51758 22.0768 6.98593 22.0768 10.0304V10.0304V14.165" stroke="#828282" stroke-width="2.06729" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16.5641 19.6777V23.8123" stroke="#828282" stroke-width="2.06729" stroke-linecap="round" stroke-linejoin="round" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.4549 29.3242H9.6729C8.14999 29.3242 6.9165 28.0907 6.9165 26.5678V16.9205C6.9165 15.3975 8.14999 14.1641 9.6729 14.1641H23.4549C24.9778 14.1641 26.2113 15.3975 26.2113 16.9205V26.5678C26.2113 28.0907 24.9778 29.3242 23.4549 29.3242Z" stroke="#828282" stroke-width="2.06729" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input
                            type={hide.emailHide ? 'password' : 'text'}
                            id="email"
                            name="email"
                            value={formData.email}
                            placeholder='Update email'
                            onChange={handleOnChange}
                            required
                        />
                        {
                            hide.emailHide ? 
                            <IoEyeOutline className='pointer' onClick={() => setHide(prev => ({ ...prev, emailHide: !prev.emailHide }))} style={{ color: '#828282', width: '34px', height: '34px' }} /> :
                            <BiHide className='pointer' onClick={() => setHide(prev => ({ ...prev, emailHide: !prev.emailHide }))} style={{ color: '#828282', width: '34px', height: '34px' }} />
                        }
                    </div>

                    <div className='form-group' >
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.0513 14.165V10.0304V10.0304C11.0513 6.98593 13.5196 4.51758 16.5641 4.51758V4.51758C19.6085 4.51758 22.0768 6.98593 22.0768 10.0304V10.0304V14.165" stroke="#828282" stroke-width="2.06729" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16.5641 19.6777V23.8123" stroke="#828282" stroke-width="2.06729" stroke-linecap="round" stroke-linejoin="round" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.4549 29.3242H9.6729C8.14999 29.3242 6.9165 28.0907 6.9165 26.5678V16.9205C6.9165 15.3975 8.14999 14.1641 9.6729 14.1641H23.4549C24.9778 14.1641 26.2113 15.3975 26.2113 16.9205V26.5678C26.2113 28.0907 24.9778 29.3242 23.4549 29.3242Z" stroke="#828282" stroke-width="2.06729" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input
                            type={hide.oldPasswordHide ? "password" : "text"}
                            id="oldPassword"
                            name="oldPassword"
                            value={formData.oldPassword}
                            placeholder='Old Password'
                            onChange={handleOnChange}
                            required
                        />
                        {
                            hide.oldPasswordHide ? 
                            <IoEyeOutline className='pointer' onClick={() => setHide(prev => ({ ...prev, oldPasswordHide: !prev.oldPasswordHide }))} style={{ color: '#828282', width: '34px', height: '34px' }} /> :
                            <BiHide className='pointer' onClick={() => setHide(prev => ({ ...prev, oldPasswordHide: !prev.oldPasswordHide }))} style={{ color: '#828282', width: '34px', height: '34px' }} />
                        }
                    </div>

                    <div className='form-group' >
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.0513 14.165V10.0304V10.0304C11.0513 6.98593 13.5196 4.51758 16.5641 4.51758V4.51758C19.6085 4.51758 22.0768 6.98593 22.0768 10.0304V10.0304V14.165" stroke="#828282" stroke-width="2.06729" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16.5641 19.6777V23.8123" stroke="#828282" stroke-width="2.06729" stroke-linecap="round" stroke-linejoin="round" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.4549 29.3242H9.6729C8.14999 29.3242 6.9165 28.0907 6.9165 26.5678V16.9205C6.9165 15.3975 8.14999 14.1641 9.6729 14.1641H23.4549C24.9778 14.1641 26.2113 15.3975 26.2113 16.9205V26.5678C26.2113 28.0907 24.9778 29.3242 23.4549 29.3242Z" stroke="#828282" stroke-width="2.06729" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input
                            type={hide.newPasswordHide ? "password" : "text"}
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            placeholder='New Password'
                            onChange={handleOnChange}
                            required
                        />
                        {
                            hide.newPasswordHide ? 
                            <IoEyeOutline className='pointer' onClick={() => setHide(prev => ({ ...prev, newPasswordHide: !prev.newPasswordHide }))} style={{ color: '#828282', width: '34px', height: '34px' }} /> :
                            <BiHide className='pointer' onClick={() => setHide(prev => ({ ...prev, newPasswordHide: !prev.newPasswordHide }))} style={{ color: '#828282', width: '34px', height: '34px' }} />
                        }
                    </div>

                    <div className="update-btn" >
                        <button type="submit">Update</button>
                    </div>
                </form>
                <div className='logout-btn' onClick={handleLogout} ><LuLogOut /> Logout</div>
            </div>
        </div>
    )
}

export default Settings