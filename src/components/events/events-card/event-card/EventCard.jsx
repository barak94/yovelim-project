import React, { useState, useEffect } from 'react'
import { storage } from '../../../../firebase-config/firebase'
import { ref, getDownloadURL } from "firebase/storage";
import Button from '../../../button/Button'
import './EventCard.css'

const EventCard = ({ event, textButton, onClickFunc, buttonClass, cardClassName }) => {

    const [url, setUrl] = useState('');

    useEffect(() => {
        getDownloadURL(ref(storage, `images/${event.imageName}`))
            .then((url) => {
                setUrl(url);
            })
    }, [])

    return (
        <div className={cardClassName} >
            <img src={url} alt={event.title} />
            <span className='event-name'>{event.title}</span>
            <Button className={buttonClass} type='button' onClick={() => { onClickFunc(event, url) }} text={textButton} />
        </div>

    )
}

export default EventCard