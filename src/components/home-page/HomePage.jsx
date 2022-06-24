import React, { useState, useContext } from 'react'
import { eventsContext } from '../provider/eventsProvider'
import Calendar from '../calendar/Calendar'
import EventsCard from '../events/events-card/EventsCard'
import EventDetails from './event-details/EventDetails'
import HeadLile from '../head-line/HeadLine'
import './HomePage.css'

const HomePage = () => {

  const [event, setEvent] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [showDetails, setShowDetails] = useState(null);
  const { events } = useContext(eventsContext);

  const getEventDetails = (event) => {
    setEvent(event);
    setShowDetails(true);
    setImageUrl(event.imageUrl);
  }

  const closeDetails = () => {
    setEvent(null);
    setShowDetails(false);
    setImageUrl('');
  }

  return (<>
    <div className='home-page'>

      <HeadLile title="אירועים שלנו" />

      <div className="calendar-events">

        <div className="home-events">
          <EventsCard events={events} textButton='פרטים' buttonClass='home-event-box-button' cardClassName='home-event-box' onClickFunc={getEventDetails} />
        </div>

        <div className="home-calendar">
          <Calendar />
        </div>

      </div>
    </div>
    {showDetails && <EventDetails event={event} imageUrl={imageUrl} onClose={closeDetails} />}
  </>
  )



}

export default HomePage