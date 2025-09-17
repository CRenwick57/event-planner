import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import Event from "./Event";

export default function Dashboard() {
  const { currentUser } = useContext(CurrentUserContext);
  const [activeEventList, setActiveEventList] = useState([]);
  const [eventListReloadTrigger, setEventListReloadTrigger] = useState(true);

  function loadWholeEventListFromLocalStorage() {
    let localStorageEventList = localStorage.getItem("eventList");
    let eventList = localStorageEventList
      ? JSON.parse(localStorageEventList)
      : [];
    return eventList;
  }

  function sortEvents(a,b) {
        const dateTimeA = new Date(`${a.date} ${a.time}`);
        const dateTimeB = new Date(`${b.date} ${b.time}`);

        return dateTimeA - dateTimeB;
  }

  function loadUsersEventListFromLocalStorage() {
    let eventList = loadWholeEventListFromLocalStorage();
    let usersEventList = eventList.filter(checkEvent);
    usersEventList.sort(sortEvents)
    return usersEventList;
  }

  function checkEvent(event) {
    let userCheck = event.user == currentUser ? true : false;
    let dateAsDate = new Date(`${event.date} ${event.time}`);
    let futureEventCheck = dateAsDate > Date.now() ? true : false;
    return userCheck && futureEventCheck;
  }

  function deleteEvent(eventId) {
    let eventList = loadWholeEventListFromLocalStorage();
    let updatedList = eventList.filter((event) => event.key !== eventId);
    let strEventList = JSON.stringify(updatedList);
    localStorage.setItem("eventList", strEventList);
    setEventListReloadTrigger(true);
  }

  useEffect(() => {
    if (eventListReloadTrigger == true) {
      setActiveEventList(loadUsersEventListFromLocalStorage());
      setEventListReloadTrigger(false);
    }
  }, [eventListReloadTrigger]);

  const eventDisplay = activeEventList.map((event) => (
    <Event
      key={event.key}
      eventId={event.key}
      event={event}
      deleteFunction={deleteEvent}
    />
  ));
  return (
    <>
      <h1>{currentUser}'s Dashboard</h1> {eventDisplay}{" "}
    </>
  );
}
