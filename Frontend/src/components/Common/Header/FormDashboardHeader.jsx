import React, { useState } from 'react'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'
import { useNavigate } from 'react-router-dom'
import { LIGHT } from '../../../constant'
import useTheme from '../../../hooks/useTheme'

import './FormDashboardHeader.scss'

const FormDashboardHeader = () => {
    const [theme, toggleTheme] = useTheme()
    const navigate = useNavigate();

    const handleClick = (e) => {
        const {value} = e.target;

        if(value === 'settings'){
            navigate('/settings');
        }
    }

    return (
        <div className={`header-container ${theme === LIGHT ? 'light-header': ''}`} >
            <select id="gender" name="gender" onClick={handleClick} >
                <option value="username" selected>User Name</option>
                <option value="settings" >Settings</option>
            </select>

            <div className='action-buttons' >
                <span className={`switch-buttons ${theme === LIGHT ? 'light-mode-switch': ''}`} >
                    <span>Light</span>
                    <ToggleSwitch isChecked={theme === LIGHT} toggleSwitch={toggleTheme} />
                    <span>Dark</span>
                </span>
                <button className='share-btn' >Share</button>
            </div>
        </div>
    )
}

export default FormDashboardHeader