import React, { useContext } from 'react'
import { eventsContext } from '../../provider/eventsProvider'
import EventCard from './event-card/EventCard';
import './EventsCard.css'

const EventsCard = ({textButton, onClickFunc, buttonClass, cardClassName}) => {

  const { events } = useContext(eventsContext);
  
    return (

      <div className='events-box'>
            { events.map((event) => <EventCard cardClassName={cardClassName} buttonClass={buttonClass} event={event} key={event.id} textButton={textButton} onClickFunc={onClickFunc}/>)}
        </div>
  
  )
}

export default EventsCard