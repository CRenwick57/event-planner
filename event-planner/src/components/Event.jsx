import { useNavigate } from "react-router-dom";

export default function Event({ eventId, event, deleteFunction }) {
  let eventName = event.name;
  let eventDate = event.date;
  let eventTime = event.time;
  let eventLoc = event.location;
  let eventDesc = event.description;

  const navigate = useNavigate();

  function navigateToUpdate() {
    navigate("/update-event-details", {
      state: {
        eventId: eventId,
        oldEventName: eventName,
        oldEventDate: eventDate,
        oldEventTime: eventTime,
        oldEventLocation: eventLoc,
        oldEventDescription: eventDesc,
      },
    });
  }

  function deleteThisEvent() {
    deleteFunction(eventId);
  }

  return (
    <div className="container mb-3 p-3 bg-primary text-white">
      <div className="row">
        <div className="eventName col-md-3">
          <h2>{eventName}</h2>
        </div>
        <div className="eventDate col-md-3">
          <h2>{eventDate}</h2>
        </div>
        <div className="eventTime col-md-3">
          <h2>{eventTime}</h2>
        </div>
        <div className="eventLocation col-md-3">
          <h2>{eventLoc}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <p>{eventDesc}</p>
        </div>
        <div className="col-md-2">
          <button className="btn btn-secondary" onClick={navigateToUpdate}>Update Event Details</button>
        </div>
        <div className="col-md-2">
          <button className="btn btn-danger" onClick={deleteThisEvent}>
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
}
