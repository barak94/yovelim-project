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

  const closeDetails = ()=>{
    setEvent(null);
    setShowDetails(false);
    setImageUrl('');
  }

  return (
    <div className='home-page'>

      {/* <div className="home-img">
        <img src="https://firebasestorage.googleapis.com/v0/b/test-1-9bda5.appspot.com/o/images%2Fhomegallerypic.png?alt=media&token=a333c302-7e56-4629-b82b-268ed72c89d8" alt="תמונת בית" />
      </div> */}

      <HeadLile title="אירועים שלנו" />

      <div className="calendar-events">

        <EventsCard textButton='פרטים' buttonClass='home-event-box-button' cardClassName='home-event-box' onClickFunc={getEventDetails} />
        <div className="home-calendar">
          <Calendar />
        </div>

      </div>

      {showDetails && <EventDetails event={event} imageUrl={imageUrl} onClose={closeDetails}/>}
    </div>
  )



}

export default HomePage