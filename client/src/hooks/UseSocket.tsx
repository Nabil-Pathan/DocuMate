import { useEffect, useState } from "react";
import { Socket } from "socket.io-client"
import io from "socket.io-client"

const END_POINT = "https://documate-3c2s.onrender.com"

// const END_POINT = "http://localhost:5000"


export const useSocket = ()=>{
    const [socket , setSocket] = useState<Socket | null>()

    useEffect(()=>{
        if(!socket){
            const newSocketConnection =  io(END_POINT)
            setSocket(newSocketConnection)
        }
    },[])
    return socket
}