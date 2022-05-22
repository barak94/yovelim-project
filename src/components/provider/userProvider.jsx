import React, { useState, useEffect } from 'react'
import { userAuthLisiner, db } from '../../firebase-config/firebase'
import { doc, getDoc } from 'firebase/firestore'

export const userContext = React.createContext();


const UserProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {

        const getUser = async (user) => {
            const userDocRef = doc(db, 'users', user.uid);
            const docSnap = (await getDoc(userDocRef)).data();
            setCurrentUser(docSnap);
        }

        const Unsubscribe = userAuthLisiner((user) => {

            if (user) {
                getUser(user);
            }else{
                setCurrentUser(null);
            }
        });

        return Unsubscribe;
    }, []);

    return (
        <userContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </userContext.Provider>
    )

}

export default UserProvider