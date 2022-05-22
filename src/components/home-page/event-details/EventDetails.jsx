import React from 'react'
import {IoMdCloseCircleOutline} from 'react-icons/io'
import './EventDetails.css'

const EventDetails = ({event, imageUrl, onClose}) => {
  return (
    <div className="event-details">

    <div className="details">
        <IoMdCloseCircleOutline className='closeIcon' onClick={onClose} />
      <h3>{event.title}</h3>
      <div>
        <span className='title'>ביום</span>
        <br />
        <span>{event.day} {event.start} </span>
        <br />
        <br />
        <span className='title'>שעה</span>
        <br />
        <span>{event.time}</span>
        <br />
        <br />
        <span className='title'>שלוחה</span>
        <br />
        <span>{event.extension}</span>
      </div>
      <div>
        <span className='title'>פרטי אירוע</span>
        <br />
        <span className='data'>{event.data}</span>
      </div>
    </div>

    <div className="image-details">
      <img src={imageUrl} alt={event.title} />
    </div>
  </div>
    
  )
}

export default EventDetails