import React, { useState } from 'react'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'
import './FormDashboardHeader.scss'
import { useNavigate } from 'react-router-dom'

const FormDashboardHeader = ({ theme, toggleTheme }) => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        const {value} = e.target;

        if(value === 'settings'){
            navigate('/settings');
        }
    }

    return (
        <div className='header-container' >
            <select id="gender" name="gender" onClick={handleClick} >
                <option value="username" selected>User Name</option>
                <option value="settings" >Settings</option>
            </select>

            <div className='action-buttons' >
                <span className='switch-buttons' >
                    <span>Light</span>
                    <ToggleSwitch isChecked={theme === "light"} toggleSwitch={toggleTheme} />
                    <span>Dark</span>
                </span>
                <button className='share-btn' >Share</button>
            </div>
        </div>
    )
}

export default FormDashboardHeader