import { useEffect, useState } from 'react'

const useWorkspaceData = () => {
    const [workspaceData, setWorkspaceData] = useState(null)

    useEffect(() => {
        setWorkspaceData(JSON.parse(localStorage.getItem('another_user_workspace_data')))
    }, [])

    return workspaceData
}

export default useWorkspaceData