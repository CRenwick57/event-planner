import { useContext } from "react";
import { useFormik } from "formik";
import { CurrentUserContext } from "../CurrentUserContext";
import NavBar from "../routes/Navbar";

export default function AddEvent() {
  const { currentUser } = useContext(CurrentUserContext);

  class Event {
    constructor(key, name, date, time, location, description) {
      this.key = key;
      this.user = currentUser;
      this.name = name;
      this.date = date;
      this.time = time;
      this.location = location;
      this.description = description;
    }
  }

  function loadEventListFromLocalStorage() {
    let localStorageEventList = localStorage.getItem("eventList");
    let eventList = localStorageEventList
      ? JSON.parse(localStorageEventList)
      : [];
    return eventList;
  }

  function saveEventListToLocalStorage(eventList) {
    let strEventList = JSON.stringify(eventList);
    localStorage.setItem("eventList", strEventList);
  }

  function createNewEvent(name, date, time, location, description) {
    let eventList = loadEventListFromLocalStorage();
    let lastId =
      eventList.length > 0 && eventList != null
        ? eventList[eventList.length - 1].key
        : 0;
    let newEvent = new Event(
      lastId + 1,
      name,
      date,
      time,
      location,
      description
    );
    eventList.push(newEvent);
    saveEventListToLocalStorage(eventList);
  }

  const validate = (values) => {
    const errors = {};

    if (!values.eventName) {
      errors.eventName = "Required";
    }

    if (!values.date) {
      errors.date = "Required";
    }

    if (!values.time) {
      errors.time = "Required";
    }

    if (!values.location) {
      errors.location = "Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      eventName: "",
      date: "",
      time: "",
      location: "",
      description: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      createNewEvent(
        values.eventName,
        values.date,
        values.time,
        values.location,
        values.description
      );
      resetForm();
    },
  });

  return (
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          alignItems: "center", // vertical centering
          minHeight: "80vh", // take most of the viewport height
          flexDirection: "column", // stack children vertically
        }}
      >
        <div style={{ maxWidth: 600 }}>
          <h2>Add Event</h2>
          <form className="form-container" onSubmit={formik.handleSubmit}>
            <label htmlFor="eventName">Event Name</label>
            <input
              id="eventName"
              name="eventName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.eventName}
            />
            {formik.touched.eventName && formik.errors.eventName ? (
              <div>{formik.errors.eventName}</div>
            ) : null}
            <div className="date-time-row">
              <div>
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                />
                {formik.touched.date && formik.errors.date ? (
                  <div>{formik.errors.date}</div>
                ) : null}
              </div>
              <div
                style={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
                <label htmlFor="time">Time</label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.time}
                />
                {formik.touched.time && formik.errors.time ? (
                  <div>{formik.errors.time}</div>
                ) : null}
              </div>
            </div>
            <label htmlFor="location">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
            />
            {formik.touched.location && formik.errors.location ? (
              <div>{formik.errors.location}</div>
            ) : null}
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            <button type="submit" disabled={!formik.dirty}>
              Add Event
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
