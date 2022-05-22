import React, { useState, useEffect } from 'react'
import { getCollection } from '../../firebase-config/firebase'

export const calendarContext = React.createContext();


const CalendarProvider = ({ children }) => {

    const [calendar, setCalendar] = useState([]);

    useEffect(() => {

        const calendarCollection = async () => {
            const collection = await getCollection('calendar');
            setCalendar(collection);
           
          }
      
          calendarCollection();

    }, []);

    return (
        <calendarContext.Provider value={{ calendar, setCalendar }}>
            {children}
        </calendarContext.Provider>
    )

}

export default CalendarProvider