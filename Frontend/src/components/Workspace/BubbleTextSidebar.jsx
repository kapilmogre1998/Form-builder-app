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

import './BubbleTextSidebar.scss'

const BubbleTextSidebar = () => {

    return (
        <div className='bubble-text-sidebar' >
            <div className='bubbles' >
                <p>Bubbles</p>
                <div>
                    <div> <FiMessageSquare style={{ color: '#1A5FFF', fontSize: '18px' }} /> Text</div>
                    <div> <IoImageOutline style={{ color: '#1A5FFF', fontSize: '18px' }} /> Image</div>
                    <div> <LuVideo style={{ color: '#1A5FFF', fontSize: '18px' }} /> Video</div>
                    <div> <PiGifBold style={{ color: '#1A5FFF', fontSize: '18px' }} /> GIF</div>
                </div>
            </div>
            <div className='inputs' >
                <p>Input</p>
                <div>
                    <div><RxText style={{ color: '#FFA54C', fontSize: '16px' }} />Text</div>
                    <div><LuHash style={{ color: '#FFA54C', fontSize: '16px' }} /> Number</div>
                    <div><MdOutlineAlternateEmail style={{ color: '#FFA54C', fontSize: '16px' }} /> Email</div>
                    <div><FiPhone style={{ color: '#FFA54C', fontSize: '16px' }} /> Phone</div>
                    <div><IoCalendarClearOutline style={{ color: '#FFA54C', fontSize: '16px' }} /> Date</div>
                    <div>
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.00004 1.83301L10.06 6.00634L14.6667 6.67967L11.3334 9.92634L12.12 14.513L8.00004 12.3463L3.88004 14.513L4.66671 9.92634L1.33337 6.67967L5.94004 6.00634L8.00004 1.83301Z" stroke="#FFA54C" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Rating
                    </div>
                    <div>
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 7.83366L8 9.83366L14.6667 3.16699" stroke="#FFA54C" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14 8.5V13.1667C14 13.5203 13.8595 13.8594 13.6095 14.1095C13.3594 14.3595 13.0203 14.5 12.6667 14.5H3.33333C2.97971 14.5 2.64057 14.3595 2.39052 14.1095C2.14048 13.8594 2 13.5203 2 13.1667V3.83333C2 3.47971 2.14048 3.14057 2.39052 2.89052C2.64057 2.64048 2.97971 2.5 3.33333 2.5H10.6667" stroke="#FFA54C" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Buttons
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BubbleTextSidebar