import { useContext, useEffect, useRef } from 'react'
import './Modal.scss'
import useOutsideClick from '../../../hooks/useOutSideClick';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { LIGHT } from '../../../constant';

const Modal = ({ children, closeModal }) => {
    const modalRef = useRef(null);
    const { theme, toggleTheme } = useContext(ThemeContext);

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
        <div  className={`modal-container ${theme === LIGHT ? 'light-mode' : ''}`}>
            <div ref={modalRef} className='modal-content'  >
                {children}
            </div>
        </div>
    )
}

export default Modal