import UserContext , {User} from "./UserContext"
import { useState , useEffect, ReactNode } from "react"


interface UserProviderProps {
    children: ReactNode;
}

const UserProvider = ({children}: UserProviderProps) => {

    const[user , setUser] = useState<User |null>(null)

    useEffect(()=>{
            const userInfoString = localStorage.getItem("userInfo")

            if(userInfoString){
                const userInfo = JSON.parse(String(userInfoString))
                setUser({
                    user :userInfo.user,
                    token : userInfo.token
                })
            }

    },[])

  return (
    <UserContext.Provider value={{user , setUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider