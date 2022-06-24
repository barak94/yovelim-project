import React, { useState, useContext, useEffect } from 'react'
import EventsCard from '../events-card/EventsCard'
import ConfirmRemove from '../../confirm-remove/ConfirmRemove'
import Button from '../../button/Button'
import { useNavigate } from 'react-router-dom'
import { deleteDocRef } from '../../../firebase-config/firebase'
import { eventsContext } from '../../provider/eventsProvider'
import './EventsManage.css'


const EventsManage = ({ currentUser }) => {

    const navigate = useNavigate();
    const [deleted, setDeleted] = useState(false);
    const [docId, setDocId] = useState('');
    const [myEvent, setMyEvents] = useState([]);
    const { events, setEvents } = useContext(eventsContext);

    useEffect(() => {

        setMyEvents(events);

        if (currentUser !== null && currentUser.BuildManager && !currentUser.isAdmin) {
            setMyEvents(events.filter((item) => currentUser.extension === item.extension));
        }

    }, [events, currentUser]);

    const getDocInfo = (event) => {
        setDocId(event.id);
        setDeleted(true);
    }
    const resetInfo = () => {
        setDocId('');
        setDeleted(false);
    }

    const deleteEvent = async () => {
        await deleteDocRef('events', docId);
        setEvents(prev => prev.filter((event) => event.id !== docId));
        resetInfo();
    }

    const addEvent = () => {
        navigate("./add-event");
    }

    return (
        <>
            <div className='events-container'>
                <EventsCard events={myEvent} textButton='מחק אירוע' cardClassName='manage-event-box' buttonClass='manage-event-box-button' onClickFunc={getDocInfo} />

                <Button className='add-event' type='button' text='צור אירוע' onClick={addEvent} />
            </div>

            {deleted && <ConfirmRemove onDelete={deleteEvent} onReset={resetInfo} />}
        </>
    )
}

export default EventsManage