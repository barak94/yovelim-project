import Calendar from "../../calendar/Calendar"
import HeadLine from "../../head-line/HeadLine"
import './Events.css'

const Events = () => {
  
  return (
    <>
    <HeadLine title='לוח אירועים' />
    <div className="events-calender">
       <Calendar />
    </div>
    </>
  )
}

export default Events