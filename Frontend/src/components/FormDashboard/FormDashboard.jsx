import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormDashboardHeader from '../Common/Header/FormDashboardHeader'
import Modal from '../Common/Modal/Modal'
import useUserData from '../../hooks/useUserData'
import { deleteFolderAPI, createNewFolderAPI, createNewFormAPI, getFolderListAPI, deleteFormAPI } from './api'
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineFolderAdd } from "react-icons/ai";
import useTheme from '../../hooks/useTheme'
import { LIGHT } from '../../constant'

import './FormDashboard.scss'

const DEFAULT_FOLDER = { title: 'Create Folder', id: '1', uniqueId: 'CREATE_FOLDER' }
const DEFAULT_FORM = { title: 'Create typebot', id: '1', uniqueId: 'CRREATE_TYPEBOT' }

const FormDashboard = () => {
  const [modal, setModal] = useState({ show: false, type: 'CREATE_FOLDER', modalData: {} })
  const [folderList, setFolderList] = useState([]);
  const [allFormList, setAllFormList] = useState([]);
  const [activeFormList, setActiveFormList] = useState(null)
  const [defaultFormList, setDefaultFormList] = useState([]);
  const [folderName, setFolderName] = useState({ name: '', isError: false, errorMsg: '' });
  const [formName, setFormName] = useState({ name: '', isError: false, errorMsg: '' });
  const [theme] = useTheme();
  const navigate = useNavigate();
  const isLightMode = theme == LIGHT;

  const userData = useUserData();

  const fetchFolderList = async () => {
    try {
      const res = await getFolderListAPI(userData.userId);
      if (res.data) {

        const prevActiveFolderId = folderList.find(folder => folder.isActive)?.id;

        const folders = res.data.data.filter(folder => folder.folderName !== 'NO_FOLDER').map(({ _id, folderName }) => ({
          id: _id,
          title: folderName,
          isActive: prevActiveFolderId === _id ? true : false
        }))

        const forms = res.data.data.filter((folder) => folder.forms.length).map((folder) => folder.forms.map((form) => ({
          id: form._id,
          title: form.formName,
          folderId: folder._id
        }))).flat();

        const defaultForms = res.data.data.filter(folder => folder.folderName === 'NO_FOLDER').map(folder => folder.forms.map(form => ({
          id: form._id,
          title: form.formName,
          folderId: folder._id
        }))).flat();

        setFolderList([...folders]);
        setAllFormList([...forms]);
        setDefaultFormList(defaultForms); //Show this default list when no folder is selected.
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

  const handleClickonDeleteForm = (e, obj) => {
    e.stopPropagation();
    setModal({ ...modal, show: true, type: 'DELETE_FORM', modalData: obj })
  }

  const createNewFolder = async () => {
    try {
      const payload = {
        userId: userData.userId,
        folderName: folderName.name.trim()
      }
      const res = await createNewFolderAPI(payload);

      if (res.data.message === 'Folder already exists') {
        setFolderName(prev => ({ ...prev, errorMsg: 'Folder name already exists.', isError: true }))
      } else if (res.data && res.status == 200) {
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
        name: formName.name,
        userId: userData.userId,
        folderId: modal?.modalData?.folderId || folderList.find(folder => folder.isActive)?.id || defaultFormList[0]?.folderId
      }
      const res = await createNewFormAPI(payload);

      if (res.data.message === 'Form name already exists') {
        setFormName(prev => ({ ...prev, errorMsg: 'Form name already exists.', isError: true }))
      } else if (res.data && res.status == 200) {
        await fetchFolderList();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleClickOnDone = async () => {
    if (modal?.type === 'CREATE_FOLDER' && !folderName.name.trim().length) {
      return setFolderName({ name: '', isError: true, errorMsg: 'Please enter a valid folder name' })

    }
    if (modal?.type === 'CREATE_FORM' && !formName.name.trim().length) {
      return setFormName({ name: '', isError: true, errorMsg: 'Please enter a valid form name' });
    }

    modal?.type === 'CREATE_FOLDER' ? createNewFolder() : createNewForm();
  }

  const closeModal = () => {
    setFolderName({ name: '', isError: false, errorMsg: '' });
    setFormName({ name: '', isError: false, errorMsg: '' });
    setModal({ ...modal, show: false })
  }

  const handleInputChange = (e) => {
    if (modal?.type === 'CREATE_FORM') {
      setFormName({ name: e.target.value, isError: false, errorMsg: '' });
    } else {
      setFolderName({ name: e.target.value, isError: false, errorMsg: '' });
    }
    e.stopPropagation()
  }

  const deleteFolder = async () => {
    try {
      const data = {
        folderId: modal.modalData.folderId,
        userId: userData.userId
      }

      const res = await deleteFolderAPI(data);
      if (res.data) {
        await fetchFolderList();
        setActiveFormList(null)
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteForm = async () => {
    try {
      const data = {
        folderId: modal.modalData.folderId,
        userId: userData.userId,
        formId: modal.modalData.formId
      }

      const res = await deleteFormAPI(data);
      if (res.data) {
        await fetchFolderList();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleConfirmToDelete = () => {
    modal?.type === 'DELETE_FOLDER' ? deleteFolder() : deleteForm();
  }

  useEffect(() => {
    if (userData?.userId) {
      fetchFolderList();
    }
  }, [userData?.userId])

  useEffect(() => {
    const activeFolderId = folderList.find(folder => folder.isActive)?.id;
    if (activeFolderId) {
      setActiveFormList(allFormList.filter(form => form.folderId == activeFolderId))
    }
  }, [allFormList])

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login')
    }
  }, [])

  return (
    <div className={`form-dashboard-container ${isLightMode ? "light-mode" : ""}`} >
      <header>
        <FormDashboardHeader />
      </header>
      <div className='create-folder-container' >
        <div className='folder-list' >
          <span key={DEFAULT_FOLDER.id} className={`folder flex ${isLightMode ? 'form-dashboard-light-mode' : ''}`} onClick={() => setModal({ show: true, type: 'CREATE_FOLDER' })}>
            <AiOutlineFolderAdd style={{ fontSize: '20px' }} />
            <span>{DEFAULT_FOLDER.title}</span>
          </span>
          {
            folderList.map(({ title, id, isActive }) => (
              <div key={id} className={`folder ${isActive ? isLightMode ? 'folder-active-light-mode' : 'active' : ''} ${isLightMode ? 'form-dashboard-light-mode' : ''}`} onClick={(event) => handleClickOnFolder(event, id)} >
                <div>{title}</div>
                <RiDeleteBin6Line className='delete' onClick={(e) => handleClickonDeleteFolder(e, id)} />
              </div>
            ))
          }
        </div>

        <div className='forms' >
          <div key={DEFAULT_FORM.id} className={`form ${isLightMode ? 'form-dashboard-light-mode' : ''}`} onClick={() => setModal({ show: true, type: 'CREATE_FORM' })}>
            <div className='plus-icon'>+</div>
            <div className='title-center' >{DEFAULT_FORM.title}</div>
          </div>
          {
            (activeFormList == null ? defaultFormList : activeFormList).map(({ title, id, folderId }) => (
              <div key={id} className={`form ${isLightMode ? 'form-light-mode' : ''}`} onClick={() => navigate(`/workspace/${folderId}/${id}?formname=${encodeURI(title)}`)} >
                <div>{title}</div>
                <div className='form-delete-icon' onClick={(e) => handleClickonDeleteForm(e, { folderId, formId: id })} ><RiDeleteBin6Line className='delete' /></div>
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
                {modal?.type === 'CREATE_FOLDER' && folderName.isError && folderName.errorMsg ? folderName.errorMsg : ''}
                {modal?.type === 'CREATE_FORM' && formName.isError && formName.errorMsg ? formName.errorMsg : ''}
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