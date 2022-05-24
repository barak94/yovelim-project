import React, { useState } from 'react'
import './HomePage.css'
import Calendar from '../calendar/Calendar'
import EventsCard from '../events/events-card/EventsCard'
import EventDetails from './event-details/EventDetails'
import HeadLile from '../head-line/HeadLine'

const HomePage = () => {

  const [event, setEvent] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [showDetails, setShowDetails] = useState(null);

  const getEventDetails = (event, url) => {
    setEvent(event);
    setShowDetails(true);
    setImageUrl(url);
  }

  const closeDetails = () => {
    setEvent(null);
    setShowDetails(false);
    setImageUrl('');
  }

  return (
    <div className='home-page'>

      <HeadLile title="אירועים שלנו" />

      <div className="calendar-events">

        <div className="home-events">
          <EventsCard textButton='פרטים' buttonClass='home-event-box-button' cardClassName='home-event-box' onClickFunc={getEventDetails} />
        </div>

        <div className="home-calendar">
          <Calendar />
        </div>

      </div>

      {showDetails && <EventDetails event={event} imageUrl={imageUrl} onClose={closeDetails} />}
    </div>
  )



}

export default HomePage