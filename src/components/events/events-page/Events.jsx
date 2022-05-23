import Calendar from "../../calendar/Calendar"
import HeadLine from "../../head-line/HeadLine"
import './Events.css'

const Events = () => {

  return (
    <>
      <div className="events-calender">
        <HeadLine title='לוח אירועים' />
        <Calendar />
      </div>
    </>
  )
}

export default Events