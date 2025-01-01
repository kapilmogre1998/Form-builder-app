import { useContext, useEffect, useRef } from 'react'
import useOutsideClick from '../../../hooks/useOutSideClick';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { LIGHT } from '../../../constant';

import './Modal.scss'

const Modal = ({ children, closeModal, contentWidth = 400 }) => {
    const modalRef = useRef(null);
    const { theme } = useContext(ThemeContext);

    useOutsideClick(modalRef, closeModal)

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if(e.key === "Escape") closeModal();
        });

        return () => {
            document.removeEventListener('keydown', (e) => {
                if(e.key === "Escape") closeModal();
            })
        };
    },[])

    return (
        <div  className='modal-container'>
            <div ref={modalRef} className={`modal-content ${theme === LIGHT ? 'light-mode-theme' : ''}`} style={{ width: contentWidth + 'px' }} >
                {children}
            </div>
        </div>
    )
}

export default Modal