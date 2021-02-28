import { createContext,useState } from 'react';
export const UserContext = createContext();
export const UserContextProvider = (props) => {
    const [user, setuser] = useState(null);
    return (
        <UserContext.Provider value={{ user: [user, setuser] }}>
            {props.children}
        </UserContext.Provider>
    )
};