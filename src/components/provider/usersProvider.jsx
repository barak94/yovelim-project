import React, { useState, useEffect } from 'react'
import { getCollection } from '../../firebase-config/firebase'


export const usersContext = React.createContext();

const UsersProvider = ({ children }) => {

    const [users, setUsers] = useState([]);

  useEffect(() => {

      const usersCollection = async () => {
      const collection = await getCollection('users');
      setUsers(collection);
     
    }

    usersCollection();
  }, [])


    return (
        <usersContext.Provider value={{ users, setUsers }}>
            {children}
        </usersContext.Provider>
    )
}

export default UsersProvider