import { useRef } from 'react'
import './Modal.scss'
import useOutsideClick from '../../../hooks/useOutSideClick';

const Modal = ({ children, closeModal }) => {
    const modalRef = useRef(null);

    useOutsideClick(modalRef, closeModal)

    return (
        <div  className='modal-container'>
            <div ref={modalRef} className='modal-content'  >
                <div className='close-btn'  onClick={closeModal} >x</div>
                {children}
            </div>
        </div>
    )
}

export default Modal