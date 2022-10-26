import React, { useContext, useState } from "react";


const Alert = React.createContext()

const DisplayAlert = ({ children }) => {


    const [alert, setalert] = useState({ show: false, msg: '', type: '' })
    const showAlert = (show = false, type = '', msg = '') => {
        setalert({ show, type, msg })
    }

    return <Alert.Provider value={{ alert, showAlert }}>{children}</Alert.Provider>
}

export default DisplayAlert;

export const GlobalDisplayAlert = () => {
    return useContext(Alert)
}