import React, { useState } from 'react'
import ToggleSwitch from '../Common/ToggleSwitch/ToggleSwitch'
import { useNavigate } from 'react-router-dom'
import useTheme from '../../hooks/useTheme'
import { LIGHT } from '../../constant'
import { RxCross2 } from "react-icons/rx";

import './WorkspaceHeader.scss'

const WorkspaceHeader = ({ formName = '', updateFormName = () => { }, isButtonAdded, saveFormBot, enableShare, handleCopyClick, hideOptions = false, activeTab = 'flow', handleClickOnFlow = () => {}, handleClickOnResponse = () => {} }) => {
    const [theme, toggleTheme] = useTheme()
    const navigate = useNavigate();
    // const params = useParams();

    const handleClickOnSave = () => {
        if (!isButtonAdded) return;
        saveFormBot();
    }

    return (
        <div className={`workspace-header-container ${theme === LIGHT ? 'light-header' : ''}`} >
            <div className={`left-container ${theme === LIGHT ? 'light-input' : ''}`} >
                {hideOptions ? null : <input type="text" value={formName} placeholder='Enter form name' onChange={(e) => updateFormName(e.target.value)} />}
            </div>

            <div className='center-container' >
                <div className={`${activeTab === 'flow' && 'active-tab'}`} onClick={handleClickOnFlow} >Flow</div>
                <div className={`${activeTab === 'response' && 'active-tab'}`} onClick={handleClickOnResponse} >Response</div>
            </div>

            <div className='action-buttons' >
                <span className={`switch-buttons ${theme === LIGHT ? 'light-mode-switch' : ''}`} >
                    <span>Light</span>
                    <ToggleSwitch isChecked={theme === LIGHT} toggleSwitch={toggleTheme} />
                    <span>Dark</span>
                </span>
                {hideOptions ? null : <>
                    <button className={`share-btn ${!enableShare ? 'disable-btn' : ''}`} onClick={handleCopyClick} >Share</button>
                    <button className={`save-btn ${!isButtonAdded ? 'disable-btn' : ''}`} onClick={handleClickOnSave} >Save</button>
                </>}
                <RxCross2 style={{ color: 'red', fontSize: '24px', cursor: 'pointer' }} onClick={() => navigate(-1)} />
            </div>
        </div>
    )
}

export default WorkspaceHeader