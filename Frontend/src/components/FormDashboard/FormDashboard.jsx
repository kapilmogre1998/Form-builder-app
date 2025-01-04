import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineFolderAdd } from "react-icons/ai";
import FormDashboardHeader from '../Common/Header/FormDashboardHeader'
import Modal from '../Common/Modal/Modal'
import useUserData from '../../hooks/useUserData'
import { deleteFolderAPI, createNewFolderAPI, createNewFormAPI, getFolderListAPI, deleteFormAPI, shareWorkspaceAPI } from './api'
import useTheme from '../../hooks/useTheme'
import { LIGHT } from '../../constant'
import Loader from '../Common/Loader/Loader';

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
  const [sharePermission, setSharePermission] = useState({ permission: 'edit', emailId: '' });
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState({ isError: false, msg: '' });
  const [workspaceData, setWorkspaceData] = useState(null);

  const [theme] = useTheme();
  const navigate = useNavigate();
  const isLightMode = theme == LIGHT;

  const userData = useUserData();

  const USER_ID = workspaceData?.ownerId || userData?.userId

  const fetchFolderList = async (value) => {
    let res;
    try {
      setIsLoading(true);
      res = await getFolderListAPI(value || USER_ID);
      if (res?.data?.data?.folders) {
        const prevActiveFolderId = folderList.find(folder => folder.isActive)?.id;

        const folders = res.data.data.folders.filter(folder => folder.folderName !== 'NO_FOLDER').map(({ _id, folderName }) => ({
          id: _id,
          title: folderName,
          isActive: prevActiveFolderId === _id ? true : false
        }))

        const forms = res.data.data.folders.filter((folder) => folder.forms.length).map((folder) => folder.forms.map((form) => ({
          id: form._id,
          title: form.formName,
          folderId: folder._id
        }))).flat();

        const defaultForms = res.data.data.folders.filter(folder => folder.folderName === 'NO_FOLDER').map(folder => folder.forms.map(form => ({
          id: form._id,
          title: form.formName,
          folderId: folder._id
        }))).flat();

        setFolderList([...folders]);
        setAllFormList([...forms]);
        setDefaultFormList(defaultForms); //Show this default list when no folder is selected.
      } else {
        setFolderList([]);
        setAllFormList([]);
        setDefaultFormList([]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'something went wrong')
    } finally {
      setIsLoading(false)
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
        userId: USER_ID,
        folderName: folderName.name.trim()
      }
      setIsLoading(true)
      const res = await createNewFolderAPI(payload);

      if (res.data.message === 'Folder already exists') {
        setFolderName(prev => ({ ...prev, errorMsg: 'Folder name already exists.', isError: true }))
      } else if (res.data && res.status == 200) {
        await fetchFolderList();
        closeModal();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  const createNewForm = async () => {
    try {
      const payload = {
        name: formName.name,
        userId: USER_ID,
        folderId: modal?.modalData?.folderId || folderList.find(folder => folder.isActive)?.id || defaultFormList[0]?.folderId
      }
      setIsLoading(true)
      const res = await createNewFormAPI(payload);

      if (res.data.message === 'Form name already exists') {
        setFormName(prev => ({ ...prev, errorMsg: 'Form name already exists.', isError: true }))
      } else if (res.data && res.status == 200) {
        await fetchFolderList();
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false)
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
        userId: USER_ID
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
        userId: USER_ID,
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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/form-dashboard?ownerId=${USER_ID}&ownerName=${userData.userName}&permission=${sharePermission?.permission}`);
      toast.success('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareWorkspace = async (copyLink) => {
    let res;
    try {
      const payload = {
        "ownerId": userData.userId,
        "emailId": copyLink ? '' : sharePermission.emailId,
        "ownerName": userData.userName,
        "permission": sharePermission.permission
      }
      setIsLoading(true);
      res = await shareWorkspaceAPI(payload);

      if (res.data.sts == 1) {
        if (copyLink) {
          await handleCopyClick();
        } else {
          toast.success(res.data.message);
        }
      }
    } catch (error) {
      setEmailError({ isError: true, msg: error.response.data.message });
    } finally {
      setIsLoading(false);
    }
  }

  const handleClickOnSendInvite = async () => {
    if (!sharePermission.emailId.length) {
      return setEmailError({ isError: true, msg: 'email cannot be empty.' })
    }
    if (!validateEmail(sharePermission.emailId)) {
      return setEmailError({ isError: true, msg: 'enter valid emailId.' })
    }
    if (sharePermission.emailId == userData.email) {
      return setEmailError({ isError: true, msg: 'you can not send invite to yourself.' })
    }

    shareWorkspace();
  }

  const handleClickOnCopyLink = () => shareWorkspace('COPY_LINK');

  // useEffect(() => {
  //   if (userData?.userId) {
  //     fetchFolderList();
  //   }
  // }, [userData?.userId])

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

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)

    const workspaceOwnerId = queryParams.get('ownerId');
    const workspaceOwnerName = queryParams.get('ownerName');
    const workspacePermission = queryParams.get('permission');

    
    if (userData?.userId) {
      if(workspaceOwnerId && workspaceOwnerName && workspacePermission){
        setWorkspaceData({ ownerId: workspaceOwnerId, ownerName: workspaceOwnerName, permission: workspacePermission })
        fetchFolderList(workspaceOwnerId) //get Folder list if ownerId present in query params
      } else {
        fetchFolderList();
      }
    }

  },[userData?.userId])

  return (
    <div className={`form-dashboard-container ${isLightMode ? "light-mode" : ""}`} >
      <header>
        <FormDashboardHeader handleClickOnShare={() => setModal({ show: true, type: 'SHARE' })} {...{setWorkspaceData, fetchFolderList, workspaceData}} />
      </header>
      <div className='create-folder-container' >
        <div className='folder-list' >
          { (workspaceData?.permission == 'edit' || workspaceData == null) ? <span key={DEFAULT_FOLDER.id} className={`folder flex ${isLightMode ? 'form-dashboard-light-mode' : ''}`} onClick={() => setModal({ show: true, type: 'CREATE_FOLDER' })}>
            <AiOutlineFolderAdd style={{ fontSize: '20px' }} />
            <span>{DEFAULT_FOLDER.title}</span>
          </span> : null}
          {
            folderList.map(({ title, id, isActive }) => (
              <div key={id} className={`folder ${isActive ? isLightMode ? 'folder-active-light-mode' : 'active' : ''} ${isLightMode ? 'form-dashboard-light-mode' : ''}`} onClick={(event) => handleClickOnFolder(event, id)} >
                <div>{title}</div>
                {
                  (workspaceData?.permission == 'edit' || workspaceData == null) ? 
                  <RiDeleteBin6Line className='delete' onClick={(e) => handleClickonDeleteFolder(e, id)} /> : null
                }
              </div>
            ))
          }
        </div>

        <div className='forms' >
          {(workspaceData?.permission == 'edit' || workspaceData == null) ? <div key={DEFAULT_FORM.id} className={`add-form form ${isLightMode ? 'form-dashboard-light-mode' : ''}`} onClick={() => setModal({ show: true, type: 'CREATE_FORM' })}>
            <div className='plus-icon'>+</div>
            <div className='title-center' >{DEFAULT_FORM.title}</div>
          </div> : null}
          {
            (activeFormList == null ? defaultFormList : activeFormList).map(({ title, id, folderId }) => (
              <div key={id} className={`form ${isLightMode ? 'form-light-mode' : ''}`} onClick={() => navigate(`/workspace/${USER_ID}/${folderId}/${id}?formname=${encodeURI(title)}&permission=${workspaceData?.permission || ''}`)} >
                <div>{title}</div>
                {
                  (workspaceData?.permission == 'edit' || workspaceData == null) ? 
                  <div className='form-delete-icon' onClick={(e) => handleClickonDeleteForm(e, { folderId, formId: id })} ><RiDeleteBin6Line className='delete' /></div> : null
                }
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
              <input type='text' className={`input-folder ${isLightMode ? 'light-mode-grey-theme' : ''}`} placeholder='Enter folder name...' value={folderName.text} onChange={handleInputChange} />
              <div className='err-msg' >
                {modal?.type === 'CREATE_FOLDER' && folderName.isError && folderName.errorMsg ? folderName.errorMsg : ''}
                {modal?.type === 'CREATE_FORM' && formName.isError && formName.errorMsg ? formName.errorMsg : ''}
              </div>
              <div className='action-buttons' >
                <button className='done-btn btn' onClick={handleClickOnDone}>Done</button>
                <button className='divider' />
                <button className={`cancel-btn btn ${isLightMode ? 'light-mode-grey-clr' : ''}`} onClick={closeModal}>Cancel</button>
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
                <button className={`cancel-btn btn ${isLightMode ? 'light-mode-grey-clr' : ''}`} onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </Modal>
        ) : null
      }
      {
        modal?.type === 'SHARE' && modal?.show ? (
          <Modal contentWidth='550' closeModal={() => {
            setModal({ ...modal, show: false })
            setSharePermission({ permission: 'edit', emailId: '' });
            setEmailError({ isError: false, msg: '' })
          }}
          >
            <div className='share-modal' >
              <div className='title-permission' >
                <h3>Invite by Email</h3>
                <div>
                  <select name="permission" id="permission" className={`${theme == 'light' ? 'light-mode-share-permission' : ''}`} onClick={(e) => setSharePermission(prev => ({ ...prev, permission: e.target.value }))} >
                    <option value="edit">Edit</option>
                    <option value="view">View</option>
                  </select>
                </div>
              </div>

              <input type="text" className={`input-mail ${isLightMode ? 'light-mode-grey-theme' : ''}`} placeholder='Enter email id' onChange={(e) => {
                setEmailError({ isError: false, msg: '' });
                setSharePermission(prev => ({ ...prev, emailId: e.target.value }))
              }} />
              <div className='error-msg' >
                {emailError.isError && emailError.msg ? emailError.msg : ''}
              </div>
              <button className='send-invite-btn' onClick={handleClickOnSendInvite} >Send Invite</button>

              <h3>Invite by link</h3>
              <button className='copy-link' onClick={handleClickOnCopyLink} >copy link</button>
            </div>
          </Modal>
        ) : null
      }
      <ToastContainer position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnHover={false}
        theme={theme === LIGHT ? 'light' : 'dark'}
      />
      {isLoading && <Loader theme={theme} />}
    </div>
  )
}

export default FormDashboard