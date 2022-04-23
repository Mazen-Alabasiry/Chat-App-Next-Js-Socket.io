import React, { useState, useContext, useEffect } from 'react'
const AppContext = React.createContext()
const AppProvider = ({ children }) => {

    const [currentMessage, setCurrentMessage] = useState('')
    const [roomId, setRoomId] = useState('')
    const [name, setName] = useState('');
    const [socket, setSocket] = useState('')

    return <AppContext.Provider value={{ setCurrentMessage, setName, setRoomId, setSocket, roomId, name, currentMessage, socket }}>
        {children}
    </AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }
