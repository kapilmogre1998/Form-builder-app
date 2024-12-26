import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import FormDashboardHeader from '../Common/Header/FormDashboardHeader'
import Modal from '../Common/Modal/Modal'
import useUserData from '../../hooks/useUserData'
import { createDeleteFolderAPI, createNewFolderAPI, createNewFormAPI, getFolderListAPI } from './api'
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineFolderAdd } from "react-icons/ai";

import './FormDashboard.scss'

const DEFAULT_FOLDER = { title: 'Create Folder', id: '1', uniqueId: 'CREATE_FOLDER' }
const DEFAULT_FILE = { title: 'Create typebot', id: '1', uniqueId: 'CRREATE_TYPEBOT' }

const FormDashboard = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [modal, setModal] = useState({ show: false, type: 'CREATE_FOLDER', modalData: {} })
  const [folderList, setFolderList] = useState([DEFAULT_FOLDER]);
  const [allFormList, setAllFormList] = useState([]);
  const [activeFormList, setActiveFormList] = useState([])
  const [folderName, setFolderName] = useState({ name: '', isError: false });
  const [formName, setFormName] = useState({ name: '', isError: false });

  const userData = useUserData();

  const fetchFolderList = async () => {
    try {
      const res = await getFolderListAPI(userData.userId);
      if (res.data) {

        const folders = res.data.data.map(({ _id, folderName }) => ({
          id: _id,
          title: folderName,
          isActive: false
        }))

        const forms = res.data.data.filter((folder) => folder.forms.length).map((folder) => folder.forms.map((form) => ({
          id: form._id,
          title: form.formName,
          folderId: folder._id
        }))).flat();

        setFolderList([...folders]);
        setAllFormList([...forms]);
      }
    } catch (error) {
      alert('something went wrong!')
      console.log(error);
    }
  }

  const handleClickOnFolder = (e, uniqueId) => {
    setFolderList(prev => prev.map((folder) => ({
      ...folder,
      isActive: folder.id === uniqueId
    })))
    setActiveFormList(allFormList.filter(folder => folder?.folderId === uniqueId))
  }

  const handleClickonDeleteFolder = (e, id) => {
    e.stopPropagation();
    setModal({ ...modal, show: true, type: 'DELETE_FOLDER', modalData: { folderId: id } });
  }

  const handleClickonDeleteFile = (e, id) => {
    e.stopPropagation();
    setModal({ ...modal, show: true, type: 'DELETE_FILE' })
  }

  const createNewFolder = async () => {
    try {
      const payload = {
        userId: userData.userId,
        folderName: folderName.name
      }
      const res = await createNewFolderAPI(payload);
      if (res.data) {
        await fetchFolderList();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const createNewForm = async () => {
    try {
      const payload = {
        name: formName,
        userId: userData.userId,
        folderId: modal.modalData.folderId
      }
      const res = await createNewFormAPI(payload);
      if (res.data) {
        await fetchFolderList();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickOnDone = async () => {
    if (modal?.type === 'CREATE_FOLDER' && !folderName.name.trim().length) {
      return setFolderName({ name: '', isError: true })
      
    }
    if (modal?.type === 'CREATE_FORM' && !formName.name.trim().length) {
      return setFormName({ name: '', isError: true });
    }

    modal?.type === 'CREATE_FOLDER' ? createNewFolder() : createNewForm();
  }

  const closeModal = () => {
    setFolderName({ name: '', isError: false });
    setFormName({ name: '', isError: false });
    setModal({ ...modal, show: false })
  }
  
  const handleInputChange = (e) => {
    if (modal?.type === 'CREATE_FORM') {
      setFormName({ name: e.target.value, isError: false });
    } else {
      setFolderName({ name: e.target.value, isError: false });
    }
    e.stopPropagation()
  }

  const handleConfirmToDelete = async () => {
    try {
      const data = {
        folderId: modal.modalData.folderId,
        userId: userData.userId
      }
      const res = await createDeleteFolderAPI(data);
      if (res.data) {
        await fetchFolderList();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (userData?.userId) {
      fetchFolderList();
    }
  }, [userData?.userId])

  return (
    <div className={`form-dashboard-container ${theme === "light" ? "light-mode" : ""}`} >
      <header>
        <FormDashboardHeader {...{ theme, toggleTheme }} />
      </header>
      <div className='create-folder-container' >
        <div className='folder-list' >
          {/* Render Default Folder */}
          <span key={DEFAULT_FOLDER.id}className='folder flex'onClick={() => setModal({ show: true, type: 'CREATE_FOLDER' })}>
            <AiOutlineFolderAdd style={{ fontSize: '20px' }} />
            <span>{DEFAULT_FOLDER.title}</span>
          </span>

          {/* Folder List */}
          {
            folderList.map(({ title, id, isActive }) => (
              <div key={id} className={`folder ${isActive ? 'active' : ''}`} onClick={(event) => handleClickOnFolder(event, id)} >
                <div>{title}</div>
                <RiDeleteBin6Line className='delete' onClick={(e) => handleClickonDeleteFolder(e, id)} />
              </div>
            ))
          }
        </div>

        <div className='forms' >
          {/* Render Default Form */}
          <div key={DEFAULT_FILE.id} className='form' onClick={() => setModal({ show: true, type: 'CREATE_FORM' })}>
            <div className='plus-icon'>+</div>
            <div>{DEFAULT_FILE.title}</div>
          </div>

          {/* Render Active Forms List */}
          {
            activeFormList.map(({ title, id }) => (
              <div key={id} className='form' onClick={() => {}} >
                <div>{title}</div>
                <div className='form-delete-icon' onClick={handleClickonDeleteFile} ><RiDeleteBin6Line className='delete' /></div>
              </div>
            ))
          }
        </div>
      </div>
      {
        (modal?.type === 'CREATE_FOLDER' || modal?.type === 'CREATE_FORM') && modal?.show ? (
          <Modal closeModal={closeModal} theme={theme} >
            <div className='create-modal-container' >
              <h3>Create New {modal?.type === 'CREATE_FORM' ? 'Form' : 'Folder'}</h3>
              <input type='text' className='input-folder' placeholder='Enter folder name...' value={folderName.text} onChange={handleInputChange} />
              <div className='err-msg' >
                {modal?.type === 'CREATE_FOLDER' && folderName.isError && 'Please enter a valid folder name'}
                {modal?.type === 'CREATE_FORM' && formName.isError && 'please enter a valid form name'}
              </div>
              <div className='action-buttons' >
                <button className='done-btn btn' onClick={handleClickOnDone}>Done</button>
                <button className='divider' />
                <button className='cancel-btn btn' onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </Modal>
        ) : null
      }
      {
        (modal?.type === 'DELETE_FOLDER' || modal?.type === 'DELETE_FORM') && modal?.show ? (
          <Modal closeModal={() => setModal({ ...modal, show: false })} >
            <div>
              <h3 className='text-center' >Are you sure you want to delete this {modal.type === 'DELETE_FOLDER' ? 'folder' : 'form'} ?</h3>
              <div className='action-buttons' >
                <button className='done-btn btn' onClick={handleConfirmToDelete}>Confirm</button>
                <button className='divider' />
                <button className='cancel-btn btn' onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </Modal>
        ) : null
      }
    </div>
  )
}

export default FormDashboard