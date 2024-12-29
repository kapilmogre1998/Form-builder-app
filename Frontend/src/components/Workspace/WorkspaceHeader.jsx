import React, { useState } from 'react'
import ToggleSwitch from '../Common/ToggleSwitch/ToggleSwitch'
import { useNavigate } from 'react-router-dom'
import useTheme from '../../hooks/useTheme'
import { LIGHT } from '../../constant'
import { RxCross2 } from "react-icons/rx";

import './WorkspaceHeader.scss'

const WorkspaceHeader = ({ formName = '', updateFormName = () => {}, isButtonAdded, saveFormBot, enableShare, handleCopyClick }) => {
    const [theme, toggleTheme] = useTheme()
    const navigate = useNavigate();

    const handleClickOnSave = () => {
        if(!isButtonAdded) return;
        saveFormBot();
    }

    return (
        <div className={`workspace-header-container ${theme === LIGHT ? 'light-header': ''}`} >
            <div className={`left-container ${theme === LIGHT ? 'light-input': ''}`} >
                <input type="text" value={formName} placeholder='Enter form name' onChange={(e) => updateFormName(e.target.value)} />
            </div>

            <div className='center-container' >
                <div className='flow-btn' >Flow</div>
                <div className='response-btn' >Response</div>
            </div>

            <div className='action-buttons' >
                <span className={`switch-buttons ${theme === LIGHT ? 'light-mode-switch': ''}`} >
                    <span>Light</span>
                    <ToggleSwitch isChecked={theme === LIGHT} toggleSwitch={toggleTheme} />
                    <span>Dark</span>
                </span>
                <button className={`share-btn ${!enableShare ? 'disable-btn' : ''}`} onClick={handleCopyClick} >Share</button>
                <button className={`save-btn ${!isButtonAdded ? 'disable-btn' : ''}`} onClick={handleClickOnSave} >Save</button>
                <RxCross2 style={{ color: 'red', fontSize: '24px', cursor: 'pointer' }} onClick={() => navigate('/form-dashboard')} />
            </div>
        </div>
    )
}

export default WorkspaceHeader