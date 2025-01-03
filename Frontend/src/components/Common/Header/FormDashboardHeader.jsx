import React, { useEffect, useState } from 'react'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'
import { useNavigate } from 'react-router-dom'
import { LIGHT } from '../../../constant'
import useTheme from '../../../hooks/useTheme'
import useUserData from '../../../hooks/useUserData'
import { allWorkspaceAPI } from '../../FormDashboard/api'
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Loader/Loader'

import './FormDashboardHeader.scss'
import useWorkspaceData from '../../../hooks/useWorkspaceData'

const FormDashboardHeader = ({ handleClickOnShare, fetchFolderList }) => {
    const [theme, toggleTheme] = useTheme();
    const [selectOptions, setSelectOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const userData = useUserData();
    const workspaceData = useWorkspaceData();

    const handleClick = (e) => {
        const {value} = e.target;

        if(value !== 'settings') {
            if(value !== userData?.userId){
                localStorage.setItem('another_user_workspace_data', JSON.stringify(selectOptions.find((item)=> item.ownerId === value)));
            } else {
                localStorage.removeItem('another_user_workspace_data')
            }
            setSelectedOption(value);
            fetchFolderList(value);
        } else if(value === 'settings'){
            navigate('/settings');
        }
    }

    const getAllWorkspaceList = async (id) => {
        let res;
        setIsLoading(true);
        try {
            res = await allWorkspaceAPI(id)
            if(res.data.data.length){
                setSelectOptions(res.data.data)
            }
        } catch (error) {
            toast.error(res.data.message)
            console.log("🚀 ~ getAllWorkspaceList ~ error:", error)
        } finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(userData?.userId){
            getAllWorkspaceList(userData.userId);
        }
    }, [userData])

    useEffect(() => {
        if(workspaceData && Object.keys(workspaceData).length){
            setSelectedOption(workspaceData?.ownerId)
        }
    },[workspaceData])

    return (
        <div className={`header-container ${theme === LIGHT ? 'light-header': ''}`} >
            <select id="workspace" name="workspace" value={selectedOption} onClick={handleClick} >
                <option value={userData?.userId} >{userData?.userName} workspace</option>
                {selectOptions?.map(({ownerId, ownerName}) => (
                    <option value={ownerId} >{ownerName} workspace</option>
                ))}
                <option value="settings" >Settings</option>
            </select>

            <div className='action-buttons' >
                <span className={`switch-buttons ${theme === LIGHT ? 'light-mode-switch': ''}`} >
                    <span>Light</span>
                    <ToggleSwitch isChecked={theme === LIGHT} toggleSwitch={toggleTheme} />
                    <span>Dark</span>
                </span>
                <button className='share-btn' onClick={handleClickOnShare} >Share</button>
            </div>
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

export default FormDashboardHeader