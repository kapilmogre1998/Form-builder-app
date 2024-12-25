import { useEffect, useState } from 'react'

const useUserData = () => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('user_data')))
    }, [])

    return userData
}

export default useUserData