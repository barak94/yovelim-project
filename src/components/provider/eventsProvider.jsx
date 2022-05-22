import React, { useState, useEffect } from 'react'
import { getCollection } from '../../firebase-config/firebase'


export const eventsContext = React.createContext();

const EventsProvider = ({ children }) => {

    const [events, setEvents] = useState([]);
    
  useEffect(() => {

      const usersCollection = async () => {
      const collection = await getCollection('events');
      setEvents(collection);
     
    }

    usersCollection();
  }, [])


    return (
        <eventsContext.Provider value={{ events, setEvents }}>
            {children}
        </eventsContext.Provider>
    )
}

export default EventsProvider