import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import FormDashboardHeader from '../Common/Header/FormDashboardHeader'
import Modal from '../Common/Modal/Modal'
import useUserData from '../../hooks/useUserData'
import './FormDashboard.scss'
import { createNewFileAPI, createNewFolderAPI, getFolderListAPI } from './api'

const DEFAULT_FOLDER = { title: 'Create Folder', id: '1', uniqueId: 'CREATE_FOLDER' }
const DEFAULT_FILE = { title: 'Create typebot', id: '1', uniqueId: 'CRREATE_TYPEBOT' }

const FormDashboard = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [modal, setModal] = useState({ show: false, type: 'CREATE_FOLDER', modalData: {} })
  const [folderList, setFolderList] = useState([DEFAULT_FOLDER]);
  const [allFormList, setAllFormList] = useState([]);
  const [activeFormList, setActiveFormList] = useState([])
  const [folderName, setFolderName] = useState('');
  const [formName, setFormName] = useState('')

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

        const files = res.data.data.filter((folder) => folder.files.length).map((folder) => folder.files.map((file) => ({
          id: file._id,
          title: file.fileName,
          folderId: folder._id
        }))).flat();

        setFolderList([...folders]);
        setAllFormList([...files]);
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

  const handleClickOnFile = (e, uniqueId) => {

  }

  const handleClickonDeleteFolder = (e, id) => {
    e.stopPropagation();
    setModal({ ...modal, show: true, type: 'DELETE_FOLDER' })
  }

  const handleClickonDeleteFile = (e, id) => {
    e.stopPropagation();
    setModal({ ...modal, show: true, type: 'DELETE_FILE' })
  }

  const handleCreateFolder = async () => {
    try {
      const payload = {
        userId: userData.userId,
        folderName: folderName
      }
      const res = await createNewFolderAPI(payload);
      if (res.data) {
        await fetchFolderList();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCreateForm = async () => {
    try {
      const payload = {
        name: formName,
        userId: userData.userId,
        folderId: modal.modalData.folderId
      }
      const res = await createNewFileAPI(payload);
      if (res.data) {
        await fetchFolderList();
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
    <>
      <div className={`form-dashboard-container ${theme === "light" ? "light-mode" : ""}`} >
        <header>
          <FormDashboardHeader {...{ theme, toggleTheme }} />
        </header>
        <div className='create-folder-container' >
          <div className='folder-list' >
            {
              [DEFAULT_FOLDER].map(({ title, id, uniqueId }) => (
                <span key={id} className='folder' onClick={() => setModal({ ...modal, show: true, type: 'CREATE_FOLDER' })} >
                  <span>+</span>
                  <span>{title}</span>
                  {uniqueId !== 'CREATE_FOLDER' && <span onClick={(e) => handleClickonDeleteFolder(e, id)} >x</span>}
                </span>
              ))
            }
            {
              folderList.map(({ title, id, isActive }) => (
                <span key={id} className={`folder ${isActive ? 'active' : ''}`} onClick={(event) => handleClickOnFolder(event, id)} >
                  <span>+</span>
                  <span>{title}</span>
                  <span onClick={(e) => handleClickonDeleteFolder(e, id)} >x</span>
                </span>
              ))
            }
          </div>

          <div className='files' >
            {
              [DEFAULT_FILE].map(({ title, id, uniqueId }) => (
                <div key={id} className='file' onClick={(event) => setModal({ ...modal, show: true, type: 'CREATE_TYPEBOT' })} >
                  <div className='plus-icon' >+</div>
                  <div>{title}</div>
                </div>
              ))
            }
            {
              activeFormList.map(({ title, id, uniqueId }) => (
                <div key={id} className='file' onClick={(event) => handleClickOnFile(event, uniqueId)} >
                  <div>{title}</div>
                  <div className='file-delete-icon' onClick={handleClickonDeleteFile} >x</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      {
        modal?.type === 'CREATE_FOLDER' && modal?.show ? (
          <Modal closeModal={() => setModal({ ...modal, show: false })} >
            <h3>Create Folder</h3>
            <input placeholder='Enter folder name...' value={folderName} onChange={(e) => setFolderName(e.target.value)} onClick={(e) => e.stopPropagation()} />
            <button onClick={handleCreateFolder}>Create</button>
          </Modal>
        ) : null
      }

      {
        modal?.type === 'CREATE_TYPEBOT' && modal?.show ? (
          <Modal closeModal={() => setModal({ ...modal, show: false })} >
            <h3>Create Form</h3>
            <input placeholder='Enter form name...' onClick={(e) => e.stopPropagation()} />
            <button onClick={() => setModal({ ...modal, show: false })}>Create</button>
          </Modal>
        ) : null
      }

      {
        modal?.type === 'DELETE_FOLDER' && modal?.show ? (
          <Modal closeModal={() => setModal({ ...modal, show: false })} >
            <h3>Are you sure you want to delete this folder ?</h3>
            <div onClick={() => setModal({ ...modal, show: false })}>Yes</div>
            <div onClick={() => setModal({ ...modal, show: false })}>No</div>
          </Modal>
        ) : null
      }

      {
        modal?.type === 'DELETE_FILE' && modal?.show ? (
          <Modal closeModal={() => setModal({ ...modal, show: false })} >
            <h3>Are you sure you want to delete this form ?</h3>
            <div onClick={() => setModal({ ...modal, show: false })}>Yes</div>
            <div onClick={() => setModal({ ...modal, show: false })}>No</div>
          </Modal>
        ) : null
      }
    </>
  )
}

export default FormDashboard