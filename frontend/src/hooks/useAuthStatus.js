import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const useAuthStatus = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (user) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
        setLoading(false)
    }, [user])

    return { isAuthenticated, loading }
}