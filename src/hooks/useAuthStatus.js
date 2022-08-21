import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useRef, useState } from "react"
import { auth } from "../firebase.config"

export const useAuthStatus = () => {
    const isMounted = useRef(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(isMounted){
            onAuthStateChanged(auth, (user) => {
                if(user){
                    setLoggedIn(true)
                }
                setLoading(false)
            })
        }
    }, [])
    return { loggedIn, loading }
}