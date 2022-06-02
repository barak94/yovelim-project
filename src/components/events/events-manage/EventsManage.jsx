import React, { useState, useContext } from 'react'
import EventsCard from '../events-card/EventsCard'
import ConfirmRemove from '../../confirm-remove/ConfirmRemove'
import Button from '../../button/Button'
import { useNavigate } from 'react-router-dom'
import { deleteDocRef } from '../../../firebase-config/firebase'
import { eventsContext } from '../../provider/eventsProvider'
import './EventsManage.css'


const EventsManage = () => {

    const navigate = useNavigate();
    const [deleted, setDeleted] = useState(false);
    const [docId, setDocId] = useState('');
    const { setEvents } = useContext(eventsContext);


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
        setEvents(prev => prev.filter((event)=> event.id !== docId));
        resetInfo();
    }

    const addEvent = () => {
        navigate("./add-event");
    }

    return (
        <>
            <div className='events-container'>
                <EventsCard textButton='מחק אירוע' cardClassName='manage-event-box' buttonClass='manage-event-box-button' onClickFunc={getDocInfo} />

                <Button className='add-event' type='button' text='צור אירוע' onClick={addEvent} />
            </div>

            {deleted && <ConfirmRemove onDelete={deleteEvent} onReset={resetInfo} />}
        </>
    )
}

export default EventsManage