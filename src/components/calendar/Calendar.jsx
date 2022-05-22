import React, { useContext } from "react";
import { calendarContext } from "../provider/calendarProvider";
// import "./Calendar.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";


const Calendar = ()=> {

  const { calendar } = useContext(calendarContext);

  return ( 
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        events={calendar}
      />
  );
}

export default Calendar