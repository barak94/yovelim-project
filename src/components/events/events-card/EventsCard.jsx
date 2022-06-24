import EventCard from './event-card/EventCard';
import './EventsCard.css'

const EventsCard = ({events, textButton, onClickFunc, buttonClass, cardClassName}) => {

    return (

      <div className='events-box'>
            { events.map((event) => <EventCard cardClassName={cardClassName} buttonClass={buttonClass} event={event} key={event.id} textButton={textButton} onClickFunc={onClickFunc}/>)}
        </div>
  
  )
}

export default EventsCard