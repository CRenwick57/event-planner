import { useContext } from "react";
import { CurrentUserContext } from "../CurrentUserContext";
import NavBar from "../routes/Navbar";

//TODO: Add ability to update event details
export default function Dashboard(){
    
    const {currentUser} = useContext(CurrentUserContext);

    function loadEventListFromLocalStorage(){
        let localStorageEventList = localStorage.getItem("eventList");
        let eventList = localStorageEventList ? JSON.parse(localStorageEventList) : [];
        let usersEventList = eventList.filter(checkEvent);
        return usersEventList;
    }

    function checkEvent(event){
        let userCheck = event.user == currentUser ? true : false;
        let dateAsDate = new Date(event.date);
        let futureEventCheck = dateAsDate > Date.now() ? true : false
        return userCheck && futureEventCheck;
    }

    const activeEventList = loadEventListFromLocalStorage();

    const eventDisplay = (
        <div className="d-flex flex-row flex-wrap">
            {activeEventList.map((event) => (
                <div>
                    <p>Event ID: {event.key}</p>
                    <h2>{event.name}</h2>
                    <h3>{event.date}</h3>
                    <h3>{event.time}</h3>
                    <h3>{event.location}</h3>
                    <p>{event.description}</p>
                    </div>
                
            ))}
        </div>
    )

    return (
        <>
            <h1>{currentUser}'s Dashboard</h1>
            {eventDisplay}
        </>
    )
}