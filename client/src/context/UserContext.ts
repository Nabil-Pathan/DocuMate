import { createContext , useContext} from "react"

interface user {
    _id : string
    name : string
    email : string
    password : string
    pic : string
}

export interface User {
    user : user 
    token : string | undefined
}

export interface UserContextType {
    user  : User | null
    setUser : React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | null>(null)

export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

export default UserContext