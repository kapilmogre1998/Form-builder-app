import React from 'react'
import { FiMessageSquare } from "react-icons/fi";
import { IoImageOutline } from "react-icons/io5";
import { LuVideo } from "react-icons/lu";
import { PiGifBold } from "react-icons/pi";
import { RxText } from "react-icons/rx";
import { LuHash } from "react-icons/lu";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { IoCalendarClearOutline } from "react-icons/io5";
import useTheme from '../../hooks/useTheme';
import { LIGHT } from '../../constant';

import './BubbleTextSidebar.scss'

const BubbleTextSidebar = ({ formElements, setFormElements, callback }) => {
    const [theme] = useTheme()
    const isLightMode = theme == LIGHT;

    return (
        <div className={`bubble-text-sidebar ${theme === 'light' ? 'light-mode-theme' : ''}`} >
            <div className='bubbles' >
                <p>Bubbles</p>
                <div>
                    <div className={`${isLightMode ? 'light-mode-theme light-mode-border' : ''}`} id='bubble-text' onClick={callback} > <FiMessageSquare className='icon-clr' /> Text</div>
                    <div className={`${isLightMode ? 'light-mode-theme light-mode-border' : ''}`} id='bubble-image' onClick={callback} > <IoImageOutline className='icon-clr' /> Image</div>
                    <div className={`video-bubble ${isLightMode ? 'light-mode-theme light-mode-border' : ''}`} > <LuVideo className='icon-clr' /> Video</div>
                    <div className={`${isLightMode ? 'light-mode-theme light-mode-border' : ''}`} id='bubble-gif' onClick={callback} > <PiGifBold className='icon-clr' /> GIF</div>
                </div>
            </div>
            <div className='inputs' >
                <p>Input</p>
                <div>
                    <div className={`${isLightMode ? 'light-mode-theme light-mode-border' : ''}`} id='user-input-text' onClick={callback} ><RxText className='icon-clr1' />Text</div>
                    <div className={`${isLightMode ? 'light-mode-theme light-mode-border' : ''}`} id='user-input-number' onClick={callback} ><LuHash className='icon-clr1' /> Number</div>
                    <div className={`${isLightMode ? 'light-mode-theme light-mode-border' : ''}`} id='user-input-email' onClick={callback} ><MdOutlineAlternateEmail className='icon-clr1' /> Email</div>
                    <div className={`${isLightMode ? 'light-mode-theme light-mode-border' : ''}`} id='user-input-phone' onClick={callback} ><FiPhone className='icon-clr1' /> Phone</div>
                    <div className={`${isLightMode ? 'light-mode-theme light-mode-border' : ''}`} id='user-input-date' onClick={callback} ><IoCalendarClearOutline className='icon-clr1' /> Date</div>
                    <div className={`${isLightMode ? 'light-mode-theme light-mode-border' : ''}`} id='user-input-rating' onClick={callback} >
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00004 1.83301L10.06 6.00634L14.6667 6.67967L11.3334 9.92634L12.12 14.513L8.00004 12.3463L3.88004 14.513L4.66671 9.92634L1.33337 6.67967L5.94004 6.00634L8.00004 1.83301Z" stroke="#FFA54C" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Rating
                    </div>
                    <div className={`${isLightMode ? 'light-mode-theme light-mode-border' : ''}`} id='user-input-button' onClick={callback} >
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 7.83366L8 9.83366L14.6667 3.16699" stroke="#FFA54C" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 8.5V13.1667C14 13.5203 13.8595 13.8594 13.6095 14.1095C13.3594 14.3595 13.0203 14.5 12.6667 14.5H3.33333C2.97971 14.5 2.64057 14.3595 2.39052 14.1095C2.14048 13.8594 2 13.5203 2 13.1667V3.83333C2 3.47971 2.14048 3.14057 2.39052 2.89052C2.64057 2.64048 2.97971 2.5 3.33333 2.5H10.6667" stroke="#FFA54C" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Buttons
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BubbleTextSidebar