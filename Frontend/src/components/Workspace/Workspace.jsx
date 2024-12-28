import React from 'react'
import WorkspaceHeader from './WorkspaceHeader'
import useTheme from '../../hooks/useTheme'
import BubbleTextSidebar from './BubbleTextSidebar'
import { ImFlag } from "react-icons/im";

import './Workspace.scss'

const Workspace = () => {
    const [theme, toggleTheme] = useTheme();
    const isLightMode = theme === "light";

  return (
    <div className={`workspace-container ${isLightMode ? "light-mode" : ""}`} >
        <WorkspaceHeader />
        <div className='form-editor' >
            <div className='form-sidebar' >
                <BubbleTextSidebar />
            </div>
            <div className='content-section' >
                <div className='form-flow' >
                    <div className='start-flag' >
                        <ImFlag style={{ color: 'white' }} />
                        Start
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Workspace