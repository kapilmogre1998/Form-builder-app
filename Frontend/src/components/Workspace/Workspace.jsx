import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ImFlag } from "react-icons/im";
import WorkspaceHeader from './WorkspaceHeader'
import useTheme from '../../hooks/useTheme'
import BubbleTextSidebar from './BubbleTextSidebar'
import { RiDeleteBin6Line } from "react-icons/ri";
import { BUBBLE_TYPES, formatName } from '../../constant';
import { v4 as uuidv4 } from 'uuid';
import { createFormBotAPI, fetchFormBotAPI } from './api';
import useUserData from '../../hooks/useUserData';
import { ToastContainer, toast } from 'react-toastify';


import './Workspace.scss'

const Workspace = () => {
    const [formElements, setFormElements] = useState([]);
    const [formName, setFormName] = useState(decodeURI(new URLSearchParams(new URL(window.location.href).search).get('formname')));
    const [showError, setShowError] = useState(false);
    const [enableShare, setEnableShare] = useState(false);
    const [formBotId, setFormBotId] = useState('')
    const [theme] = useTheme();
    const params = useParams();
    const userData = useUserData();
    const isLightMode = theme === "light";

    const isButtonAdded = useMemo(() => {
        return formElements.find((elem) => elem.elementType == 'user-input-button')?.value?.length ? true : false;
    }, [formElements])

    const checkBubbleElemValueIsEmpty = () => {
        const elem = formElements[formElements.length - 1];
        if ([...BUBBLE_TYPES, 'user-input-button'].includes(elem.elementType)) {
            return !elem.value.length;
        } else {
            return false;
        }
    }

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/form-bot/${formBotId}`);
            alert('Copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const handleClickOnBubbleText = (e) => {
        const bubbleInputType = e.target.id.split('-'); //spliting elementId to get the element name and title
        let title = ''; //variable for storing the title of the input field
        if (isButtonAdded) {
            toast('No Element can be added after a button');
            return;
        }

        if (showError) {
            setShowError(false);
        }

        if (formElements.length >= 1 && checkBubbleElemValueIsEmpty()) {
            setShowError(true)
            return;
        }

        if (bubbleInputType[0] == 'user') {
            title = `${formatName(bubbleInputType[1])} ${formatName(bubbleInputType[2])}`
        } else {
            title = formatName(bubbleInputType[1]);
        }

        if (formElements.length == 0) {
            setFormElements([{ elementType: e.target.id, value: '', title, id: uuidv4() }])
        }
        else {
            let tempArr = [...formElements];
            tempArr.push({ elementType: e.target.id, value: '', title, id: uuidv4() })
            setFormElements(tempArr);
        }
    }

    const handleClickOnDelete = (id) => {
        const modifiedList = formElements.filter(element => element.id !== id)

        setFormElements(modifiedList)
    }

    const handleOnChange = (id, e) => {
        if (showError) {
            setShowError(false);
        }
        const modifiedList = formElements.map((element) => {
            if (element.id == id) {
                return {
                    ...element,
                    value: e.target.value
                }
            }
            return element;
        })
        setFormElements(modifiedList)
    }

    const saveFormBot = async () => {
        let res = '';
        const modifiedFormElements = formElements.map((element) => ({
            type: element.elementType,
            title: element.title,
            value: element.value
        }))

        const payload = {
            list: modifiedFormElements,
            folderId: params.folderId,
            formId: params.formId,
            userId: userData.userId,
            formName
        };
        try {
            res = await createFormBotAPI(payload);
            if (res.status == 200 && res.data.message === 'success') {
                setEnableShare(true); //enable share button when data form bot is successfully saved
                toast.success('Form saved successfully!');
                setFormBotId(res.data.formBotId); //storing formbot id in ref variable so that it can be used later while sharing the link
            }
        } catch (error) {
            console.log(error);
            toast.error(res.data.message || 'Something went wrong!')
        }
    }

    const fetchFormBot = async () => {
        try {
            const res = await fetchFormBotAPI({ folderId: params.folderId, formId: params.formId })
            if (res?.data?.data?.elements?.length) {
                setEnableShare(true); //enable share button when data form bot api returns elements array
                const list = res.data.data.elements.map((elem) => ({
                    elementType: elem.type,
                    title: elem.title,
                    value: elem.value,
                    id: uuidv4()
                }))
                setFormElements(list);
                setFormName(res.data.data.formName);
                setFormBotId(res.data.data.formBotId);
            }
        } catch (error) {
            console.log("🚀 ~ fetchFormBot ~ error:", error)
        }
    }

    useEffect(() => {
        if (userData?.userId) {
            fetchFormBot();
        }
    }, [userData?.userId])


    return (
        <div className={`workspace-container ${isLightMode ? "light-mode" : ""}`} >
            <WorkspaceHeader {...{ isButtonAdded, formName, enableShare, handleCopyClick }} saveFormBot={saveFormBot} updateFormName={(name) => setFormName(name)} />
            <div className='form-editor' >
                <div className={`form-sidebar ${isLightMode ? 'light-mode-theme light-bg-shade' : ''}`} >
                    <BubbleTextSidebar {...{ formElements, setFormElements }} callback={handleClickOnBubbleText} />
                </div>
                <div className='content-section' >
                    <div className='form-flow' >
                        <div className={`start-flag ${isLightMode ? 'light-mode-theme light-mode-border' : ''}`} >
                            <ImFlag style={{ color: isLightMode ? '#1A5FFF' : 'white' }} />
                            Start
                        </div>

                        <div className='form-elements' >
                            {
                                formElements.map(({ elementType, value, title, id }, index) => (
                                    <div key={id} className={`element ${isLightMode ? 'light-mode-theme light-mode-border' : ''}`} >
                                        <p>{title}</p>
                                        {[...BUBBLE_TYPES, 'user-input-button'].includes(elementType) ? <input className={`${isLightMode ? 'light-mode-theme light-mode-border' : ''}`} type='text' placeholder='Enter text here...' value={value} onChange={(e) => handleOnChange(id, e)} /> : ''}
                                        <p className='error-msg' >{showError && (index == formElements.length - 1) ? 'Field is required!' : ''}</p>
                                        <div className={`delete-btn ${isLightMode ? 'light-mode-theme light-mode-border' : ''}`} >
                                            <RiDeleteBin6Line className='delete-icon' onClick={() => handleClickOnDelete(id)} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <ToastContainer position="top-right"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnHover={false}
                    theme={isLightMode ? 'light' : 'dark'}
                />
            </div>
        </div>
    )
}

export default Workspace