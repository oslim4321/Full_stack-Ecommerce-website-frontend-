import React, { useContext, useState } from "react";


const Search = React.createContext()

const UserData = ({ children }) => {
    const [UserData, setUserData] = useState()
    const [Info, setInfo] = useState()

    return <Search.Provider value={{ Info, setInfo }}>{children}</Search.Provider>
}

export default UserData;

export const GlobalUSerData = () => {
    return useContext(Search)
}