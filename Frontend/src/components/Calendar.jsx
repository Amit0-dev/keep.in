import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getEvents } from "../utils/event.js";

function Calendar() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let ignore = false; // prevent setting state on unmounted component

    async function fetchEvents() {
      try {
        const data = await getEvents();

        if (!ignore) setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    }

    fetchEvents();

    return () => {
      ignore = true; // cleanup on unmount
    };
  }, []);

  console.log(`fetched : ${events}`);

  function handleWeekendsToggle() {
    setWeekendsVisible(!weekendsVisible);
  }

  function handleEvents(events) {
    console.log(`Called handleEvents event function : ${events}`);
  }

  function renderEventContent(eventInfo) {
    console.log(`Inside renderEventContent function: ${eventInfo}`);
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  }

  function handleSelect(){
    alert("Hello")
  }

  return (
    <div className="">
      {/* <button
        className="py-2 px-6 bg-orange-500 rounded-2xl text-white font-bold cursor-pointer"
        onClick={handleClick}
      >
        fetch
      </button> */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        height="90vh"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={weekendsVisible}
        events={events}
        // select={handleSelect}
        eventContent={renderEventContent}
        eventsSet={handleEvents}
      />
    </div>
  );
}

export default Calendar;
